"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

export type ThemeChoice = "system" | "light" | "dark";

const STORAGE_KEY = "pify-theme";
const CHANGE_EVENT = "pify-theme-change";
const CHOICES: { value: ThemeChoice; label: string }[] = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/* In-memory fallback for browsers where storage is unavailable. */
let memoryChoice: ThemeChoice = "system";

function isChoice(v: unknown): v is ThemeChoice {
  return v === "light" || v === "dark" || v === "system";
}

function readChoice(): ThemeChoice {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (isChoice(v)) return v;
  } catch {
    /* storage unavailable */
  }
  return memoryChoice;
}

const getServerSnapshot = (): ThemeChoice => "system";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function writeChoice(next: ThemeChoice) {
  memoryChoice = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode: the choice lives in memory for this page */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Mirrors the inline script in app/layout.tsx. */
export function applyTheme(choice: ThemeChoice) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = choice === "dark" || (choice === "system" && prefersDark);
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute("content", dark ? "#09090b" : "#ffffff"));
}

/**
 * Three-state theme switch (Auto / Light / Dark) following the WAI-ARIA
 * radio group pattern: one tab stop, arrow keys move the selection. State
 * lives outside React so the header and footer instances stay in sync.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const choice = useSyncExternalStore(subscribe, readChoice, getServerSnapshot);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    applyTheme(choice);
    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [choice]);

  const move = (from: number, delta: number) => {
    const n = (from + delta + CHOICES.length) % CHOICES.length;
    writeChoice(CHOICES[n].value);
    refs.current[n]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        move(i, 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        move(i, -1);
        break;
      case "Home":
        e.preventDefault();
        move(0, 0);
        break;
      case "End":
        e.preventDefault();
        move(CHOICES.length - 1, 0);
        break;
    }
  };

  return (
    <div role="radiogroup" aria-label="Color theme" className={`theme-toggle ${className}`}>
      {CHOICES.map((c, i) => {
        const checked = choice === c.value;
        return (
          <button
            key={c.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => writeChoice(c.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="theme-toggle__option"
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
