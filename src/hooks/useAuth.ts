// src/hooks/useAuth.ts
import { useAuthContext } from "../context/useAuthContext";

export function useAuth() {
  return useAuthContext();
}
