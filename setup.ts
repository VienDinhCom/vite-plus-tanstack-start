import fs from "node:fs/promises";
import { spawnSync } from "node:child_process";

function exec(cmd: string, cwd?: string) {
  const result = spawnSync(cmd, {
    cwd,
    shell: true,
    stdio: "inherit",
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

// Install dependencies
{
  for await (const dir of fs.glob("./**/node_modules")) {
    await fs.rm(dir, { recursive: true });
  }

  exec("vp install");
}

// Bootstrap .env files
{
  try {
    await fs.access(".env");
  } catch {
    await fs.copyFile("sample.env", ".env");
  }
}

// Run Tasks
{
  exec("vp hooks enable");

  exec("npm i -g @colbymchenry/codegraph");
  exec("codegraph init");
}
