import type { ReactNode } from "react";

type Props = {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  children?: ReactNode;
} & ({ as?: "input"; type?: string; placeholder?: string; defaultValue?: string } | { as: "textarea"; rows?: number; placeholder?: string; defaultValue?: string });

export function Field(props: Props) {
  const { label, name, error, hint, required } = props;
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="label-mono mb-2.5 block text-muted">
        {label}
        {required && <span className="text-white"> *</span>}
      </label>
      {props.children ??
        (props.as === "textarea" ? (
          <textarea
            id={id}
            name={name}
            rows={props.rows ?? 5}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            required={required}
            className="input resize-y"
            aria-invalid={!!error}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={props.type ?? "text"}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            required={required}
            className="input"
            aria-invalid={!!error}
          />
        ))}
      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

/** Invisible field that bots fill in and humans don't. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
