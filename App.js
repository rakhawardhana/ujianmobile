
import React, { Component } from 'react'
import {View, Text} from 'react-native'
import {Icon} from 'native-base'
import {Provider} from 'react-redux'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'

import AuthScreen from './src/auth/AuthScreen'
import UsersScreen from './src/app/UsersScreen'
import ProfileScreen from './src/app/ProfileScreen'
import AddUsersScreen from './src/app/AddUsersScreen'
import DetailUsersScreen from './src/app/DetailUsersScreen'


import STORE from './src/store/reducer/index'

const KaryawanStack = createStackNavigator(
  {
    ListUsers: UsersScreen,
    AddUsers: AddUsersScreen,
    DetailUsers: DetailUsersScreen
  },
  {
    headerMode: 'none'
  }
)

const MainTab = createBottomTabNavigator(
  {
    ListKaryawan: {
      screen: KaryawanStack,
      navigationOptions: {
        tabBarIcon: <Icon name='bookmarks'/>
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: <Icon name='contact'/>
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'purple',
      inactiveTintColor: 'grey'
    }
  }
)

const RootStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Kesini: MainTab
  },
  {
    headerMode: 'none'
  }
)

const AppContainer = createAppContainer(RootStack)

class App extends Component {
  render (){
    return (
      <Provider store={STORE}>
        <AppContainer/>
      </Provider>
      
    )
  }
}


export default App
