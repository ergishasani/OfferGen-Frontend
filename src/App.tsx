import { useRoutes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { PublicLayout } from "./layouts/PublicLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";

// Public pages
import { HomePage } from "./pages/public/HomePage";
import { FeaturesPage } from "./pages/public/FeaturesPage";
import { PricingPage } from "./pages/public/PricingPage";
import { AboutPage } from "./pages/public/AboutPage";
import { ContactPage } from "./pages/public/ContactPage";

// Auth pages
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";

// Dashboard
import { DashboardHomePage } from "./pages/dashboard/DashboardHomePage";

// Invoices
import { InvoicesListPage } from "./pages/invoices/InvoicesListPage";
import { InvoiceCreatePage } from "./pages/invoices/InvoiceCreatePage";
import { InvoiceDetailPage } from "./pages/invoices/InvoiceDetailPage";
import { InvoiceEditPage } from "./pages/invoices/InvoiceEditPage";

// Quotes
import { QuotesListPage } from "./pages/quotes/QuotesListPage";
import { QuoteCreatePage } from "./pages/quotes/QuoteCreatePage";
import { QuoteDetailPage } from "./pages/quotes/QuoteDetailPage";
import { QuoteEditPage } from "./pages/quotes/QuoteEditPage";

// Clients
import { ClientsListPage } from "./pages/clients/ClientsListPage";
import { ClientCreatePage } from "./pages/clients/ClientCreatePage";
import { ClientDetailPage } from "./pages/clients/ClientDetailPage";
import { ClientEditPage } from "./pages/clients/ClientEditPage";

// Projects
import { ProjectsListPage } from "./pages/projects/ProjectsListPage";
import { ProjectCreatePage } from "./pages/projects/ProjectCreatePage";
import { ProjectDetailPage } from "./pages/projects/ProjectDetailPage";
import { ProjectEditPage } from "./pages/projects/ProjectEditPage";

// Inventory
import { InventoryListPage } from "./pages/inventory/InventoryListPage";
import { InventoryCreatePage } from "./pages/inventory/InventoryCreatePage";
import { InventoryDetailPage } from "./pages/inventory/InventoryDetailPage";
import { InventoryEditPage } from "./pages/inventory/InventoryEditPage";

// Reports
import { ReportsDashboardPage } from "./pages/reports/ReportsDashboardPage";

// Settings
import { SettingsGeneralPage } from "./pages/settings/SettingsGeneralPage";
import { SettingsProfilePage } from "./pages/settings/SettingsProfilePage";
import { SettingsTeamPage } from "./pages/settings/SettingsTeamPage";
import { SettingsInvoicesPage } from "./pages/settings/SettingsInvoicesPage";
import { SettingsIntegrationsPage } from "./pages/settings/SettingsIntegrationsPage";

// Advanced
import { ConfiguratorPage } from "./pages/configurator/ConfiguratorPage";
import { CalendarPage } from "./pages/calendar/CalendarPage";

function AppRoutes() {
  const element = useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "features", element: <FeaturesPage /> },
        { path: "pricing", element: <PricingPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "contact", element: <ContactPage /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <DashboardHomePage /> },

        { path: "invoices", element: <InvoicesListPage /> },
        { path: "invoices/create", element: <InvoiceCreatePage /> },
        { path: "invoices/:id", element: <InvoiceDetailPage /> },
        { path: "invoices/:id/edit", element: <InvoiceEditPage /> },

        { path: "quotes", element: <QuotesListPage /> },
        { path: "quotes/create", element: <QuoteCreatePage /> },
        { path: "quotes/:id", element: <QuoteDetailPage /> },
        { path: "quotes/:id/edit", element: <QuoteEditPage /> },

        { path: "clients", element: <ClientsListPage /> },
        { path: "clients/create", element: <ClientCreatePage /> },
        { path: "clients/:id", element: <ClientDetailPage /> },
        { path: "clients/:id/edit", element: <ClientEditPage /> },

        { path: "projects", element: <ProjectsListPage /> },
        { path: "projects/create", element: <ProjectCreatePage /> },
        { path: "projects/:id", element: <ProjectDetailPage /> },
        { path: "projects/:id/edit", element: <ProjectEditPage /> },

        { path: "inventory", element: <InventoryListPage /> },
        { path: "inventory/create", element: <InventoryCreatePage /> },
        { path: "inventory/:id", element: <InventoryDetailPage /> },
        { path: "inventory/:id/edit", element: <InventoryEditPage /> },

        { path: "reports", element: <ReportsDashboardPage /> },

        { path: "settings", element: <SettingsGeneralPage /> },
        { path: "settings/profile", element: <SettingsProfilePage /> },
        { path: "settings/team", element: <SettingsTeamPage /> },
        { path: "settings/invoices", element: <SettingsInvoicesPage /> },
        {
          path: "settings/integrations",
          element: <SettingsIntegrationsPage />,
        },

        { path: "configurator", element: <ConfiguratorPage /> },
        { path: "calendar", element: <CalendarPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return element;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
