import React from 'react';
import {StyleSheet, KeyboardAvoidingView, Text, Dimensions, Image} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Header = (props) => {

        const windowWidth = Dimensions.get('window').width;
        if(windowWidth >= 380){
                var size = 60;
        }else{
                size =50;
        }

        const [loaded] = useFonts({
                Custom: require('../../../assets/fonts/Rubik-Light.ttf'),
        });
              
        if (!loaded) {
        return <AppLoading />;
        }

        return ( 
                <KeyboardAvoidingView style={styles.container}>
                         <Image  source={require('../../../assets/icon/icon.png')} style={styles.icon}/>
                         <Text style={{fontFamily:'Custom', fontSize:size, textTransform:'uppercase'}}>{props.title}</Text>
                </KeyboardAvoidingView>
         );
}

const styles = StyleSheet.create({
        container:{
                marginTop:40,
                alignItems: 'center',
                justifyContent:'center',
                backgroundColor:'white',
                width:'100%'
        },
        icon:{
                width:150,
                height:150,
                marginTop:0,
        }
});
 
export default Header;