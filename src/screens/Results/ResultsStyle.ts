import {StyleSheet} from 'react-native';
import colors from '../../assets/Colors';

export const styles = StyleSheet.create({
    container: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 42,
      margin: '10%',
      color: colors.green,
    },
    startbtn: {
      backgroundColor: colors.green,
      width: 200,
      height: 60,
      borderRadius: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20%',
    },
    btntext: {
      fontSize: 20,
      fontWeight: '800',
      color: 'white',
    },
    scoretext: {
      fontSize: 24,
      textAlign: 'left',
      margin: 2,
      color: 'black',
    },
  });