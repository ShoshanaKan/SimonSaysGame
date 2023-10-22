import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Results from '../screens/Results/Results';
import Game from '../screens/Game/Game';

const Stack = createStackNavigator();

export type RootStackParamList = {
    Game: undefined;
    Results: {
        score: number;
        restartGame: () => void;
    };
};

const AppNavigator = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Game" component={Game as any} />
                <Stack.Screen name="Results" component={Results as any} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
