"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Thin top progress bar: starts the moment an internal link is clicked,
 * completes when the new route has rendered.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const loading = useRef(false);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      loading.current = true;
      setState("loading");
    }
    // Capture phase: next/link calls preventDefault on its own click handler.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!loading.current) return;
    loading.current = false;
    setState("done");
    const t = setTimeout(() => setState("idle"), 500);
    return () => clearTimeout(t);
  }, [pathname]);

  return <div aria-hidden="true" className="nav-progress" data-state={state} />;
}
