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

export const ToggleItemAction = returnOf(toggleItem);
export type ToggleItemAction = typeof ToggleItemAction;

export const AddItemAction = returnOf(addItem);
export type AddItemAction = typeof AddItemAction;

export const ChangeTextAction = returnOf(changeText);
export type ChangeTextAction = typeof ChangeTextAction;

export const ChangeTitleAction = returnOf(changeTitle);
export type ChangeTitleAction = typeof ChangeTitleAction;

export const ClearCompletedAction = returnOf(clearCompleted);
export type ClearCompletedAction = typeof ClearCompletedAction;

export const ToggleEditModeAction = returnOf(toggleEditMode);
export type ToggleEditModeAction = typeof ToggleEditModeAction;

// export const SwitchFilterAction = returnOf(switchFilter);
// export type SwitchFilterAction = typeof SwitchFilterAction;

// alternatively:
export interface SwitchFilterAction extends ActionType<'SWITCH_FILTER'> {
  filter: string;
}

export type Action =
  | AddItemAction
  | ToggleItemAction
  | ChangeTextAction
  | ChangeTitleAction
  | ClearCompletedAction
  | ToggleEditModeAction
  | SwitchFilterAction;
