import { Outlet } from "react-router-dom";
import { PublicNavbar } from "../components/layout/PublicNavbar";
import { PublicFooter } from "../components/layout/PublicFooter";

export function PublicLayout() {
  return (
    <div className="public-layout">
      <PublicNavbar />
      <main className="public-layout__content">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
