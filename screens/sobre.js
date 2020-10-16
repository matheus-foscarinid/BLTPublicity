import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from '../styles/global';

export default function Sobre() {
    return(
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Sobre</Text>
            <Text style={globalStyles.normalTextJustif}>    Este App foi desenvolvido com a finalidade de criar um Trabalho de Conclusão de Curso da matéria Projeto de Pesquisa da Escola Estadual Monteiro Lobato, no Rio Grande do Sul</Text>
        </View>
    )
}