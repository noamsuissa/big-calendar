import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Returns whether the document is in dark mode (html has class "dark").
 * Used by CalendarRoot and by portaled components (dialogs) so they get the same theme.
 */
export function useIsDark() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    if (typeof document === "undefined") return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

/**
 * Wraps calendar UI (header, calendar, settings) so design tokens and dark mode
 * are scoped to this root and don't override the host app's styles.
 * Use once at the top level that contains all calendar-related content.
 */
export function CalendarRoot({ children, className }) {
  const isDark = useIsDark();
  return (
    <div className={cn("cal-root", isDark && "cal-dark", className)}>
      {children}
    </div>
  );
}
