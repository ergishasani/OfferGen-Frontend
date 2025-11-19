// src/components/forms/ForgotPasswordForm.tsx
import type { FormEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { routes } from "../../router/routePaths";
import { forgotPassword } from "../../features/auth/api";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await forgotPassword({ email });
      setSuccess(
        res.message ||
          "If an account exists for that email, we've sent a password reset link."
      );
    } catch (err: unknown) {
      let message =
        "We couldn't process your request right now. Please try again later.";
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
      {success && <div className="auth-form__success">{success}</div>}

      <p className="auth-form__info">
        Enter the email associated with your account and we&apos;ll send you a
        link to reset your password.
      </p>

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

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        Send Reset Link
      </Button>

      <div className="auth-form__signup">
        <span>Remember your password?</span>{" "}
        <Link to={routes.login}>Back to sign in</Link>
      </div>
    </form>
  );
}
