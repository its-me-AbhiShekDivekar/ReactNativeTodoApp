import {StyleSheet} from 'react-native';
// import {todoColors} from './componentColors';
import {spreadColors} from './componentColors';

export function eachTodoSlideStyleFunc(colorData) {
  let todoColors = spreadColors(colorData);
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      color: todoColors.BLACK,
      borderRadius: 10,
      borderColor: todoColors.PRIMARY,
      fontSize: 20,
    },
    eachTodoContainerTouchable: {
      margin: 10,
      padding: 10,
      shadowColor: todoColors.BLACK,
      elevation: 5,
      backgroundColor: todoColors.WHITE,
      borderRadius: 10,
      justifyContent: 'space-between',
    },
    eachTodoContainer: {
      justifyContent: 'space-between',
      flex: 1,
    },
    todoText: {
      fontSize: 20,
      color: 'black',
    },
    deleteSingle: {
      // borderRadius: 5,
      backgroundColor: todoColors.WHITE,
      shadowColor: todoColors.BLACK,
      elevation: 1,
      textAlign: 'center',
      padding: 3,
      alignSelf: 'flex-end',
    },
    deleteSingleText: {
      color: todoColors.PRIMARY,
    },
    dateOfCreation: {
      alignSelf: 'flex-start',
      fontSize: 13,
      margin: 2,
    },

    deleteSelectButtonContainer: {
      marginTop: 15,
      alignSelf: 'flex-end',
    },

    updateTodoinp: {
      fontSize: 20,
      borderWidth: 1,
      borderColor: todoColors.PRIMARY,
      borderRadius: 10,
      height: '60%',
      textAlignVertical: 'top',
    },
    updateModal: {
      height: '70%',
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-evenly',
      marginTop: '40%',
      padding: 10,
      backgroundColor: todoColors.WHITE,
      borderRadius: 20,
      shadowColor: todoColors.BLACK,
      elevation: 10,
    },
    updateCancleButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    updateText: {
      fontSize: 25,
    },
    todoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      marginVertical: 5,
    },
    deleteSelected: {
      borderWidth: 1,
      height: 20,
      aspectRatio: 1 / 1,
      borderRadius: 20,
      alignSelf: 'flex-end',
      borderColor: todoColors.PRIMARY,
      backgroundColor: todoColors.WHITE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteSelectedConfirm: {
      height: 10,
      aspectRatio: 1 / 1,
      backgroundColor: todoColors.SECONDARY,
      borderRadius: 10,
    },
    deleteSingleIcon: {
      height: 20,
      borderWidth: 1,
      aspectRatio: 2 / 2,
      borderColor: todoColors.PRIMARY,
      borderTopWidth: 0,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
      // transform:[{rotateZ:"45deg"}],
      alignSelf: 'flex-end',
      // marginTop:10,
      alignItems: 'center',
      shadowColor: 'black',
      // elevation:5,
      backgroundColor: 'white',
    },
    pinDeleteContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
}
