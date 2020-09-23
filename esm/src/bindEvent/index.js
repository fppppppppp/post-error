import { bindBeforeunload } from "./bind-close";
import { initBindEvent } from "./bind-error";
import bindXMLEvt from "./bind-xhm";
export function initEvent() {
    bindBeforeunload();
    initBindEvent();
    bindXMLEvt();
}
//# sourceMappingURL=index.js.map