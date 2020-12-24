export const getLocalStorage = function (key) {
    if (!key) {
        throw new Error("please input LocalStorage key");
    }
    return localStorage.getItem(key) || null;
};
export const setLocalStorage = function (key, value) {
    localStorage.setItem(key, value);
};
export const removeLocalStorage = function (key) {
    localStorage.removeItem(key);
};
export const clearLocalStorage = function () {
    localStorage.clear();
};
//# sourceMappingURL=localStorage.js.map