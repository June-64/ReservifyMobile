

import React from 'react';
import { Button, SectionList, StyleSheet, View, Text, TextInput } from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import AppNavigator from './Navigation'
import { loggedInCheck } from './api'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fontsLoaded: false,
      loggedIn: false,
      loggedInLoaded: false
    }

    
  }

  loggedCheck = async () => {
    try {
      const result = await loggedInCheck()
      this.setState({loggedIn: result["logged"], loggedInLoaded: true})
    } catch (err) {
      const errMessage = err.message
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
    this.loggedCheck();
  }

  render() {
    if (this.state.fontsLoaded && this.state.loggedInLoaded) {
      return (
      
        <AppNavigator logged={this.state.loggedIn} logout={this.logout} loggedCheck={this.loggedCheck}/>
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
