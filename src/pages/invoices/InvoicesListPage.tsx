// src/pages/invoices/InvoicesListPage.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoicesList } from "../../features/invoices/hooks";
import type { Invoice } from "../../features/invoices/types";
import { InvoiceFiltersBar } from "../../components/invoices/InvoiceFiltersBar";
import { InvoicesTable } from "../../components/invoices/InvoicesTable";
import { routes } from "../../router/routePaths";

export type StatusFilter = "all" | "paid" | "pending" | "overdue" | "draft";

interface InvoiceStats {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
}

interface ErrorWithResponse {
  response?: {
    status?: number;
  };
}

function hasResponseStatus(error: unknown): error is ErrorWithResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object"
  );
}

function isOverdue(invoice: Invoice, now: Date): boolean {
  if (!invoice.dueDate) return false;
  const due = new Date(invoice.dueDate);
  return due < now && invoice.status !== "paid" && invoice.status !== "void";
}

function computeStats(invoices: Invoice[]): InvoiceStats {
  const now = new Date();

  return invoices.reduce<InvoiceStats>(
    (acc, invoice) => {
      acc.total += 1;

      if (invoice.status === "paid") {
        acc.paid += 1;
      } else if (isOverdue(invoice, now)) {
        acc.overdue += 1;
      } else if (invoice.status !== "void") {
        acc.pending += 1;
      }

      return acc;
    },
    { total: 0, paid: 0, pending: 0, overdue: 0 }
  );
}

export function InvoicesListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const { data, isLoading, isError, error } = useInvoicesList({});

  const invoices = useMemo(() => data?.data ?? [], [data]);

  const filteredInvoices = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const now = new Date();

    return invoices.filter((invoice) => {
      const matchesSearch =
        term.length === 0 ||
        (invoice.invoiceNumber ?? "").toLowerCase().includes(term) ||
        (invoice.client?.name ?? "").toLowerCase().includes(term);

      let matchesStatus = true;

      if (statusFilter === "paid") {
        matchesStatus = invoice.status === "paid";
      } else if (statusFilter === "draft") {
        matchesStatus = invoice.status === "draft";
      } else if (statusFilter === "pending") {
        matchesStatus =
          invoice.status !== "paid" &&
          invoice.status !== "void" &&
          !isOverdue(invoice, now);
      } else if (statusFilter === "overdue") {
        matchesStatus = isOverdue(invoice, now);
      } // "all" => no extra filter

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchTerm, statusFilter]);

  const stats = useMemo(() => computeStats(invoices), [invoices]);

  // Friendly error message
  let errorMessage: string | null = null;
  if (isError) {
    errorMessage = "Something went wrong while loading invoices.";

    let status: number | undefined;
    if (hasResponseStatus(error)) {
      const maybeStatus = error.response?.status;
      if (typeof maybeStatus === "number") {
        status = maybeStatus;
      }
    }

    if (status === 401) {
      errorMessage =
        "You’re not authorized to view invoices. Please log in again.";
    } else if (status && status >= 500) {
      errorMessage =
        "The server encountered an issue while loading invoices. Please try again later.";
    }
  }

  const handleCreateInvoice = () => {
    navigate(routes.invoicesCreate);
  };

  const handleExport = () => {
    // TODO: implement export (CSV/PDF) when backend is ready
  };

  const handleRowClick = (invoice: Invoice) => {
    if (!invoice.id) return;
    navigate(routes.invoiceDetail(invoice.id));
  };

  return (
    <div className="invoices-page">
      <div className="invoices-page__header">
        <div>
          <h1 className="invoices-page__title">Invoices</h1>
          <p className="invoices-page__subtitle">
            Manage and track all your invoices
          </p>
        </div>
      </div>

      <InvoiceFiltersBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onCreateInvoice={handleCreateInvoice}
        onExport={handleExport}
      />

      <div className="invoices-page__stats">
        <div className="invoices-page__stat-card">
          <span className="invoices-page__stat-label">Total Invoices</span>
          <span className="invoices-page__stat-value">{stats.total}</span>
        </div>
        <div className="invoices-page__stat-card">
          <span className="invoices-page__stat-label">Paid</span>
          <span className="invoices-page__stat-value">{stats.paid}</span>
        </div>
        <div className="invoices-page__stat-card">
          <span className="invoices-page__stat-label">Pending</span>
          <span className="invoices-page__stat-value">{stats.pending}</span>
        </div>
        <div className="invoices-page__stat-card">
          <span className="invoices-page__stat-label">Overdue</span>
          <span className="invoices-page__stat-value invoices-page__stat-value--danger">
            {stats.overdue}
          </span>
        </div>
      </div>

      <div className="invoices-page__content">
        {isLoading && (
          <div className="invoices-page__state">Loading invoices...</div>
        )}

        {isError && errorMessage && (
          <div className="invoices-page__state invoices-page__state--error">
            {errorMessage}
          </div>
        )}

        {!isLoading && !isError && filteredInvoices.length === 0 && (
          <div className="invoices-page__state">
            No invoices match your current filters.
          </div>
        )}

        {!isLoading && !isError && filteredInvoices.length > 0 && (
          <InvoicesTable
            invoices={filteredInvoices}
            onRowClick={handleRowClick}
          />
        )}
      </div>
    </div>
  );
}
