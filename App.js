import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from "./components/UnitsPicker";
import ReloadIcon from "./components/ReloadIcon";
import { colours } from "./utils/index";
import WeatherDetails from "./components/WeatherDetails";
// import { WEATHER_API_KEY } from "react-native-dotenv";

const WEATHER_API_KEY = '2606d4bc85142d1205ac8321aafa64c4'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [state, setState] = useState({
    errorMsg : null,
    currentWeather : null,
    unitsSystem: 'metric'
  }) 

  const {errorMsg, currentWeather, unitsSystem} = state

  useEffect(()=>{
    load()
  }, [])

  async function load () {
    setState({...state, currentWeather: null, errorMsg: null})
    try {
      let {status} = await Location.requestPermissionsAsync()

      if(status !== 'granted'){
        setState({...state, errorMsg : 'Access to location is needed to run the app'+"message 00"})
        return 
      }
      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords

      const weatherPoint = `${BASE_WEATHER_URL}lat=6.6467&lon=3.3739&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const fetchResponse = await fetch(weatherPoint)

      const result = await fetchResponse.json()

      if(fetchResponse.ok){
        setState({...state, currentWeather : result})
      }else{
        setState({...state, errorMsg : result.message+"message 11"})
      }
    } catch (error) {
      setState({...state, errorMsg : error+"message 22"})
    }
  }

  if(currentWeather){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker state={state} setState={setState} />
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather} unitsSystem={unitsSystem}/>
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </View>
    )
  }else if(state.errorMsg){
    return (
      <View style={styles.container}>
        
        <ReloadIcon load={load}/>
        <Text>{errorMsg}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }else{
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colours.PRIMARY_COLOURS} />
        <StatusBar style="auto" />
      </View>
    )
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  }
});
