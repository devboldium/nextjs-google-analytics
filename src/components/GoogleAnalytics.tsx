import React from "react";
import Script, { ScriptProps } from "next/script";
import { usePageViews } from "../hooks";

type GoogleAnalyticsProps = {
  gaMeasurementId?: string;
  gtagUrl?: string;
  strategy?: ScriptProps["strategy"];
  debugMode?: boolean;
  defaultConsent?: "granted" | "denied";
  nonce?: string;
  userid?: string | false;
};

type WithPageView = GoogleAnalyticsProps & {
  trackPageViews?: boolean;
};

type WithIgnoreHashChange = GoogleAnalyticsProps & {
  trackPageViews?: {
    ignoreHashChange: boolean;
  };
};

export function GoogleAnalytics({
  debugMode = false,
  gaMeasurementId,
  gtagUrl = "https://www.googletagmanager.com/gtag/js",
  strategy = "afterInteractive",
  defaultConsent = "granted",
  trackPageViews,
  nonce,
  userid = false,
}: WithPageView | WithIgnoreHashChange): JSX.Element | null {
  const _gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? gaMeasurementId;

  usePageViews({
    gaMeasurementId: _gaMeasurementId,
    ignoreHashChange:
      typeof trackPageViews === "object"
        ? trackPageViews?.ignoreHashChange
        : false,
    disabled: !trackPageViews,
  });

  if (!_gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script src={`${gtagUrl}?id=${_gaMeasurementId}`} strategy={strategy} />
      <Script id="nextjs-google-analytics" nonce={nonce}>
        {`
            // testing, 123...
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${
              defaultConsent === "denied" ?
              `gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });` : ``
            }
            gtag('config', '${_gaMeasurementId}', {
              canary: 'yes',
              page_path: window.location.pathname,
              ${userid ? `user_id: ${userid},` : ""}
              ${debugMode ? `debug_mode: ${debugMode},` : ""}
            });
          `}
      </Script>
    </>
  );
}
