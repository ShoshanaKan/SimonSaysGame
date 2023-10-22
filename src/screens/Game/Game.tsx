import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './GameStyle';
import { RootState } from '../../redux/store';
import useSounds from '../../hooks/useSounds';
import useGame from '../../hooks/useGame';
import { StackScreenProps } from '@react-navigation/stack';
import { appendElement } from '../../redux/appSlice';
import colors from '../../assets/Colors';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'Game'>;

const Game = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const [clickedColor, setClickedColor] = useState<number>();
    const nameModalVisible = useSelector((state: RootState) => state.appState.showModal);
    const currentColor = useSelector((state: RootState) => state.appState.currentColor);
    const { isActive, score, restartGame, simonTurn } = useGame();
    const sound = useSounds();

    useEffect(() => {
        if (nameModalVisible) {
            navigation.navigate('Results', { score: score, restartGame: restartGame });
        }
    }, [nameModalVisible]);

    const handleClick = (number: number) => {
        if (!simonTurn && isActive) {
            dispatch(appendElement(number));
        }
    };

    const handlePressIn = async (colorId: number) => {
        if (!simonTurn && isActive) {
            await sound[colorId - 1]?.play();
            setClickedColor(colorId);
        }
    };

    const GameButton = (
        colorId: number,
        colorStringIn: string,
        colorStringOut: string,
    ) => {

        return (
            <Pressable
                onPress={() => handleClick(colorId)}
                onPressIn={() => handlePressIn(colorId)}
                onPressOut={() => setClickedColor(-1)}
                style={{
                    flex: 1,
                    borderWidth: 5,
                    borderColor: 'black',
                    borderRadius: 40,
                    backgroundColor:
                        currentColor === colorId || clickedColor === colorId ? colorStringIn : colorStringOut,
                }}
            />
        );
    };

    return (
        <SafeAreaView>
            <View
                style={styles.container}>
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
                        {GameButton(1, colors.green, 'rgb(0,50,0)')}
                        {GameButton(2, colors.red, 'rgb(50,0,0)')}
                    </View>
                    <View style={styles.colorRow}>
                        {GameButton(3, colors.yellow, 'rgb(50,50,0)')}
                        {GameButton(4, colors.blue, 'rgb(0,0,50)')}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Game;
