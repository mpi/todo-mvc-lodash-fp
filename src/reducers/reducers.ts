import * as _ from 'lodash/fp';
import { patch, matches } from './patch';

export const addItem = ({title}: any) => patch({
  items: _.concat({title, completed: false}),
  text: ''
});

const forAll =  _.map;

const toggle = _.negate(_.identity);
const complete = patch({ completed: toggle });
const hasTitle = (value: string | RegExp) => matches({title: value});

export const completeItem = ({ title }: any) => patch({
  items: forAll(complete.onlyIf(hasTitle(title)).otherwise(_.identity)),
});

export const changeText = ({ text }: any) => patch({
  text: text
});
