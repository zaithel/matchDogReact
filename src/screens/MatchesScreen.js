import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import users from '../../assets/data/users'

const MatchesScreen = () => {
    return (
        <SafeAreaView style={styles.root}>
           <View style ={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 24, color: 'dodgerblue'}}>
                Nuevas Parejas de juego
            </Text>
            <View style={styles.users}>
            {users.map(user => (
                <View style={styles.user}>
                    <Image source={{uri: user.image}} style={styles.image}></Image>
                </View>
            ))}
            </View>
           </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    root: {
        width: '100%',
        flex: 1, 
        padding: 10, 
    },
    container: {
        padding:10,
    }, 
    user:{
        width: 90,
        height: 90,
        margin: 10,
        borderWidth: 2,
        padding: 3,
        borderColor: 'dodgerblue',
        borderRadius: 50,
    }, 
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    users: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
    }
})

export default MatchesScreen;