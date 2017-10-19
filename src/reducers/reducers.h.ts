import { addItem } from '../actions';

interface Reducer<S, A> {
  (action: A): (state: S) => S;
}

interface State {
  items: { title: string, completed: boolean}[];
  text: string;
}

// interface AddAction {
//   title: string;
// }


const AddActionResult = returnOf(addItem);

export type AddItemReducer = Reducer<State, typeof AddActionResult>;

function returnOf<T>(fn: (...args: any[]) => T): T {
  return (false as true) && fn();
}

