Object.defineProperty(exports, '__esModule', { value: true });

const servicePath = "http://127.0.0.1:7002/";

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid + "-" + +new Date();
}
function uuid4(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        // Compact form
        for (i = 0; i < len; i++)
            uuid[i] = chars[0 | Math.random() * radix];
    }
    else {
        // rfc4122, version 4 form
        var r;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    var uid = uuid.join('');
    return uid + "-" + +new Date();
}

const getLocalStorage = function (key) {
    if (!key) {
        throw new Error("please input LocalStorage key");
    }
    return localStorage.getItem(key) || null;
};
const setLocalStorage = function (key, value) {
    localStorage.setItem(key, value);
};

let userInfo = {
    clientType: "1",
};
/**
 * 初始化用户个人信息
 */
function initUserInfo() {
    const postUuid = getLocalStorage("__posterror__uuid");
    if (postUuid) {
        userInfo.uuid = postUuid;
    }
    else {
        const id = uuid();
        userInfo.uuid = id;
        setLocalStorage("__posterror__uuid", id);
    }
    const uid = uuid4();
    userInfo.uid = uid;
}
/**
 * 获取用户个人信息
 */
function getUserInfo() {
    if (!userInfo.uid) {
        initUserInfo();
    }
    return userInfo;
}
/**
 *
 * 设置用户个人信息
 */
function setSystemUser(id) {
    userInfo.userid = id;
}
function setUser(id) {
    userInfo.userid = id;
}
function setClientType(id) {
    userInfo.clientType = id;
}
function setProject(id) {
    userInfo.projectInfo = id;
}

const _getBrowserinfo = ()=>{
	var document = window.document,
		navigator = window.navigator,
		agent = navigator.userAgent.toLowerCase(),
		//IE8+支持.返回浏览器渲染当前文档所用的模式
		//IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
		//IE10:10(兼容模式7||8||9)
		IEMode = document.documentMode,
		//chorme
		chrome = window.chrome || false,
		System = {
			//user-agent
			agent : agent,
			//是否为IE
			isIE : /msie/.test(agent),
			//Gecko内核
			isGecko: agent.indexOf("gecko")>0 && agent.indexOf("like gecko")<0,
			//webkit内核
			isWebkit: agent.indexOf("webkit")>0,
			//是否为标准模式
			isStrict: document.compatMode === "CSS1Compat",
			//是否支持subtitle
			supportSubTitle:function(){
				return "track" in document.createElement("track");
			},
			//是否支持scoped
			supportScope:function(){
				return "scoped" in document.createElement("style");
			},
			//获取IE的版本号
			ieVersion:function(){
				try {
				   return agent.match(/msie ([\d.]+)/)[1] || 0;
				} catch(e) {
				   console.log("error");
				   return IEMode;
				}
			},
			//Opera版本号
			operaVersion:function(){
				try {
					if(window.opera) {
						return agent.match(/opera.([\d.]+)/)[1];
					} else if(agent.indexOf("opr") > 0) {
						return agent.match(/opr\/([\d.]+)/)[1];
					}
				} catch(e) {
					console.log("error");
					return 0;
				}
			},
			//描述:version过滤.如31.0.252.152 只保留31.0
			versionFilter:function(...arg){
				if(arg.length === 1 && typeof arg[0] === "string") {
					var version = arg[0],
						start = version.indexOf(".");
					if(start>0){
						var end = version.indexOf(".",start+1);
						if(end !== -1) {
							return version.substr(0,end);
						}
					}
					return version;
				} else if(arg.length === 1) {
					return arg[0];
				}
				return 0;
			}
		};

	try {
		//浏览器类型(IE、Opera、Chrome、Safari、Firefox)
		System.type = System.isIE?"IE":
			window.opera || (agent.indexOf("opr") > 0)?"Opera":
			(agent.indexOf("chrome")>0)?"Chrome":
			//safari也提供了专门的判定方式
			window.openDatabase?"Safari":
			(agent.indexOf("firefox")>0)?"Firefox":
			'unknow';

		//版本号
		System.version = (System.type === "IE")?System.ieVersion():
			(System.type === "Firefox")?agent.match(/firefox\/([\d.]+)/)[1]:
			(System.type === "Chrome")?agent.match(/chrome\/([\d.]+)/)[1]:
			(System.type === "Opera")?System.operaVersion():
			(System.type === "Safari")?agent.match(/version\/([\d.]+)/)[1]:
			"0";

		//浏览器外壳
		System.shell=function(){
			//遨游浏览器
			if(agent.indexOf("maxthon") > 0) {
				System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version ;
				return "傲游浏览器";
			}
			//QQ浏览器
			if(agent.indexOf("qqbrowser") > 0) {
				System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version ;
				return "QQ浏览器";
			}

			//搜狗浏览器
			if( agent.indexOf("se 2.x")>0) {
				return '搜狗浏览器';
			}

			//Chrome:也可以使用window.chrome && window.chrome.webstore判断
			if(chrome && System.type !== "Opera") {
				var external = window.external,
					clientInfo = window.clientInformation,
					//客户端语言:zh-cn,zh.360下面会返回undefined
					clientLanguage = clientInfo.languages;

				//猎豹浏览器:或者agent.indexOf("lbbrowser")>0
				if( external && 'LiebaoGetVersion' in external) {
					 return '猎豹浏览器';
				}
				//百度浏览器
				if (agent.indexOf("bidubrowser")>0) {
					System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
						agent.match(/chrome\/([\d.]+)/)[1];
					return "百度浏览器";
				}
				//360极速浏览器和360安全浏览器
				if( System.supportSubTitle() && typeof clientLanguage === "undefined") {
					//object.key()返回一个数组.包含可枚举属性和方法名称
					var storeKeyLen = Object.keys(chrome.webstore).length,
						v8Locale = "v8Locale" in window;
					return storeKeyLen > 1? '360极速浏览器':'360安全浏览器';
				}
				return "Chrome";
			}
			return System.type;
		};

		//浏览器名称(如果是壳浏览器,则返回壳名称)
		System.name = System.shell();
		//对版本号进行过滤过处理
		System.version = System.versionFilter(System.version);

	} catch(e) {
		console.log(e);
	}
	return {
		client:System
	};

};
const getBrowserinfo = ()=>{
    const {
        agent,
        version,
        name,
        isIE,
        isGecko,
        isWebkit,
        isStrict
    } = _getBrowserinfo().client;
    return {
        agent,
        version,
        name,
        isIE,
        isGecko,
        isWebkit,
        isStrict
    }
};


function getOS() {
    let sUserAgent = navigator.userAgent;
    let isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    let isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    let isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    let isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    if (isWin) {
        let isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        let isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        let isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        let isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        let isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        let isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Win10";
    }
    return "other";
}

const getOtherLogininfo = () => {
    // tslint:disable-next-line: deprecation
    const performance = window.performance.timing || {};
    const cd = window.screen.colorDepth;
    const referrer = window.document.referrer;
    const lang = navigator.language;
    return {
        performance,
        timsDns: performance.domainLookupEnd - performance.domainLookupStart, // DNS解析时间： 
        timsTcp: performance.connectEnd - performance.connectStart,// TCP建立连接时间： 
        timsWhiteScreen: performance.responseStart - performance.navigationStart, // 白屏时间：
        timsDomLoad: performance.domContentLoadedEventEnd - performance.navigationStart,// dom渲染完成时间： 
        timsLoad: performance.loadEventEnd - performance.navigationStart,// 页面onload时间：
        lang,
        referrer,
        cd,
    };
};

const detectZoom = () => {
    var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();

    if (~ua.indexOf('firefox')) {
        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }
    } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
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
const getLogininfo = () => {
    const windowScreen = {
        height: window.screen.height,
        width: window.screen.width,
    };
    const windowWidthHeights = {
        innerWidth: window.innerWidth || window.document.body && window.document.body.clientWidth || "UNKONW", // 浏览器缩放后的像素
        innerHeight: window.innerHeight || window.document.body && window.document.body.clientHeight || "UNKONW" // 浏览器缩放后的像素
    };
    // const userinfo = window.sessionStorage.getItem("_u");
    return {
        zoom: detectZoom(),
        os:getOS(),
        browserinfo:getBrowserinfo(),
        windowScreen,
        windowWidthHeights,
        // userinfo,
    };
};




function getSystemInfo (){
	return {
		...getLogininfo(),
		...getOtherLogininfo()
	};
}

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

const defaultConfig = {
    url: servicePath,
    delay: 1000,
    mergeReport: true,
    random: 1,
    repeat: 20,
    debug: false,
    autoTrack: false,
    notTrackClass: ['mp-no-track'],
    autoTrackTag: ["input", "button", "a"]
};
function setConfig(option) {
    Object.assign(defaultConfig, option);
    const { projectId, userId, clientType, url } = defaultConfig;
    if (projectId) {
        setProject(projectId);
    }
    if (userId) {
        setSystemUser(userId);
    }
    if (clientType) {
        setClientType(clientType);
    }
    if (url) {
        trigger("changeUrl", url);
    }
    if (clientType) {
        defaultConfig.clientType = clientType;
    }
}
function getSystem() {
    const postInfo = {
        inf: {
            os: getSystemInfo()
        }
    };
    return postInfo;
}
function getConfig() {
    return defaultConfig;
}

var version = "0.5.5";

function ajax(options) {
    options = options || {}; //调用函数时如果options没有指定，就给它赋值{},一个空的Object
    options.type = (options.type || "GET").toUpperCase(); /// 请求格式GET、POST，默认为GET
    options.dataType = options.dataType || "json"; //响应数据格式，默认json
    var params = formatParams(options.data); //options.data请求的数据
    var xhr = new XMLHttpRequest();
    //启动并发送一个请求
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    }
    else if (options.type == "POST") {
        xhr.open("post", options.url, true);
        //设置表单提交时的内容类型
        //Content-type数据请求的格式
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
    var timer = null;
    //    设置有效时间
    options.timeout && (timer = setTimeout(function () {
        if (xhr.readyState != 4) {
            xhr.abort();
        }
    }, options.timeout));
    //    接收
    //     options.success成功之后的回调函数  options.error失败后的回调函数
    //xhr.responseText,xhr.responseXML  获得字符串形式的响应数据或者XML形式的响应数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            options.timeout && clearTimeout(timer);
            var status = xhr.status;
            if (status >= 200 && status < 300 || status == 304) {
                options.success && options.success(xhr.responseText, xhr);
            }
            else {
                options.error && options.error(status, xhr);
            }
        }
    };
}
//格式化请求参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}

let serviceUrl = servicePath;
listen("changeUrl", (path) => {
    serviceUrl = path;
});
const gifPostApi = function (url) {
    const gif = document.createElement("img");
    // const postOption = createUrl({...option,_te:type});
    const path = serviceUrl + "pr/e.gif?" + url;
    gif.src = path;
};
const postApi = function (option, type = "er") {
    const debug = getConfig().debug;
    const gifUrl = createUrl(Object.assign(Object.assign({}, option), { _te: type }));
    // 如果浏览器支持sendBeacon 优先使用 
    if (navigator && navigator.sendBeacon) {
        const bobl = getSendBeaconInfo(gifUrl);
        navigator.sendBeacon(serviceUrl + 'pr/', bobl);
    }
    else {
        // 降级 如果内容大于5000条 用post  否则采用图片上传
        if (gifUrl.length > 5000) {
            ajax({
                url: serviceUrl + 'pr/',
                type: "POST",
                data: getPostOption(Object.assign(Object.assign({}, option), { _te: type }))
            });
        }
        else {
            gifPostApi(gifUrl);
        }
    }
    if (debug) {
        console.log(`发送了一次请求，类型为${getTypeName(type)}; 参数为`, getPostOption(Object.assign(Object.assign({}, option), { _te: type })));
    }
};
function getPostInfo() {
    let userinfo = getUserInfo();
    const { userid, uid, projectInfo, clientType, uuid } = userinfo;
    const { href } = window.location;
    let option = {
        "_u": uuid,
        '_uu': uid,
        '_ct': clientType,
        '_p': projectInfo,
        '_fm': href,
        '_v': version,
        '_tm': performance ? performance.now() : 0,
        _tit: document.title
    };
    if (userid) {
        option._uid = userid;
    }
    return option;
}
function getPostOption(info) {
    const deInfo = getPostInfo();
    const op = Object.assign(Object.assign({}, info), deInfo);
    for (let i in op) {
        let value = op[i];
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        op[i] = value;
    }
    // arr.push("_t="+  +new Date())
    op._t = +new Date();
    return op;
}
function createUrl(info) {
    const opt = getPostOption(info);
    let arr = [];
    for (let i in opt) {
        arr.push(`${i}=${encodeURIComponent(opt[i])}`);
    }
    return arr.join("&");
}
function getSendBeaconInfo(url) {
    const blob = new Blob([url], { type: 'application/x-www-form-urlencoded' });
    return blob;
}
const xhm = postApi;
const postError = function (option) {
    postApi(option, "er");
};
function getTypeName(type) {
    switch (type) {
        case "lo":
            return "登录";
        case "er":
            return "异常";
        case "ex":
            return "退出";
        case "ch":
            return "修改用户数据";
        case "pe":
            return "上传页面性能";
        case "cl":
            return "页面点击事件";
        case "ro":
            return "路由切换";
    }
}

let isPost = false;
function postData() {
    if (!isPost) {
        xhm({}, 'ex');
        isPost = true;
    }
}
function bindBeforeunload() {
    window.addEventListener('beforeunload', (event) => {
        postData();
        // Chrome requires returnValue to be set.
    });
    window.addEventListener("unload", (event) => {
        postData();
    });
}

const cacheObj = {};
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
function setCacheToMax(key, value, repeat = -1) {
    // 如果存在repeat  并且 值大于0 而且缓存的数据大于repeat；
    if (repeat > 0 && cacheObj[key] && cacheObj[key].length > repeat) {
        return false;
    }
    else {
        setCache(key, value);
        return Object.assign(Object.assign({}, cacheObj[key]), { length: cacheObj[key].length });
    }
}

const getStackLineCol = function (stack) {
    if (!stack || typeof stack !== "string") {
        return null;
    }
    try {
        stack = stack.replace(/\(|\)/g, "");
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

// 定时器 定时发送数据
let timer = null;
// 定义一个数组存放错误数据;
const errorList = [];
function needMax() {
    const config = getConfig();
    const { repeat } = config;
    return typeof repeat === "number" && repeat > 0 ? repeat : -1;
}
function pushErrorInfo(e, str = "", option = {}) {
    const errStr = e + str;
    const { name, message, stack } = e;
    const errorType = e._errorName || e.name || "unkonw";
    let { line, col, other } = option;
    if (!line || !col) {
        const linecol = getStackLineCol(stack);
        if (linecol) {
            line = linecol.line * 1;
            col = linecol.col * 1;
        }
    }
    let value = {
        name,
        // message,
        stack,
        errStr,
        errorType,
        time: +new Date(),
        line,
        col,
        other
    };
    const pushInfo = setCacheToMax(errStr, value, needMax());
    if (pushInfo) {
        if (pushInfo.length > 1) {
            let index = errorList.findIndex(item => item.data.errStr === errStr);
            if (index > -1) {
                errorList[index] = pushInfo;
            }
            else {
                pushInfo && errorList.push(pushInfo);
            }
        }
        else {
            pushInfo && errorList.push(pushInfo);
        }
        trigger("onErrorPush");
    }
}
function doPost() {
    if (!errorList.length)
        return;
    const arr = errorList.slice(0);
    errorList.length = 0;
    postError({
        list: arr,
    });
}
function loopPostData() {
    const config = getConfig();
    const { delay, mergeReport } = config;
    listen("onErrorPush", () => {
        if (mergeReport && delay && delay > 0) {
            if (!timer) {
                timer = setInterval(() => {
                    doPost();
                }, delay);
            }
        }
        else {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            doPost();
        }
    });
}
function initErrorPost() {
    loopPostData();
}

class CustomError extends Error {
    constructor(message, type) {
        super();
        this.message = message;
        this.name = type;
        // this.stack = (new Error()).stack;
    }
}
class NetworkRequestError extends CustomError {
    constructor(message, type = "NetworkRequestError") {
        super(message, type);
        this._errorName = "NetworkRequestError";
    }
}
class UnhandledrejectionNotObjectError extends CustomError {
    constructor(message, type = "UnhandledrejectionNotObjectError") {
        super(message, type);
        this._errorName = "UnhandledrejectionNotObjectError";
    }
}
class XHMHttpResponseError extends CustomError {
    constructor(message, type = "XHMHttpResponseError") {
        super(message, type);
        this._errorName = "XHMHttpResponseError";
    }
}
class XHMHttpError extends CustomError {
    constructor(message, type = "XHMHttpError") {
        super(message, type);
        this._errorName = "XHMHttpError";
    }
}

function bindError() {
    window.onerror = function (msg, url, lineNo, columnNo, e) {
        if (msg === "Script error." || !url) {
            return;
        }
        pushErrorInfo(e, "", { line: lineNo, col: columnNo });
    };
}
function bindUnhandelrejectionEvt() {
    window.addEventListener("unhandledrejection", (e) => {
        if (typeof e.reason === "object") {
            pushErrorInfo(e.reason, "未处理的 unhandledrejection 事件 --- ");
        }
        else {
            let message = typeof e.reason === "string" ? e.reason : JSON.stringify(e.reason);
            const error = new UnhandledrejectionNotObjectError(message);
            pushErrorInfo(error);
        }
    });
}
function bindErrorEvt() {
    window.addEventListener('error', event => {
        let error = null;
        if (event.target instanceof HTMLScriptElement) {
            error = new NetworkRequestError(event.target.src, "LoadScriptError");
        }
        if (event.target instanceof HTMLLinkElement) {
            error = new NetworkRequestError(event.target.href, "LoadLinkError");
        }
        if (event.target instanceof HTMLImageElement) {
            error = new NetworkRequestError(event.target.src, "LoadLinktError");
        }
        error && pushErrorInfo(error);
    }, true);
}
function bindVueEvt() {
    if (!window.Vue || !window.Vue.config) {
        return;
    }
    let _oldOnError = window.Vue.config.errorHandler;
    window.Vue.config.errorHandler = function (errMsg, vm, info) {
        pushErrorInfo(errMsg);
        if (typeof _oldOnError === "function") {
            _oldOnError.call(this, errMsg, vm, info);
        }
    };
}
function initBindEvent() {
    bindError();
    bindUnhandelrejectionEvt();
    bindErrorEvt();
    // bindTryCatchEvt();
    bindVueEvt();
}

function bindXMLEvt() {
    if (!window.XMLHttpRequest)
        return;
    const onXMLResponsePostError = getConfig().onXMLResponsePostError;
    const nativeAjaxSend = XMLHttpRequest.prototype.send; // 首先将原生的方法保存。
    const nativeAjaxOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (mothod, url, ...args) {
        // 劫持open方法，是为了拿到请求的url
        const xhrInstance = this;
        xhrInstance._url = url;
        xhrInstance._mothod = mothod;
        return nativeAjaxOpen.apply(this, [mothod, url].concat(args));
    };
    XMLHttpRequest.prototype.send = function (...args) {
        // 对于ajax请求的监控，主要是在send方法里处理。
        const oldCb = this.onreadystatechange;
        const oldErrorCb = this.onerror;
        const xhrInstance = this;
        xhrInstance._data = args[0];
        xhrInstance.addEventListener("error", function (e) {
            // 这里捕获到的error是一个ProgressEvent。e.target 的值为 XMLHttpRequest的实例。当网络错误(ajax并没有发出去)或者发生跨域的时候，会触发XMLHttpRequest的error, 此时，e.target.status 的值为:0，e.target.statusText 的值为:''
            const errorObj = {
                error_status: {
                    status: e.target.status,
                },
                xml_mothod: xhrInstance._mothod,
                xml_url: xhrInstance._url,
                xml_query: xhrInstance._data,
            };
            if (!xhrInstance._responseError) {
                xhrInstance._responseError = true;
                /*接下来可以对errorObj进行统一处理*/
                pushErrorInfo(new XHMHttpError(JSON.stringify(errorObj)), "", {
                    line: 0,
                    col: 0,
                    other: e.target.responseText.slice(0, 200),
                });
            }
        });
        xhrInstance.addEventListener("abort", function (e) {
            // 主动取消ajax的情况需要标注，否则可能会产生误报
            if (e.type === "abort") {
                xhrInstance._isAbort = true;
            }
        });
        this.onreadystatechange = function (...innerArgs) {
            if (xhrInstance.readyState === 4) {
                if (!xhrInstance._isAbort && xhrInstance.status !== 200) {
                    // 请求不成功时，拿到错误信息
                    const errorObj = {
                        error_msg: JSON.stringify({
                            status: xhrInstance.status,
                        }),
                        xml_url: xhrInstance._url,
                        xml_mothod: xhrInstance._mothod,
                        xml_query: xhrInstance._data,
                    };
                    if (!xhrInstance._responseError) {
                        xhrInstance._responseError = true;
                        /*接下来可以对errorObj进行统一处理*/
                        pushErrorInfo(new XHMHttpResponseError(JSON.stringify(errorObj)), "", {
                            line: 0,
                            col: 0,
                            other: xhrInstance.responseText.slice(0, 200),
                        });
                    }
                }
                else if (xhrInstance.status === 200 &&
                    onXMLResponsePostError && xhrInstance.responseType.type === "text" &&
                    onXMLResponsePostError(xhrInstance.responseText, xhrInstance)) {
                    const errorObj = {
                        error_msg: JSON.stringify({
                            code: xhrInstance.status,
                        }),
                        xml_mothod: xhrInstance._mothod,
                        xml_url: xhrInstance._url,
                        xml_query: xhrInstance._data,
                    };
                    if (!xhrInstance._responseError) {
                        xhrInstance._responseError = true;
                        /*接下来可以对errorObj进行统一处理*/
                        pushErrorInfo(new XHMHttpResponseError(JSON.stringify(errorObj)), "", {
                            line: 0,
                            col: 0,
                            other: JSON.stringify({
                                responseData: xhrInstance.responseText.slice(0, 2000),
                            }),
                        });
                    }
                }
            }
            oldCb && oldCb.apply(this, innerArgs);
        };
        return nativeAjaxSend.apply(this, args);
    };
}

const bindLoad = function () {
    window.addEventListener("load", () => {
        const performance = window.performance;
        xhm({ performance }, 'pe');
    });
};

const autoTrack = function () {
    document.body.addEventListener("click", (e) => {
        let target = e.target;
        if (target.nodeType === Node.TEXT_NODE) {
            target = target.parentNode;
        }
        if (shouldAutoTrackDomEvent(target, e)) {
            track(e);
        }
    });
};
const track = function (target, check = true) {
    // 如果满足监测条件，那么从当前标签开始，向上追溯到body标签，并记录这条路径上所有的元素到一个数组中
    if (target.nodeType === Node.TEXT_NODE) {
        target = target.parentNode;
    }
    let postOtpion;
    var targetElementList = [target];
    var curEl = target;
    while (curEl.parentNode && !(curEl.tagName.toLowerCase() === 'body')) {
        targetElementList.push(curEl.parentNode);
        curEl = curEl.parentNode;
    }
    // 按照刚才记录的路径开始遍历（相当于自底向上）
    var href, elements = [];
    const noTrackClass = getConfig().notTrackClass;
    for (let i = 0; i < targetElementList.length; i++) {
        const el = targetElementList[i];
        if (el.tagName.toLowerCase() === 'a') {
            href = el.getAttribute('href') || "";
        }
        // allow users to programatically prevent tracking of elements by adding class 'mp-no-track'
        // 如果不希望某个节点被监测，开发者可以设置一个名为`mp-no-track`的css class
        var classes = el.className && el.className.split(" ") || [];
        if (classes.filter((val) => noTrackClass.includes(val)).length) {
            return false;
        }
        elements.push(el.nodeName && (el.nodeName.toLocaleLowerCase() + (el.id ? "#" + el.id : "") + classes.map(e => '.' + e).join(" .")));
    }
    // 处理采集到的属性，这里面有几个getXXXProperties(element/elements)方法（_getPropertiesFromElement、_getDefaultProperties、_getCustomProperties、_getFormFieldProperties），就是在读取各种属性
    postOtpion = {
        elements,
        target_text: target.textContent.slice(0, 255),
        a_href: href,
        info: target.getAttribute("data-track") || '',
        tag_name: target.tagName.toLowerCase(),
        element_path: elements.reverse().join(' '),
        track_id: target.getAttribute("data-track-id") || '',
    };
    xhm(postOtpion, 'cl');
    return true;
};
// _trackEvent之前，需要判断标签上的发生的事件是不是应该被autotrack监测上报
function shouldAutoTrackDomEvent(element, event) {
    const config = getConfig();
    // html根节点下面的事件不需要监测
    if (!element || element.tagName.toLowerCase() === 'HTML' || element.nodeType !== Node.ELEMENT_NODE) {
        return false;
    }
    if (element.getAttribute("data-track-id")) {
        return true;
    }
    var tag = element.tagName.toLowerCase();
    // 如果是自动上传
    if (config.autoTrack && !config.autoTrackTag.includes(tag)) {
        return false;
    }
    // 查看标签的名字
    // 如果是html则不监听
    // 如果是form标签下的submit事件，或者是input->button、input->submit标签的change、click事件，或者是select、textarea标签下的change、click事件，可以监听
    // 如果是其他标签，监听click事件
    switch (tag) {
        case 'html':
            return false;
        case 'form':
            return event.type === 'submit';
        case 'input':
            if (['button', 'submit'].indexOf(element.getAttribute('type')) === -1) {
                return event.type === 'change';
            }
            else {
                return event.type === 'click';
            }
        case 'select':
        case 'textarea':
            return event.type === 'change';
        default:
            return event.type === 'click';
    }
}

// import { getConfig} from "@/config/global-config";
function initEvent() {
    bindBeforeunload();
    initBindEvent();
    bindXMLEvt();
    bindLoad();
    autoTrack();
}

let time = 0;
let init = true;
function postRouter(from, to) {
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

// export class ErrorBoundary extends Component{
//   constructor(props: any){
//     super(props);
//   }
//   componentDidCatch(error: Error,info: any){
//     pushErrorInfo(error);
//     this.setState({error,info});
//   }
//   render(){
//     const {error} = this.state as any;
//     if(error){
//       const {FallbackComponent} = this.props as any;
//       if(FallbackComponent) return React.createElement(FallbackComponent,this.state);
//       return null
//     }
//     return this.props.children;
//   }
// }
function pluginReact(React) {
    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }
        componentDidCatch(error, info) {
            this.setState({ hasError: true });
        }
        render() {
            if (this.state.hasError) {
                const { FallbackComponent } = this.props;
                if (FallbackComponent)
                    return React.createElement(FallbackComponent, this.state);
                return null;
            }
            return this.props.children;
        }
    }
    return {
        name: "react",
        plugin: ErrorBoundary
    };
}

const pluginObj = {};
function bindPlugin(pluginFn, library) {
    const pl = pluginFn(library);
    const { name, plugin } = pl;
    if (name && plugin) {
        plugin[name] = plugin;
    }
    return plugin;
}
function getPlugin(name) {
    return pluginObj[name] || null;
}

/**
 * 配置系统参数
 * 配置的同时绑定自定义事件
 *
 */
const config = function (option) {
    setConfig(option);
    xhm(getSystem(), "lo");
    initEvent();
    initErrorPost();
};
const setUserId = function (id, info) {
    let sys = getSystem();
    const userInfo = getUserInfo();
    if (!userInfo.userid) {
        setUser(id);
    }
    else {
        const _ouu = userInfo.uid;
        initUserInfo();
        sys = Object.assign(Object.assign({}, sys), { _ouu });
    }
    if (info) {
        sys.info = info;
    }
    // fix: 配置userid  不在上传基本信息
    delete sys.inf;
    xhm(sys, "ch");
};
const handTrack = {
    postRouter,
    postClick: track
};

exports.bindPlugin = bindPlugin;
exports.config = config;
exports.getPlugin = getPlugin;
exports.handTrack = handTrack;
exports.pluginReact = pluginReact;
exports.setUserId = setUserId;
//# sourceMappingURL=bundle.es6.js.map
