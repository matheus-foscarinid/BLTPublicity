import { StyleSheet,} from 'react-native';
import { ceil } from 'react-native-reanimated';

export const globalStyles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#1F1E26',

    },
    titleText:{
        fontFamily: 'normal-negrito',
        fontSize: 25,
        color: '#fff',
        textAlign: "center",
    },
    normalText:{
        fontFamily: 'normal-regular',
        fontSize: 15,
        color: '#fff',
        textAlign: "center",
    },
    alertText:{
        fontFamily: 'normal-regular',
        fontSize: 18,
        color: '#fff',
        textAlign: "center",
        marginTop: 50,
    },
    normalTextJustif:{
        fontFamily: 'normal-regular',
        fontSize: 15,
        color: '#fff',
        textAlign: "justify",
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    cartao: {
        flexDirection: 'row',
        flex: 1,
        width: 280,
        
    }
});