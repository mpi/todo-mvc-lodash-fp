import { type, returnOf, ActionType } from '../types';

export function toggleItem(title: string) {
  return { title, ...type('TOGGLE_ITEM') };
}

export function addItem(title: string) {
  return { title, ...type('ADD_ITEM') };
}

export function changeText(text: string) {
  return { text, ...type('CHANGE_TEXT') };
}

export function changeTitle(text: string, title: string) {
  return { text, title, ...type('CHANGE_TITLE') };
}

export function clearCompleted() {
  return { ...type('CLEAR_COMPLETED') };
}

export function toggleEditMode(title: string) {
  return { title, ...type('TOGGLE_EDIT_MODE') };
}

export function switchFilter(filter: 'ALL' | 'COMPLETED' | 'ACTIVE'): SwitchFilterAction {
  return { filter, ...type('SWITCH_FILTER') };
}

const ToggleItemActionRet = returnOf(toggleItem);
export type ToggleItemAction = typeof ToggleItemActionRet;

const AddItemActionRet = returnOf(addItem);
export type AddItemAction = typeof AddItemActionRet;

const ChangeTextActionRet = returnOf(changeText);
export type ChangeTextAction = typeof ChangeTextActionRet;

const ChangeTitleActionRet = returnOf(changeTitle);
export type ChangeTitleAction = typeof ChangeTitleActionRet;

const ClearCompletedActionRet = returnOf(clearCompleted);
export type ClearCompletedAction = typeof ClearCompletedActionRet;

const ToggleEditModeActionRet = returnOf(toggleEditMode);
export type ToggleEditModeAction = typeof ToggleEditModeActionRet;

// export const SwitchFilterAction = returnOf(switchFilter);
// export type SwitchFilterAction = typeof SwitchFilterAction;

// alternatively:
export interface SwitchFilterAction extends ActionType<'SWITCH_FILTER'> {
  filter: 'ALL' | 'COMPLETED' | 'ACTIVE';
}

export type Action =
  | AddItemAction
  | ToggleItemAction
  | ChangeTextAction
  | ChangeTitleAction
  | ClearCompletedAction
  | ToggleEditModeAction
  | SwitchFilterAction;
