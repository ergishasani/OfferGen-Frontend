// src/features/auth/types.ts

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterPayload {
  tenantName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  tenant: {
    id: string;
    name: string;
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

// src/features/dashboard/types.ts

export interface DashboardSummary {
  monthlyRevenue: number;
  outstandingAmount: number;
  outstandingCount: number;
  projectsInProgress: number;
  inventoryAlerts: number;
}

export interface RevenueVsExpensesPoint {
  month: string;
  revenue: number;
  expenses: number;
}

export interface RevenueTrendPoint {
  month: string;
  revenue: number;
}

export type InvoiceStatus = "draft" | "sent" | "approved" | "paid" | "void";

export interface DashboardInvoiceRow {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
  date: string; // ISO
}

export interface DashboardResponse {
  summary: DashboardSummary;
  charts: {
    revenueVsExpenses: RevenueVsExpensesPoint[];
    revenueTrend: RevenueTrendPoint[];
  };
  recentInvoices: DashboardInvoiceRow[];
}
