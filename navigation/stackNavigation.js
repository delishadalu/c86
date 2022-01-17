import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import StoryScreen from '../screens/storyScreen';

const Stack = createStackNavigator();

export default class StackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="StoryScreen" component={StoryScreen} />
      </Stack.Navigator>
    );
  }
}
