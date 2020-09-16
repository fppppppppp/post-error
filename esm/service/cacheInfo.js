const cacheObj = {};
function getCache(key) {
    return cacheObj[key];
}
function setCache(key, value) {
    if (!cacheObj[key]) {
        cacheObj[key] = {
            data: "",
            length: 0,
            times: [],
        };
    }
    value && (cacheObj[key].data = value);
    cacheObj[key].length++;
    cacheObj[key].times.push(+new Date());
}
export function setCacheToMax(key, value, repeat = -1) {
    // 如果存在repeat  并且 值大于0 而且缓存的数据大于repeat；
    if (repeat > 0 && cacheObj[key] && cacheObj[key].length > repeat) {
        return false;
    }
    else {
        setCache(key, value);
        return Object.assign(Object.assign({}, cacheObj[key]), { length: cacheObj[key].length });
    }
}
//# sourceMappingURL=cacheInfo.js.map