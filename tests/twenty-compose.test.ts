import { describe, test, expect } from "bun:test";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

describe("Twenty CRM Docker Compose", () => {
  const composePath = join(process.cwd(), "services/twenty/docker-compose.yml");
  const envExamplePath = join(process.cwd(), "services/twenty/.env.example");

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

  test("Server exposes port 3000", () => {
    if (!existsSync(composePath)) return;
    const compose = parse(readFileSync(composePath, "utf-8"));
    const ports = compose.services.server.ports;
    expect(ports).toContain("3000:3000");
  });

  test("DB uses postgres:16", () => {
    if (!existsSync(composePath)) return;
    const compose = parse(readFileSync(composePath, "utf-8"));
    expect(compose.services.db.image).toBe("postgres:16");
  });

  test("Worker command is array", () => {
    if (!existsSync(composePath)) return;
    const compose = parse(readFileSync(composePath, "utf-8"));
    expect(Array.isArray(compose.services.worker.command)).toBe(true);
    expect(compose.services.worker.command).toEqual(["yarn", "worker:prod"]);
  });

  test("Env file usage", () => {
    if (!existsSync(composePath)) return;
    const compose = parse(readFileSync(composePath, "utf-8"));
    expect(compose.services.server.env_file).toBeDefined();
    expect(compose.services.worker.env_file).toBeDefined();
  });

  test("Required env vars in .env.example", () => {
    expect(existsSync(envExamplePath)).toBe(true);
    const content = readFileSync(envExamplePath, "utf-8");
    const keys = content.split("\n")
      .filter(line => line && !line.startsWith("#"))
      .map(line => line.split("=")[0].trim());
    
    const required = [
      "APP_SECRET", "SERVER_URL", "TAG", "STORAGE_TYPE", "REDIS_URL",
      "PG_DATABASE_HOST", "PG_DATABASE_PORT", "PG_DATABASE_NAME", "PG_DATABASE_USER", "PG_DATABASE_PASSWORD",
      "MESSAGING_PROVIDER_GMAIL_ENABLED", "CALENDAR_PROVIDER_GOOGLE_ENABLED",
      "AUTH_GOOGLE_CLIENT_ID", "AUTH_GOOGLE_CLIENT_SECRET", "AUTH_GOOGLE_CALLBACK_URL", "AUTH_GOOGLE_APIS_CALLBACK_URL"
    ];

    for (const key of required) {
      expect(keys).toContain(key);
    }
  });
});
