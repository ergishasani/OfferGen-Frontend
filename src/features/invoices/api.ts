// src/features/invoices/api.ts
import { apiClient } from "../../lib/apiClient";
import type {
  Invoice,
  InvoiceListParams,
  InvoiceListResponse,
  InvoiceStatus,
} from "./types";

export async function listInvoices(
  params: InvoiceListParams = {}
): Promise<InvoiceListResponse> {
  const response = await apiClient.get<InvoiceListResponse>("/invoices", {
    params,
  });

  return response.data;
}

export async function getInvoice(id: string): Promise<Invoice> {
  const response = await apiClient.get<{ data: Invoice }>(`/invoices/${id}`);
  return response.data.data;
}

// These shapes match your backend validation (clientId, projectId, currency, lines, totals, status)
export interface InvoiceLine {
  [key: string]: unknown;
}

export interface CreateInvoiceInput {
  clientId?: string | null;
  projectId?: string | null;
  currency?: string;
  status?: InvoiceStatus;
  lines?: InvoiceLine[];
  totals?: InvoiceTotals;
}

export type UpdateInvoiceInput = Partial<CreateInvoiceInput>;

export async function createInvoice(
  payload: CreateInvoiceInput
): Promise<Invoice> {
  const response = await apiClient.post<{ data: Invoice }>(
    "/invoices",
    payload
  );
  return response.data.data;
}

export async function updateInvoice(
  id: string,
  payload: UpdateInvoiceInput
): Promise<Invoice> {
  const response = await apiClient.put<{ data: Invoice }>(
    `/invoices/${id}`,
    payload
  );
  return response.data.data;
}

export async function deleteInvoice(id: string): Promise<void> {
  await apiClient.delete(`/invoices/${id}`);
}

// re-export to avoid circular import in CreateInvoiceInput
import type { InvoiceTotals } from "./types";
