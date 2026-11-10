import { createEnv } from "@t3-oss/env-core";
// import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {},
  server: {},
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
