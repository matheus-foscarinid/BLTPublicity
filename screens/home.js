import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, StatusBar, Image, Button, PermissionsAndroid } from "react-native";
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

Beacons.detectIBeacons()
//ContextCompat.checkSelfPermission(BLUETOOTH)

export default function Home({ navigation }) {
    
    const [reviews, setReviews] = useState([
        //{ title: 'Promoção Americanas', body: 'Lorem ipsum', key: '1', imagem: require('../assets/images/americanas.png')},
        //{ title: 'Promoção Renner', body: 'Lorem ipsum', key: '2', imagem: require('../assets/images/renner.png')},
        //{ title: 'Promoção C&A', body: 'Lorem ipsum', key: '3', imagem: require('../assets/images/cea.png')},
    ]);
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
      })
    
  

    },[]);

    useEffect(() => {

      if(uuid.length > 0){
        for (let index = 0; index < uuid.length; index++) {
          if(uuid[index] == "0bf5cbfc-3677-49bf-bf98-a9a867848e70"){
            setReviews([{ title: 'Promoção Americanas', body: 'Lorem ipsum', key: '1', imagem: require('../assets/images/americanas.png')}])
          }
        }
        //console.log(uuid[0]);
        //console.log(reviews);
      }
  
  

  },[uuid]);

      
  
  
      
      dados.map(Element=>
        {
      
       if (((Element.distance-dist)>0.01)||((dist-Element.distance)>0.01)){
          
          setTimeout(() => {  setDist(Element.distance)}, 1000);
          
          
      }
        
      });

      
      
      
      
    

    return(
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#111"/>

            <View style={globalStyles.container}>
                <View style = {globalStyles.container}>
                    <Button
                    title = "Connect"
                    onPress = {rebea}
                    />
                </View>

                <View style = {globalStyles.container}>      
                    <Button
                    title = "Stop"
                    onPress = {rebeaStop}
                    />
                </View>
                
                <View style = {globalStyles.container}>
                    <Text>
                    Distância: {dist.toFixed(2)}
                    
                    </Text>
                </View>
            </View>
            
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

// Tells the library to detect iBeacons


  function App() {

  


 








  return (
    <View style={styles.container}>
      <View style = {styles.container}>
        <Button
          title = "Connect"
          onPress = {rebea}
        />
      </View>

      <View style = {styles.container}>      
        <Button
          title = "Zerar"
          onPress = {zera}
        />
      </View>
      
      <View style = {styles.container}>
          <Text>
          Distância: {dist.toFixed(2)}m
          </Text>
      </View>
    </View>
  );
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
