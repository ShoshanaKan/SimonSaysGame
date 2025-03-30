import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './GameStyle';
import {RootState} from '../../redux/store';
import useSounds from '../../hooks/useSounds';
import useGame from '../../hooks/useGame';
import {StackScreenProps} from '@react-navigation/stack';
import {appendElement} from '../../redux/appSlice';
import {RootStackParamList} from '../../navigation/AppNavigator';
import Colors from '../../assets/Colors';

type Props = StackScreenProps<RootStackParamList, 'Game'>;

const buttons = {1: 'green', 2: 'red', 3: 'yellow', 4: 'blue'};

const Game = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const nameModalVisible = useSelector(
    (state: RootState) => state.appState.showModal,
  );
  const {
    isActive,
    score,
    restartGame,
    simonTurn,
    setCurrentColorId,
    currentColorId,
  } = useGame();
  const sounds = useSounds();

  useEffect(() => {
    if (nameModalVisible) {
      navigation.navigate('Results', {currentScore: score});
    }
  }, [nameModalVisible, navigation, score, restartGame]);

  const handleClick = (number: number) => {
    if (!simonTurn && isActive) {
      dispatch(appendElement(number));
    }
  };

  const handlePressIn = async (colorId: number) => {
    if (!simonTurn && isActive && sounds[colorId - 1]) {
      await sounds[colorId - 1].play();
      setCurrentColorId(colorId);
    }
  };

  const ColoredButton = (colorId: keyof typeof buttons) => {
    return (
      <Pressable
        onPress={() => handleClick(colorId)}
        onPressIn={() => handlePressIn(colorId)}
        onPressOut={() => setCurrentColorId(-1)}
        style={[
          styles.gameBtn,
          {
            backgroundColor:
              currentColorId === colorId
                ? Colors[buttons[colorId] as keyof typeof Colors]
                : Colors[`${buttons[colorId]}Out` as keyof typeof Colors],
          },
        ]}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.colorContainer}>
          <View style={styles.circle}>
            {!isActive ? (
              <Pressable onPress={restartGame} style={styles.startContainer}>
                <Text style={styles.startText}>Start</Text>
              </Pressable>
            ) : (
              <Text style={styles.score}>{score > -1 ? score : ''}</Text>
            )}
          </View>
          <View style={styles.colorRow}>
            {ColoredButton(1)}
            {ColoredButton(2)}
          </View>
          <View style={styles.colorRow}>
            {ColoredButton(3)}
            {ColoredButton(4)}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Game;
