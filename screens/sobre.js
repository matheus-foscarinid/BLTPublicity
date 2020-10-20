import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, Button } from "react-native";
import { globalStyles } from '../styles/global';

export default function Sobre() {
    return(
        <View style={globalStyles.container}>
            <View style={{ alignItems: "center", justifyContent: "center"}}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={{ width: 200, height: 200,  }}
                />
            </View>
            <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Sobre</Text>
            <Text style={globalStyles.normalTextJustif}>    Este App foi desenvolvido com a finalidade de criar um Trabalho de Conclusão de Curso da matéria Projeto de Pesquisa da Escola Estadual Monteiro Lobato, no Rio Grande do Sul. Para o desenvolvimento deste aplicativo foram usadas as Seguintes tecnologias:</Text>
            
            </View>

            <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Tecnologias</Text>
            <Text style={globalStyles.normalText}>React Native e EXPO, para fazer a contrução das Interfaces e da lógica por trás;</Text>
            <Text style={globalStyles.normalText}>Firebase, para fazer todo o banco de dados;</Text>
            <Text style={globalStyles.normalText}>React-Native Beacons Manager, como biblioteca para fazer a conexão com os Beacons Bluetooth Low Energy;</Text>

            </View>

        </View>
    )
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