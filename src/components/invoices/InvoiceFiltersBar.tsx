// src/components/invoices/InvoiceFiltersBar.tsx
import { Search, Filter, Download } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { StatusFilter } from "../../pages/invoices/InvoicesListPage";

interface InvoiceFiltersBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  onCreateInvoice: () => void;
  onExport: () => void;
}

export function InvoiceFiltersBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onCreateInvoice,
  onExport,
}: InvoiceFiltersBarProps) {
  return (
    <div className="invoices-filters">
      <div className="invoices-filters__left">
        <div className="invoices-filters__search">
          <Search className="invoices-filters__search-icon" size={18} />
          <Input
            label=""
            type="text"
            placeholder="Search by invoice number or client..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="invoices-filters__search-input"
          />
        </div>
      </div>

      <div className="invoices-filters__right">
        {/* Filter icon button (no extra logic yet, purely UI) */}
        <button
          type="button"
          className="invoices-filters__icon-button"
          aria-label="Filter invoices"
        >
          <Filter size={16} />
        </button>

        <div className="invoices-filters__status">
          <label htmlFor="invoice-status-filter" className="sr-only">
            Filter by status
          </label>
          <select
            id="invoice-status-filter"
            className="invoices-filters__status-select"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={onExport}
          className="invoices-filters__export"
        >
          <Download size={16} />
          <span>Export</span>
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={onCreateInvoice}
          className="invoices-filters__create"
        >
          + Create Invoice
        </Button>
      </div>
    </div>
  );
}
