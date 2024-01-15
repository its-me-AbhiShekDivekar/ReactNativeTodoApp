import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from './todoConstants';

const initialState = {
  todosList: [],
  pinnedTodosList: [],
};
export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TODO: {
      return {...state, todosList: [...state.todosList, action.data]};
    }

    case actions.FETCH_DATA_FROM_STORE: {
      return {...state, todosList: action.data};
    }

    case actions.REMOVE_ALL_TODOS: {
      return {
        todosList: [],
        pinnedTodosList: [],
      };
    }

    case actions.DELETE_SINGLE_TODO: {
      let filteredArray = state.todosList.filter(item => {
        return item.id != action.data.id;
      });
      let filteredPinnedArray = state.pinnedTodosList.filter(item => {
        return item != action.data.id;
      });
      action.data.afterSingleDeleted(filteredArray, filteredPinnedArray);
      return {
        pinnedTodosList: filteredPinnedArray,
        todosList: filteredArray,
      };
    }

    case actions.DELETE_SELECTED: {
      let newTodos = [...state.todosList];
      for (let i = 0; i < action.data.idsToDelete.length; i++) {
        let filtered = newTodos.filter(item => {
          return item.id != action.data.idsToDelete[i];
        });

        newTodos = [...filtered];
      }
      let newPinnedTodos = [...state.pinnedTodosList];
      for (let i = 0; i < action.data.idsToDelete.length; i++) {
        let filtered = newPinnedTodos.filter(item => {
          return item != action.data.idsToDelete[i];
        });

        newPinnedTodos = [...filtered];
      }
      action.data.afterSelectedDeleted(newTodos, newPinnedTodos);
      return {
        pinnedTodosList: [...newPinnedTodos],
        todosList: [...newTodos],
      };
    }

    case actions.UPDATE_TODO: {
      let filteredTodos = [];
      for (let i = 0; i < state.todosList.length; i++) {
        if (state.todosList[i].id == action.data.id) {
          filteredTodos[i] = {
            title: action.data.updateTodoTitle,
            data: action.data.updateTodoDesc,
            id: action.data.id,
            date: action.data.date,
          };
        } else {
          filteredTodos[i] = state.todosList[i];
        }
      }
      action.data.afterSelectedUpdated([...filteredTodos]);
      return {...state, todosList: [...filteredTodos]};
    }

    case actions.PINNED_TODOS: {
      AsyncStorage.setItem('pinned', JSON.stringify([...action.data]));
      return {...state, pinnedTodosList: [...action.data]};
    }
    default: {
      return {...state};
    }
  }
}

export function colorReducer(
  state = {primary: 'orange', secondary: 'gold', third: 'yellow'},
  action,
) {
  switch (action.type) {
    case actions.CHANGE_COLOR: {
      AsyncStorage.setItem('UIColor', JSON.stringify(action.data));
      return action.data;
    }
    default: {
      return {...state};
    }
  }
}
