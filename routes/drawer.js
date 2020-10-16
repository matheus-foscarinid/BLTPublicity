import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, Linking, TouchableOpacity } from "react-native";

import aboutNavigator from './aboutStack';
import homeNavigator from './homeStack';
import configsNavigator from './configsStack';

const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(124, 93, 227)',
        background: 'rgb(255, 255, 255)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(255, 255, 255)',
        border: 'rgb(255, 255, 255)',
    },
  };


const Drawer = createDrawerNavigator();

export default function drawerNavigator() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Drawer.Navigator 
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor: '#222',
                width: 200,  
            }}  
            >
                <Drawer.Screen name="Home" component={homeNavigator} />
                <Drawer.Screen name="Sobre" component={aboutNavigator} />
                <Drawer.Screen name="Configurações" component={configsNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

function CustomDrawerContent(props) {
    return (
    <View style={styles.container}>
        <DrawerContentScrollView {...props} >
                <View style={styles.containerImage}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{ width: 150, height: 150 }}
                    />
                </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>

        <View style={styles.footer}>
            <View style={styles.imagesView}>
                <TouchableOpacity style={styles.images} accessibilityRole='link'onPress={ ()=> Linking.openURL('https://google.com') }>
                    <Image
                        source={require('../assets/images/github.png')}
                        style={{ width: 55, height: 55 }}
                    />
                </TouchableOpacity>   
                <TouchableOpacity style={styles.images} accessibilityRole='link'onPress={ ()=> Linking.openURL('https://google.com') }>
                    <Image
                        source={require('../assets/images/instagram.png')}
                        style={{ width: 55, height: 55 }}
                    />
                </TouchableOpacity> 
                <TouchableOpacity style={styles.images} accessibilityRole='link'onPress={ ()=> Linking.openURL('https://google.com') }>
                    <Image
                        source={require('../assets/images/email.png')}
                        style={{ width: 55, height: 55 }}
                    />
                </TouchableOpacity> 
            </View>    
        </View>

    </View>
    );
  }

  const styles = StyleSheet.create({
    containerImage: {
        alignItems: 'center',
        flex: 1,
        //backgroundColor: '#fff',

    },
    container: {
        flex: 1,

    },
    footer: {
        position: 'absolute',
        bottom:0,
        flex: 1,
        
    },
    imagesView: {
        flex: 1,
       // backgroundColor: '#fff',
        flexDirection: 'row',  
    },
    images: {
        marginLeft: 8, 
        marginBottom: 10,
    },
});