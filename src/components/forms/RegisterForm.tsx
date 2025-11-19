// src/components/forms/RegisterForm.tsx
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { routes } from "../../router/routePaths";

export function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!acceptTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({
        tenantName: companyName,
        email,
        password,
        firstName,
        lastName,
      });

      // After successful registration, go straight to dashboard
      navigate(routes.dashboardRoot, { replace: true });
    } catch (err: unknown) {
      let message = "Registration failed";
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

      <div className="auth-form__row auth-form__row--two-cols">
        <div className="auth-form__field-group">
          <Input
            label="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="auth-form__field-group">
          <Input
            label="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="auth-form__field-group">
        <Input
          label="Work Email"
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
          label="Company Name"
          placeholder="Your Company"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="auth-form__row auth-form__row--two-cols">
        <div className="auth-form__field-group">
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="auth-form__field-group">
          <Input
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="auth-form__row auth-form__row--terms">
        <label className="auth-form__checkbox">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          <span>
            I agree to the{" "}
            <a href="#" className="auth-page__link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="auth-page__link">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        Create Account
      </Button>

      <div className="auth-form__signup">
        <span>Already have an account?</span>{" "}
        <Link to={routes.login}>Sign in</Link>
      </div>
    </form>
  );
}
