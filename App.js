import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Pressable} from 'react-native' ;


import Auth from '@aws-amplify/auth';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Amplify from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { useSharedValue } from 'react-native-reanimated';


Amplify.configure({
  ...config,
  Analytics: { 
    disabled: true
  }
});

const App = () =>{

  const [activeScreen, setActiveScreen] = useState('HOME');
  const color = "#b5b5b5";
  const size = 30;
  const activeColor = 'dodgerblue';

  return(
    <SafeAreaView style={styles.root}>
      <View style= {styles.pageContainer}>
        <View style={styles.topNavigation}>
          <Pressable onPress={() => setActiveScreen('HOME')}>
            <Fontisto name="paw" size={size} color={activeScreen == 'HOME' ? activeColor : color} />
          </Pressable>

          <Pressable onPress={() => setActiveScreen('MATCH')}>
            <Foundation name="guide-dog" size={size} color={activeScreen == 'MATCH' ? activeColor : color} />
          </Pressable>

          <Pressable onPress={() => setActiveScreen('CHAT')}>
           <Ionicons name="md-chatbubble" size={size} color={activeScreen == 'CHAT' ? activeColor : color} />
          </Pressable>

          <Pressable onPress={() => setActiveScreen('PROFILE')}>
           <MaterialCommunityIcons name="dog" size={size} color={activeScreen == 'PROFILE' ? activeColor : color} />
          </Pressable>
         
        </View>
        
        {activeScreen == 'HOME' && <HomeScreen></HomeScreen>}
        {activeScreen == 'MATCH' && <HomeScreen></HomeScreen>}
        {activeScreen == 'CHAT' && <MatchesScreen></MatchesScreen>}
        {activeScreen == 'PROFILE' && <ProfileScreen></ProfileScreen>}
    </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  root:{
    flex:1,
  },
  pageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  topNavigation:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', 
    padding:10,
  },
});

export default withAuthenticator(App);