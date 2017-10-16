import * as _ from 'lodash/fp';

function customizer(this: any, val: any, op: any) {
  if (_.isFunction(op)) {
    return op.apply(this, [val]);
  }
  if (_.isRegExp(op)) {
    return op.test(val);
  }
}

interface Function {
  onlyIf: (condFn: Function) => Function;
  otherwise: (condFn: Function) => Function;
}

Function.prototype['onlyIf'] = function (condFn: Function) {
  return _.cond([[condFn, this]]);
};

Function.prototype['otherwise'] = function (defaultFn: Function) {
  let noResult = _.flow(this, _.isUndefined);
  return _.cond([[noResult, defaultFn], [_.T, this]]);
};

// general-purpose, higher-order functions:

export const patch = (recipe: any) => _.mergeWith(customizer, _, recipe);
export const matches = _.isMatchWith(customizer);
// export const matches = _.isMatchWith(customizer);
// let forAll = _.map;
// let removeIf = _.reject;
// let toggle = _.negate(_.identity);
