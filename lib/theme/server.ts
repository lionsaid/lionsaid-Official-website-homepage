import { cookies } from "next/headers";

import { DEFAULT_THEME_MODE, THEME_MODES, type ThemeMode } from "./types";

const THEME_COOKIE = "theme";

function isThemeMode(value: string | undefined): value is ThemeMode {
  return !!value && (THEME_MODES as readonly string[]).includes(value);
}

export async function getThemeMode(): Promise<ThemeMode> {
  const mode = (await cookies()).get(THEME_COOKIE)?.value;
  if (isThemeMode(mode)) return mode;
  return DEFAULT_THEME_MODE;
}
