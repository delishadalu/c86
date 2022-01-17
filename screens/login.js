import React, { Component } from 'react';
import { Text, View,StyleSheet,Image,TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }

  componentDidMount() {
    this.loadFont();
  }

  loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: "dark"
                })
                .then(function (snapshot) { });
            }
          })
          .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: "web",
        androidClientId:
          "888169891753-t66t7poto92a38ublofff341b3ue885v.apps.googleusercontent.com",
        iosClientId:
          "888169891753-jdch8n106q1uocjfvs041rcic0agmp0e.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };
  render() {
     if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
       <Text>login screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'teal',
  },
  iconImage: { width: 100, height: 150, marginTop: 40 },
  text: { fontFamily: 'bubblegum-sans', fontSize: 40, marginTop: 20 },
  loginBox: {
    flexDirection: 'row',
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
  },
  loginIcon: { width: 30, height: 30, resizeMode: 'contain' },
  loginText: { fontFamily: 'bubblegum-sans', fontSize: 20 },
  bottomImage: {
    position: 'absolute',
    width: '100%',
    resizeMode: 'contain',
    bottom: RFValue(-5),
  },
});
