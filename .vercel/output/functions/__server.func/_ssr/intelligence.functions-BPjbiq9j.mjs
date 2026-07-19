import { c as createServerFn } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BwdutfJC.mjs";
import { n as createSsrRpc } from "./app-shell-DrB0jrAs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intelligence.functions-BPjbiq9j.js
var seedIfNeeded = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("cb3204b84a48b96906299c04e01bb2dd94c1eaa193759e48a4db0873c0546df4"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("8d8f0f54da06dbe83ff6408d8d281957e69785196c25d3925148ba0a214f5150"));
var runLapseEngine = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("b386260a7315cf45744bcd9553f801c656bcbb3cfc332bf440dedc5a9be25105"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createSsrRpc("c9d2405d43cea18ebcac796143ffdeb35630fa05828eee6480a2ae60ae6638f6"));
var detectFraudRings = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("d5f4319161242c51849a115cd93a7263ce3d3146e2846454e8ead696b3e1b02b"));
var payPremiumSaga = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createSsrRpc("176491de4b575972425156d37a0c0f01af00db99d51db99c4da381513739e044"));
var dismissNextAction = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createSsrRpc("64e785e8d4c14b7bb7d3291a3d86b205f655c4ad3cc5a0df89b47b37cc87affd"));
//#endregion
export { seedIfNeeded as a, runLapseEngine as i, dismissNextAction as n, payPremiumSaga as r, detectFraudRings as t };
