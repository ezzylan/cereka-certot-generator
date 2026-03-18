import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const config = useRuntimeConfig();

const turso = createClient({
  url: config.turso.databaseUrl,
  authToken: config.turso.authToken,
});

export const db = drizzle(turso);
