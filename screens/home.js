import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, StatusBar, Image, Button, PermissionsAndroid } from "react-native";
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

Beacons.detectIBeacons()

//ContextCompat.checkSelfPermission(BLUETOOTH)

export default function Home({ navigation }) {
    
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState(" ");
    const [uuid, setUuid] = useState({});
    const [dados, setDados] = useState([{}]);
    const [dist, setDist] = useState(0);
    const [deltadist,setDeltatdist] = useState(0);

    async function rebea(){
        try {
          await Beacons.startRangingBeaconsInRegion('REGION1')
          console.log(`Beacons ranging started succesfully!`)
        }catch (err) {
          console.log(`Beacons ranging not started, error: ${error}`)
        }
    }

    const RemoveReview = (position) =>{
      const newReviews = reviews;
      newReviews.splice(position, 1);
      setReviews(newReviews);
    };

    async function rebeaStop(){
      try {
        await Beacons.stopRangingBeaconsInRegion('REGION1')
        console.log(`Beacons ranging stoped succesfully!`)
      }catch (err) {
        console.log(`Beacons ranging not stoped, error: ${error}`)
      }
  }

    function zera(){
        setDist(0)
        setDeltatdist(0)
    }

    

    useEffect(() => {
        setTimeout(() => {  rebea()}, 5000);
        DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
          
       
        setTimeout(() => {  setDados(data.beacons)}, 1000);
        if(data.beacons.length > 0){

          var codigos = [];

          for (let index = 0; index < data.beacons.length; index++) {
            codigos[index] = data.beacons[index].uuid;
          }
          //setUuid(codigos)
          setTimeout(() => {  setUuid(codigos)}, 1000);
          //console.log(dados);
        }
        else{
          setTimeout(() => {  setUuid({})}, 1000);
        }
      })
    
  

    },[]);

    //"0bf5cbfc-3677-49bf-bf98-a9a867848e70"
    //{ title: 'Promoção Americanas', body: 'Lorem ipsum', key: '1', imagem: require('../assets/images/americanas.png')}
    function saveToCards(beaconId, card, key) {

      let verific = 0;
      let teste = 0;

      if(uuid.length > 0){
        for (let index = 0; index < uuid.length; index++) {
          if(uuid[index] == beaconId){
            
            for (let i = 0; i < reviews.length; i++) {
              
              if (reviews[i].key == key) {
                teste = 1;
                verific = 1;
              }
            }
          
            if(teste == 0){
              setReviews([...reviews, card])
              verific = 1;
            }
            
          }

        }
        
      }

      if(verific == 0 && reviews.length > 0){   
        
        for (let index = 0; index < reviews.length; index++) {
          if(reviews[index].key == key){
            RemoveReview(index);
          }
          
        }
      }
      if( reviews.length == 0){
        setMessage("Nenhuma Promoção Detectada, continue Procurando!");
      }else{
        setMessage(" ");
      }

    }

    useEffect(() => {

      saveToCards("0bf5cbfc-3677-49bf-bf98-a9a867848e70", { title: 'Promoção Americanas', body: 'Lorem ipsum', key: '1', imagem: require('../assets/images/americanas.png'), promoImg: require('../assets/images/desconto.jpg')}, '1');
      saveToCards("0a7502f9-4427-4cee-9f61-d11d250bbbe9", { title: 'Promoção Renner', body: 'Lorem ipsum', key: '2', imagem: require('../assets/images/renner.png'), promoImg: require('../assets/images/desconto.jpg')}, '2');
      saveToCards("851b190e-5920-43ef-8d17-35c488d96c56", { title: 'Promoção C&A', body: 'Lorem ipsum', key: '3', imagem: require('../assets/images/cea.png'), promoImg: require('../assets/images/desconto.jpg')}, '3');
      

  },[uuid]);



      
      
      
      
    

    return(
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#111"/>

                <Text style={globalStyles.alertText}>{message}</Text>
              
            <FlatList
                data={reviews}
                renderItem={({ item }) =>(
                   <TouchableOpacity onPress={() => navigation.navigate('Promo', item)}>
                       <Card>
                        <View  style={globalStyles.cartao}>
                           <View>
                                <Image
                                source={item.imagem}
                                style={{ width: 70, height: 70, alignSelf: "center", resizeMode: "contain", alignSelf: "center" }}
                                />
                           </View>
                            <View style={{ marginLeft: 5, marginRight: 10}}>
                                <Text style={globalStyles.titleText}>{item.title}</Text>
                                <Text style={globalStyles.normalText}>Nova promoção disponível! Clique para ver</Text>
                            </View>
                        </View>   
                       </Card>
                   </TouchableOpacity> 
                )}
                extraData={reviews}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
 
});
