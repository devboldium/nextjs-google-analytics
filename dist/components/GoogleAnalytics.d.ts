/// <reference types="react" />
import { ScriptProps } from "next/script";
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
export declare function GoogleAnalytics({ debugMode, gaMeasurementId, gtagUrl, strategy, defaultConsent, trackPageViews, nonce, userid, }: WithPageView | WithIgnoreHashChange): JSX.Element | null;
export {};
