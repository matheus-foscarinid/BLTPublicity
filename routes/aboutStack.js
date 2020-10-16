import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Sobre from "../screens/sobre";
import Header from '../shared/header';


const Stack = createStackNavigator()

const aboutStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='Sobre'
    screenOptions={{
        headerStyle: {
          backgroundColor: '#111',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
          name='Sobre' 
          component={Sobre} 
          options={{
            headerTitle: () => <Header navigation={navigation} title='Sobre o Projeto'/>,
          }}
      />
    </Stack.Navigator>
  );
}

export default aboutStack;