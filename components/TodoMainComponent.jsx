import {
  Animated,
  FlatList,
  Keyboard,
  Modal,
  PanResponder,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState,useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodoAction,
  deleteSingleTodoAction,
  fetchDataFromStoreAction,
  removeAllTodosAction,
  deleteSelectedAction,
  updateTodoAction,
  changeColorAction,
  pinTodosAction,
} from '../reduxComponents/todoActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EachTodoSlide from './EachTodoSlide';
import {todoMainComponentStyleFunc} from '../componentStyles/TodoMainComponentStyle';
const TodoMainComponent = () => {
  const position=useRef(new Animated.ValueXY()).current;
  const panResponder=useRef(PanResponder.create({
    onMoveShouldSetPanResponder:()=>true,
    onPanResponderMove:Animated.event([null,{dx:position.x,dy:position.y}]),
    onPanResponderRelease:()=>{
      position.extractOffset()
    }
  })).current;
  const [idsToDelete, setIdsToDelete] = useState([]);
  const [todo, setTodo] = useState('');
  const [title, setTitle] = useState('');
  const [select, setSelect] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  const [deleteSelectedModal, setDeleteSelectedModal] = useState(false);
  const [id, setId] = useState(null);
  const [UIToDisplay, setUIToDisplay] = useState(true);
  const [addModal, setAddmodal] = useState(false);
  const [colorUIModal, setColorUIModal] = useState(false);
  const dispatch = useDispatch();
  const dataFromStore = useSelector(
    state => state.rootReducer.todoReducer.todosList,
  );

  const colordata = useSelector(state => state.rootReducer.colorReducer);

  const styles = todoMainComponentStyleFunc(colordata);

  const pinnedTodosData = useSelector(
    state => state.rootReducer.todoReducer.pinnedTodosList,
  );

  useEffect(() => {
    fetchUIColorFromAsync();
    fetchDataFromStore();
    fetchPinnedTodosFromStore();
  }, []);

  let afterPinned = [...dataFromStore];

  filterPinned();

  async function fetchPinnedTodosFromStore() {
    let pinnedTodosStoreData = await AsyncStorage.getItem('pinned');
    console.log(pinnedTodosStoreData);
    if (pinnedTodosStoreData != null) {
      dispatch(pinTodosAction(JSON.parse(pinnedTodosStoreData)));
    }
  }

  function sendPinnedTodosToStore(newPinned) {
    dispatch(pinTodosAction(newPinned));
  }

  function filterPinned(params) {
    if (pinnedTodosData?.length != 0) {
      let pinnedOnly = [];
      for (let i = 0; i < pinnedTodosData?.length; i++) {
        for (let j = 0; j < dataFromStore?.length; j++) {
          if (pinnedTodosData[i] == dataFromStore[j].id) {
            pinnedOnly = [...pinnedOnly, dataFromStore[j]];
          }
        }
      }

      let notPinned = [...dataFromStore];

      for (let i = 0; i < pinnedTodosData.length; i++) {
        for (let j = 0; j < notPinned.length; j++) {
          if (pinnedTodosData[i] == notPinned[j].id) {
            notPinned.splice(j, 1);
          }
        }
      }

      afterPinned = [...pinnedOnly, ...notPinned];
    }
  }

  async function fetchUIColorFromAsync(params) {
    let UIColorData = await AsyncStorage.getItem('UIColor');
    if (UIColorData != null) {
      dispatch(changeColorAction(JSON.parse(UIColorData)));
    }
  }

  function changeUIColor(item) {
    dispatch(changeColorAction(item));
  }
  function selectAll(params) {
    let newIdsToDelete = [];
    if (idsToDelete.length != dataFromStore.length) {
      for (let i = 0; i < dataFromStore.length; i++) {
        newIdsToDelete[i] = dataFromStore[i].id;
      }
      setIdsToDelete(newIdsToDelete);
    } else {
      setIdsToDelete([]);
    }
  }

  async function afterSelectedUpdated(newTodos) {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (error) {
      console.warn('Unable To Update Selected Todo');
    }
    setId(null);
  }

  function updateTodo(item) {
    if (
      item.updateTodoDesc != null &&
      item.updateTodoDesc.length != '' &&
      item.updateTodoDesc.trim().length != 0 &&
      item.updateTodoTitle != null &&
      item.updateTodoTitle.length != '' &&
      item.updateTodoTitle.trim().length != 0
    ) {
      const time = new Date();
      date = time.toLocaleString();
      dispatch(updateTodoAction({...item, date, afterSelectedUpdated}));
      item.setUpdateModal(false);
    } else {
      console.warn('Invalid Input !!! Please Give Valid Input');
    }
  }

  async function afterSelectedDeleted(newTodos, newPinnedTodos) {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      await AsyncStorage.setItem('pinned', JSON.stringify(newPinnedTodos));
    } catch (error) {
      console.warn('Unable To Delete Selected Todos');
    }
    setIdsToDelete([]);
  }
  function deleteSelectedTodos() {
    dispatch(deleteSelectedAction({idsToDelete, afterSelectedDeleted}));
  }

  async function afterSingleDeleted(updatedData, updatedPinnedData) {
    await AsyncStorage.setItem('todos', JSON.stringify(updatedData));
    await AsyncStorage.setItem('pinned', JSON.stringify(updatedPinnedData));
  }

  function deleteSingle(id) {
    dispatch(deleteSingleTodoAction({id, afterSingleDeleted}));
  }

  function clearAllTodos(params) {
    AsyncStorage.multiRemove(['todos', 'pinned']);
    dispatch(removeAllTodosAction());
  }
  async function fetchDataFromStore(params) {
    try {
      let storeData = await AsyncStorage.getItem('todos');
      if (storeData != null) {
        let convertedData = JSON.parse(storeData);
        dispatch(fetchDataFromStoreAction(convertedData));
      }
    } catch (error) {
      console.alert('Error In Getting The Data From Store', error);
    }
  }

  async function addTodo(item) {
    if (
      item.title != null &&
      item.title != '' &&
      item.title.trim().length != 0 &&
      item.todo != null &&
      item.todo != '' &&
      item.todo.trim().length != 0
    ) {
      let time = new Date();

      try {
        let newID = 0;
        if (dataFromStore.length != 0) {
          newID = dataFromStore[dataFromStore?.length - 1]?.id + 1;
        }

        await AsyncStorage.setItem(
          'todos',
          JSON.stringify([
            ...dataFromStore,
            {
              title: item.title,
              data: item.todo,
              id: newID,
              date: time.toLocaleString(),
            },
          ]),
        );
        dispatch(
          addTodoAction({
            title: item.title,
            data: item.todo,
            id: newID,
            date: time.toLocaleString(),
          }),
        );
        setTodo('');
      } catch (error) {
        console.warn('Error In Adding Todos To List', error);
      }
      setAddmodal(false);
    } else {
      console.warn('Pass Vaild Input');
    }
  }
  let colorUIButtonsList = [
    {
      primary: 'green',
      secondary: '#00ff55',
      third: '#4dff88',
    },
    {
      primary: 'purple',
      secondary: '#ba55d3',
      third: '#d8bfd8',
    },
    {
      primary: '#ff0000',
      secondary: '#ff6666',
      third: '#ff3333',
    },
    {
      primary: '#cc00cc',
      secondary: '#ff00ff',
      third: '#d8bfd8',
    },
    {
      primary: 'blue',
      secondary: '#0099ff',
      third: '#99d6ff',
    },
    {
      primary: 'orange',
      secondary: 'gold',
      third: 'yellow',
    },
  ];
  function changeActiveColorButtonPosition(params) {
    let newarray = [];
    for (let i = 0; i < colorUIButtonsList.length; i++) {
      if (colordata.primary != colorUIButtonsList[i].primary) {
        newarray.push(colorUIButtonsList[i]);
      }
    }
    newarray.push(colordata);
    colorUIButtonsList = newarray;
  }
  changeActiveColorButtonPosition();
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colordata.primary} />
      <Modal visible={colorUIModal} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setColorUIModal(false)}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.8)', flex: 1}}>
            <View style={[styles.changeColorUIButtonContainer]}>
              <FlatList
                style={{flex: 1, flexDirection: 'column-reverse'}}
                data={colorUIButtonsList}
                renderItem={({item}) => {
                  return (
                    <TouchableHighlight
                      underlayColor={item.secondary}
                      style={[
                        styles.colorUIButtonModal,
                        {backgroundColor: item.primary},
                      ]}
                      onPress={() => {
                        changeUIColor(item);
                        setColorUIModal(false);
                      }}>
                      <Text style={styles.addButtonText}>=</Text>
                    </TouchableHighlight>
                  );
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal visible={addModal} transparent={true}>
        <View style={styles.updateModal}>
          <TextInput
            placeholder="Write Your Todo Title Here"
            placeholderTextColor={colordata.primary}
            style={styles.input}
            onChangeText={value => setTitle(value)}
          />
          <TextInput
            multiline={true}
            placeholder="Enter Todo Description Here"
            placeholderTextColor={colordata.primary}
            onChangeText={value => setTodo(value)}
            style={styles.updateTodoinp}
          />
          <View style={styles.updateCancleButtonContainer}>
            <TouchableHighlight
              style={styles.deleteSingle}
              onPress={() => {
                addTodo({todo, title});
                Keyboard.dismiss();
              }}
              underlayColor={colordata.secondary}>
              <Text style={[styles.deleteSingleText, styles.updateText]}>
                ADD
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.deleteSingle}
              onPress={() => {
                setAddmodal(false);
                setTodo('');
                setTitle('');
              }}
              underlayColor={colordata.secondary}>
              <Text style={[styles.deleteSingleText, styles.updateText]}>
                CANCEL
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Modal visible={deleteAllModal} transparent={true}>
        <View style={styles.deleteModal}>
          <Text style={styles.confirmDeleteTitle}>
            CONFIRM YOU WANT TO DELETE ALL
          </Text>
          <View style={styles.confirmDeleteButtonsContainer}>
            <TouchableHighlight
              underlayColor={colordata.secondary}
              style={styles.deleteConfirmButtons}
              onPress={() => {
                clearAllTodos();
                setDeleteAllModal(false);
              }}>
              <Text style={styles.confirmDeleteButtonText}>YES</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colordata.secondary}
              style={styles.deleteConfirmButtons}
              onPress={() => {
                setDeleteAllModal(false);
              }}>
              <Text style={styles.confirmDeleteButtonText}>NO</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal visible={showConfirm} transparent={true}>
        <View style={styles.deleteModal}>
          <Text style={styles.confirmDeleteTitle}>
            CONFIRM YOU WANT TO DELETE
          </Text>
          <View style={styles.confirmDeleteButtonsContainer}>
            <TouchableHighlight
              underlayColor={colordata.secondary}
              style={styles.deleteConfirmButtons}
              onPress={() => {
                deleteSingle(id);
                setShowConfirm(false);
              }}>
              <Text style={styles.confirmDeleteButtonText}>YES</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colordata.secondary}
              style={styles.deleteConfirmButtons}
              onPress={() => {
                setShowConfirm(false);
                setId(null);
              }}>
              <Text style={styles.confirmDeleteButtonText}>NO</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal visible={deleteSelectedModal} transparent={true}>
        <View style={styles.deleteModal}>
          <Text style={styles.confirmDeleteTitle}>
            CONFIRM YOU WANT TO DELETE SELECTED TODOS FROM LIST
          </Text>
          <View style={styles.confirmDeleteButtonsContainer}>
            <TouchableHighlight
              underlayColor={colordata.secondary}
              style={styles.deleteConfirmButtons}
              onPress={() => {
                setSelect(!select);
                deleteSelectedTodos();
                setDeleteSelectedModal(false);
              }}>
              <Text style={styles.confirmDeleteButtonText}>YES</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colordata.secondary}
              style={styles.deleteConfirmButtons}
              onPress={() => {
                setDeleteSelectedModal(false);
              }}>
              <Text style={styles.confirmDeleteButtonText}>NO</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View style={styles.headerPart}>
        {idsToDelete.length ? (
          <TouchableHighlight
            underlayColor={colordata.secondary}
            style={styles.clearAll}
            onPress={() => {
              setDeleteSelectedModal(true);
            }}>
            <Text style={styles.clearAllText}>DELETE</Text>
          </TouchableHighlight>
        ) : null}

        <Text
          style={styles.heading}
          onPress={() => {
            setUIToDisplay(!UIToDisplay);
          }}>
          To Do
        </Text>
        {dataFromStore?.length && !select ? (
          <TouchableHighlight
            underlayColor={colordata.secondary}
            style={styles.clearAll}
            onPress={() => setDeleteAllModal(true)}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableHighlight>
        ) : dataFromStore?.length ? (
          <TouchableHighlight
            underlayColor={colordata.secondary}
            style={styles.clearAll}
            onPress={() => {
              selectAll();
            }}>
            {idsToDelete.length != dataFromStore?.length ? (
              <Text style={styles.clearAllText}>Select All</Text>
            ) : (
              <Text style={styles.clearAllText}>Deselect All</Text>
            )}
          </TouchableHighlight>
        ) : null}
      </View>
      {UIToDisplay ? (
        <View style={{flex: 1}}>
          {dataFromStore?.length != 0 ? (
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {afterPinned?.map(item => {
                  return (
                    <View key={item.id}>
                      <EachTodoSlide
                        setSelect={setSelect}
                        item={item}
                        setShowConfirm={setShowConfirm}
                        setId={setId}
                        select={select}
                        setIdsToDelete={setIdsToDelete}
                        idsToDelete={idsToDelete}
                        updateTodo={updateTodo}
                        id={id}
                        UIToDisplay={UIToDisplay}
                        afterPinned={afterPinned}
                        sendPinnedTodosToStore={sendPinnedTodosToStore}
                        pinnedTodosData={pinnedTodosData}
                      />
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <Text style={styles.noTodosAvailable}>
              NO TO DO'S AVAILABLE TO DISPLAY
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            numColumns={2}
            ListEmptyComponent={
              <Text style={styles.emptyTodos}>
                NO TO DO'S AVAILABLE TO DISPLAY
              </Text>
            }
            style={styles.FlatListStyle}
            data={afterPinned}
            renderItem={({item}) => {
              return (
                <EachTodoSlide
                  key={item.id}
                  setSelect={setSelect}
                  item={item}
                  setShowConfirm={setShowConfirm}
                  setId={setId}
                  select={select}
                  setIdsToDelete={setIdsToDelete}
                  idsToDelete={idsToDelete}
                  updateTodo={updateTodo}
                  id={id}
                  UIToDisplay={UIToDisplay}
                  afterPinned={afterPinned}
                  sendPinnedTodosToStore={sendPinnedTodosToStore}
                  pinnedTodosData={pinnedTodosData}
                />
              );
            }}
          />
        </View>
      )}
      <Animated.View style={[styles.animatedAdd,{transform:[{translateX:position.x},{translateY:position.y}]}]} {...panResponder.panHandlers}>
        <TouchableHighlight
        underlayColor={colordata.secondary}
        style={styles.addButton}
        onPress={() => {
          setAddmodal(true);
        }}
        >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableHighlight>
      </Animated.View>
      
      <TouchableHighlight
        underlayColor={colordata.secondary}
        style={styles.colorUI}
        onPress={() => {
          setColorUIModal(true);
        }}>
        <Text style={styles.addButtonText}>=</Text>
      </TouchableHighlight>
    </View>
  );
};

export default TodoMainComponent;
