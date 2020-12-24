import { xhm } from "../service/xhm";
import { getConfig  } from "@/config/global-config"
export const autoTrack = function () {
  document.body.addEventListener("click", (e: any) => {
    let target = e.target as HTMLElement;
    if (target.nodeType === Node.TEXT_NODE) {
      target = target.parentNode as HTMLElement;
    }
    if (shouldAutoTrackDomEvent(target, e)) {
      track(e);
    }
  });
}

export const track = function (target: HTMLElement, check = true) {
  // 如果满足监测条件，那么从当前标签开始，向上追溯到body标签，并记录这条路径上所有的元素到一个数组中
  if (target.nodeType === Node.TEXT_NODE) {
    target = target.parentNode as HTMLElement;
  }
  let postOtpion;
  var targetElementList: HTMLElement[] = [target];
  var curEl = target;
  while (curEl.parentNode && !(curEl.tagName.toLowerCase()==='body')) {
    targetElementList.push(curEl.parentNode as HTMLElement);
    curEl = curEl.parentNode as HTMLElement;
  }
  // 按照刚才记录的路径开始遍历（相当于自底向上）
  var href,elements =[];
  const noTrackClass = getConfig().notTrackClass;
  for(let i = 0 ;i<targetElementList.length;i++){
    const el = targetElementList[i];
    if (el.tagName.toLowerCase() === 'a') {
      href = el.getAttribute('href') || "";
    }
    // allow users to programatically prevent tracking of elements by adding class 'mp-no-track'
    // 如果不希望某个节点被监测，开发者可以设置一个名为`mp-no-track`的css class
    var classes = el.className && el.className.split(" ") || [];
    if (classes.filter( (val)=> noTrackClass.includes(val)).length) {
      return false;
    }
    elements.push(el.nodeName && ( el.nodeName.toLocaleLowerCase() + (el.id ? "#" + el.id : "") +classes.map(e=>'.'+e ).join(" .")))
  }
  // 处理采集到的属性，这里面有几个getXXXProperties(element/elements)方法（_getPropertiesFromElement、_getDefaultProperties、_getCustomProperties、_getFormFieldProperties），就是在读取各种属性
  
  postOtpion = {
    elements,
    target_text: target.textContent.slice(0, 255),
    a_href:href,
    info:target.getAttribute("data-track")||'',
    tag_name:target.tagName.toLowerCase(),
    element_path:elements.reverse().join(' '),
    track_id:target.getAttribute("data-track-id")||'',
    
  };
  xhm(postOtpion, 'cl');
  return true;
}

// _trackEvent之前，需要判断标签上的发生的事件是不是应该被autotrack监测上报
function shouldAutoTrackDomEvent(element, event) {
  const config = getConfig()
  // html根节点下面的事件不需要监测
  if (!element || element.tagName.toLowerCase() === 'HTML' || element.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  if(element.getAttribute("data-track-id")){
    return true;
  }

  var tag = element.tagName.toLowerCase();
  // 如果是自动上传
  if(config.autoTrack && !config.autoTrackTag.includes(tag)){
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
      } else {
        return event.type === 'click';
      }
    case 'select':
    case 'textarea':
      return event.type === 'change';
    default:
      return event.type === 'click';
  }
}

