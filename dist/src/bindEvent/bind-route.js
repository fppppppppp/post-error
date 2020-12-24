import { xhm } from "../service/xhm";
let time = 0;
let init = true;
export function postRouter(from, to) {
    const now = performance.now();
    xhm({
        router_from: from,
        router_to: to,
        router_times: now - time,
        first: init
    }, "ro");
    time = now;
    init = false;
}
//# sourceMappingURL=bind-route.js.map