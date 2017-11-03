import * as _ from 'lodash';
import * as React from 'react';

import { refTo } from '../../types';

import * as all from '../../actions';
import { State } from '../../state';

type Actions = typeof all;

function TodoList(props: State & Actions) {

  return (
    <div>
      <section className="todoapp">
        <Header {...props}/>
        <List {...props}>
          {item => <TodoItem {...item} {...props} />}
        </List>
        <Footer {...props}/>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://github.com/tastejs/todomvc">TasteJS</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  );
}

function Header({ text, addItem, changeText }: State & Actions) {

  let input = refTo(HTMLInputElement);

  const addOnEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      addItem(input.ref!.value);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        ref={input}
        type="text"
        value={text}
        className="new-todo"
        onChange={() => changeText(input.ref!.value)}
        onKeyPress={addOnEnter}
        placeholder="What needs to be done?"
      />
    </header>
  );
}

function Footer({items, filter, clearCompleted, switchFilter}: State & Actions) {

  const countCompleted = () => _.sumBy(items, x => x.completed ? 0 : 1);
  const isFilteredBy = (value: string) => filter === value ? 'selected' : '';

  return (
    <footer className="footer">
      <span className="todo-count"><strong>{countCompleted()}</strong> items left</span>
      <ul className="filters">
        <li><a className={isFilteredBy('ALL')} onClick={() => switchFilter('ALL')}>All</a></li>
        <li><a className={isFilteredBy('ACTIVE')} onClick={() => switchFilter('ACTIVE')}>Active</a></li>
        <li><a className={isFilteredBy('COMPLETED')} onClick={() => switchFilter('COMPLETED')}>Completed</a></li>
      </ul>
      <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
}

interface Children<I> {
  children: (item: I) => JSX.Element;
}

function List({ items, filter, children }: State & Actions & Children<State.TodoItem>) {

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

function TodoItem({ title, completed, editMode, toggleEditMode, toggleItem, changeTitle}: State.TodoItem & Actions) {

  const onCheckboxChange = () => toggleItem(title);
  const onItemDoubleClick = () => toggleEditMode(title);
  const onBlur = () => toggleEditMode(title);
  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => changeTitle(target.value, title);

  return editMode ? edit() : preview();

  function preview() {
    return (
      <li className={completed ? 'completed' : 'todo'} onDoubleClick={onItemDoubleClick}>
        <input onChange={onCheckboxChange} checked={completed} className="toggle" type="checkbox" />
        <label>{title}</label>
      </li>
    );
  }

  function edit() {
    return (
      <li className="editing" onDoubleClick={onItemDoubleClick}>
        <input onChange={onInputChange} autoFocus={true} onBlur={onBlur} className="edit" type="text" value={title} />
      </li>
    );
  }
}

export default TodoList;