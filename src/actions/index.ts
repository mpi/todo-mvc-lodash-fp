import { AnyAction, Action } from 'redux';

type A = Action & AnyAction;

export function toggleItem(title: string): A {
  return {
    type: 'TOGGLE_ITEM', title
  };
}

export function addItem(title: string): A {
  return {
    type: 'ADD_ITEM', title
  };
}

export function changeText(text: string): A {
  return {
    type: 'CHANGE_TEXT', text
  };
}

export function changeTitle(text: string, title: string): A {
  return {
    type: 'CHANGE_TITLE', text, title
  };
}

export function clearCompleted(): A {
  return {
    type: 'CLEAR_COMPLETED'
  };
}

export function toggleEditMode(title: string): A {
  return {
    type: 'TOGGLE_EDIT_MODE', title
  };
}

