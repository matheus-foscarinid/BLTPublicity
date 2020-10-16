import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Configs from "../screens/configs";
import Header from '../shared/header';


const Stack = createStackNavigator()

const configsStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='Configs'
    screenOptions={{
        headerStyle: {
          backgroundColor: '#111',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
          name='Configs' 
          component={Configs} 
          options={{
            headerTitle: () => <Header navigation={navigation} title='Configurações'/>,
          }}
      />
    </Stack.Navigator>
  );
}

export default configsStack;