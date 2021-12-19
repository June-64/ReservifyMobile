import React from 'react';
import { Button, SectionList, StyleSheet, View, Text, TextInput, Image, Pressable, useWindowDimensions, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import Login from "./Auth/Login"
import Register from './Auth/Register';
import Index from './Main/Index';
import UserInfo from './Auth/UserInfo';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { logoutUser, loggedInCheck } from './api';
import Reserve from './Main/Reserve';
import { NavigationActions } from 'react-navigation';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function CustomDrawerContent(props) {
  const logout = async () => {
    try {
      const result = await logoutUser()
      props.navigation.navigate('Auth')
    } catch (err) {
      const errMessage = err.message
    }
  }

  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}
        contentContainerStyle={{flex: 1}}
      >
        <DrawerItem 
            icon={() => (
              <View style={styles.sideBarIcons}><Image style={{height: 50, width: 60}} source={require('./assets/home.png')} /></View>
            )}
          label={() => (
              <Text style={styles.sideBarText}>דף בית</Text>
            )}
          onPress={() => { props.navigation.navigate('Index') }}
          style={[styles.drawerItem, styles.drawerItemFirst, {marginTop: 100}]}
        />
        <DrawerItem 
            icon={() => (
              <View style={styles.sideBarIcons}><Image style={{height: 50, width: 60}} source={require('./assets/reserve.png')} /></View>
            )}
          label={() => (
              <Text style={styles.sideBarText}>הזמנת מגרש</Text>
            )}
          onPress={() => { props.navigation.navigate('Reserve') }}
          style={styles.drawerItem}
        />
        <DrawerItem 
            icon={() => (
              <View style={styles.sideBarIcons}><Image style={{height: 50, width: 60}} source={require('./assets/join.png')} /></View>
            )}
          label={() => (
              <Text style={styles.sideBarText}>הצטרפות למגרש</Text>
            )}
          onPress={() => { props.navigation.navigate('Index') }}
          style={styles.drawerItem}
        />
        <DrawerItem 
            icon={() => (
              <View style={styles.sideBarIcons}><Image style={{height: 50, width: 60}} source={require('./assets/myres.png')} /></View>
            )}
          label={() => (
              <Text style={styles.sideBarText}>ההזמנות/הצטרפויות שלי</Text>
            )}
          onPress={() => { props.navigation.navigate('Index') }}
          style={styles.drawerItem}
        />
        <DrawerItem 
            icon={() => (
              <View style={styles.sideBarIcons}><Image style={{height: 50, width: 60}} source={require('./assets/map.png')} /></View>
            )}
          label={() => (
              <Text style={styles.sideBarText}>מפת מגרשים</Text>
            )}
          onPress={() => { props.navigation.navigate('Index') }}
          style={styles.drawerItem}
        />
        <DrawerItem 
            icon={() => (
              <View style={styles.sideBarIcons}><Image style={{height: 50, width: 60}} source={require('./assets/profile.png')} /></View>
            )}
          label={() => (
              <Text style={styles.sideBarText}>הפרופיל שלי</Text>
            )}
          onPress={() => { props.navigation.navigate('Index') }}
          style={styles.drawerItem}
        />
        <DrawerItem 
            icon={() => (
              <View style={styles.sideBarIcons}><Image style={{height: 50, width: 60}} source={require('./assets/terms.png')} /></View>
            )}
          label={() => (
              <Text style={styles.sideBarText}>תנאי שימוש</Text>
            )}
          onPress={() => { props.navigation.navigate('Index') }}
          style={styles.drawerItem}
        />
        <DrawerItem 
            icon={() => (
              <View style={styles.sideBarIcons}><Image style={{height: 50, width: 60}} source={require('./assets/logout.png')} /></View>
            )}
          label={() => (
              <Text style={styles.sideBarText}></Text>
            )}
          onPress={() => { logout() }}
          style={[styles.drawerItem, styles.drawerItemLast]}
        />
      </DrawerContentScrollView>
    </View>
  );
}

class AuthNavigator extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}
        initialState={"Login"}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    )
  }
}

class MainNavigator extends React.Component {
  render() {

    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName='Index'
        screenOptions={({ navigation }) => ({
          drawerPosition: 'right',
          gestureEnabled: false,
          headerBackground: () => (<View style = {styles.LogoContainer}><Image style={styles.Logo} source={require('./assets/Reservify-white.png')} /></View>),
          title: '',
          headerRight: () => (
            <Pressable style={styles.sideBarButtonWrapper} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <MaterialCommunityIcons name="reorder-horizontal" size={30} color="white" />
            </Pressable>
          ),
          headerLeft: () => {
            null
          }
        })}
      >
        <Drawer.Screen name="Index" component={Index} />
        <Drawer.Screen name="Reserve" component={Reserve} />
      </Drawer.Navigator>
    )
  }
}

export default class AppNavigator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      loggedInLoaded: false
    }
  }

  componentDidMount() {
    this.loggedCheck();
  }

  loggedCheck = async () => {
    try {
      const result = await loggedInCheck()
      this.setState({ loggedIn: result["logged"], loggedInLoaded: true })
    } catch (err) {
      const errMessage = err.message
    }
  }

  render() {
    const logged = this.state.loggedIn

    if (this.state.loggedInLoaded) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={logged ? "Main" : "Auth"}
            screenOptions={() => ({
              gestureEnabled: false,
              headerShown: false
            })}>
            <Stack.Screen name="Auth" component={AuthNavigator}/>
            <Stack.Screen name="Main" component={MainNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  Logo: {
    marginTop: Constants.statusBarHeight,
    width: 160,
    height: 44
  },
  LogoContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#012a4a',
    justifyContent: 'center',
  },
  sideBarButtonWrapper: {
    height: '100%',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sideBarContainer: {
    flex: 1,
  },
  drawerItem: {
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 12
  },
  drawerItemFirst: {
    marginTop: -30
  },  
  drawerItemLast: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    width: 60
  },
  sideBarIcons: {
    alignSelf: "center",
    position: "absolute",
    right: 0,
  },
  sideBarText: {
    textAlign: 'right',
    fontFamily: 'heeboRegular',
    fontSize: 15,
    marginRight: 20
  }
})
