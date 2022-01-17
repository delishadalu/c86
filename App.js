import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Loading from './screens/loading'
import Login from './screens/login'
import DashBoard from './screens/dashBoard'
import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import {firebaseConfig} from './config'
import firebase from 'firebase'

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}



export default function App() {
  return (
    <AppContainer />
  );
}

const SwitchNavigator = createSwitchNavigator({
  Loading:Loading,
  Login:Login,
  DashBoard:DashBoard
})

const AppContainer = createAppContainer(SwitchNavigator)