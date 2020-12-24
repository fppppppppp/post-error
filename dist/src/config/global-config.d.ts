export interface ConfigOption {
    url?: string;
    delay?: number;
    mergeReport?: boolean;
    random?: number;
    repeat?: number;
    projectId?: string;
    clientType?: "1" | "2" | "3";
    userId?: string;
    debug?: boolean;
    autoTrack?: boolean;
    notTrackClass?: string[];
    autoTrackTag?: string[];
    onXMLResponsePostError?: (xhrInstanceStatusText: string, xhm: XMLHttpRequest) => boolean;
}
export declare function setConfig(option: any): void;
export declare function getSystem(): SystemInfo;
export declare function getConfig(): ConfigOption;
export interface SystemInfo {
    _uu?: string;
    _ct?: string;
    inf?: any;
    _uid?: string;
}
