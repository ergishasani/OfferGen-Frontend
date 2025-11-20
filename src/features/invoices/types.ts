// src/features/invoices/types.ts

// These match your backend Prisma enum `InvoiceStatus`
export type InvoiceStatus = "draft" | "sent" | "approved" | "paid" | "void";

export interface InvoiceTotals {
  net?: number;
  vat?: number;
  total?: number;
  // keep flexible for future extensions
  [key: string]: number | undefined;
}

export interface InvoiceClientSummary {
  id: string;
  name: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string | null;
  status: InvoiceStatus;
  currency: string;
  totals: InvoiceTotals | null;
  createdAt: string; // issue date (backend createdAt)
  dueDate?: string | null; // optional if you add it later
  client: InvoiceClientSummary | null;
}

export interface InvoiceListParams {
  clientId?: string;
  projectId?: string;
  status?: InvoiceStatus;
  cursor?: string;
  limit?: number;
}

export interface InvoiceListResponse {
  data: Invoice[];
  nextCursor?: string | null;
}
