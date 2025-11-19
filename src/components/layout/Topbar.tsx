import { useAuth } from "../../hooks/useAuth";

export function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar__left"></div>
      <div className="topbar__right">
        <span className="topbar__user">{user?.email}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
