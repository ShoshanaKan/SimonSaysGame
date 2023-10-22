import React, { useState } from 'react';
import NameModal from '../../components/NameModal/NameModal';
import { Text, View, Pressable } from 'react-native';
import { styles } from './ResultsStyle';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/AppNavigator';

type scoreObject = {
  name: string;
  score: number;
};

type Props = StackScreenProps<RootStackParamList, 'Results'>;

const Results = ({ route, navigation }: Props) => {

  const { score } = route.params;
  const [highScoreList, setHighScoreList] = useState<Array<scoreObject>>([]);

  const saveScore = async (name: string, score: number) => {
    try {
      let list = await AsyncStorage.getItem('highScoreList');
      let newList = list != null ? JSON.parse(list) : [];
      newList.push({ name: name, score: score });
      let arrLength = newList.length || 0;
      for (let i = 0; i < arrLength - 1; i++) {
        for (let j = i + 1; j < arrLength; j++) {
          if (newList[j].score > newList[i].score) {
            let temp = newList[i];
            newList[i] = newList[j];
            newList[j] = temp;
          }
        }
      }
      newList = newList.slice(0, 10)
      setHighScoreList(newList);
      await AsyncStorage.setItem('highScoreList', JSON.stringify(newList));
    } catch (e) {
      console.log(e)
    }
  }

  const ScoreList = highScoreList.map((score, index) => {
    return (
      <Text key={index} style={styles.scoretext}>
        {index + 1}. {score.name || 'Anonymous'} - {score.score}
      </Text>
    );
  });

  return (
    <View style={styles.container}>
      <NameModal saveScore={saveScore} score={score} />
      <Text style={styles.title}>The best results:</Text>
      <View style={{ flex: 1 }}>{ScoreList}</View>
      <Pressable style={styles.startbtn} onPress={() => navigation.goBack()}>
        <Text style={styles.btntext}>New Game</Text>
      </Pressable>
    </View>
  );
};

export default Results;
