import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Promo from '../screens/promo';
import Configs from '../screens/configs';
import Header from '../shared/header';


const homeStack = ({ navigation }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"

      screenOptions={{
        headerStyle: {
          backgroundColor: '#111',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header navigation={navigation} title='Projeto dos Beacons'/>,
        }}
      />

      <Stack.Screen
       name="Promo"
      component={Promo}
      options={{ title: 'Promoções' }} 
      
      />

    </Stack.Navigator>
  );
};


export default homeStack;