import React from 'react';
import {StyleSheet, KeyboardAvoidingView, FlatList, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


export default function Body(props){
     
        const [loaded] = useFonts({
                Custom2: require('../../../assets/fonts/Rubik-Light.ttf'),
                Custom3: require('../../../assets/fonts/Rubik-Bold.ttf'),
              });
              
              if (!loaded) {
                return <AppLoading />;
              }

        return(
                <KeyboardAvoidingView style={styles.container}>
                        <Text style={{fontFamily:'Custom3', fontWeight:'normal', textAlign:'center', margin:10,padding:10,fontSize:10, backgroundColor:'rgb(100,186,161)', color:'white'}}>L'utilisation de cette application requiert d'accéder à vos contacts et à l'envoie de SMS</Text>
                        {props.contacts !== 'rien' ? <Text> {props.contacts.a.length} numéros différents</Text>: <Text></Text>}
                        {props.contacts !== 'rien' ? 
                        <View>
                                <FlatList
                                style={styles.liste}
                                data = {props.contacts.a.filter(item => item )}
                                renderItem ={({item})=>
                                <View style={{marginHorizontal:10,backgroundColor:'rgb(250,250,250)'}}><Text style={{fontFamily:'Custom2', marginTop:10, fontSize:20,color:'black', padding:5}}>{item.nom}</Text><Text style={{fontSize:15, padding:5, fontFamily:'Custom2'}}>{item.mobile}</Text></View>}
                                keyExtractor = {item=>item.id}
                                />
                        </View>
                          : <Text style={{margin:10, textAlign:'center'}}>Votre recherche de contacts n'a pas été fructueuse</Text>}
                </KeyboardAvoidingView>
        )
}

const styles = StyleSheet.create({
        container:{
                height:'100%'
        }
});