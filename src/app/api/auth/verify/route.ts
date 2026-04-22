import { NextResponse } from "next/server";
import { getFirebaseAdminAuth } from "@/lib/firebase/admin";

type VerifyBody = {
  idToken?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerifyBody;
    if (!body.idToken) {
      return NextResponse.json({ ok: false, error: "Missing idToken." }, { status: 400 });
    }

    const decoded = await getFirebaseAdminAuth().verifyIdToken(body.idToken, true);
    return NextResponse.json({
      ok: true,
      uid: decoded.uid,
      email: decoded.email ?? null,
      name: decoded.name ?? null,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid or expired token." }, { status: 401 });
  }
}
