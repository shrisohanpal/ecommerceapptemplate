import React from 'react'
import { View, Text, StyleSheet, ColorPropType } from 'react-native'
import Colors from '../constants/Colors'

const Message = ({ data, variant }) => {
    return (
        <View style={{
            ...styles.message, backgroundColor: variant === 'success' ? Colors.primary : 'red'
        }}>
            <Text style={styles.text}>
                {data}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 20,
        color: '#fff',
        margin: 10
    }
})

export default Message
