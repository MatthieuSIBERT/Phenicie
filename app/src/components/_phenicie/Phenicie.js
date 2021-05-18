import React, {useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity, View, Alert, ScrollView} from 'react-native';
import * as Contacts from 'expo-contacts';
import Body from'./Body';
import { SearchBar } from 'react-native-elements';
import Header from '../_shared/Header';
import {useDispatch} from 'react-redux';
import {recupContact} from '../../redux/actions';


export default function Phenicie() {
        
        const  [mesContacts, setMesContacts] = useState('rien');
        const [search, setSearch] = useState('');
        const dispatch = useDispatch();
        let selectionneur = [];
        let ident =1;
      
        function updateSearch(e){
                setSearch(e);
        }

       function recherchez(){
                Test();
       }
       
       function message(){
                 dispatch(recupContact(mesContacts));
                 Alert.alert("Félicitations",'Vous avez trouvé ce que vous aviez recherché, rdv maintenant dans l\'onglet messagerie ');
       }
       
        function Test(){
          (async () => {
                  const { status } = await Contacts.requestPermissionsAsync();
                  if (status === 'granted') {
                  let  {data}  = await Contacts.getContactsAsync({
                  });
                  if (data.length > 0) {
                        let maRecherche = search;
                        for(var key in data){
                                if(data[key] && data[key].phoneNumbers ){
                                        if(data[key].company){
                                                if(data[key].company.includes(maRecherche) || data[key].name.includes(maRecherche)){
                                                        for(var key1 in data[key].phoneNumbers){
                                                                if(data[key].phoneNumbers[key1].label === 'mobile'){
                                                                        let tmp = {id: (ident++).toString() ,nom:(data[key].name).toString() , mobile: (data[key].phoneNumbers[key1].number).toString()};
                                                                        var test = true;
                                                                        for(var key2 in selectionneur){
                                                                                if(selectionneur && selectionneur[key2] && selectionneur[key2].nom && selectionneur[key2].mobile && (selectionneur[key2].mobile == tmp.mobile || selectionneur[key2].nom == tmp.nom)){
                                                                                      test = false;
                                                                                }
                                                                        }
                                                                        if(test === true){
                                                                                selectionneur.push(tmp);
                                                                        }
                                                                }
                                                        } 
                                                }
                                        }else{
                                                if(data[key].name.includes(maRecherche)){
                                                        for(var key1 in data[key].phoneNumbers){
                                                                if(data[key].phoneNumbers[key1].label === 'mobile'){
                                                                        let tmp = {id: (ident++).toString() ,nom:(data[key].name).toString() , mobile: (data[key].phoneNumbers[key1].number).toString()};
                                                                        var test = true;
                                                                        for(var key2 in selectionneur){
                                                                                if(selectionneur && selectionneur[key2] && selectionneur[key2].nom && selectionneur[key2].mobile && (selectionneur[key2].mobile == tmp.mobile || selectionneur[key2].nom == tmp.nom)){
                                                                                       test = false;
                                                                                }
                                                                        }
                                                                        if(test === true){
                                                                                selectionneur.push(tmp);
                                                                        }
                                                                }
                                                        }
                                                }    
                                        }
                                }
                        }
                        if(selectionneur.length >0){
                                setMesContacts({a:selectionneur});
                        }else{
                                setMesContacts('rien');
                        }
                  }
          }
          })();
      }

        return (
                <KeyboardAvoidingView style={styles.container}>
                        <ScrollView>
                                <Header title="Phénicie" />
                                <View style={{marginHorizontal:5}}>
                                <SearchBar
                                style={styles.input}
                                        placeholder="Cherchez vos contacts"
                                        placeholderTextColor='black'
                                        onChangeText={updateSearch}
                                        value={search}
                                        platform='android'
                                />
                                </View>
                                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                        <TouchableOpacity style={{backgroundColor:'rgb(20,20,20)', width:120, padding:5, alignItems:'center', justifyContent:'center', borderRadius:5, margin:5}} onPress={recherchez}><Text style={{color:'white', fontWeight:'bold'}}>Ma recherche</Text></TouchableOpacity>
                                        {mesContacts.a ?
                                        <TouchableOpacity style={{backgroundColor:'rgb(100,186,161)', width:120, padding:5, alignItems:'center', justifyContent:'center', borderRadius:5,margin:5}} onPress={message}><Text style={{color:'white', fontWeight:'bold'}}>Valider ({mesContacts.a.length})</Text></TouchableOpacity> 
                                        : <TouchableOpacity style={{backgroundColor:'rgb(255,90,90)', width:120, padding:5, alignItems:'center', justifyContent:'center', borderRadius:5, margin:5}} ><Text style={{color:'white', fontWeight:'bold'}}>Valider (0)</Text></TouchableOpacity> }
                                </View>
                                <Body contacts={mesContacts}/>
                        </ScrollView>
                </KeyboardAvoidingView>                               
        );
         
}

const styles = StyleSheet.create({
        container:{
           backgroundColor:'white',
           height:'100%'
        },
        input:{
                backgroundColor:'rgb(240,240,240)',
        }
});