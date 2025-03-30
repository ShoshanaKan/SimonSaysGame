import React, {useState, useEffect} from 'react';
import NameModal from '../../components/NameModal/NameModal';
import {Text, View, Pressable, FlatList} from 'react-native';
import {styles} from './ResultsStyle';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../navigation/AppNavigator';

type scoreObject = {
  name: string;
  score: number;
};

type Props = StackScreenProps<RootStackParamList, 'Results'>;

const Results = ({route, navigation}: Props) => {
  const {currentScore} = route.params || '';
  const [highScoreList, setHighScoreList] = useState<scoreObject[]>([]);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const top10 = await AsyncStorage.getItem('highScoreList');
        const parsedTop10: scoreObject[] = top10 ? JSON.parse(top10) : [];
        setHighScoreList(parsedTop10);
      } catch (e) {
        console.log(e);
      }
    };
    loadHighScores();
  }, []);

  const saveScore = async (name: string) => {
    try {
      const top10 = await AsyncStorage.getItem('highScoreList');
      const newTop10: scoreObject[] = top10 ? JSON.parse(top10) : [];
      newTop10.push({name, score: currentScore});
      newTop10.sort((a, b) => b.score - a.score);
      const top10Sorted = newTop10.slice(0, 10);
      setHighScoreList(top10Sorted);
      await AsyncStorage.setItem('highScoreList', JSON.stringify(top10Sorted));
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({item, index}: {item: scoreObject; index: number}) => (
    <Text style={styles.scoretext}>
      {index + 1}. {item.name || 'Anonymous'} - {item.score}
    </Text>
  );

  return (
    <View style={styles.container}>
      <NameModal saveScore={saveScore} score={currentScore} />
      <Text style={styles.title}>The best results:</Text>
      <FlatList
        data={highScoreList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pressable style={styles.startbtn} onPress={() => navigation.goBack()}>
        <Text style={styles.btntext}>New Game</Text>
      </Pressable>
    </View>
  );
};

export default Results;
