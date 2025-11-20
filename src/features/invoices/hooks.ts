// src/features/invoices/hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  type CreateInvoiceInput,
  type UpdateInvoiceInput,
} from "./api";
import type { Invoice, InvoiceListParams, InvoiceListResponse } from "./types";

const INVOICES_QUERY_KEY = ["invoices"];

export function useInvoicesList(params: InvoiceListParams = {}) {
  return useQuery<InvoiceListResponse, Error>({
    queryKey: [...INVOICES_QUERY_KEY, params],
    queryFn: () => listInvoices(params),
  });
}

export function useInvoice(id: string | null) {
  return useQuery<Invoice, Error>({
    queryKey: ["invoice", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Invoice id is required");
      }
      return getInvoice(id);
    },
    enabled: Boolean(id),
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation<Invoice, Error, CreateInvoiceInput>({
    mutationFn: (payload) => createInvoice(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: INVOICES_QUERY_KEY });
    },
  });
}

export function useUpdateInvoice(id: string) {
  const queryClient = useQueryClient();

  return useMutation<Invoice, Error, UpdateInvoiceInput>({
    mutationFn: (payload) => updateInvoice(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: INVOICES_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: ["invoice", id] });
    },
  });
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteInvoice(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: INVOICES_QUERY_KEY });
    },
  });
}
