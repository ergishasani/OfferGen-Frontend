// src/components/invoices/InvoiceStatusBadge.tsx
import type { InvoiceStatus } from "../../features/invoices/types";
import Badge from "../ui/Badge";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

const LABELS: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  approved: "Approved",
  paid: "Paid",
  void: "Void",
};

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  let variant: "default" | "success" | "warning" | "danger" | "muted" =
    "default";

  switch (status) {
    case "paid":
      variant = "success";
      break;
    case "sent":
      variant = "warning";
      break;
    case "approved":
      variant = "default";
      break;
    case "void":
      variant = "muted";
      break;
    case "draft":
    default:
      variant = "muted";
      break;
  }

  return <Badge variant={variant}>{LABELS[status]}</Badge>;
}
