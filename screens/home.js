import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {globalStyles} from '../styles/global';
import Card from '../shared/card';
import {DeviceEventEmitter} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

Beacons.detectIBeacons();

export default function Home({navigation}) {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState(' ');
  const [uuid, setUuid] = useState({});
  const [dados, setDados] = useState([{}]);
  const [dist, setDist] = useState(0);
  const [deltadist, setDeltatdist] = useState(0);
  const [dadosTemp, setDadosTemp] = useState([]);

  useEffect(() => {
    const dadosTempRef = database().ref('/Beacons');
    const OnLoadingListener = dadosTempRef.on('value', (snapshot) => {
      setDadosTemp([]);
      snapshot.forEach(function (childSnapshot) {
        setDadosTemp((dadosTemp) => [...dadosTemp, childSnapshot.val()]);
      });
    });

    return () => {
      dadosTempRef.off('value', OnLoadingListener);
      console.log(dadosTemp);
    };
  }, []);

  async function rebea() {
    try {
      await Beacons.startRangingBeaconsInRegion('REGION1');
      console.log(`Beacons ranging started succesfully!`);
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`);
    }
  }

  const RemoveReview = (position) => {
    const newReviews = reviews;
    newReviews.splice(position, 1);
    setReviews(newReviews);
  };

  async function rebeaStop() {
    try {
      await Beacons.stopRangingBeaconsInRegion('REGION1');
      console.log(`Beacons ranging stoped succesfully!`);
    } catch (err) {
      console.log(`Beacons ranging not stoped, error: ${error}`);
    }
  }

  function zera() {
    setDist(0);
    setDeltatdist(0);
  }

  useEffect(() => {
    setTimeout(() => {
      rebea();
    }, 3000);
    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      setTimeout(() => {
        setDados(data.beacons);
      }, 1000);
      if (data.beacons.length > 0) {
        var codigos = [];

        for (let index = 0; index < data.beacons.length; index++) {
          codigos[index] = data.beacons[index].uuid;
        }
        //setUuid(codigos)
        setTimeout(() => {
          setUuid(codigos);
        }, 1000);
        //console.log(dados);
      } else {
        setTimeout(() => {
          setUuid({});
        }, 1000);
      }
    });
  }, []);

  //"0bf5cbfc-3677-49bf-bf98-a9a867848e70"
  //{ title: 'Promoção Americanas', body: 'Lorem ipsum', key: '1', imagem: require('../assets/images/americanas.png')}
  function saveToCards(beaconId, card, key) {
    let verific = 0;
    let teste = 0;

    if (uuid.length > 0) {
      for (let index = 0; index < uuid.length; index++) {
        if (uuid[index] == beaconId) {
          for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].key == key) {
              teste = 1;
              verific = 1;
            }
          }

          if (teste == 0) {
            setReviews([...reviews, card]);
            verific = 1;
          }
        }
      }
    }

    if (verific == 0 && reviews.length > 0) {
      for (let index = 0; index < reviews.length; index++) {
        if (reviews[index].key == key) {
          RemoveReview(index);
        }
      }
    }
    if (reviews.length == 0) {
      setMessage('Nenhuma Promoção Detectada, continue Procurando!');
    } else {
      setMessage(' ');
    }
  }

  useEffect(() => {
    // const dadosTempRef = database().ref('/Beacons');
    // const OnLoadingListener = dadosTempRef.on('value', (snapshot) => {
    //   setDadosTemp([]);
    //   snapshot.forEach(function (childSnapshot) {
    //     setDadosTemp((dadosTemp) => [...dadosTemp, childSnapshot.val()]);
    //   });
    // });

    // return () => {
    //   dadosTempRef.off('value', OnLoadingListener);
    //   console.log(dadosTemp[1].card);
    // };

    if (dadosTemp.length > 0) {
      for (let index = 1; index < dadosTemp.length; index++) {
        saveToCards(
          dadosTemp[index].id,
          dadosTemp[index].card,
          dadosTemp[index].key,
        );
      }
    }
  }, [uuid]);

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />

      <Text style={globalStyles.alertText}>{message}</Text>

      <FlatList
        data={reviews}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Promo', item)}>
            <Card>
              <View style={globalStyles.cartao}>
                <View>
                  <Image
                    source={item.imagem}
                    style={{
                      width: 70,
                      height: 70,
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <View style={{marginLeft: 5, marginRight: 10}}>
                  <Text style={globalStyles.titleText}>{item.title}</Text>
                  <Text style={globalStyles.normalText}>
                    Nova promoção disponível! Clique para ver
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        extraData={reviews}
      />
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
