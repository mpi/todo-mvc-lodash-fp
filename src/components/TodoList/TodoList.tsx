import * as _ from 'lodash';
import * as React from 'react';
import { refTo } from '../../types';
import { State } from '../../state';

interface TodoListProps extends HeaderProps, ListProps, FooterProps {

  onItemToggle: (title: string) => void;
  onEditModeToggle: (title: string) => void;
  onTitleChanged: (title: string, newTitle: string) => void;
}

function TodoList(props: TodoListProps) {

  return (
    <div>
      <section className="todoapp">
        <Header
          onItemAdded={props.onItemAdded}
        />
        <List
          items={props.items}
          filter={props.filter}
        >
          {item =>
            <TodoItem
              title={item.title}
              completed={item.completed}
              editMode={item.editMode}
              onItemToggle={() => props.onItemToggle(item.title)}
              onEditModeToggle={() => props.onEditModeToggle(item.title)}
              onTitleChanged={(newTitle) => props.onTitleChanged(item.title, newTitle)}
            />
          }
        </List>
        <Footer
          items={props.items}
          filter={props.filter}
          onClearCompleted={props.onClearCompleted}
          onFilterSwitch={props.onFilterSwitch}
        />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://github.com/tastejs/todomvc">TasteJS</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  );
}

interface HeaderProps {
  onItemAdded: (title: string) => void;
}

function Header({ onItemAdded }: HeaderProps) {

  let input = refTo(HTMLInputElement);

  const addOnEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      onItemAdded(input.ref!.value);
      input.ref!.value = '';
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        ref={input}
        type="text"
        className="new-todo"
        onKeyPress={addOnEnter}
        placeholder="What needs to be done?"
      />
    </header>
  );
}

interface FooterProps {
  items: State.TodoItem[];
  filter: string;
  onClearCompleted: () => void;
  onFilterSwitch: (filter: 'ALL' | 'ACTIVE' | 'COMPLETED') => void;
}

function Footer({items, filter, onClearCompleted, onFilterSwitch}: FooterProps) {

  const countCompleted = () => _.sumBy(items, x => x.completed ? 0 : 1);
  const isFilteredBy = (value: string) => filter === value ? 'selected' : '';

  return (
    <footer className="footer">
      <span className="todo-count"><strong>{countCompleted()}</strong> items left</span>
      <ul className="filters">
        <li><a className={isFilteredBy('ALL')} onClick={() => onFilterSwitch('ALL')}>All</a></li>
        <li><a className={isFilteredBy('ACTIVE')} onClick={() => onFilterSwitch('ACTIVE')}>Active</a></li>
        <li><a className={isFilteredBy('COMPLETED')} onClick={() => onFilterSwitch('COMPLETED')}>Completed</a></li>
      </ul>
      <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
    </footer>
  );
}

interface Children<I> {
  children: (item: I) => JSX.Element;
}

interface ListProps {
  items: State.TodoItem[];
  filter: string;
}

function List({ items, filter, children }: ListProps & Children<State.TodoItem>) {

  const filterBy = ({ completed }: State.TodoItem) =>
    filter === 'COMPLETED' ? completed :
      filter === 'ACTIVE' ? !completed :
        true;

  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label>Mark all as complete</label>
      <ul className="todo-list">
        {items.filter(filterBy).map(children)}
      </ul>
    </section>
  );
}

interface TodoItemProps {
  title: string;
  completed: boolean;
  editMode?: boolean;
  onItemToggle: () => void;
  onEditModeToggle: () => void;
  onTitleChanged: (newValue: string) => void;
}

function TodoItem({ title, completed, editMode, onItemToggle, onEditModeToggle, onTitleChanged}: TodoItemProps) {

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => onTitleChanged(target.value);

  return editMode ? edit() : preview();

  function preview() {
    return (
      <li className={completed ? 'completed' : 'todo'} onDoubleClick={onEditModeToggle}>
        <input onChange={onItemToggle} checked={completed} className="toggle" type="checkbox" />
        <label>{title}</label>
      </li>
    );
  }

  function edit() {
    return (
      <li className="editing">
        <input
          onChange={onInputChange}
          autoFocus={true}
          onBlur={onEditModeToggle}
          className="edit"
          type="text"
          value={title}
        />
      </li>
    );
  }
}

export default TodoList;