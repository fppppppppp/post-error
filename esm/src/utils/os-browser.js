"use strict";
const _getBrowserinfo = () => {
    var document = window.document, navigator = window.navigator, agent = navigator.userAgent.toLowerCase(), 
    //IE8+支持.返回浏览器渲染当前文档所用的模式
    //IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
    //IE10:10(兼容模式7||8||9)
    IEMode = document.documentMode, 
    //chorme
    chrome = window.chrome || false, System = {
        //user-agent
        agent: agent,
        //是否为IE
        isIE: /msie/.test(agent),
        //Gecko内核
        isGecko: agent.indexOf("gecko") > 0 && agent.indexOf("like gecko") < 0,
        //webkit内核
        isWebkit: agent.indexOf("webkit") > 0,
        //是否为标准模式
        isStrict: document.compatMode === "CSS1Compat",
        //是否支持subtitle
        supportSubTitle: function () {
            return "track" in document.createElement("track");
        },
        //是否支持scoped
        supportScope: function () {
            return "scoped" in document.createElement("style");
        },
        //获取IE的版本号
        ieVersion: function () {
            try {
                return agent.match(/msie ([\d.]+)/)[1] || 0;
            }
            catch (e) {
                console.log("error");
                return IEMode;
            }
        },
        //Opera版本号
        operaVersion: function () {
            try {
                if (window.opera) {
                    return agent.match(/opera.([\d.]+)/)[1];
                }
                else if (agent.indexOf("opr") > 0) {
                    return agent.match(/opr\/([\d.]+)/)[1];
                }
            }
            catch (e) {
                console.log("error");
                return 0;
            }
        },
        //描述:version过滤.如31.0.252.152 只保留31.0
        versionFilter: function (...arg) {
            if (arg.length === 1 && typeof arg[0] === "string") {
                var version = arg[0], start = version.indexOf(".");
                if (start > 0) {
                    var end = version.indexOf(".", start + 1);
                    if (end !== -1) {
                        return version.substr(0, end);
                    }
                }
                return version;
            }
            else if (arg.length === 1) {
                return arg[0];
            }
            return 0;
        }
    };
    try {
        //浏览器类型(IE、Opera、Chrome、Safari、Firefox)
        System.type = System.isIE ? "IE" :
            window.opera || (agent.indexOf("opr") > 0) ? "Opera" :
                (agent.indexOf("chrome") > 0) ? "Chrome" :
                    //safari也提供了专门的判定方式
                    window.openDatabase ? "Safari" :
                        (agent.indexOf("firefox") > 0) ? "Firefox" :
                            'unknow';
        //版本号
        System.version = (System.type === "IE") ? System.ieVersion() :
            (System.type === "Firefox") ? agent.match(/firefox\/([\d.]+)/)[1] :
                (System.type === "Chrome") ? agent.match(/chrome\/([\d.]+)/)[1] :
                    (System.type === "Opera") ? System.operaVersion() :
                        (System.type === "Safari") ? agent.match(/version\/([\d.]+)/)[1] :
                            "0";
        //浏览器外壳
        System.shell = function () {
            //遨游浏览器
            if (agent.indexOf("maxthon") > 0) {
                System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version;
                return "傲游浏览器";
            }
            //QQ浏览器
            if (agent.indexOf("qqbrowser") > 0) {
                System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version;
                return "QQ浏览器";
            }
            //搜狗浏览器
            if (agent.indexOf("se 2.x") > 0) {
                return '搜狗浏览器';
            }
            //Chrome:也可以使用window.chrome && window.chrome.webstore判断
            if (chrome && System.type !== "Opera") {
                var external = window.external, clientInfo = window.clientInformation, 
                //客户端语言:zh-cn,zh.360下面会返回undefined
                clientLanguage = clientInfo.languages;
                //猎豹浏览器:或者agent.indexOf("lbbrowser")>0
                if (external && 'LiebaoGetVersion' in external) {
                    return '猎豹浏览器';
                }
                //百度浏览器
                if (agent.indexOf("bidubrowser") > 0) {
                    System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
                        agent.match(/chrome\/([\d.]+)/)[1];
                    return "百度浏览器";
                }
                //360极速浏览器和360安全浏览器
                if (System.supportSubTitle() && typeof clientLanguage === "undefined") {
                    //object.key()返回一个数组.包含可枚举属性和方法名称
                    var storeKeyLen = Object.keys(chrome.webstore).length, v8Locale = "v8Locale" in window;
                    return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
                }
                return "Chrome";
            }
            return System.type;
        };
        //浏览器名称(如果是壳浏览器,则返回壳名称)
        System.name = System.shell();
        //对版本号进行过滤过处理
        System.version = System.versionFilter(System.version);
    }
    catch (e) {
        console.log(e);
    }
    return {
        client: System
    };
};
export const getBrowserinfo = () => {
    const { agent, version, name, isIE, isGecko, isWebkit, isStrict } = _getBrowserinfo().client;
    return {
        agent,
        version,
        name,
        isIE,
        isGecko,
        isWebkit,
        isStrict
    };
};
export function getOS() {
    let sUserAgent = navigator.userAgent;
    let isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    let isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac)
        return "Mac";
    let isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix)
        return "Unix";
    let isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux)
        return "Linux";
    if (isWin) {
        let isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K)
            return "Win2000";
        let isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP)
            return "WinXP";
        let isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003)
            return "Win2003";
        let isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista)
            return "WinVista";
        let isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7)
            return "Win7";
        let isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10)
            return "Win10";
    }
    return "other";
}
export const getOtherLogininfo = () => {
    // tslint:disable-next-line: deprecation
    const performance = window.performance.timing || {};
    const cd = window.screen.colorDepth;
    const referrer = window.document.referrer;
    const lang = navigator.language;
    return {
        performance,
        timsDns: performance.domainLookupEnd - performance.domainLookupStart,
        timsTcp: performance.connectEnd - performance.connectStart,
        timsWhiteScreen: performance.responseStart - performance.navigationStart,
        timsDomLoad: performance.domContentLoadedEventEnd - performance.navigationStart,
        timsLoad: performance.loadEventEnd - performance.navigationStart,
        lang,
        referrer,
        cd,
    };
};
export const detectZoom = () => {
    var ratio = 0, screen = window.screen, ua = navigator.userAgent.toLowerCase();
    if (~ua.indexOf('firefox')) {
        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }
    }
    else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    }
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    if (ratio) {
        ratio = Math.round(ratio * 100);
    }
    // 360安全浏览器下浏览器最大化时诡异的outerWidth和innerWidth不相等
    if (ratio === 99 || ratio === 101) {
        ratio = 100;
    }
    return ratio;
};
export const getLogininfo = () => {
    const windowScreen = {
        height: window.screen.height,
        width: window.screen.width,
    };
    const windowWidthHeights = {
        innerWidth: window.innerWidth || window.document.body && window.document.body.clientWidth || "UNKONW",
        innerHeight: window.innerHeight || window.document.body && window.document.body.clientHeight || "UNKONW" // 浏览器缩放后的像素
    };
    // const userinfo = window.sessionStorage.getItem("_u");
    return {
        zoom: detectZoom(),
        os: getOS(),
        browserinfo: getBrowserinfo(),
        windowScreen,
        windowWidthHeights,
    };
};
export function getSystemInfo() {
    return Object.assign(Object.assign({}, getLogininfo()), getOtherLogininfo());
}
//# sourceMappingURL=os-browser.js.map