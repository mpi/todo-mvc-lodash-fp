
export namespace State {

  type DisplayMode = 'ALL' | 'COMPLETED' | 'ACTIVE';

  export interface TodoListApp {
    text: string;
    items: TodoList;
    filter: DisplayMode;
  }

  type TodoList = TodoItem[];

  export interface TodoItem {
    title: string;
    completed: boolean;
    editMode?: boolean;
  }

}

export type State = State.TodoListApp;

export const initial: State = {
  items: [
    { title: 'Learn React', completed: true },
    { title: 'Build pet project', completed: false }
  ],
  text: '',
  filter: 'ALL'
};
