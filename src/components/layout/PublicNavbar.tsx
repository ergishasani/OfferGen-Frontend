import { Link, NavLink } from "react-router-dom";
import { routes } from "../../router/routePaths";

export function PublicNavbar() {
  return (
    <header className="public-navbar">
      <div className="public-navbar__inner">
        <Link to={routes.home} className="public-navbar__logo">
          OfferGen
        </Link>
        <nav className="public-navbar__nav">
          <NavLink to={routes.features}>Features</NavLink>
          <NavLink to={routes.pricing}>Pricing</NavLink>
          <NavLink to={routes.about}>About</NavLink>
          <NavLink to={routes.contact}>Contact</NavLink>
        </nav>
        <div className="public-navbar__actions">
          <Link to={routes.login}>Log in</Link>
          <Link to={routes.register} className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
