import { xhm } from "../service/xhm";
export const bindLoad = function () {
    window.addEventListener("load", () => {
        const performance = window.performance;
        xhm({ performance }, 'pe');
    });
};
//# sourceMappingURL=bind-load.js.map