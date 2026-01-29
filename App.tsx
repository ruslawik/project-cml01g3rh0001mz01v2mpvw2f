import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from './src/screens/HomeScreen';
import StoryScreen from './src/screens/StoryScreen';
import CongratulationsScreen from './src/screens/CongratulationsScreen';

export type RootStackParamList = {
  Home: undefined;
  Story: { storyId: number };
  Congratulations: { storyTitle: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Story" component={StoryScreen} />
          <Stack.Screen name="Congratulations" component={CongratulationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}