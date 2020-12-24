function _getLocalNamePath(elm) {
  const domPath = [];
  let preCount = 0;
  for (let sib = elm.previousSibling; sib; sib = sib.previousSibling) {
    if (sib.localName == elm.localName) preCount ++;
  }
  if (preCount === 0) {
    domPath.push(elm.localName);
  } else {
    domPath.push(`${elm.localName}:nth-of-type(${preCount + 1})`);
  }
  return domPath;
}
 export function getDomPath(elm) {
  try {
    let domPath = [];
    let hasId = false;
    while (elm && elm.nodeType == 1 && !hasId) {
      if (elm.hasAttribute('id')) {
        domPath.push(`#${elm.getAttribute('id')}`);
        hasId = true;
      } else {
        domPath.push(..._getLocalNamePath(elm));
        elm = elm.parentNode;
      }
    }
    return domPath.length ? domPath.reverse().join(' ') : null
  } catch (err) {
    console.log(err)
    return null;
  }
}

