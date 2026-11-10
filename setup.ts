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

// Install dependencies and enable git hooks
{
  for await (const dir of fs.glob("./**/node_modules")) {
    await fs.rm(dir, { recursive: true });
  }

  exec("vp install");
  exec("vp hooks enable");
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
  exec("codegraph init");
}
