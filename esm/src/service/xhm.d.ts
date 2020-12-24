export interface PostDataInfo {
    _uu: string;
    _ct: string;
    _p: string;
    _uid?: string;
    _fm: string;
    _v: string;
    _u: string;
    _tm: number;
    _tit: string;
}
export declare const xhm: (option: object, type?: XhmType) => void;
export declare const postError: (option: object) => void;
export declare type XhmType = 'lo' | 'er' | 'ex' | 'ch' | 'pe' | 'cl' | 'ro';
