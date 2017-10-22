
// types:

export interface ActionType<T extends string> {
  readonly type: T;
}

export interface Reducer<S, A extends ActionType<string>> {
  (action: A): (state: S) => S;
}

export type Reducers<S, A extends ActionType<string>> = {
  [T in A['type']]?: Reducer<S, A & ActionType<T>>
}

// helpers:

export function type<T extends string>(t: T): ActionType<T> {
  class TypeImpl implements ActionType<T> {
    constructor(public readonly type: T) { };
  }
  return new TypeImpl(t);
}
export function returnOf<T>(fn: (...args: any[]) => T): T {
  return (false as true) && fn();
}

function noop<S>() { return (s: S) => s; };

export function reducerFor<S, A extends ActionType<string>>(reducers: Reducers<S, A>): Reducer<S, A> {
  return (action: A) => {
    return (reducers[action.type] || noop)(action);
  }
}
