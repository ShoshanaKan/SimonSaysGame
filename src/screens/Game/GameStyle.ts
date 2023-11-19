import { StyleSheet } from "react-native";
import colors from "../../assets/Colors";

export const styles = StyleSheet.create({
  score: {
    fontSize: 48,
    textAlign: 'center',
    margin: '10%',
    color: 'white',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  startText: {
    color: 'white',
    fontSize: 48,
  },
  circle: {
    height: 200,
    borderRadius: 100,
    width: 200,
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -100 }],
    zIndex: 1,
    left: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0)',
    borderWidth: 10,
    borderEndColor: colors.red,
    borderStartColor: colors.yellow,
    borderBottomColor: colors.blue,
    borderTopColor: colors.green,
  },
  startContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  colorContainer: {
    display: 'flex',
    flexDirection: 'column',

  },
  colorRow: {
    display: 'flex',
    flexDirection: 'row',
    height: '50%',
    borderColor: 'black',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'black',
    padding: 10
  },
  gameBtn: {
    flex: 1,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 40,
  }
});