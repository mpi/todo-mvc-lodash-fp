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
export const forAll = _.map;
export const removeIf = _.reject;
export const append = _.concat;
export const negate = _.negate(_.identity);
export const matches = _.isMatchWith(customizer);
