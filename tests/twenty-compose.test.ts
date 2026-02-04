import { describe, test, expect } from "bun:test";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

describe("Twenty CRM Docker Compose", () => {
  const rootDir = process.cwd();
  const composePath = join(rootDir, "services/twenty/docker-compose.yml");
  const envExamplePath = join(rootDir, "services/twenty/.env.example");

  test("Compose file exists and parses", () => {
    expect(existsSync(composePath)).toBe(true);
    const content = readFileSync(composePath, "utf-8");
    const compose = parse(content);
    expect(compose.services).toBeDefined();
  });

  test("Required services defined", () => {
    if (!existsSync(composePath)) return;
    const compose = parse(readFileSync(composePath, "utf-8"));
    const services = Object.keys(compose.services);
    expect(services).toContain("server");
    expect(services).toContain("worker");
    expect(services).toContain("db");
    expect(services).toContain("redis");
  });

  test("Server configuration", () => {
    if (!existsSync(composePath)) return;
    const compose = parse(readFileSync(composePath, "utf-8"));
    const server = compose.services.server;
    
    expect(server.ports).toContain("3000:3000");
    expect(server.image).toBe("twentycrm/twenty:${TAG:-latest}");
    
    const envFile = Array.isArray(server.env_file) ? server.env_file : [server.env_file];
    expect(envFile).toContain(".env");
    
    expect(server.healthcheck?.test).toContain("/healthz");

    const env = server.environment || {};
    expect(env.PG_DATABASE_URL).toBeDefined();
    expect(env.PG_DATABASE_URL).toContain("${PG_DATABASE_NAME:-default}");
  });

  test("Worker configuration", () => {
    if (!existsSync(composePath)) return;
    const compose = parse(readFileSync(composePath, "utf-8"));
    const worker = compose.services.worker;
    
    expect(worker.image).toBe("twentycrm/twenty:${TAG:-latest}");
    
    const envFile = Array.isArray(worker.env_file) ? worker.env_file : [worker.env_file];
    expect(envFile).toContain(".env");
    
    expect(worker.command).toEqual(["yarn", "worker:prod"]);
    
    const env = worker.environment || {};
    expect(env.DISABLE_DB_MIGRATIONS).toBe("true");
    expect(env.DISABLE_CRON_JOBS_REGISTRATION).toBe("true");
    
    expect(env.PG_DATABASE_URL).toBeDefined();
    expect(env.PG_DATABASE_URL).toContain("${PG_DATABASE_NAME:-default}");
  });

  test("DB configuration", () => {
    if (!existsSync(composePath)) return;
    const compose = parse(readFileSync(composePath, "utf-8"));
    const db = compose.services.db;
    
    expect(db.image).toBe("postgres:16");
  });

  test("Redis configuration", () => {
    if (!existsSync(composePath)) return;
    const compose = parse(readFileSync(composePath, "utf-8"));
    expect(compose.services.redis.image).toBe("redis");
  });

  test(".env.example exists and has required keys and defaults", () => {
    expect(existsSync(envExamplePath)).toBe(true);
    if (!existsSync(envExamplePath)) return;

    const content = readFileSync(envExamplePath, "utf-8");
    const lines = content.split("\n");
    const envVars: Record<string, string> = {};
    
    lines.forEach((line: string) => {
      if (line && !line.startsWith("#")) {
        const [key, ...valueParts] = line.split("=");
        if (key) {
          envVars[key.trim()] = valueParts.join("=").trim();
        }
      }
    });
    
    const requiredKeys = [
      "APP_SECRET", "SERVER_URL", "TAG", "STORAGE_TYPE", "REDIS_URL",
      "DISABLE_DB_MIGRATIONS", "DISABLE_CRON_JOBS_REGISTRATION",
      "STORAGE_S3_REGION", "STORAGE_S3_NAME", "STORAGE_S3_ENDPOINT",
      "PG_DATABASE_HOST", "PG_DATABASE_PORT", "PG_DATABASE_NAME", "PG_DATABASE_USER", "PG_DATABASE_PASSWORD",
      "MESSAGING_PROVIDER_GMAIL_ENABLED", "CALENDAR_PROVIDER_GOOGLE_ENABLED",
      "AUTH_GOOGLE_CLIENT_ID", "AUTH_GOOGLE_CLIENT_SECRET", "AUTH_GOOGLE_CALLBACK_URL", "AUTH_GOOGLE_APIS_CALLBACK_URL"
    ];

    for (const key of requiredKeys) {
      expect(envVars).toHaveProperty(key);
    }

    expect(envVars.MESSAGING_PROVIDER_GMAIL_ENABLED).toBe("false");
    expect(envVars.CALENDAR_PROVIDER_GOOGLE_ENABLED).toBe("false");
    expect(envVars.STORAGE_TYPE).toBe("local");
    expect(envVars.TAG).toBe("latest");
    expect(envVars.DISABLE_DB_MIGRATIONS).toBe("false");
    expect(envVars.DISABLE_CRON_JOBS_REGISTRATION).toBe("false");
    expect(envVars.APP_SECRET).toBe("replace_me_with_a_random_string");
  });
});
