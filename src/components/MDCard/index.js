import React from 'react';
import { Text, ImageBackground, View, StyleSheet} from 'react-native'

const Card =(props) => {
    const {name, image, bio} = props.user;
    return (
        <View style={styles.card}>
        <ImageBackground source={{uri: image}} 
        style={styles.image}>
          <View style={styles.cardInner}>
           <Text style={styles.name}>
               {name}
           </Text>
           <Text style={styles.bio}>
               {bio}
           </Text>
          </View>
        </ImageBackground>
      </View>
        );
    };

const styles = StyleSheet.create({
    pageContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
    image:{
      width: '100%',
      height: '100%', 
      borderRadius: 10, 
      overflow: 'hidden',
      justifyContent: 'flex-end',
    }, 
    card:{
      width: '80%',
      height: '70%', 
      borderRadius: 10,
      backgroundColor: '#fefefe',
      shadowColor: '#000',
      shadowOffset:{
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.46,
      shadowRadius: 6.68,
      elevation: 11,
      position: 'absolute',
    }, 
    name:{
      fontSize: 30, 
      color: 'white', 
      fontWeight: 'bold', 
    },
    bio:{
      fontSize: 18,
      color: 'white', 
      lineHeight: 24,
    }, 
    cardInner:{
      padding: 10,
    }
  });
  

export default Card;