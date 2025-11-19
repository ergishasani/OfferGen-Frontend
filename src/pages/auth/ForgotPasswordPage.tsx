// src/pages/auth/ForgotPasswordPage.tsx
import { ForgotPasswordForm } from "../../components/forms/ForgotPasswordForm";

export function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__brand">
        <div className="auth-page__logo-icon">W</div>
        <span className="auth-page__logo-text">WindowInvoice Pro</span>
      </div>

      <div className="auth-page__card">
        <div className="auth-page__card-header">
          <h1 className="auth-page__title">Forgot Password</h1>
          <p className="auth-page__subtitle">
            We&apos;ll help you get back into your account.
          </p>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
