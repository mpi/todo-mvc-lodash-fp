import { AnyAction, Action } from 'redux';

type A = Action & AnyAction;

export function toggleItem(title: string): A {
  return {
    type: type('TOGGLE_ITEM'), title
  };
}

export function addItem(title: string) {
  return { title, ...type('ADD_ITEM') };
}

export function changeText(text: string): A {
  return { text, ...type('CHANGE_TEXT') };
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

export function switchFilter(filter: string): A {
  return {
    type: 'SWITCH_FILTER', filter
  };
}

function type<X extends string>(t: X): Type<X> {
  return new Type<X>(t);
}

class Type<T>  {
  constructor(public readonly type: T){};
}