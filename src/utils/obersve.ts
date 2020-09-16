const clientList = {};
function listen(key:  string, fn: Function){
  if (!clientList[key]) {
    clientList[key] = [];
  }
  clientList[key].push(fn); // 订阅的消息添加进缓存列表
}
function trigger(type: string, ...money: any) {
  let fns = clientList[type];
  if (!fns || fns.length === 0) {
    // 如果没有绑定对应的消息
    return false;
  }
  fns.forEach((fn: Function) => {
    fn.apply(this, ...money);
  });
}


function remove(key:  string, fn?: Function){
  if(!clientList[key])return false;
  if(!fn){
    clientList[key].length = 0;
    return true;
  }else{
    const index = clientList[key].findIndex(item=>item === fn)
    if(index>-1){
      clientList[key].splice(index,1);
      return true;
    }
    return false;
  }
}


export {
  listen,
  trigger,
  remove
}