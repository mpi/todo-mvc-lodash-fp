import { AnyAction, Action } from 'redux';

type A = Action & AnyAction;

export function completeItem(title: string): A {
  return {
    type: 'COMPLETE_ITEM',
    title
  };
}

export function addItem(input: HTMLInputElement): A {
  return {
    type: 'ADD_ITEM',
    title: input.value
  };
}

export function changeText(input: HTMLInputElement): A {
  return {
    type: 'CHANGE_TEXT',
    text: input.value
  };
}
