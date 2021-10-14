import React from 'react';
import {View, StyleSheet} from 'react-native'
import Card from '../components/MDCard';
import users from '../../assets/data/users';
import AnimatedStack from '../components/AnimatedStack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HomeScreen = () =>{

    const size = 30;
  
  const onSwipeLeft = (user)=>{
    console.warn("swipe left: ", user.name)
  };
  const onSwipeRigth = (user) =>{
    console.warn("swipe rigth: ", user.name)
  };

  return(
    <View style= {styles.pageContainer}>
      <AnimatedStack 
        data={users}
        renderItem={({item}) => <Card user={item}/>}
        onSwipeLeft={onSwipeLeft}
        onSwipeRigth={onSwipeRigth}
      />
      <View style={styles.icons}>
          <View style={styles.button}>
            <FontAwesome name="refresh" size={size} color="#FBD88B" />
          </View>

          <View style={styles.button}>
            <MaterialCommunityIcons name="paw-off" size={size} color="#F76C6B" />
          </View>

          <View style={styles.button}>
            <MaterialCommunityIcons name="paw" size={size} color="#4FCC94" />
          </View>

          <View style={styles.button}>
            <Ionicons name="flash" size={size} color="#A65CD2" />
          </View> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: '#D9DCD6'
  },
  icons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 10,
  },
  button: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white', 
      padding: 10, 
      borderRadius: 50,
  }
});

export default HomeScreen;