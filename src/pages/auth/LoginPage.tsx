// src/pages/auth/LoginPage.tsx
import { LoginForm } from "../../components/forms/LoginForm";

export function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__brand">
        <div className="auth-page__logo-icon">W</div>
        <span className="auth-page__logo-text">WindowInvoice Pro</span>
      </div>

      <div className="auth-page__card">
        <div className="auth-page__card-header">
          <h1 className="auth-page__title">Welcome Back</h1>
          <p className="auth-page__subtitle">
            Sign in to your account to continue
          </p>
        </div>

        <LoginForm />
      </div>

      <p className="auth-page__legal">
        By signing in, you agree to our{" "}
        <a href="#" className="auth-page__link">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="auth-page__link">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
