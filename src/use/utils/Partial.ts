import { noop } from './noop';

/**
 * @function
 * @name partial
 * @inner
 */
export function partial(fn: Function, ...args: any[]) {
  if (typeof fn !== 'function') {
    return noop;
  }

  if (args.length >= fn.length) {
    return fn(...args);
  }

  return function executor(...evalArgs: any[]) {
    return partial.apply(null, [fn, ...args, ...evalArgs]);
  };
}
