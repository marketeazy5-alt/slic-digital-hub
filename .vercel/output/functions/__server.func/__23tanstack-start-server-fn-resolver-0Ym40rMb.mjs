//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-0Ym40rMb.js
var manifest = {
	"02741e54a20dfd84066c4820b954733c4fc6f9912aa9f1265f4a5c154c333e9e": {
		functionName: "grantDemoRole_createServerFn_handler",
		importer: () => import("./_ssr/portal-queries.functions-C2OyBSi8.mjs")
	},
	"03be6c2e32c8be2327aeb6ef21b3dc5091a1a4ce4a2af89c5149b0ee20f12257": {
		functionName: "getPolicyDetail_createServerFn_handler",
		importer: () => import("./_ssr/customer-queries.functions-CzrfaCV0.mjs")
	},
	"176491de4b575972425156d37a0c0f01af00db99d51db99c4da381513739e044": {
		functionName: "payPremiumSaga_createServerFn_handler",
		importer: () => import("./_ssr/intelligence.functions-D-k4BTH1.mjs")
	},
	"1da8d6b889b08ab41e97a99d8242f95cb2dd8e5c94bd2e5c4ac925ca64fab4a9": {
		functionName: "getClaims_createServerFn_handler",
		importer: () => import("./_ssr/customer-queries.functions-CzrfaCV0.mjs")
	},
	"2ceb8af31169a5522308e02ccae7e58533fc7114c058603378d626579f6af7f7": {
		functionName: "getGoals_createServerFn_handler",
		importer: () => import("./_ssr/customer-queries.functions-CzrfaCV0.mjs")
	},
	"31ac20df5403143799078189bef1f65115092cc346a8078c1ee26adaf0a21ae4": {
		functionName: "getAdminOverview_createServerFn_handler",
		importer: () => import("./_ssr/portal-queries.functions-C2OyBSi8.mjs")
	},
	"4f27023f02f00fee1d5782150f408f7303fcb006089873fcb18ca9a7fbf915b3": {
		functionName: "getAgentBook_createServerFn_handler",
		importer: () => import("./_ssr/portal-queries.functions-C2OyBSi8.mjs")
	},
	"5b2fb4cec909b62ee03312eb2f1f21de9cbc29231515d2edb3f1031d393c45ec": {
		functionName: "getFraudLandscape_createServerFn_handler",
		importer: () => import("./_ssr/customer-queries.functions-CzrfaCV0.mjs")
	},
	"64e785e8d4c14b7bb7d3291a3d86b205f655c4ad3cc5a0df89b47b37cc87affd": {
		functionName: "dismissNextAction_createServerFn_handler",
		importer: () => import("./_ssr/intelligence.functions-D-k4BTH1.mjs")
	},
	"87b3567cd273e867ba5913be0d7e64e7c61875a9fb17f0877743c49ff614fec2": {
		functionName: "getMyRoles_createServerFn_handler",
		importer: () => import("./_ssr/portal-queries.functions-C2OyBSi8.mjs")
	},
	"8d8f0f54da06dbe83ff6408d8d281957e69785196c25d3925148ba0a214f5150": {
		functionName: "advancePolicyStates_createServerFn_handler",
		importer: () => import("./_ssr/intelligence.functions-D-k4BTH1.mjs")
	},
	"a7631d588f6597fcfaa63b38cdefb48fae3e6a57e857cdd093b52fe8d939416f": {
		functionName: "deleteGoal_createServerFn_handler",
		importer: () => import("./_ssr/customer-queries.functions-CzrfaCV0.mjs")
	},
	"b386260a7315cf45744bcd9553f801c656bcbb3cfc332bf440dedc5a9be25105": {
		functionName: "runLapseEngine_createServerFn_handler",
		importer: () => import("./_ssr/intelligence.functions-D-k4BTH1.mjs")
	},
	"b95622f41894fbe59ea0bb5296519667cb7d57f4979ef7629c27022c83ab18bb": {
		functionName: "createGoal_createServerFn_handler",
		importer: () => import("./_ssr/customer-queries.functions-CzrfaCV0.mjs")
	},
	"c3f1602f7b3cce0db00daba5c91e5fd1bb0f379567e2d812d3eb2c2a1b391346": {
		functionName: "updateProfile_createServerFn_handler",
		importer: () => import("./_ssr/customer-queries.functions-CzrfaCV0.mjs")
	},
	"c9d2405d43cea18ebcac796143ffdeb35630fa05828eee6480a2ae60ae6638f6": {
		functionName: "acceptIntervention_createServerFn_handler",
		importer: () => import("./_ssr/intelligence.functions-D-k4BTH1.mjs")
	},
	"cb3204b84a48b96906299c04e01bb2dd94c1eaa193759e48a4db0873c0546df4": {
		functionName: "seedIfNeeded_createServerFn_handler",
		importer: () => import("./_ssr/intelligence.functions-D-k4BTH1.mjs")
	},
	"cb7e862f05d2dbd6c9b3436c9c5c657f41a84846dbde1abaf17679a6d994d304": {
		functionName: "getDashboard_createServerFn_handler",
		importer: () => import("./_ssr/customer-queries.functions-CzrfaCV0.mjs")
	},
	"d5f4319161242c51849a115cd93a7263ce3d3146e2846454e8ead696b3e1b02b": {
		functionName: "detectFraudRings_createServerFn_handler",
		importer: () => import("./_ssr/intelligence.functions-D-k4BTH1.mjs")
	},
	"d8691e180f424a967cf6f6ffb379dcf634f0981d4672c2bcc8a3cb1c9ffbc48b": {
		functionName: "getAnalytics_createServerFn_handler",
		importer: () => import("./_ssr/portal-queries.functions-C2OyBSi8.mjs")
	},
	"da8388fc2dde62622f8ee3b8e943b214ae96509df7439f4eff2077bafe092e99": {
		functionName: "getSagaTrace_createServerFn_handler",
		importer: () => import("./_ssr/customer-queries.functions-CzrfaCV0.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
