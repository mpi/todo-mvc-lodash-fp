
type DisplayMode = 'ALL' | 'COMPLETED' | 'ACTIVE';

interface TodoListApp {
  text: string;
  items: TodoList;
  filter: DisplayMode;
}

type TodoList = TodoItem[];

interface TodoItem {
  title: string;
  completed: boolean;
}

export type State = TodoListApp;

export const initial: State = {
  items: [
    { title: 'Learn React', completed: true },
    { title: 'Build pet project', completed: false }
  ],
  text: '',
  filter: 'ALL'
};