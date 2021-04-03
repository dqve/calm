import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker'

export default function UnitsPicker({ state, setState }) {
    return (
        <View style={styles.unitsSystem}>
            <Picker selectedValue={state.unitsSystem}  onValueChange={(item) => setState({...state, unitsSystem: item})} mode="dropdown" itemStyle={{fontSize:17.5}}>
                <Picker.Item label='C°' value="metric"/>
                <Picker.Item label='F°' value="imperial"/>
            </Picker> 
        </View>
    )
}

const styles = StyleSheet.create({
    unitsSystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -30,
            },
            android: {
                top: 30,
            }
        }),
        left: 30,
        width: 50,
        height: 100,

    }
})