export const getStackLineCol = function (stack) {
    if (!stack || typeof stack !== "string") {
        return null;
    }
    try {
        const arr = stack.split('\n');
        const errormsg = arr[1];
        if (!errormsg)
            return null;
        const linecol = errormsg.split(":");
        if (linecol.length < 2)
            return null;
        const line = linecol[linecol.length - 2];
        const col = linecol[linecol.length - 1];
        return {
            line: line,
            col: col
        };
    }
    catch (e) {
        throw e;
    }
};
//# sourceMappingURL=error-stack.js.map