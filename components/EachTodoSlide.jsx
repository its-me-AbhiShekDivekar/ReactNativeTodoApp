import {
  Dimensions,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {eachTodoSlideStyleFunc} from '../componentStyles/EachTodoSlideStyles';
import {useSelector} from 'react-redux';

const EachTodoSlide = ({
  item,
  setShowConfirm,
  select,
  setId,
  setIdsToDelete,
  idsToDelete,
  updateTodo,
  id,
  setSelect,
  UIToDisplay,
  afterPinned,
  pinnedTodosData,
  sendPinnedTodosToStore,
}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [updateTodoDesc, setUpdateTodoDesc] = useState('');
  const [updateTodoTitle, setUpdateTodoTitle] = useState('');
  const colorData = useSelector(state => state.rootReducer.colorReducer);
  const styles = eachTodoSlideStyleFunc(colorData);

  function addToListOFDelete(id) {
    if (idsToDelete.length == 0) {
      setIdsToDelete(preIds => {
        return [...preIds, id];
      });
    } else {
      let count = 0;
      for (let i = 0; i < idsToDelete.length; i++) {
        if (id == idsToDelete[i]) {
          count++;
        }
      }
      if (count == 0) {
        setIdsToDelete(preIds => {
          return [...preIds, id];
        });
      } else if (count > 0) {
        idsToDelete = idsToDelete.filter(item => {
          return item != id;
        });
        setIdsToDelete([...idsToDelete]);
      }
    }
  }

  function addToListOFPinned(id) {
    if (pinnedTodosData.length == 0) {
      pinnedTodosData = [id];
    } else {
      let count = 0;
      for (let i = 0; i < pinnedTodosData.length; i++) {
        if (id == pinnedTodosData[i]) {
          count++;
        }
      }
      if (count == 0) {
        pinnedTodosData = [...pinnedTodosData, id];
      } else if (count > 0) {
        pinnedTodosData = pinnedTodosData.filter(item => {
          return item != id;
        });
      }
    }
    sendPinnedTodosToStore(pinnedTodosData);
  }

  return select ? (
    <TouchableHighlight
      underlayColor={colorData.primary}
      style={[
        styles.eachTodoContainerTouchable,
        idsToDelete.includes(item.id)
          ? {backgroundColor: colorData.primary}
          : {backgroundColor: 'white'},

        UIToDisplay ? undefined : {width: '45%'},
        item?.id == afterPinned[afterPinned.length - 1]?.id ||
        (item?.id == afterPinned[afterPinned.length - 2]?.id && !UIToDisplay)
          ? {marginBottom: 80}
          : {marginBottom: 10},
      ]}
      onLongPress={() => {
        setSelect(!select);
      }}
      onPress={() => {
        addToListOFDelete(item.id);
      }}>
      <View style={styles.eachTodoContainer}>
        <View>
          <Text style={styles.dateOfCreation}>{item.date}</Text>
          <Text style={styles.todoTitle}>{item.title}</Text>
          <Text numberOfLines={4} style={styles.todoText}>
            {item.data}
          </Text>
        </View>
        <View style={styles.deleteSelected}>
          {idsToDelete.includes(item.id) ? (
            <View style={styles.deleteSelectedConfirm}></View>
          ) : null}
        </View>
      </View>
    </TouchableHighlight>
  ) : (
    <TouchableHighlight
      underlayColor={colorData.primary}
      style={[
        item?.id == afterPinned[afterPinned.length - 1]?.id ||
        (item?.id == afterPinned[afterPinned.length - 2]?.id && !UIToDisplay && afterPinned.length%2 == 0)
          ? {marginBottom: 80}
          : {marginBottom: 10},
        styles.eachTodoContainerTouchable,
        UIToDisplay ? undefined : {width: '45%'},
      ]}
      onLongPress={() => {
        setSelect(!select);
        setIdsToDelete([]);
      }}
      onPress={() => {
        setUpdateTodoTitle(item.title);
        setUpdateTodoDesc(item.data);
        setUpdateModal(true);
        setId(item.id);
      }}>
      <View style={styles.eachTodoContainer}>
        <Modal visible={updateModal} transparent={true}>
          <View style={styles.updateModal}>
            <TextInput
              value={updateTodoTitle}
              placeholder="Write Your To do Title Here"
              placeholderTextColor={colorData.primary}
              style={styles.input}
              onChangeText={value => {
                setUpdateTodoTitle(value);
              }}
            />
            <TextInput
              placeholderTextColor={colorData.primary}
              multiline={true}
              placeholder="Write Your Todo Description Here"
              value={updateTodoDesc}
              onChangeText={value => setUpdateTodoDesc(value)}
              style={styles.updateTodoinp}
            />
            <View style={styles.updateCancleButtonContainer}>
              {updateTodoDesc?.length != 0 && updateTodoTitle?.length != 0 ? (
                <TouchableHighlight
                  style={styles.deleteSingle}
                  onPress={() => {
                    updateTodo({
                      updateTodoTitle,
                      updateTodoDesc,
                      id,
                      setUpdateModal,
                    });
                  }}
                  underlayColor={colorData.secondary}>
                  <Text style={[styles.deleteSingleText, styles.updateText]}>
                    UPDATE
                  </Text>
                </TouchableHighlight>
              ) : null}

              <TouchableHighlight
                style={styles.deleteSingle}
                onPress={() => {
                  setUpdateTodoDesc('');
                  setUpdateTodoTitle('');
                  setUpdateModal(false);
                  setId(null);
                  setUpdateTodoDesc('');
                }}
                underlayColor={colorData.secondary}>
                <Text style={[styles.deleteSingleText, styles.updateText]}>
                  CANCEL
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View>
          <Text style={styles.dateOfCreation}>{item.date}</Text>
          <Text style={styles.todoTitle}>{item.title}</Text>
          <Text numberOfLines={4} style={styles.todoText}>
            {item.data}
          </Text>
        </View>
        <View style={styles.pinDeleteContainer}>
          <TouchableHighlight
            style={styles.pinnedIcon}
            onPress={() => {
              addToListOFPinned(item.id);
            }}
            underlayColor={colorData.secondary}>
            {pinnedTodosData.includes(item.id) ? (
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: colorData.secondary,
                }}>
                #
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: colorData.secondary,
                }}>
                ||
              </Text>
            )}
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.deleteSingleIcon}
            onPress={() => {
              setShowConfirm(true);
              setId(item.id);
            }}
            underlayColor={colorData.secondary}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colorData.secondary,
              }}>
              iii
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default EachTodoSlide;
