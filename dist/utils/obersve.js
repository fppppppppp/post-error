const clientList = {};
function listen(key, fn) {
    if (!clientList[key]) {
        clientList[key] = [];
    }
    clientList[key].push(fn); // 订阅的消息添加进缓存列表
}
function trigger(type, ...money) {
    let fns = clientList[type];
    if (!fns || fns.length === 0) {
        // 如果没有绑定对应的消息
        return false;
    }
    fns.forEach((fn) => {
        fn.apply(this, money);
    });
}
function remove(key, fn) {
    if (!clientList[key])
        return false;
    if (!fn) {
        clientList[key].length = 0;
        return true;
    }
    else {
        const index = clientList[key].findIndex(item => item === fn);
        if (index > -1) {
            clientList[key].splice(index, 1);
            return true;
        }
        return false;
    }
}
export { listen, trigger, remove };
//# sourceMappingURL=obersve.js.map