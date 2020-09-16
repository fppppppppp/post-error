import { bindBeforeunload } from "./bind-close";
import { initBindEvent } from "./bind-error";

export function initEvent(){
    bindBeforeunload();
    initBindEvent();
}