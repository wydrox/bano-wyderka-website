import { describe, test, expect } from "bun:test";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

describe("Workspace Architecture", () => {
  const rootDir = process.cwd();

  test("Root package.json defines workspaces", () => {
    const pkg = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf-8"));
    expect(pkg.workspaces).toBeDefined();
    expect(pkg.workspaces).toContain("apps/*");
    expect(pkg.workspaces).toContain("services/*");
  });

  test("Website app moved to apps/website", () => {
    expect(existsSync(join(rootDir, "apps/website/package.json"))).toBe(true);
    const pkg = JSON.parse(readFileSync(join(rootDir, "apps/website/package.json"), "utf-8"));
    expect(pkg.name).toBe("website");
  });
});
