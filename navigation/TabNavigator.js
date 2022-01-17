import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/Feed';
import CreateStory from '../screens/CreateStory';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      activeColor="tomato"
      inactiveColor="gray"
      barStyle={{
        backgroundColor: '#2f345d',
        overflow: 'hidden',
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'CreateStory') {
            iconName = focused ? 'create' : 'create-outline';
          }
          return <Ionicons name={iconName} size={RFValue(20)} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="CreateStory" component={CreateStory} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
