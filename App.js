import React, { useState } from 'react';
import * as Font from 'expo-font';
import{ AppLoading } from 'expo';
import drawerNavigator from './routes/drawer';


const getFonts = () => Font.loadAsync({
  'normal-regular' : require('./assets/fonts/Ubuntu-Regular.ttf'),
  'normal-negrito' : require('./assets/fonts/Ubuntu-Bold.ttf'),
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if(fontLoaded){
  return (
    drawerNavigator()
  );
  } else {
    return(
      <AppLoading
      startAsync={getFonts}
      onFinish={()=> setFontLoaded(true)}
    />
    )
  }
}


