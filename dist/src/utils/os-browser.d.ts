export function getOS(): "other" | "Mac" | "Unix" | "Linux" | "Win2000" | "WinXP" | "Win2003" | "WinVista" | "Win7" | "Win10";
export function getSystemInfo(): {
    performance: {};
    timsDns: number;
    timsTcp: number;
    timsWhiteScreen: number;
    timsDomLoad: number;
    timsLoad: number;
    lang: string;
    referrer: string;
    cd: number;
    zoom: number;
    os: string;
    browserinfo: {
        agent: string;
        version: any;
        name: any;
        isIE: boolean;
        isGecko: boolean;
        isWebkit: boolean;
        isStrict: boolean;
    };
    windowScreen: {
        height: number;
        width: number;
    };
    windowWidthHeights: {
        innerWidth: string | number;
        innerHeight: string | number;
    };
};
export function getBrowserinfo(): {
    agent: string;
    version: any;
    name: any;
    isIE: boolean;
    isGecko: boolean;
    isWebkit: boolean;
    isStrict: boolean;
};
export function getOtherLogininfo(): {
    performance: {};
    timsDns: number;
    timsTcp: number;
    timsWhiteScreen: number;
    timsDomLoad: number;
    timsLoad: number;
    lang: string;
    referrer: string;
    cd: number;
};
export function detectZoom(): number;
export function getLogininfo(): {
    zoom: number;
    os: string;
    browserinfo: {
        agent: string;
        version: any;
        name: any;
        isIE: boolean;
        isGecko: boolean;
        isWebkit: boolean;
        isStrict: boolean;
    };
    windowScreen: {
        height: number;
        width: number;
    };
    windowWidthHeights: {
        innerWidth: string | number;
        innerHeight: string | number;
    };
};
