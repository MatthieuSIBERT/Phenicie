import React, {useState} from 'react';
import Header from '../_shared/Header';
import { View, TextInput, StyleSheet, Text, Alert, KeyboardAvoidingView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import {useSelector} from 'react-redux';
import { getContact } from '../../redux/selectors';
import * as SMS from 'expo-sms';


export default function Sms(){

        const [message, setmessage] = useState();
        const allContacts =  useSelector(getContact);
        var liste = [];
       
        for(var key in allContacts){
                liste.push(allContacts[key].mobile);
        }

        var tel = '';

        for(let i=0;i<liste.length;i++){
                if(i == liste.length-1){
                        tel += liste[i] ;
                }else{
                        tel += liste[i] + ',';
                }
        }

        function monMessage(e){
                setmessage(e);
        }
        function nettoyage(){
                setmessage();
        }
        
        function envoieSms(){
                if(Platform.OS == 'ios'){
                        const {result} =  SMS.sendSMSAsync(liste,message,{});
                        if(!result){                
                                Alert.alert('Echec de l\'envoie','Aucun système de messagerie est disponible');
                        }
                }else{
                        const {result} =  SMS.sendSMSAsync([tel],message,{});
                        if(!result){                
                                Alert.alert('Echec de l\'envoie','Aucun système de messagerie est disponible');
                        }
                }
               
        }
       

        return(
                <KeyboardAvoidingView style={styles.container}>
                        <ScrollView style={styles.container}>
                        <View style={styles.container}>
                                <Header title="Phénicie"/>
                                { liste[0] != '0634584159' ? <Text style={styles.inline}>{liste.length} numéros de téléphone</Text> :<Text style={styles.inline}>0 numéros de téléphone</Text>}
                                <TextInput placeholder="Taper votre message" style={styles.input} onChangeText={monMessage} value={message} multiline={true} numberOfLines={Platform.OS == 'ios' ? null :15} minHeight={(Platform.OS == 'ios') ? (20*15) :null}/>
                                {allContacts.a || liste.length == 0 ? <Text></Text> : <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:10}}><TouchableOpacity style={{ backgroundColor:'rgb(255,90,90)',alignItems:'center',width:120, padding:5, borderRadius:5, marginVertical:5}}><Text style={{fontWeight:'bold',color:'white'}} onPress={nettoyage}>Reset</Text></TouchableOpacity><TouchableOpacity style={{ backgroundColor:'rgb(100,186,161)',alignItems:'center',width:120,padding:5, borderRadius:5, marginVertical:5}} onPress={envoieSms}><Text style={{fontWeight:'bold',color:'white'}}>Envoyer</Text></TouchableOpacity></View>}
                        </View>
                        </ScrollView>
                </KeyboardAvoidingView>
                
        )
}

const styles = StyleSheet.create({
        container:{
                backgroundColor:'white',
                height:'100%'
        },
        input:{
             backgroundColor:'rgb(240,240,240)',
             textAlignVertical:'top',
             padding:5,
             margin:5
        },
        inline:{
                textAlign:'center'
        },
        bouton:{
               
        }
});