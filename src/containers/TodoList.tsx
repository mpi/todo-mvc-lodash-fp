import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../state';
import * as actions from '../actions';

import TodoList from '../components/TodoList/TodoList';

type Actions = typeof actions;

function container(props: State & Actions) {

  return (
    <TodoList {...props}/>
  );

}

const connector = connect<State & Actions>(_.identity, actions);
export default connector(container);