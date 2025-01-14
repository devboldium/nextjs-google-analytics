"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAnalytics = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const script_1 = tslib_1.__importDefault(require("next/script"));
const hooks_1 = require("../hooks");
function GoogleAnalytics({ debugMode = false, gaMeasurementId, gtagUrl = "https://www.googletagmanager.com/gtag/js", strategy = "afterInteractive", defaultConsent = "granted", trackPageViews, nonce, userid = false, user_properties = false }) {
    var _a;
    const _gaMeasurementId = (_a = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) !== null && _a !== void 0 ? _a : gaMeasurementId;
    (0, hooks_1.usePageViews)({
        gaMeasurementId: _gaMeasurementId,
        ignoreHashChange: typeof trackPageViews === "object"
            ? trackPageViews === null || trackPageViews === void 0 ? void 0 : trackPageViews.ignoreHashChange
            : false,
        disabled: !trackPageViews,
    });
    if (!_gaMeasurementId) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(script_1.default, { src: `${gtagUrl}?id=${_gaMeasurementId}`, strategy: strategy }),
        react_1.default.createElement(script_1.default, { id: "nextjs-google-analytics", nonce: nonce }, `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${defaultConsent === "denied" ?
            `gtag('consent', 'default', {
                ad_user_data: "denied",
                ad_personalization: "denied",
                ad_storage: "denied",
                analytics_storage: "denied",
                wait_for_update: 2000 // milliseconds to wait for update
            });` : ``}
            gtag('config', '${_gaMeasurementId}', {
              page_path: window.location.pathname,
              ${userid ? `user_id: "${userid}",` : ""}
              ${user_properties ? `user_properties: ${user_properties}` : ``}
              ${debugMode ? `debug_mode: ${debugMode},` : ""}
            });
          `)));
}
exports.GoogleAnalytics = GoogleAnalytics;
//# sourceMappingURL=GoogleAnalytics.js.map