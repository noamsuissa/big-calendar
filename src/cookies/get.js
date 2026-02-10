import { THEMES_VALUES } from "@/constants/theme.const";
import { DEFAULT_VALUES } from "@/constants/cookies.const";
import { THEME_COOKIE_NAME } from "@/constants/cookies.const";

export function getTheme() {
  if (typeof document === "undefined") {
    return DEFAULT_VALUES.theme;
  }
  
  const cookies = document.cookie.split(";");
  const themeCookie = cookies.find(cookie => cookie.trim().startsWith(`${THEME_COOKIE_NAME}=`));
  
  if (!themeCookie) {
    return DEFAULT_VALUES.theme;
  }
  
  const theme = themeCookie.split("=")[1]?.trim();
  if (!THEMES_VALUES.includes(theme)) {
    return DEFAULT_VALUES.theme;
  }
  
  return theme;
}
