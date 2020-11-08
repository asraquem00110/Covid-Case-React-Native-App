import React, { useEffect, useState , lazy , Suspense } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import FlashScreen from './screens/flashscreen'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
// import Philippines from './screens/Philippines'
const Philippines = lazy(()=>import('./screens/Philippines'))
const World = lazy(()=>import('./screens/World'))
const Countries = lazy(()=>import('./screens/Countries'))
const MapComponent = lazy(()=>import('./screens/Map'))
const StackNav = createStackNavigator()
const BottomNav = createMaterialBottomTabNavigator()

const BottomNavigator = ()=>{
  return <>
    <BottomNav.Navigator 
       initialRouteName="World"  
       activeColor="#f0edf6"
       inactiveColor="#3e2465"
       barStyle={{ backgroundColor: '#e51e72' }}
      >
        <BottomNav.Screen name="World" component={World} options={{
           tabBarIcon: ({color}) => (
            <Icon color={color} size={18} name={'globe-asia'} />
          ),
        }}/>
        <BottomNav.Screen name="Philippines" component={Philippines}  options={{
           tabBarIcon: ({color}) => (
            <Icon color={color} size={18} name={'flag'} />
          ),
        }}/>
        <BottomNav.Screen name="Countries" component={Countries}  options={{
           tabBarIcon: ({color}) => (
            <Icon color={color} size={18} name={'map-marker-alt'} />
          ),
        }}/>
        <BottomNav.Screen name="Map" component={MapComponent}  options={{
           tabBarIcon: ({color}) => (
            <Icon color={color} size={18} name={'map-marked-alt'} />
          ),
        }}/>
    </BottomNav.Navigator>
  </>

}

const App = ()=> {

  const [isloading,setIsloading] = useState(true)

  useEffect(()=>{
      setTimeout(()=>{
        setIsloading(false)
      },3000)
  },[])

  return (
    <>
     <StatusBar barStyle="dark-content" />
 
      <NavigationContainer> 
        <Suspense fallback={<View><Text>Loading</Text></View>}>
            {
              isloading 
              ? <FlashScreen/>
              : <StackNav.Navigator>
                  <StackNav.Screen name="MainPage" children={BottomNavigator} options={{
                    title: '',
                    headerLeft: ()=> <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 18,fontWeight: "bold",color: "dimgray"}}><Text style={{color: "#e51e72"}}>CO</Text><Text style={{color: "#4066B0"}}>VID</Text>-19 Updates</Text>
                    </View>
                  }}/>
              </StackNav.Navigator>
            }
            </Suspense>
        </NavigationContainer> 

    </>
  );
};



export default App;
