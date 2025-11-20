// src/features/dashboard/api.ts
import { apiClient } from "../../lib/apiClient";
import type { DashboardResponse } from "./types";

export async function getDashboard(): Promise<DashboardResponse> {
  const res = await apiClient.get("/api/dashboard");
  return res.data;
}
