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

  const { currentScore } = route.params || '';
  const [highScoreList, setHighScoreList] = useState<Array<scoreObject>>([]);

  const saveScore = async (name: string) => {
    try {
      let top10 = await AsyncStorage.getItem('highScoreList');
      let newTop10 = top10 != null ? JSON.parse(top10) : [];
      newTop10.push({ name: name, score: currentScore });
      newTop10.sort((a: any, b: any) => b.score - a.score);
      newTop10 = newTop10.slice(0, 10);
      setHighScoreList(newTop10);
      await AsyncStorage.setItem('highScoreList', JSON.stringify(newTop10));
    } catch (e) {
      console.log(e);
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
      <NameModal saveScore={saveScore} score={currentScore} />
      <Text style={styles.title}>The best results:</Text>
      <View style={{ flex: 1 }}>{ScoreList}</View>
      <Pressable style={styles.startbtn} onPress={() => navigation.goBack()}>
        <Text style={styles.btntext}>New Game</Text>
      </Pressable>
    </View>
  );
};

export default Results;
