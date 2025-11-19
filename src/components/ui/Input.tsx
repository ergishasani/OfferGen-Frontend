// src/components/ui/Input.tsx
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="field">
      {label && <label className="field__label">{label}</label>}
      <input
        className={`field__input${error ? " field__input--error" : ""}`}
        {...props}
      />
      {error && <div className="field__error">{error}</div>}
    </div>
  );
}
