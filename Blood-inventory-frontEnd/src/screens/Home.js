import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';

export default function Home({navigation}){
    return (

        <View>
        <Image
            source={require('../assets/images/blood.png')}
            style={styles.logo}
            resizeMode="contain"
          >
          </Image>
          <Text style={styles.text}>Manage Blood Stock From One Place</Text>
          <TouchableOpacity 
            onPress={() => navigation.push('Stocks')}
          >
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('Login')}
          >
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
        </View>
    );
  
}

const styles = StyleSheet.create({
    logo:{
      maxWidth:280,
      maxHeight: 180,
      marginLeft:'11%',
      marginTop:'20%'

    },
    text: {
      color: 'black',
      marginLeft:'11%',
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
    },
    signup: {
      backgroundColor: 'white',
      color: '#CC0000',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '11%',
      padding: "2%",
      fontSize:  27,
      marginTop: '20%'
    },
    login: {
      backgroundColor: '#CC0000',
      color: 'white',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '11%',
      padding: "2%",
      fontSize:  27,
      marginTop: '10%'
    }
});
