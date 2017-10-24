import { State } from '../state';
import { Reducer, reducerFor } from '../types';
import { AddItemAction, ChangeTitleAction, ToggleItemAction, ClearCompletedAction,
  ChangeTextAction, SwitchFilterAction, ToggleEditModeAction, Action } from '../actions';

import { patch } from './patch';
import { append, forAll, removeIf, nothing, matches, negate } from './utils';

// helpers:

const toggle = patch({ completed: negate });
const toggleEdit = patch({ editMode: negate });
const leaveEdit = patch({ editMode: false });
const isCompleted = matches({ completed: true });
const hasTitle = (value: string | RegExp) => matches({ title: value });
const updateTitle = (title: string) => patch({ title });

// reducers:

type AddItemReducer = Reducer<State, AddItemAction>;
type ChangeTitleReducer = Reducer<State, ChangeTitleAction>;
type ToggleItemReducer = Reducer<State, ToggleItemAction>;
type ClearCompletedReducer = Reducer<State, ClearCompletedAction>;
type ChangeTextReducer = Reducer<State, ChangeTextAction>;
type SwitchFilterReducer = Reducer<State, SwitchFilterAction>;
type ToggleEditModeReducer = Reducer<State, ToggleEditModeAction>;

export const addItem: AddItemReducer =
  ({ title }) => patch({
    items: append({ title, completed: false }),
    text: ''
  });

export const toggleItem: ToggleItemReducer =
  ({ title }) => patch({
    items: forAll(
      toggle.onlyIf(hasTitle(title)).otherwise(nothing)
    )
  });

export const changeTitle: ChangeTitleReducer =
  ({ text, title }) => patch({
    items: forAll(
      updateTitle(text).onlyIf(hasTitle(title)).otherwise(nothing)
    )
  });

export const clearCompleted: ClearCompletedReducer =
  () => patch({
    items: removeIf(isCompleted)
  });

export const changeText: ChangeTextReducer =
  ({ text }) => patch({ text });

export const switchFilter: SwitchFilterReducer =
  ({ filter }) => patch({ filter });

export const toggleEditMode: ToggleEditModeReducer =
  ({ title }) => patch({
    items: forAll(
      toggleEdit.onlyIf(hasTitle(title)).otherwise(leaveEdit)
    )
  });

// export default function reducerFor(action: Action) {
//   switch (action.type) {
//     case 'ADD_ITEM': return addItem(action);
//     case 'CHANGE_TITLE': return changeTitle(action);
//     case 'SWITCH_FILTER': return switchFilter(action);
//     case 'CHANGE_TEXT': return changeText(action);
//     case 'CLEAR_COMPLETED': return clearCompleted(action);
//     case 'TOGGLE_EDIT_MODE': return toggleEditMode(action);
//     case 'TOGGLE_ITEM': return toggleItem(action);
//     default: return nothing;
//   }
// }

export default reducerFor<State, Action>({
  ADD_ITEM: addItem,
  CHANGE_TITLE: changeTitle,
  SWITCH_FILTER: switchFilter,
  CHANGE_TEXT: changeText,
  CLEAR_COMPLETED: clearCompleted,
  TOGGLE_EDIT_MODE: toggleEditMode,
  TOGGLE_ITEM: toggleItem
});