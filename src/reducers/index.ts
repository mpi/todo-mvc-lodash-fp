import { initial } from '../state';
import { Action } from '../actions';
import reducerFor from './reducers';

function main(state = initial, action: Action) {

  const reduce = reducerFor(action);
  return reduce(state);
};

export default main;