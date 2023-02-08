import {useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider,} from 'react-native-safe-area-context'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Main from './views/qrscreen/';
import Home from './views/homescreen/';
import Busca from './views/search/';
import Config from './views/settings/';
import {Init_database, Set_main} from './models/crud/'

const Tab = createMaterialBottomTabNavigator();


export default function App() {
  
  useEffect(()=>{
    Init_database();
    console.log('Number times')
  },[])
  
  return (
    <SafeAreaProvider >
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}/>

          <Tab.Screen name="QRcode" component={Main} 
            options={{
            tabBarLabel: 'QRcode',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="qrcode" color={color} size={26} />
            ),
          }}/>

          <Tab.Screen name="Buscar" component={Busca}
            options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-search" color={color} size={26} />
            ),
          }}/>

            <Tab.Screen name="Settings" component={Config}
            options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
          }}/>

        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
