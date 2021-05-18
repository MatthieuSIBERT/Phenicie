import React from 'react';
import {StyleSheet, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigateur from './src/components/_phenicie/Navigator'
import {SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import { StatusBar } from 'react-native';


export default function App() {

  return (

    <Provider store={store}>
       <SafeAreaProvider>
      <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Navigateur />
          </NavigationContainer>
          <StatusBar />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
    </Provider>
   
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});