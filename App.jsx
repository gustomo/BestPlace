// App.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Heart, Add } from 'iconsax-react-native';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import FormScreen from './src/screens/FormScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <Home size={size} color={color} />;
          if (route.name === 'Favorite') return <Heart size={size} color={color} />;
          if (route.name === 'Form') return <Add size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.blue(),
        tabBarInactiveTintColor: colors.grey(0.5),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Form" component={FormScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Detail Tempat' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
