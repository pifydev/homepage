"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CopyState = "idle" | "copied" | "failed";

/**
 * Clipboard copy with three states. When the Clipboard API is unavailable
 * (insecure context, old browser) the fallback selects the text so a manual
 * Ctrl/Cmd+C still works, and the button says so. Every copy restarts the
 * reset timer, even when the state does not change.
 */
export function useCopy(resetMs = 2000) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | null>(null);

  const schedule = useCallback(
    (next: CopyState) => {
      if (timer.current !== null) window.clearTimeout(timer.current);
      setState(next);
      timer.current = window.setTimeout(() => {
        timer.current = null;
        setState("idle");
      }, resetMs);
    },
    [resetMs],
  );

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string, fallbackEl?: HTMLElement | null) => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("no clipboard");
        await navigator.clipboard.writeText(text);
        schedule("copied");
      } catch {
        if (fallbackEl) {
          const range = document.createRange();
          range.selectNodeContents(fallbackEl);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
        schedule("failed");
      }
    },
    [schedule],
  );

  return { state, copy };
}

export function copyLabel(state: CopyState) {
  if (state === "copied") return "Copied";
  if (state === "failed") return "Select and copy";
  return "Copy";
}

export function copyAnnouncement(state: CopyState) {
  if (state === "copied") return "Command copied to clipboard";
  if (state === "failed")
    return "Clipboard unavailable, command selected for manual copy";
  return "";
}
