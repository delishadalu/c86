import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import * as Font from 'expo-font';
import StoryCard from './StoryCard';
import AppLoading from 'expo-app-loading';
import DropDownPicker from 'react-native-dropdown-picker';

var images = {
  image1: require('../assets/story_image_1.png'),
  image2: require('../assets/story_image_2.png'),
  image3: require('../assets/story_image_3.png'),
  image4: require('../assets/story_image_4.png'),
  image5: require('../assets/story_image_5.png'),
};
export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      previewImage: 'image1',
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
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
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

        <View style={{ flex: 0.9, marginTop: 10 }}>
          <ScrollView>
            <Image
              style={{ width: '100%', height: 200, resizeMode: 'contain' }}
              source={images[this.state.previewImage]}
            />

            <DropDownPicker
              items={[
                { label: 'image1', value: 'image1' },
                { label: 'image2', value: 'image2' },
                { label: 'image3', value: 'image3' },
                { label: 'image4', value: 'image4' },
                { label: 'image5', value: 'image5' },
              ]}
              style={{ backgroundColor: 'transparent' }}
              dropDownStyle={{
                backgroundColor: 'skyblue',
                borderWidth: 2,
                marginTop: 25,
              }}
              onChangeItem={(item) =>
                this.setState({ previewImage: item.value })
              }
              labelStyle={{ color: 'white', fontFamily: 'bubblegum-sans' }}
              itemStyle={{ justifyContent: 'flex-start', paddingLeft: 20 }}
              containerStyle={{
                height: 30,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: 'white',
              }}
            />

            <TextInput
              placeholder="title"
              placeholderTextColor="white"
              onChangeText={(title) => {
                this.setState({ title });
              }}
              style={{
                borderWidth: 2,
                borderRadius: 10,
                height: 30,
                marginTop: 10,
                borderColor: 'white',
                paddingLeft: 10,
                fontFamily: 'bubblegum-sans',
                color: 'white',
              }}
            />

            <TextInput
              placeholder="description"
              placeholderTextColor="white"
              onChangeText={(description) => {
                this.setState({ description });
              }}
              style={{
                borderWidth: 2,
                borderRadius: 10,
                height: 30,
                marginTop: 10,
                borderColor: 'white',
                paddingLeft: 10,
                fontFamily: 'bubblegum-sans',
                color: 'white',
              }}
            />

            <TextInput
              placeholder="story"
              placeholderTextColor="white"
              onChangeText={(story) => {
                this.setState({ story });
              }}
              multiline={true}
              numberOfLines={20}
              style={{
                borderWidth: 2,
                borderRadius: 10,
                height: 30,
                marginTop: 10,
                borderColor: 'white',
                paddingLeft: 10,
                fontFamily: 'bubblegum-sans',
                color: 'white',
              }}
            />

            <TextInput
              placeholder="moral of the story"
              placeholderTextColor="white"
              onChangeText={(moral) => {
                this.setState({ moral });
              }}
              style={{
                borderWidth: 2,
                borderRadius: 10,
                height: 30,
                marginTop: 10,
                borderColor: 'white',
                paddingLeft: 10,
                fontFamily: 'bubblegum-sans',
                color: 'white',
              }}
            />
          </ScrollView>
        </View>
      
      </KeyboardAvoidingView>
    );
  }
}
