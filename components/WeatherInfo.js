import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import {colours} from '../utils/index'

const {PRIMARY_COLOUR, SECONDARY_COLOUR} = colours

export default function WeatherInfo({ currentWeather, unitsSystem }) {

    const {
        main: { temp },
        weather: [details],
        name,
    } = currentWeather

    const { icon, main, description } = details

    const iconUrl =  `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={styles.textPrimary}>{unitsSystem === 'metric'?temp.toFixed(1):(unitsSystem === 'imperial'?(temp * 1.8 + 32).toFixed(1):temp.toFixed(1))}&deg;</Text>
            <Text style={styles.weatherDesc}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },    
    weatherIcon: {
        width: 100,
        height: 100,
    },
    weatherDesc: {
        textTransform: 'capitalize'
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOUR
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOUR,
        fontWeight: '500',
        marginTop: 10
    }

})