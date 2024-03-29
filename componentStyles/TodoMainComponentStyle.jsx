import {StyleSheet} from 'react-native';
import {spreadColors} from './componentColors';

export function todoMainComponentStyleFunc(colorData) {
  let todoColors = spreadColors(colorData);
  return (styles = StyleSheet.create({
    updateTodoinp: {
      fontSize: 20,
      borderWidth: 1,
      borderColor: todoColors.PRIMARY,
      borderRadius: 10,
      height: '70%',
      textAlignVertical: 'top',
    },
    deleteSingle: {
      borderRadius: 5,
      backgroundColor: todoColors.WHITE,
      shadowColor: todoColors.BLACK,
      elevation: 5,
      textAlign: 'center',
      padding: 2,
      alignSelf: 'flex-end',
    },
    deleteSingleText: {
      color: todoColors.PRIMARY,
    },
    updateText: {
      fontSize: 25,
    },
    updateCancleButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
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
    mainContainer: {
      flex: 1,
      padding: '2%',
      backgroundColor: todoColors.WHITE,
    },
    input: {
      borderWidth: 1,
      color: todoColors.BLACK,
      borderRadius: 10,
      borderColor: todoColors.PRIMARY,
      fontSize: 20,
    },
    heading: {
      alignSelf: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      color: todoColors.PRIMARY,
      fontStyle: 'italic',
      shadowColor: todoColors.BLACK,
      backgroundColor: todoColors.WHITE,
      borderRadius: 10,
      elevation: 10,
      paddingHorizontal: 10,
    },
    addButtonText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: todoColors.WHITE,
      marginTop: -3,
    },
    inpButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addButton: {
      width: '100%',
      aspectRatio: 1 / 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: todoColors.PRIMARY,
      shadowColor: todoColors.BLACK,
      elevation: 5,
      // position: 'absolute',
      // top: '92%',
      // left: '85%',
    },
    colorUI: {
      width: '15%',
      aspectRatio: 1 / 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: todoColors.PRIMARY,
      shadowColor: todoColors.BLACK,
      elevation: 5,
      position: 'absolute',
      top: '92%',
      right: '85%',
    },
    colorUIButtonModal: {
      width: '90%',
      aspectRatio: 1 / 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: todoColors.THIRD,
      // borderWidth:1,
      // shadowColor: todoColors.BLACK,
      // elevation: 5,
      marginBottom: 22,
      // position: 'absolute',
      // top: '92%',
      // right: '85%',
    },
    listContainer: {
      flex: 1,
    },

    headerPart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      paddingHorizontal: 10,
      borderBottomWidth: 2,
      borderColor: todoColors.PRIMARY,
    },
    clearAll: {
      borderRadius: 10,
      justifyContent: 'center',
      padding: 5,
      backgroundColor: todoColors.PRIMARY,
    },
    clearAllText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: todoColors.WHITE,
      shadowColor: todoColors.BLACK,
      elevation: 10,
    },
    emptyTodos: {
      fontSize: 30,
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: '70%',
      color: todoColors.WHITE,
      fontWeight: 'bold',
      shadowColor: todoColors.BLACK,
      elevation: 10,
      backgroundColor: todoColors.PRIMARY,
      padding: 5,
      borderRadius: 5,
    },

    deleteModal: {
      height: '50%',
      width: '70%',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      marginTop: '50%',
      borderRadius: 20,
      backgroundColor: todoColors.WHITE,
      shadowColor: todoColors.BLACK,
      elevation: 10,
    },
    confirmDeleteButtonsContainer: {
      flexDirection: 'row',
      margin: 50,
      width: '100%',
      justifyContent: 'space-evenly',
    },
    deleteConfirmButtons: {
      padding: 15,
      shadowColor: todoColors.BLACK,
      elevation: 10,
      backgroundColor: todoColors.PRIMARY,
      textAlign: 'center',
      borderRadius: 10,
    },
    confirmDeleteTitle: {
      fontSize: 25,
      textAlign: 'center',
      color: todoColors.PRIMARY,
      fontWeight: 'bold',
      textShadowColor: todoColors.THIRD,
      textShadowRadius: 5,
    },
    confirmDeleteButtonText: {
      fontSize: 20,
      color: todoColors.WHITE,
      fontWeight: 'bold',
    },
    noTodosAvailable: {
      fontStyle: 'italic',
      fontSize: 30,
      fontWeight: 'bold',
      color: todoColors.PRIMARY,
      textAlign: 'center',
      borderBottomWidth: 10,
      borderColor: todoColors.PRIMARY,
      width: '80%',
      alignSelf: 'center',
      marginTop: '70%',
    },
    changeColorUIButtonContainer: {
      flex: 1,
      // borderWidth:1,
      width: 70,
      marginLeft: 14,
      // justifyContent:"flex-end",
      // alignItems:"center",
    },
    animatedAdd:{
      position:"absolute",
      top:"90.4%",
      left:"83%",
  width:"15%",aspectRatio:1/1
    }
  }));
}
