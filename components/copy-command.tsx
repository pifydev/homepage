"use client";

import { useRef } from "react";
import { copyAnnouncement, copyLabel, useCopy } from "./use-copy";

/**
 * One command line: the indigo cell stands in for the `$` prompt (it marks
 * "the thing you add"), the command is shown verbatim, and a copy button
 * sits at the right edge.
 */
export function CopyCommand({
  command,
  size = "md",
  className = "",
  id,
  labelledBy,
  role,
}: {
  command: string;
  size?: "md" | "lg";
  className?: string;
  id?: string;
  labelledBy?: string;
  role?: string;
}) {
  const { state, copy } = useCopy();
  const codeRef = useRef<HTMLElement | null>(null);
  const label = copyLabel(state);

  return (
    <div
      className={`cmd ${size === "lg" ? "cmd--lg" : ""} ${className}`}
      id={id}
      aria-labelledby={labelledBy}
      role={role}
    >
      <span aria-hidden="true" className="cell cmd__prompt" />
      <pre className="cmd__pre">
        <code ref={codeRef} className="cmd__code">
          {command}
        </code>
      </pre>
      <button
        type="button"
        className="cmd__copy"
        data-state={state}
        onClick={() => copy(command, codeRef.current)}
        aria-label={state === "idle" ? `Copy command: ${command}` : label}
      >
        {label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copyAnnouncement(state)}
      </span>
    </div>
  );
}
