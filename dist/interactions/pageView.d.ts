type PageViewOptions = {
    title?: string;
    location?: string;
    path?: string;
    sendPageView?: boolean;
    userId?: string;
    user_properties?: Object;
};
export declare function pageView({ title, location, path, sendPageView, userId, user_properties }?: PageViewOptions, measurementId?: string): void;
export {};
