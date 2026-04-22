"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  type User,
  getIdToken,
  onAuthStateChanged,
  reauthenticateWithPopup,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createGoogleProvider, firebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";

const DRIVE_TOKEN_KEY = "auth.driveAccessToken.v1";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  verifying: boolean;
  driveAccessToken: string | null;
  enabled: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  verifySession: () => Promise<boolean>;
  ensureDriveAccessToken: () => Promise<string>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function verifyTokenWithServer(idToken: string) {
  const response = await fetch("/api/auth/verify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  return response.ok;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [verifying, setVerifying] = useState(false);
  const [driveAccessToken, setDriveAccessToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem(DRIVE_TOKEN_KEY);
  });

  useEffect(() => {
    if (!firebaseAuth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setDriveAccessToken(null);
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(DRIVE_TOKEN_KEY);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      verifying,
      driveAccessToken,
      enabled: isFirebaseConfigured,
      signInWithGoogle: async () => {
        if (!firebaseAuth) {
          throw new Error("Firebase auth is not configured yet.");
        }
        const provider = createGoogleProvider();
        const result = await signInWithPopup(firebaseAuth, provider);
        const token = GoogleAuthProvider.credentialFromResult(result)?.accessToken ?? null;
        setDriveAccessToken(token);
        if (typeof window !== "undefined") {
          if (token) window.sessionStorage.setItem(DRIVE_TOKEN_KEY, token);
          else window.sessionStorage.removeItem(DRIVE_TOKEN_KEY);
        }
      },
      signOutUser: async () => {
        if (!firebaseAuth) return;
        setDriveAccessToken(null);
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(DRIVE_TOKEN_KEY);
        }
        await signOut(firebaseAuth);
      },
      verifySession: async () => {
        if (!user) return false;
        setVerifying(true);
        try {
          const token = await getIdToken(user, true);
          return verifyTokenWithServer(token);
        } finally {
          setVerifying(false);
        }
      },
      ensureDriveAccessToken: async () => {
        if (!user) {
          throw new Error("Please sign in first.");
        }
        if (driveAccessToken) return driveAccessToken;

        const provider = createGoogleProvider();
        const result = await reauthenticateWithPopup(user, provider);
        const nextToken = GoogleAuthProvider.credentialFromResult(result)?.accessToken;
        if (!nextToken) {
          throw new Error("Could not obtain Google Drive access token.");
        }
        setDriveAccessToken(nextToken);
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(DRIVE_TOKEN_KEY, nextToken);
        }
        return nextToken;
      },
    }),
    [driveAccessToken, loading, user, verifying]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
