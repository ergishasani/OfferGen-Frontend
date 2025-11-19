// src/router/routePaths.ts
export const routes = {
  home: "/",
  features: "/features",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",

  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",

  dashboardRoot: "/dashboard",
  invoices: "/dashboard/invoices",
  invoicesCreate: "/dashboard/invoices/create",
  invoiceDetail: (id: string) => `/dashboard/invoices/${id}`,
  invoiceEdit: (id: string) => `/dashboard/invoices/${id}/edit`,

  quotes: "/dashboard/quotes",
  quotesCreate: "/dashboard/quotes/create",
  quoteDetail: (id: string) => `/dashboard/quotes/${id}`,
  quoteEdit: (id: string) => `/dashboard/quotes/${id}/edit`,

  clients: "/dashboard/clients",
  clientsCreate: "/dashboard/clients/create",
  clientDetail: (id: string) => `/dashboard/clients/${id}`,
  clientEdit: (id: string) => `/dashboard/clients/${id}/edit`,

  projects: "/dashboard/projects",
  projectsCreate: "/dashboard/projects/create",
  projectDetail: (id: string) => `/dashboard/projects/${id}`,
  projectEdit: (id: string) => `/dashboard/projects/${id}/edit`,

  inventory: "/dashboard/inventory",
  inventoryCreate: "/dashboard/inventory/create",
  inventoryDetail: (id: string) => `/dashboard/inventory/${id}`,
  inventoryEdit: (id: string) => `/dashboard/inventory/${id}/edit`,

  reports: "/dashboard/reports",

  settingsGeneral: "/dashboard/settings",
  settingsProfile: "/dashboard/settings/profile",
  settingsTeam: "/dashboard/settings/team",
  settingsInvoices: "/dashboard/settings/invoices",
  settingsIntegrations: "/dashboard/settings/integrations",

  configurator: "/dashboard/configurator",
  calendar: "/dashboard/calendar",
};
