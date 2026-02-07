import { clearSessionToken } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await clearSessionToken();
  const url = new URL("/", request.url);
  return NextResponse.redirect(url);
}

