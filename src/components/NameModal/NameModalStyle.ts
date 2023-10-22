import { StyleSheet } from "react-native";
import colors from "../../assets/Colors";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#454242'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 5,
    borderEndColor: colors.blue,
    borderStartColor: colors.green,
    borderBottomColor: colors.yellow,
    borderTopColor: colors.red,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'blue',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontSize: 32
  },
  textInput: {
    height: 50,
    color: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontSize: 18,
    borderColor: 'white'
  }
});