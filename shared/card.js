import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Card(props) {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 7,
        elevation: 3,
        backgroundColor: '#483684',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        marginHorizontal: 4,
        marginVertical: 5,
        shadowRadius: 2,
        
    },
    cardContent: {
        
        marginVertical: 10,
        marginHorizontal: 18,
    }
    });