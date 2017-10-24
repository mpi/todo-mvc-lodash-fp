import { initial, State } from '../state';
import { Action } from '../actions';
import reducerFor from './reducers';

function main(state: State = initial, action: Action) {
  const reduce = reducerFor(action);
  return reduce(state);
}

export default main;