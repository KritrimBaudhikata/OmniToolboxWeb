"use client";

const DRIVE_BASE = "https://www.googleapis.com/drive/v3/files";
const DRIVE_UPLOAD = "https://www.googleapis.com/upload/drive/v3/files";

type DriveFile = {
  id: string;
  name: string;
};

async function driveRequest<T>(url: string, accessToken: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Google Drive request failed (${response.status}): ${message.slice(0, 160)}`);
  }

  return (await response.json()) as T;
}

async function findAppDataFile(accessToken: string, fileName: string): Promise<DriveFile | null> {
  const query = encodeURIComponent(`name='${fileName.replace(/'/g, "\\'")}' and 'appDataFolder' in parents and trashed=false`);
  const url = `${DRIVE_BASE}?spaces=appDataFolder&fields=files(id,name)&q=${query}`;
  const payload = await driveRequest<{ files: DriveFile[] }>(url, accessToken);
  return payload.files[0] ?? null;
}

export async function loadJsonFromAppData<T>(accessToken: string, fileName: string): Promise<T | null> {
  const file = await findAppDataFile(accessToken, fileName);
  if (!file) return null;

  const response = await fetch(`${DRIVE_BASE}/${file.id}?alt=media`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(`Failed to read Google Drive file (${response.status}).`);
  }
  return (await response.json()) as T;
}

export async function saveJsonToAppData(accessToken: string, fileName: string, payload: unknown): Promise<void> {
  const existing = await findAppDataFile(accessToken, fileName);
  const metadata = existing
    ? {}
    : {
        name: fileName,
        parents: ["appDataFolder"],
      };

  const boundary = "superappweb_boundary";
  const multipartBody = [
    `--${boundary}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    JSON.stringify(metadata),
    `--${boundary}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    JSON.stringify(payload),
    `--${boundary}--`,
    "",
  ].join("\r\n");

  const method = existing ? "PATCH" : "POST";
  const url = existing
    ? `${DRIVE_UPLOAD}/${existing.id}?uploadType=multipart`
    : `${DRIVE_UPLOAD}?uploadType=multipart`;

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to save Google Drive file (${response.status}): ${message.slice(0, 160)}`);
  }
}
