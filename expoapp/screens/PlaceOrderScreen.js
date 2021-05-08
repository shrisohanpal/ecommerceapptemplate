import React, { useEffect } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import Card from '../components/Card'
import { baseUrl } from '../urls'

const PlaceOrderScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    if (!cart.shippingAddress.address) {
        navigation.navigate('Shipping')
    } else if (!cart.paymentMethod) {
        navigation.navigate('Payment')
    }
    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = 0
    cart.taxPrice = 0
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            // history.push(`/order/${order._id}`)
            navigation.navigate('Home')
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
        // eslint-disable-next-line
    }, [navigation, success])

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        )
    }

    return (
        <ScrollView>
            <View>
                <Card style={styles.card}>
                    <Text style={styles.heading}>
                        Shipping Address
                </Text>
                    <Text style={styles.text}>
                        {' '}{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                        {cart.shippingAddress.postalCode},{' '}
                        {cart.shippingAddress.country}
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.heading}>
                        Payment Method
                </Text>
                    <Text style={styles.text}>
                        {cart.paymentMethod === 'Cash' ? 'Cash On Delivery' : cart.paymentMethod}
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.heading}>
                        Ordered Items
                </Text>
                    {cart.cartItems.map((item, index) => (
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: `${baseUrl}/api${item.images[0]}` }} style={styles.image} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.itemText}>{item.name}</Text>
                                <Text style={styles.itemText}> {item.qty} x ₹{item.price} = ₹{item.qty * item.price}</Text>
                            </View>
                        </View>
                    ))}
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.heading}>
                        Order Summary
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.heading}>Items</Text>
                        <Text style={styles.heading}>₹{cart.itemsPrice}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.heading}>Shipping</Text>
                        <Text style={styles.heading}>₹{cart.shippingPrice}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.heading}>Tax</Text>
                        <Text style={styles.heading}>₹{cart.taxPrice}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.heading}>Total</Text>
                        <Text style={styles.heading}>₹{cart.totalPrice}</Text>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button title="Place Order" onPress={placeOrderHandler} />
                    </View>
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10
    },
    heading: {
        fontSize: 20,
        margin: 10
    },
    text: {
        fontSize: 15,
        margin: 10
    },
    itemContainer: {
        margin: 10,
        flexDirection: 'row'
    },
    image: {
        width: 60,
        height: 60
    },
    itemText: {
        fontSize: 15,
        marginHorizontal: 10
    }
})


export default PlaceOrderScreen




/*
1. LAnguage educartion ki paribhasa
2. HI waale baccho ki paribhasa
3. Hi waale baccho ki paribhasa
4. Hi waale baccho ki problem kese solve karte hai
*/