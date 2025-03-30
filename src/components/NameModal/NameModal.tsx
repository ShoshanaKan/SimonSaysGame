import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Text, View, Modal, Pressable, TextInput} from 'react-native';
import {styles} from './NameModalStyle';
import {hideModal} from '../../redux/appSlice';

type Props = {
  saveScore: (name: string, score: number) => Promise<void>;
  score: number;
};

const NameModal = ({saveScore, score}: Props) => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');

  const handleHideModal = useCallback(() => {
    saveScore(playerName || 'Anonymous', score);
    setPlayerName('');
    dispatch(hideModal());
  }, [dispatch, playerName, score, saveScore]);

  const resultsModalVisible = useSelector(
    (state: RootState) => state.appState.showModal,
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={resultsModalVisible}
      onRequestClose={() => dispatch(hideModal())}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Good luck next time!</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name:"
            onChangeText={setPlayerName}
            placeholderTextColor={'white'}
            value={playerName}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleHideModal}>
            <Text style={styles.textStyle}>Show Highscores</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default NameModal;
