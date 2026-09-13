"use client";

import { useId, useRef, useState } from "react";
import { CopyCommand } from "./copy-command";

export interface InstallTab {
  /** short label shown on the tab, e.g. "npm" */
  label: string;
  /** the exact command, shown and copied verbatim */
  command: string;
  /** optional hint shown at the right end of the tab bar */
  note?: string;
}

/**
 * Tabbed command block. Tabs follow the WAI-ARIA tabs pattern (arrow keys
 * move, Home/End jump, only the active tab is in the tab order). The panel
 * is a CopyCommand, remounted per tab so the copy state resets.
 */
export function InstallBlock({
  tabs,
  defaultIndex = 0,
  className = "",
}: {
  tabs: InstallTab[];
  defaultIndex?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(defaultIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const active = tabs[index] ?? tabs[0];

  const focusTab = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setIndex(n);
    tabRefs.current[n]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
    }
  };

  return (
    <div className={`install ${className}`}>
      <div className="install__bar">
        <div role="tablist" aria-label="Install method" className="install__tabs">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={i === index}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="install__tab"
            >
              {t.label}
            </button>
          ))}
        </div>
        {active.note ? (
          <span className="label install__note">{active.note}</span>
        ) : null}
      </div>
      <CopyCommand
        key={active.label}
        command={active.command}
        size="lg"
        role="tabpanel"
        id={`${baseId}-panel`}
        labelledBy={`${baseId}-tab-${index}`}
      />
    </div>
  );
}
