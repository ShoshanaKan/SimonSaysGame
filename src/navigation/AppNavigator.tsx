import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Results from '../screens/Results/Results';
import Game from '../screens/Game/Game';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Game: undefined;
  Results: {
    currentScore: number;
  };
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Game">
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
