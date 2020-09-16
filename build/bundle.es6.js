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
    return uuid;
}

let userInfo = {
    clientType: "1"
};
/**
 * 初始化用户个人信息
 */
function initUserInfo() {
    const uid = uuid();
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

const gifPostApi = function (option, type = "er") {
    const gif = document.createElement("img");
    const postOption = createUrl(Object.assign(Object.assign({}, option), { _te: type }));
    const path = servicePath + "pr/e.gif" + postOption;
    gif.src = path;
};
function getPostInfo() {
    let userinfo = getUserInfo();
    const { userid, uid, projectInfo, clientType } = userinfo;
    let option = {
        _uu: uid,
        _ct: clientType,
        _p: projectInfo,
    };
    if (userid) {
        option._uid = userid;
    }
    return option;
}
function createUrl(info) {
    let arr = [];
    const deInfo = getPostInfo();
    const op = Object.assign(Object.assign({}, info), deInfo);
    for (let i in op) {
        let value = op[i];
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        arr.push(`${i}=${value}`);
    }
    arr.push("_t=" + +new Date());
    return "?" + arr.join("&");
}
const xhm = gifPostApi;
const postError = function (option) {
    gifPostApi(option, "er");
};

const defaultConfig = {
    url: servicePath,
    delay: 1000,
    mergeReport: true,
    random: 1,
    repeat: 20,
};
function setConfig(option) {
    Object.assign(defaultConfig, option);
    const { projectId, userId, clientType } = defaultConfig;
    if (projectId) {
        setProject(projectId);
    }
    if (userId) {
        setSystemUser(userId);
    }
    if (clientType) {
        setClientType(clientType);
    }
    if (clientType) {
        defaultConfig.clientType = clientType;
    }
    xhm(getSystem(), "lo");
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

function getCloseInfo() {
    const systeminfo = getUserInfo();
    const { uid } = systeminfo;
    const blob = new Blob([`_uu=${uid}&_t=${+new Date()}`], { type: 'application/x-www-form-urlencoded' });
    return blob;
}
let isPost = false;
function postData() {
    if (!isPost) {
        let fb = getCloseInfo();
        let url = servicePath + "cl";
        navigator.sendBeacon(url, fb);
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
        fn.apply(this, ...money);
    });
}

// 定时器 定时发送数据
let timer = null;
// 定义一个数组存放错误数据;
const errorList = [];
function needMax() {
    const config = getConfig();
    const { repeat } = config;
    return typeof repeat === "number" && repeat > 0 ? repeat : -1;
}
function pushErrorInfo(e, str = "") {
    const errStr = e + str;
    const { name, message, stack } = e;
    const errorType = e.constructor && e.constructor.name || "unkonw";
    let value = {
        name,
        message,
        stack,
        errStr,
        errorType,
        time: +new Date(),
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
    const { delay } = config;
    listen("onErrorPush", () => {
        if (delay && delay > 0) {
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
                doPost();
            }
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
    }
}
class NetworkRequestError extends CustomError {
}
class UnhandledrejectionNotObjectError extends CustomError {
}

function bindError() {
    window.onerror = function (msg, url, lineNo, columnNo, e) {
        if (msg === "Script error." || !url) {
            return;
        }
        pushErrorInfo(e);
    };
}
function bindUnhandelrejectionEvt() {
    window.addEventListener("unhandledrejection", (e) => {
        if (typeof e.reason === "object") {
            pushErrorInfo(e.reason, "未处理的 unhandledrejection 事件 --- ");
        }
        else {
            let message = typeof e.reason === "string" ? e.reason : JSON.stringify(e.reason);
            const error = new UnhandledrejectionNotObjectError(message, "unhandledrejection");
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

function initEvent() {
    bindBeforeunload();
    initBindEvent();
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
    initEvent();
    initErrorPost();
};
const setUserId = function (id) {
    setUser(id);
    let sys = getSystem();
    xhm(sys, "ch");
};

exports.bindPlugin = bindPlugin;
exports.config = config;
exports.getPlugin = getPlugin;
exports.pluginReact = pluginReact;
exports.setUserId = setUserId;
//# sourceMappingURL=bundle.es6.js.map
