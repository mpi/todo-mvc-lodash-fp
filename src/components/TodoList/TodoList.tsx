import * as _ from 'lodash';
import { KeyboardEvent, ChangeEvent } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';

import * as all from '../../actions';
import { State, TodoItem } from '../../state';
import { refTo } from '../../types';

type Actions = typeof all;

function TodoList(props: State & Actions) {

  let { text, items, filter } = props;
  let { addItem, changeText, switchFilter, clearCompleted } = props;

  let input = refTo(HTMLInputElement);

  const addOnEnter = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      addItem(input.ref.value);
    }
  };

  const countCompleted = () => _.sumBy(items, x => x.completed ? 0 : 1);
  const isFilteredBy = (value: string) => filter === value ? 'selected' : '';
  const filterBy = ({ completed }: TodoItem) =>
    filter === 'COMPLETED' ? completed :
      filter === 'ACTIVE' ? !completed :
        true;

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            ref={input}
            type="text"
            value={text}
            className="new-todo"
            onChange={() => changeText(input.ref.value)}
            onKeyPress={addOnEnter}
            placeholder="What needs to be done?"
          />
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label>Mark all as complete</label>
          <ul className="todo-list">
            {items.filter(filterBy).map(
              (item, i) =>
                <TodoItem key={i} {...item} {...props} />
            )
            }
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>{countCompleted()}</strong> items left</span>
          <ul className="filters">
            <li><a className={isFilteredBy('ALL')} onClick={() => switchFilter('ALL')}>All</a></li>
            <li><a className={isFilteredBy('ACTIVE')} onClick={() => switchFilter('ACTIVE')}>Active</a></li>
            <li><a className={isFilteredBy('COMPLETED')} onClick={() => switchFilter('COMPLETED')}>Completed</a></li>
          </ul>
          <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://github.com/tastejs/todomvc">TasteJS</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  );
}

function TodoItem({ title, completed, editMode, toggleEditMode, toggleItem, changeTitle }: TodoItem & Actions) {

  const onCheckboxChange = () => toggleItem(title);
  const onItemDoubleClick = () => toggleEditMode(title);
  const onBlur = () => toggleEditMode(title);
  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => changeTitle(target.value, title);

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

const connector = connect<State & Actions>(_.identity, all);

export default connector(TodoList);