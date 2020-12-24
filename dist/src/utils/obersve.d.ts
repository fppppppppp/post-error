declare function listen(key: string, fn: Function): void;
declare function trigger(type: string, ...money: any): boolean;
declare function remove(key: string, fn?: Function): boolean;
export { listen, trigger, remove };
