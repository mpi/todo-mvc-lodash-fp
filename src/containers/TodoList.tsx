import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../state';
import * as actions from '../actions';

import TodoList from '../components/TodoList/TodoList';

type Actions = typeof actions;

function TodoListContainer(props: State & Actions) {

  const actions = {
    onClearCompleted: props.clearCompleted,
    onEditModeToggle: props.toggleEditMode,
    onFilterSwitch: props.toggleEditMode,
    onItemAdded: props.addItem,
    onItemToggle: props.toggleItem,
    onTitleChanged: props.changeTitle
  };

  return (
    <TodoList
      items={props.items}
      filter={props.filter}
      {...actions}
    />
  );

}

const connector = connect<State & Actions>(_.identity, actions);
export default connector(TodoListContainer);