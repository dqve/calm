
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colours } from '../utils/index'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const { PRIMARY_COLOUR, SECONDARY_COLOUR, BORDER_COLOUR } = colours

export default function WeatherDetails({currentWeather, unitsSystem}) {
    
    const {
        main: { feels_like, humidity, pressure },
        wind: { speed }
    } = currentWeather

    const windSpeed = unitsSystem === 'metric'? `${Math.round(speed)} m/s` : `${Math.round(speed * 3600)} m/h`
    const feelsLike = unitsSystem === 'metric'?feels_like.toFixed(1):(unitsSystem === 'imperial'?(feels_like * 1.8 + 32).toFixed(1):feels_like.toFixed(1))

    return (
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOUR }}>
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="temperature-low" size={30} color={PRIMARY_COLOUR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Feels like :</Text>
                            <Text  style={styles.textSecondary}>{feelsLike}&deg;</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOUR} />
                            <View style={styles.weatherDetailsItems}>
                                <Text>Humidity :</Text>
                                <Text  style={styles.textSecondary}>{humidity}&#37;</Text>
                            </View>
                    </View>
                </View>
            </View>
            <View style={{ ...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: BORDER_COLOUR }}>
                <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOUR }}>
                    <View style={styles.weatherDetailsRow}>
                    <MaterialCommunityIcons name="weather-windy" size={30} color={PRIMARY_COLOUR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Wind speed :</Text>
                            <Text  style={styles.textSecondary}>{windSpeed}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOUR} />
                            <View style={styles.weatherDetailsItems}>
                                <Text>Pressure :</Text>
                                <Text  style={styles.textSecondary}>{pressure} hpa</Text>
                            </View>
                    </View>
                </View>
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        margin: 17.5,
        borderWidth: 1,
        borderColor: BORDER_COLOUR,
        borderRadius: 10,
        marginBottom: 20,
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    weatherDetailsBox: {
        flex: 1,
        padding: 20,
    },
    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOUR,
        fontWeight: '700',
        margin: 7,
    },
})