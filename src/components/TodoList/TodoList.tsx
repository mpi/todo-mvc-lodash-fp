import * as _ from 'lodash';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { addItem, completeItem, changeText } from '../../actions';

import './TodoList.css';

function TodoList({ text, items, add, complete, change }: any) {

  let input: HTMLInputElement;

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input ref={n => n ? input = n : null} type="text" value={text} className="new-todo"
            onChange={() => change(input)}
            onKeyPress={(ev) => add(ev)}
            placeholder="What needs to be done?"/>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox"/>
          <label>Mark all as complete</label>
          <ul className="todo-list">
            {items.map((i: any) => <TodoItem {...i} complete={complete} key={i.title} />)}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>2</strong>items left</span>
          <ul className="filters">
            <li><a className="selected">All</a></li>
            <li><a>Active</a></li>
            <li><a>Completed</a></li>
          </ul>
          <button className="clear-completed" >Clear completed</button>
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

function TodoItem({ title, completed, complete }: any) {
  return (
    <li className={completed ? 'completed' : 'todo'} onClick={() => complete(title)}>
      <input checked={completed} className="toggle" type="checkbox"/>
      <label>{title}</label>
    </li>
  );
}

const actions = (dispatch: Dispatch<any>) => ({
  add: (event: KeyboardEvent) => {if(event.key === 'Enter') dispatch(addItem(event.target as HTMLInputElement))},
  complete: (item: string) => dispatch(completeItem(item)),
  change: (input: HTMLInputElement) => dispatch(changeText(input))
});

const connector = connect(_.identity, actions);

export default connector(TodoList);