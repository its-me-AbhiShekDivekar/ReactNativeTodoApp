import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from './todoConstants';
import {useSelector} from 'react-redux';

function addTodoAction(item) {
  return {
    type: actions.ADD_TODO,
    data: item,
  };
}

function fetchDataFromStoreAction(item) {
  return {
    type: actions.FETCH_DATA_FROM_STORE,
    data: item,
  };
}

function removeAllTodosAction(params) {
  return {
    type: actions.REMOVE_ALL_TODOS,
  };
}
function deleteSingleTodoAction(data) {
  return {
    type: actions.DELETE_SINGLE_TODO,
    data: data,
  };
}

function deleteSelectedAction(item) {
  return {
    type: actions.DELETE_SELECTED,
    data: item,
  };
}
function updateTodoAction(item) {
  return {
    type: actions.UPDATE_TODO,
    data: item,
  };
}
function changeColorAction(item) {
 return{ type:actions.CHANGE_COLOR,
  data:item}
}

function pinTodosAction(item) {
  return{
    type:actions.PINNED_TODOS,
    data:item
  }
}
export {
  addTodoAction,
  fetchDataFromStoreAction,
  removeAllTodosAction,
  deleteSingleTodoAction,
  deleteSelectedAction,
  updateTodoAction,
  changeColorAction,
  pinTodosAction
};
