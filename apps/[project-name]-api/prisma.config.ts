import path from 'node:path';
import { defineConfig } from 'prisma/config';
import { config as loadEnv } from 'dotenv';

const targetDatabase = process.env.PRISMA_TARGET_DB;

// Load the default .env file first
loadEnv({ path: path.resolve(__dirname, '.env') });

let config;

if (targetDatabase === 'sqlite') {
  // --- Configuration for SQLite ---
  console.log('✅ Prisma config loaded for SQLite');
  config = defineConfig({
    schema: path.join(__dirname, 'prisma-sqlite', 'sqlite.prisma'),
    migrations: {
      path: path.join(__dirname, 'prisma-sqlite', 'migrations_sqlite'),
    },
  });
} else {
  // --- Default Configuration for PostgreSQL ---
  console.log('✅ Prisma config loaded for PostgreSQL (default)');
  config = defineConfig({
    schema: path.join(__dirname, 'prisma', 'schema.prisma'),
    migrations: {
      path: path.join(__dirname, 'prisma', 'migrations'),
    },
  });
}

export default config;
