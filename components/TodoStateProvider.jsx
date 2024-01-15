import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import TodoMainComponent from './TodoMainComponent';
import store from '../reduxComponents/todoStorage';
const TodoStateProvider = () => {
  return (
    <Provider store={store}>
      <TodoMainComponent />
    </Provider>
  );
};

export default TodoStateProvider;

const styles = StyleSheet.create({});
