const pluginObj = {
  
};


export function bindPlugin(pluginFn: any, library: any) {
  const pl = pluginFn(library);
  const {name , plugin}  = pl;
  if(name && plugin){
    plugin[name] = plugin;
  }
  return plugin;
}

export function getPlugin(name: string):any{
  return pluginObj[name]|| null;
}

export { pluginReact } from "./plugin-react";