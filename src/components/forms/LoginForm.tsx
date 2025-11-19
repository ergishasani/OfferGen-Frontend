// src/components/forms/LoginForm.tsx
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { routes } from "../../router/routePaths";

interface LocationState {
  from?: string;
}

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Currently rememberMe is visual only – login still works fully
      await login(email, password);

      const state = location.state as LocationState | null;
      const redirectTo = state?.from ?? routes.dashboardRoot;
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      let message = "Invalid email or password";
      if (err instanceof Error && err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="auth-form__error">{error}</div>}

      <div className="auth-form__field-group">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="auth-form__field-group">
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="auth-form__row">
        <label className="auth-form__checkbox">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>Remember me for 30 days</span>
        </label>

        <button
          type="button"
          className="auth-form__link-button"
          onClick={() => navigate(routes.forgotPassword)}
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        Sign In
      </Button>

      <div className="auth-form__signup">
        <span>Don&apos;t have an account?</span>{" "}
        <Link to={routes.register}>Sign up for free</Link>
      </div>
    </form>
  );
}
