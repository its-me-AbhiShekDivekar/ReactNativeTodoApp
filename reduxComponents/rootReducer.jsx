import {combineReducers} from 'redux';
import todoReducer, { colorReducer } from './todoReducer';
const rootReducer = combineReducers({
  todoReducer: todoReducer,
  colorReducer:colorReducer
});
export default rootReducer;
