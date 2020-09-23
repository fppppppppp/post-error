const pluginObj = {};
export function bindPlugin(pluginFn, library) {
    const pl = pluginFn(library);
    const { name, plugin } = pl;
    if (name && plugin) {
        plugin[name] = plugin;
    }
    return plugin;
}
export function getPlugin(name) {
    return pluginObj[name] || null;
}
export { pluginReact } from "./plugin-react";
//# sourceMappingURL=index.js.map