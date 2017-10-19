import * as _ from 'lodash/fp';
import { Reducer, Action } from 'redux';
import * as all from './reducers';
import { State } from '../state';

const initial: State = {
  items: [
    { title: 'Learn React', completed: true },
    { title: 'Build pet project', completed: false }
  ],
  text: '',
  filter: 'ALL'
};

interface Reducers {
  [key: string]: (action: any) => (state: any) => any;
}

const actionize: (text: string) => string = _.flow(_.snakeCase, _.toUpper);
const reducers = _.mapKeys(actionize, all) as Reducers;
const noop = () => _.identity;

function main(state = initial, action: Action) {

  console.log(action.type, action);

  let reducer = reducers[action.type] || noop;
  return reducer(action)(state);
};

export default main as Reducer<any>;