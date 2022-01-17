import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import * as Font from 'expo-font';
import StoryCard from './StoryCard';
import AppLoading from 'expo-app-loading';
var stories = require('./temp_stories.json');

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }

  loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  };

  componentDidMount() {
    this.loadFont();
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'teal',
        }}>
        <SafeAreaView
          style={{
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require('../assets/logo.png')}
          />
          <Text style={{ paddingLeft: 20, fontFamily: 'bubblegum-sans' }}>
            STORY TELLING APP
          </Text>
        </View>

        <View style={{ flex: 0.9 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={stories}
            renderItem={({ item }) => {
              return <StoryCard story={item} navigation={this.props.navigation} />;
            }}
          />
        </View>
      </View>
    );
  }
}
