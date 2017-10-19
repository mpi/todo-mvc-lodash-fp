
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