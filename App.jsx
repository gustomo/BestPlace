import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'BestPlace' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Tempat' }} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ title: 'Favoritku' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
