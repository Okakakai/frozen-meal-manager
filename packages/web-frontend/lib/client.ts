import { hc } from "hono/client";
import type { AppType } from "@frozen-meal-manager/backend";
import { getBaseURL } from "./baseUrl";

export const client = hc<AppType>(`${getBaseURL()}/api`);
