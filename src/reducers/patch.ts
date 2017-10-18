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

interface Transform<X> {
  (arg: X): X;
}

type Recipe<S> = {
  [K in keyof S]?: S[K] | Transform<S[K]>;
}

interface Patch<S> extends Function {
  (state: S): S
}

export function patch<S>(recipe: Recipe<S>): Patch<S> { return _.mergeWith(customizer, _, recipe)};
export const matches = _.isMatchWith(customizer);
// export const matches = _.isMatchWith(customizer);
// let forAll = _.map;
// let removeIf = _.reject;
// let toggle = _.negate(_.identity);
