// src/pages/auth/RegisterPage.tsx
import { RegisterForm } from "../../components/forms/RegisterForm";

export function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__brand">
        <div className="auth-page__logo-icon">W</div>
        <span className="auth-page__logo-text">WindowInvoice Pro</span>
      </div>

      <div className="auth-page__card">
        <div className="auth-page__card-header">
          <h1 className="auth-page__title">Create Your Account</h1>
          <p className="auth-page__subtitle">
            Start your 14-day free trial. No credit card required.
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
