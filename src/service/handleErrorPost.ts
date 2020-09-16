import { postError, xhm } from "./xhm";
import { setCacheToMax } from "./cacheInfo";
import { getConfig, ConfigOption } from "../config/global-config";
import { listen, trigger, remove } from "../utils/obersve";
// 定时器 定时发送数据
let timer = null;

// 定义一个数组存放错误数据;
const errorList = [];
function needMax(): number {
  const config: ConfigOption = getConfig();
  const { repeat } = config;
  return typeof repeat === "number" && repeat > 0 ? repeat : -1;
}

export function pushErrorInfo(e?: Error, str: string = "") {
  const errStr = e + str;
  const { name, message, stack } = e;
  const errorType =e.constructor &&  e.constructor.name || "unkonw";
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
    if(pushInfo.length>1){
      let index = errorList.findIndex(item=>item.data.errStr===errStr);
      if(index >-1){
        errorList[index] = pushInfo;
      }else{
        pushInfo && errorList.push(pushInfo);
      }
    }else{
      pushInfo && errorList.push(pushInfo);
    }
    trigger("onErrorPush");
  }
}

function doPost() {
  if (!errorList.length) return;
  const arr = errorList.slice(0);
  errorList.length = 0;
  postError({
    list: arr,
  });
}

function loopPostData() {
  const config: ConfigOption = getConfig();
  const { delay } = config;
  listen("onErrorPush", () => {
    if (delay && delay > 0) {
      if (!timer) {
        timer = setInterval(() => {
          doPost();
        }, delay);
      }
    } else {
      if (timer) {
        clearInterval(timer);
        timer = null;
        doPost();
      }
    }
  });
}

export function initErrorPost() {
  loopPostData();
}


export interface ErrorInfo{
  data: ErrorData;
  length: number;
  times: number[];
}

export interface ErrorData {
  name: string;
  message: string;
  stack: string;
  errStr: string;
  errorType: string;
  time: number;
}