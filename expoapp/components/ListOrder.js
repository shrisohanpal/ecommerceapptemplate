import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Card from '../components/Card'

const Order = ({ navigation, order }) => {
    return (
        <Card style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('Order', { id: order._id })}>
                <Text style={styles.text}>
                    Id: {order._id}
                </Text>
                <Text style={styles.text}>
                    User: {order.user && order.user.name}
                </Text>
                <Text style={styles.text}>
                    Date: {order.createdAt.substring(0, 10)}
                </Text>
                <Text style={styles.text}>
                    Total: ₹{order.totalPrice}
                </Text>
            </TouchableOpacity>
        </Card>
    )
}


const styles = StyleSheet.create({
    card: {
        margin: 10,
        paddingVertical: 10
    },
    text: {
        fontSize: 20,
        marginHorizontal: 10
    }
})


export default Order