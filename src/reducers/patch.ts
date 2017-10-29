import * as _ from 'lodash/fp';

function customizer(this: {}, val: {}, op: Function | RegExp | {}) {
  if (_.isFunction(op)) {
    return op.apply(this, [val]);
  }
  if (_.isRegExp(op)) {
    return op.test(val as string);
  }
}

interface Predicate<X> {
  (arg: X): boolean;
}

interface Fn<X> {
  (arg: X): X;
}

declare global {

  interface Function {
    onlyIf<X>(condFn: Predicate<X>): this;
    otherwise<X>(defaultFn: Fn<X>): this;
  }

}

Function.prototype.onlyIf = function onlyIf<X>(condFn: Predicate<X>) {
  return _.cond([[condFn, this]]);
};

Function.prototype.otherwise = function otherwise<X>(defaultFn: Fn<X>) {
  let noResult = _.flow(this, _.isUndefined);
  return _.cond([[noResult, defaultFn], [_.T, this]]);
};

// general-purpose, higher-order functions:

interface Transform<S> {
  (state: S): S;
}

export interface Patch<S> extends Function {
  (state: S): S;
}

type Diff<S> = {
  [F in keyof S]?: S[F] | Transform<S[F]>;
};

export function patch<S, T extends S>(changes: Diff<S>): Patch<T> { return _.mergeWith(customizer, _, changes); }

// utils

export const nothing = _.identity;
export const noop = _.identity;
export const forAll = _.map;
export const removeIf = _.reject;
export const append = _.concat;
export const negate = _.negate(_.identity);
export const matches = _.isMatchWith(customizer);