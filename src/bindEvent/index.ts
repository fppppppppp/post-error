import { bindBeforeunload } from "./bind-close";
import { initBindEvent } from "./bind-error";
import bindXMLEvt from "./bind-xhm"
import {bindLoad} from "./bind-load";
import { autoTrack } from "./bind-track";
// import { getConfig} from "@/config/global-config";
export function initEvent(){
    bindBeforeunload();
    initBindEvent();
    bindXMLEvt();
    bindLoad();
    autoTrack();
}