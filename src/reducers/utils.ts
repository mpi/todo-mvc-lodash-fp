import * as _ from 'lodash/fp';

function customizer(this: any, val: any, op: any) {
  if (_.isFunction(op)) {
    return op.apply(this, [val]);
  }
  if (_.isRegExp(op)) {
    return op.test(val);
  }
}

export const nothing = _.identity;
export function forAll<T, U extends T>(fn: (t: T) => U): (list: T[]) => U[] { return _.map<T, U>(fn) };
export const removeIf = _.reject;
export const append = _.concat;
export const negate = _.negate((v: boolean) => v);
export const matches = _.isMatchWith(customizer);
