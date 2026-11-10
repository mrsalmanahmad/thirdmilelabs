"use client";

import type { ReactNode } from "react";

/** Submit button that asks for confirmation before running a destructive action. */
export function ConfirmButton({ message, children, className = "" }: { message: string; children: ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      className={className || "text-sm text-red-400 hover:underline"}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
