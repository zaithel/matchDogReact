import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput } from 'react-native';
import {Auth} from 'aws-amplify';
import {Picker} from '@react-native-picker/picker';
import {User} from '../models';
import { DataStore } from '@aws-amplify/datastore';

import users from '../../assets/data/users'
import { UserAgent } from 'amazon-cognito-identity-js';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [character, setCharacter] = useState('');
    const [lookingFor, setLookingFor] = useState('');
    
    const isValid =()=>{
        return name && bio && character && lookingFor;
    };

const save = async() => {
        if (!isValid()) {
            console.warn('Not valid');
            return;
        }

        const user = await Auth.currentAuthenticatedUser();
        console.log(user);

        console.warn('Valid');
            
        const newUser = new User({
         name,
         bio,
         character,
         lookingFor, 
         image: 'https://www.nationalgeographic.com.es/medio/2021/03/09/perro_4da5a8be_800x1200.jpg',
         sub: user.attributes.sub,
         });

         console.log(newUser);
         console.warn('saving');
         await DataStore.save(newUser);
         console.warn('saved');
         

};


    return (
        <SafeAreaView style={styles.root}>
           <View style ={styles.container}>

               <TextInput 
               style={styles.input} 
               placeholder='Nombre de su mascota' 
               value={name} 
               onChangeText={setName}>
               </TextInput>

               <TextInput 
               style={styles.input} 
               placeholder='Descripción de la mascota' 
               multiline
               numberOfLines={3}
               value={bio} 
               onChangeText={setBio}>
               </TextInput>

               <Text>Mi mascota es:</Text>

                <Picker
                    label='Mi mascota es:'
                    selectedValue={character} 
                    onValueChange={itemValue => setCharacter(itemValue)}>
                    <Picker.Item label="Alegre" value="ALEGRE" />
                    <Picker.Item label="Tranquilo" value="TRANQUILO" />
                    <Picker.Item label="Sociable" value="SOCIABLE" />
                    <Picker.Item label="Ansioso" value="ANSIOSO" />
                </Picker>

                <Text>Busco otra mascota:</Text>

                <Picker
                    label='Busco otra mascota: '
                    selectedValue={lookingFor} 
                    onValueChange={itemValue => setLookingFor(itemValue)}>
                    <Picker.Item label="Alegre" value="ALEGRE" />
                    <Picker.Item label="Tranquila" value="TRANQUILO" />
                    <Picker.Item label="Sociable" value="SOCIABLE" />
                    <Picker.Item label="Ansiosa" value="ANSIOSO" />
                </Picker>

               <Pressable onPress={
                        save
                   } style={styles.button}>
                 <Text>Guardar</Text>
               </Pressable>
               
               <Pressable onPress={()=> Auth.signOut()} style={styles.button}>
                 <Text>Sign Out</Text>
                </Pressable>
               
           </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    root: {
        width: '100%',
        flex: 1, 
        padding: 10, 
    },
    container: {
        padding:10,
    }, 
    input:{
        margin:10,
        borderBottomColor: 'lightgray',
        borderBottomWidth:1,
    },
    button:{
        backgroundColor: 'dodgerblue', 
        height:25,
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius:20, 
        margin:10,
    }
})

export default ProfileScreen;