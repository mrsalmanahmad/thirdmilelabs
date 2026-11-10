import type { ReactNode } from "react";

export function PageHeader({ title, children, sub }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {sub && <p className="mt-2 text-sm text-muted">{sub}</p>}
      </div>
      {children && <div className="flex gap-3">{children}</div>}
    </div>
  );
}

export function Flash({ saved, error }: { saved?: string; error?: string }) {
  if (error) return <p className="mb-6 border border-red-400/50 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>;
  if (saved) return <p className="mb-6 border border-white/30 bg-white/5 px-4 py-3 text-sm">Saved. Changes are live on the site.</p>;
  return null;
}

type InputProps = {
  label: string;
  name: string;
  defaultValue?: string | number;
  hint?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  rows?: number;
  multiline?: boolean;
};

export function AdminInput({ label, name, defaultValue, hint, required, type = "text", placeholder, rows = 4, multiline }: InputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        {label}
        {required && <span className="text-white"> *</span>}
      </span>
      {multiline ? (
        <textarea name={name} defaultValue={defaultValue} rows={rows} placeholder={placeholder} required={required} className="input resize-y !text-sm" />
      ) : (
        <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} className="input !text-sm" />
      )}
      {hint && <span className="mt-1.5 block text-xs text-neutral-500">{hint}</span>}
    </label>
  );
}

export function AdminCheckbox({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-white" />
      {label}
    </label>
  );
}

export function Badge({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "solid" }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
        tone === "solid" ? "bg-white text-ink" : "border border-line-strong text-muted"
      }`}
    >
      {children}
    </span>
  );
}
