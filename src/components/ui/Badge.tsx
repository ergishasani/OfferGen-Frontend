// src/components/ui/Badge.tsx
import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

function Badge({
  variant = "default",
  children,
  className = "",
  ...rest
}: BadgeProps) {
  const classes = ["badge", variant ? `badge--${variant}` : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
