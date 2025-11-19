import { NavLink } from "react-router-dom";
import { routes } from "../../router/routePaths";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">OfferGen</div>
      <nav className="sidebar__nav">
        <NavLink to={routes.dashboardRoot} end>
          Dashboard
        </NavLink>
        <NavLink to={routes.invoices}>Invoices</NavLink>
        <NavLink to={routes.quotes}>Quotes</NavLink>
        <NavLink to={routes.clients}>Clients</NavLink>
        <NavLink to={routes.projects}>Projects</NavLink>
        <NavLink to={routes.inventory}>Inventory</NavLink>
        <NavLink to={routes.reports}>Reports</NavLink>
        <NavLink to={routes.settingsGeneral}>Settings</NavLink>
      </nav>
    </aside>
  );
}
