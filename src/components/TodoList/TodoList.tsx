import * as _ from 'lodash';
import * as React from 'react';
import {KeyboardEvent} from 'react';
import { connect, Dispatch } from 'react-redux';
import * as all from '../../actions';

import './TodoList.css';
import { bindActionCreators } from 'redux';

function TodoList({ text, items, actions }: any) {

  let input: HTMLInputElement;

  let addOnEnter = (ev: KeyboardEvent<HTMLInputElement>) => {
    if(ev.key === 'Enter'){
      actions.addItem(input.value);
    }
  };

  function countCompleted() {
    return _.sumBy(items, (x: {completed: boolean}) => x.completed ? 0 : 1);
  }

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input ref={n => n ? input = n : null} type="text" value={text} className="new-todo"
            onChange={() => actions.changeText(input.value)}
            onKeyPress={addOnEnter}
            placeholder="What needs to be done?"/>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox"/>
          <label>Mark all as complete</label>
          <ul className="todo-list">
            {items.map((i: any) => <TodoItem {...i} actions={actions} />)}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>{countCompleted()}</strong> items left</span>
          <ul className="filters">
            <li><a className="selected">All</a></li>
            <li><a>Active</a></li>
            <li><a>Completed</a></li>
          </ul>
          <button className="clear-completed" onClick={actions.clearCompleted}>Clear completed</button>
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

function TodoItem({ title, completed, editMode, actions }: any) {
  return (
    !editMode ?
    <li className={completed ? 'completed' : 'todo'} onDoubleClick={() => actions.toggleEditMode(title)}>
      <input onChange={() => actions.toggleItem(title)} checked={completed} className="toggle" type='checkbox'/>
      <label>{title}</label>
    </li>
    :
    <li className="editing" onDoubleClick={() => actions.toggleEditMode(title)}>
        <input onChange={($ev) => actions.changeTitle($ev.target.value, title)} autoFocus={true} onBlur={() => actions.toggleEditMode(title)} className="edit" type='text' value={title} />
    </li>
  );
}

const actions = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators(all as any, dispatch)
});

const connector = connect(_.identity, actions);

export default connector(TodoList);