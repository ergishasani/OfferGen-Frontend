// src/pages/dashboard/DashboardHomePage.tsx
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { useAuth } from "../../hooks/useAuth";
import { getDashboard } from "../../features/dashboard/api";
import type { DashboardResponse } from "../../features/dashboard/types";
import { Button } from "../../components/ui/Button";
import { Loader } from "../../components/ui/Loader";
import { routes } from "../../router/routePaths";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

function formatCurrency(value: number, currency = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateIso: string) {
  const d = new Date(dateIso);
  return d.toISOString().slice(0, 10);
}

export function DashboardHomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await getDashboard();
        if (mounted) {
          setData(res);
          setError(null);
        }
      } catch {
        if (mounted) {
          setError("Failed to load dashboard data.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page__center">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="dashboard-page__center">
        <p>{error ?? "No dashboard data available."}</p>
      </div>
    );
  }

  const { summary, charts, recentInvoices } = data;

  const revenueVsExpensesData = {
    labels: charts.revenueVsExpenses.map((p) => p.month),
    datasets: [
      {
        label: "Revenue",
        data: charts.revenueVsExpenses.map((p) => p.revenue),
      },
      {
        label: "Expenses",
        data: charts.revenueVsExpenses.map((p) => p.expenses),
      },
    ],
  };

  const revenueTrendData = {
    labels: charts.revenueTrend.map((p) => p.month),
    datasets: [
      {
        label: "Revenue",
        data: charts.revenueTrend.map((p) => p.revenue),
      },
    ],
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <div>
          <h1 className="dashboard-page__title">Dashboard</h1>
          <p className="dashboard-page__subtitle">
            Welcome back, {user?.name ?? "there"}. Here&apos;s what&apos;s
            happening with your business.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate(routes.invoicesCreate)}
        >
          + Create Invoice
        </Button>
      </header>

      {/* Summary cards */}
      <section className="dashboard-page__summary-grid">
        <div className="dashboard-card dashboard-card--primary">
          <div className="dashboard-card__label">Monthly Revenue</div>
          <div className="dashboard-card__value">
            {formatCurrency(summary.monthlyRevenue)}
          </div>
          <div className="dashboard-card__hint">
            vs. last month (placeholder)
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__label">Outstanding Invoices</div>
          <div className="dashboard-card__value">
            {formatCurrency(summary.outstandingAmount)}
          </div>
          <div className="dashboard-card__hint">
            {summary.outstandingCount} invoices pending payment
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__label">Projects in Progress</div>
          <div className="dashboard-card__value">
            {summary.projectsInProgress}
          </div>
          <div className="dashboard-card__hint">
            Active projects in your pipeline
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__label">Inventory Alerts</div>
          <div className="dashboard-card__value">{summary.inventoryAlerts}</div>
          <div className="dashboard-card__hint">
            Low stock items (placeholder)
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="dashboard-page__charts-grid">
        <div className="dashboard-card dashboard-card--panel">
          <div className="dashboard-card__header">
            <h3>Revenue vs Expenses</h3>
          </div>
          <Bar data={revenueVsExpensesData} />
        </div>

        <div className="dashboard-card dashboard-card--panel">
          <div className="dashboard-card__header">
            <h3>Revenue Trend</h3>
          </div>
          <Line data={revenueTrendData} />
        </div>
      </section>

      {/* Recent invoices + quick actions */}
      <section className="dashboard-page__bottom-grid">
        <div className="dashboard-card dashboard-card--panel">
          <div className="dashboard-card__header dashboard-card__header--with-link">
            <h3>Recent Invoices</h3>
            <button
              type="button"
              className="dashboard-link-button"
              onClick={() => navigate(routes.invoices)}
            >
              View All
            </button>
          </div>

          <div className="dashboard-table">
            <div className="dashboard-table__header">
              <span>Invoice #</span>
              <span>Client</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Date</span>
            </div>
            <div className="dashboard-table__body">
              {recentInvoices.map((inv) => (
                <div key={inv.id} className="dashboard-table__row">
                  <button
                    type="button"
                    className="dashboard-link-button"
                    onClick={() => navigate(routes.invoiceDetail(inv.id))}
                  >
                    {inv.invoiceNumber || "—"}
                  </button>
                  <span>{inv.clientName}</span>
                  <span>{formatCurrency(inv.amount)}</span>
                  <span>
                    <span className={`status-pill status-pill--${inv.status}`}>
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </span>
                  </span>
                  <span>{formatDate(inv.date)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-page__quick-actions">
          <div
            className="quick-card"
            onClick={() => navigate(routes.invoicesCreate)}
          >
            <div className="quick-card__title">Create Invoice</div>
            <div className="quick-card__subtitle">Generate a new invoice</div>
          </div>

          <div
            className="quick-card"
            onClick={() => navigate(routes.clientsCreate)}
          >
            <div className="quick-card__title">Add Client</div>
            <div className="quick-card__subtitle">Register new client</div>
          </div>

          <div
            className="quick-card"
            onClick={() => navigate(routes.inventory)}
          >
            <div className="quick-card__title">Check Inventory</div>
            <div className="quick-card__subtitle">View stock levels</div>
          </div>
        </div>
      </section>
    </div>
  );
}
