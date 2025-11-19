// src/context/AuthContext.tsx
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./AuthContextBase";

import { getStoredToken, setStoredToken, clearStoredToken } from "../lib/auth";
import {
  getMe,
  login as loginRequest,
  register as registerRequest,
} from "../features/auth/api";
import type { AuthUser, RegisterPayload } from "../features/auth/types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [isLoading, setIsLoading] = useState(true);

  // Try to hydrate user from /api/auth/me if token exists.
  // If /me fails (not implemented yet or 401), we DO NOT clear the token anymore.
  useEffect(() => {
    const init = async () => {
      try {
        if (!token) {
          setIsLoading(false);
          return;
        }
        const me = await getMe();
        setUser(me);
      } catch (err) {
        // For now, just log; don't kill the session.
        // eslint-disable-next-line no-console
        console.warn("GET /api/auth/me failed, keeping token:", err);
      } finally {
        setIsLoading(false);
      }
    };

    void init();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await loginRequest(email, password);
    setStoredToken(res.token);
    setToken(res.token);

    // Backend /login doesn't return user; we'll rely on /me later.
    // For now we just keep whatever user we had (likely null until /me exists).
  };

  const register = async (payload: RegisterPayload) => {
    const res = await registerRequest(payload);

    setStoredToken(res.token);
    setToken(res.token);

    const name = `${res.user.firstName} ${res.user.lastName}`.trim();

    setUser({
      id: res.user.id,
      email: res.user.email,
      name,
      role: res.user.role,
    });
  };

  const logout = () => {
    clearStoredToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
