import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function Promo({route, navigation}) {
    const { title } = route.params;

    return(
        <View style={globalStyles.container}>
            <Card>
                 <Text style={globalStyles.titleText}> {title} </Text>
            </Card>

        </View>
    )
}