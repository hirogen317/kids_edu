import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "./generated/prisma/client.js";

function createDatabaseClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }

  const pool = new Pool({
    connectionString
  });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as {
  db?: ReturnType<typeof createDatabaseClient>;
};

export const db = globalForPrisma.db ?? createDatabaseClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.db = db;
}
