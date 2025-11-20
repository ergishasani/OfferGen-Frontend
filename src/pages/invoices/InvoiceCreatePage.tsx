// src/pages/invoices/InvoiceCreatePage.tsx
import type { FormEvent } from "react"; // <-- TYPE-ONLY IMPORT
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { routes } from "../../router/routePaths";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import type { InvoiceStatus } from "../../features/invoices/types";

interface CreateInvoicePayload {
  clientId?: string | null;
  projectId?: string | null;
  status?: InvoiceStatus;
  currency?: string;
  totals?: {
    total?: number;
  };
}

const STATUS_OPTIONS: InvoiceStatus[] = [
  "draft",
  "sent",
  "approved",
  "paid",
  "void",
];

export function InvoiceCreatePage() {
  const navigate = useNavigate();

  const [clientId, setClientId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [status, setStatus] = useState<InvoiceStatus>("draft");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createInvoiceMutation = useMutation({
    mutationFn: async (payload: CreateInvoicePayload) => {
      const response = await apiClient.post("/invoices", payload);
      return response.data;
    },
    onSuccess: () => {
      navigate(routes.invoices);
    },
    onError: () => {
      setError("Failed to create invoice. Please try again.");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const payload: CreateInvoicePayload = {
      status,
      currency,
    };

    const _clientId = clientId.trim();
    const _projectId = projectId.trim();
    const _amount = amount.trim();

    if (_clientId) payload.clientId = _clientId;
    if (_projectId) payload.projectId = _projectId;

    if (_amount) {
      const totalNum = Number(_amount);
      if (!Number.isNaN(totalNum) && totalNum > 0) {
        payload.totals = { total: totalNum };
      }
    }

    createInvoiceMutation.mutate(payload);
  };

  return (
    <div className="invoices-create-page">
      <div className="invoices-create-page__header">
        <div>
          <h1 className="invoices-create-page__title">Create Invoice</h1>
          <p className="invoices-create-page__subtitle">
            Quickly create a test invoice.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(routes.invoices)}
        >
          Cancel
        </Button>
      </div>

      <form className="invoices-create-page__form" onSubmit={handleSubmit}>
        {error && <div className="invoices-create-page__error">{error}</div>}

        <div className="invoices-create-page__grid">
          <Input
            label="Client ID (optional)"
            type="text"
            placeholder="client UUID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />

          <Input
            label="Project ID (optional)"
            type="text"
            placeholder="project UUID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />

          <div className="invoices-create-page__field">
            <label className="invoices-create-page__label" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="invoices-create-page__select"
              value={status}
              onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Currency"
            type="text"
            placeholder="EUR"
            value={currency}
            onChange={(e) => setCurrency(e.target.value.toUpperCase())}
          />

          <Input
            label="Total Amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="2500.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="invoices-create-page__actions">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(routes.invoices)}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            loading={createInvoiceMutation.status === "pending"} // <-- FIXED
          >
            Save Invoice
          </Button>
        </div>
      </form>
    </div>
  );
}
