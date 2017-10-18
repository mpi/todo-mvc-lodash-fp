import * as _ from 'lodash/fp';
import { patch, matches } from './patch';

type ConcatFn = {
  <T>(t: T): (t:T[]) => T[];
}

const forAll =  _.map;

const negate = _.negate(_.identity);
const toggle = patch({ completed: negate });
const toggleEdit = patch({ editMode: negate });
const leaveEdit = patch({ editMode: false });

const updateTitle = (title: string) => patch({title});

const complete = patch({ completed: true });
const hasTitle = (value: string | RegExp) => matches({title: value});
const isCompleted = matches({completed: true});
const removeIf = _.reject;
const append: ConcatFn = _.concat;

// function append<T>(element: T): (arr: T[]) => T[] {
//   return _.concat(element);
// }

// reducers:

interface Reducer<S, A> {
  (action: A): (state: S) => S;
}

interface State {
  items: { title: string, completed: boolean}[];
  text: string;
}

interface AddAction {
  title: string;
}

type AddItemReducer = Reducer<State, AddAction>;

export const addItem: AddItemReducer = ({ title }) => patch({
  items: append({ title, completed: false }),
  text: ''
});

export const toggleItem = ({ title }: any) => patch({
  items: forAll(toggle.onlyIf(hasTitle(title)).otherwise(_.identity)),
});

export const changeTitle = ({ text, title }: any) => patch({
  items: forAll(updateTitle(text).onlyIf(hasTitle(title)).otherwise(_.identity)),
});

export const completeAll = ({ title }: any) => patch({
  items: forAll(complete.onlyIf(hasTitle(title)).otherwise(_.identity)),
});

export const clearCompleted = () => patch({
  items: removeIf(isCompleted)
});

export const changeText = ({ text }: any) => patch({
  text: text
});

export const toggleEditMode = ({ title }: any) => patch({
  items: forAll(toggleEdit.onlyIf(hasTitle(title)).otherwise(leaveEdit)),
});

