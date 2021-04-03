import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { colours } from '../utils/index'

export default function ReloadIcon({ load }) {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'

    return (
        <View style={styles.reloadIcon}>
            <Ionicons  onPress={load} name={reloadIconName} size={27.5} color={colours.PRIMARY_COLOUR} />
        </View> 
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 60,
        right: 30,
    },
})