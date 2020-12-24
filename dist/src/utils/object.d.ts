/**
 * Wrap a given object method with a higher-order function
 *
 * @param source An object that contains a method to be wrapped.
 * @param name A name of method to be wrapped.
 * @param replacement A function that should be used to wrap a given method.
 * @returns void
 */
export declare function fill(source: {
    [key: string]: any;
}, name: string, replacement: (...args: any[]) => any): void;
