import { cookies } from "next/headers";

export const SYSTEM_JWT_COOKIE = process.env.SYSTEM_JWT_COOKIE ?? "lionsaid_jwt";

const isProd = process.env.NODE_ENV === "production";

export async function getSessionToken(): Promise<string | undefined> {
  try {
    const store = await cookies();
    return store.get(SYSTEM_JWT_COOKIE)?.value;
  } catch (error) {
    return undefined;
  }
}

export async function setSessionToken(token: string, expiresInSeconds?: number) {
  try {
    const cookieStore = await cookies();
    const maxAge = expiresInSeconds ?? 60 * 60 * 24 * 7; // default 7 days
    cookieStore.set(SYSTEM_JWT_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      maxAge,
      path: "/",
    });
  } catch (error) {
    console.error("[setSessionToken]", error);
  }
}

export async function clearSessionToken() {
  try {
    const store = await cookies();
    store.delete(SYSTEM_JWT_COOKIE);
  } catch (error) {
    console.error("[clearSessionToken]", error);
  }
}
