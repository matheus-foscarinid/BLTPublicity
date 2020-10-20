import React from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function Promo({route, navigation}) {
    const { title } = route.params;
    const { promoImg } = route.params;

    return(
        <View style={globalStyles.container}>
            <Card>
                 <Text style={globalStyles.titleText}> {title} </Text>
            </Card>
            <Image
                    source= {promoImg}
                    style={{ width: 270, height: 270, alignSelf: "center", resizeMode: "contain", alignSelf: "center" }}
            />

        </View>
    )
}