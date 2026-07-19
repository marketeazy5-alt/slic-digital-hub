import { c as createServerFn } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BwdutfJC.mjs";
import { n as createSsrRpc } from "./app-shell-DrB0jrAs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-queries.functions-cCJAxELZ.js
var getDashboard = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("cb7e862f05d2dbd6c9b3436c9c5c657f41a84846dbde1abaf17679a6d994d304"));
var getPolicyDetail = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createSsrRpc("03be6c2e32c8be2327aeb6ef21b3dc5091a1a4ce4a2af89c5149b0ee20f12257"));
var getSagaTrace = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createSsrRpc("da8388fc2dde62622f8ee3b8e943b214ae96509df7439f4eff2077bafe092e99"));
var getClaims = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("1da8d6b889b08ab41e97a99d8242f95cb2dd8e5c94bd2e5c4ac925ca64fab4a9"));
var getFraudLandscape = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("5b2fb4cec909b62ee03312eb2f1f21de9cbc29231515d2edb3f1031d393c45ec"));
var getGoals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("2ceb8af31169a5522308e02ccae7e58533fc7114c058603378d626579f6af7f7"));
var createGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createSsrRpc("b95622f41894fbe59ea0bb5296519667cb7d57f4979ef7629c27022c83ab18bb"));
var deleteGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createSsrRpc("a7631d588f6597fcfaa63b38cdefb48fae3e6a57e857cdd093b52fe8d939416f"));
var updateProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createSsrRpc("c3f1602f7b3cce0db00daba5c91e5fd1bb0f379567e2d812d3eb2c2a1b391346"));
//#endregion
export { getFraudLandscape as a, getSagaTrace as c, getDashboard as i, updateProfile as l, deleteGoal as n, getGoals as o, getClaims as r, getPolicyDetail as s, createGoal as t };
