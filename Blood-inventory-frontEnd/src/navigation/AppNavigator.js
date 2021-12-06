import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import Stocks from '../screens/Stocks';
import Transfer from '../screens/Transfer';


const Stack = createStackNavigator();

function AppNavigator(){

    return(
        <NavigationContainer>
            <Stack.Navigator>            

                <Stack.Screen
                name="Home"
                component={Home}
                />

                <Stack.Screen
                name="Login"
                component = {LoginScreen}

                />                
                
                <Stack.Screen
                name="Register"
                component = {RegisterScreen}
                />

                <Stack.Screen
                name="Stocks"
                component = {Stocks}
                options={{
                    title: 'Stocks',
                    headerStyle: {
                      backgroundColor: '#CC0000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />

                <Stack.Screen
                name="Transfer"
                component = {Transfer}

                options={{
                    title: 'Transfer',
                    headerStyle: {
                      backgroundColor: '#CC0000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default AppNavigator;