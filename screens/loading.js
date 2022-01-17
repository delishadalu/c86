import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class Loading extends Component {
  checkIfloggedIn = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('DashBoard');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  };

  componentDidMount() {
    this.checkIfloggedIn();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>loading screen..!!</Text>
      </View>
    );
  }
}
