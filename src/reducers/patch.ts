import * as _ from 'lodash/fp';

function customizer(this: any, val: any, op: any) {
  if (_.isFunction(op)) {
    return op.apply(this, [val]);
  }
  if (_.isRegExp(op)) {
    return op.test(val);
  }
}

interface Predicate {
  (arg: any): boolean;
}

interface Function {
  onlyIf<X extends Function>(this: X, condFn: Predicate): X;
  otherwise<X extends Function>(this: X, defaultFn: any): X;
}

Function.prototype['onlyIf'] = function (condFn: Function) {
  return _.cond([[condFn, this]]);
};

Function.prototype['otherwise'] = function (defaultFn: Function) {
  let noResult = _.flow(this, _.isUndefined);
  return _.cond([[noResult, defaultFn], [_.T, this]]);
};

// general-purpose, higher-order functions:

interface Transform<S> {
  (state: S): S
}

export interface Patch<S> extends Function {
  (state: Partial<S>): S
}

type Diff<S> = {
  [F in keyof S]?: S[F] | Transform<S[F]>;
}

export function patch<S, T extends S>(changes: Diff<S>): Patch<T> { return _.mergeWith(customizer, _, changes)};
