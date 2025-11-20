// src/components/invoices/InvoicesTable.tsx
import type { Invoice } from "../../features/invoices/types";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import Table from "../ui/Table";

interface InvoicesTableProps {
  invoices: Invoice[];
  onRowClick?: (invoice: Invoice) => void;
}

export function InvoicesTable({ invoices, onRowClick }: InvoicesTableProps) {
  const handleRowClick = (invoice: Invoice) => {
    if (onRowClick) {
      onRowClick(invoice);
    }
  };

  return (
    <div className="invoices-table">
      <Table>
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const amount =
              invoice.totals?.total ??
              invoice.totals?.net ??
              0;

            return (
              <tr
                key={invoice.id}
                className={onRowClick ? "invoices-table__row--clickable" : ""}
                onClick={() => handleRowClick(invoice)}
              >
                <td className="invoices-table__cell-link">
                  {invoice.invoiceNumber ?? "—"}
                </td>
                <td>{invoice.client?.name ?? "—"}</td>
                <td>
                  {amount.toLocaleString(undefined, {
                    style: "currency",
                    currency: invoice.currency || "EUR",
                  })}
                </td>
                <td>
                  <InvoiceStatusBadge status={invoice.status} />
                </td>
                <td>{new Date(invoice.createdAt).toISOString().slice(0, 10)}</td>
                <td>
                  {invoice.dueDate
                    ? new Date(invoice.dueDate).toISOString().slice(0, 10)
                    : "—"}
                </td>
                <td>
                  <button
                    type="button"
                    className="invoices-table__actions"
                    onClick={(event) => {
                      event.stopPropagation();
                      // TODO: open row actions menu later
                    }}
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
