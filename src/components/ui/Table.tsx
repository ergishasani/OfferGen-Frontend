// src/components/ui/Table.tsx
import type { ReactNode, TableHTMLAttributes } from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

function Table({ children, className = "", ...rest }: TableProps) {
  const classes = ["table", className].filter(Boolean).join(" ");

  return (
    <table className={classes} {...rest}>
      {children}
    </table>
  );
}

export default Table;
