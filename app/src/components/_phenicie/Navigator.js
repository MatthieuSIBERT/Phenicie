import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Phenicie from './Phenicie';
import Sms from './Sms';
import { StyleSheet,KeyboardAvoidingView, Image } from 'react-native';


const Tab = createBottomTabNavigator();


export default function Navigator(){

        return(
               <KeyboardAvoidingView style={styles.container}>
                        <Tab.Navigator tabBarOptions={{keyboardHidesTabBar: true, style:{paddingBottom:10,paddingTop:10, backgroundColor:'rgb(100,186,161)', height:70}, inactiveTintColor:'white', activeTintColor:'black', labelStyle:{fontWeight:'bold',fontSize:12}}} screenOptions={({route})=>({
                                tabBarIcon: ({focused}) =>{
                                        if(route.name == "Mes contacts"){
                                                return(
                                                        focused ? <Image source={require('../../../assets/icon/2x/blackcontact.png')} style={{width:30, height:30}}/> :  <Image source={require('../../../assets/icon/2x/contact.png')} style={{width:30, height:30}}/>
                                                )
                                        }else{
                                                return(
                                                        focused ? <Image source={require('../../../assets/icon/2x/blackmessage.png')} style={{width:30, height:30}}/> : <Image source={require('../../../assets/icon/2x/message.png')} style={{width:30, height:30}}/>
                                                )
                                        }
                                
                                
                                }
                        })}>
                                <Tab.Screen name="Mes contacts" component={Phenicie}/>
                                <Tab.Screen name="Messagerie"component={Sms}></Tab.Screen>
                        </Tab.Navigator>
               </KeyboardAvoidingView>
               
                
        );
}

const styles = StyleSheet.create({
        container:{
          flex: 1
        }
      });