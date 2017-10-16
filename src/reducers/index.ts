import * as _ from 'lodash/fp';
import { Reducer, Action } from 'redux';
import * as all from './reducers';

const initial = {
  items: [
    { title: 'Learn React', completed: true },
    { title: 'Build pet project', completed: false }
  ],
  text: ''
};

interface Reducers {
  [key: string]: (action: any) => (state: any) => any;
}

const actionize: (text: string) => string = _.flow(_.snakeCase, _.toUpper);
const reducers = _.mapKeys(actionize, all) as Reducers;
const noop = () => _.identity;

function main(state = initial, action: Action) {

  let reducer = reducers[action.type] || noop;
  return reducer(action)(state);
};

export default main as Reducer<any>;