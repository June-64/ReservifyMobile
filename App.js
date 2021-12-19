import React from 'react';
import { Button, SectionList, StyleSheet, View, Text, TextInput } from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import AppNavigator from './Navigation'


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fontsLoaded: false,

    }
  }

  async loadFonts() {
    await Font.loadAsync({
      heeboRegular: require('./assets/Fonts/Heebo-Regular.ttf'),
      heeboLight: require('./assets/Fonts/Heebo-Light.ttf'),
      heeboBold: require('./assets/Fonts/Heebo-Bold.ttf'),
      heeboThin: require('./assets/Fonts/Heebo-Thin.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
      
        <AppNavigator/>
      );
    }

    else return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
