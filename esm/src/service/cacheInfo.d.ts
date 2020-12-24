export declare function setCacheToMax(key: string, value: any, repeat?: number): {
    data: CacheObj;
    length: number;
} | false;
export interface CacheObj {
    data: any;
    length: number;
    times: number[];
}
