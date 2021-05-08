import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ScrollView, View, Text, Image, Button, ActivityIndicator, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Card from '../components/Card'
import { getOrderDetails, payOrder, dispatchOrder, deliverOrder, } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, } from '../constants/orderConstants'
import Colors from '../constants/Colors'
import { baseUrl } from '../urls'


const OrderScreen = ({ route, navigation }) => {

    const orderId = route.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        if (!userInfo) {
            //    navigation.push('/login')
        }

        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, orderId, successPay, successDeliver, order])

    const successPaymentHandler = () => {
        dispatch(payOrder(orderId))
    }

    const dispatchHandler = () => {
        dispatch(dispatchOrder(order))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return (
        <ScrollView>
            <View>
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : error ? (
                    <Message data={error} />
                ) : (
                    <View>
                        <Card style={styles.card}>
                            <Text style={styles.title}>Order</Text>
                            <Text style={styles.label}>Id: {order._id}</Text>
                            <Text style={styles.label}>Name: {order.user.name}</Text>
                            <Text style={styles.label}>Email: {order.user.email}</Text>
                            <Text style={styles.label}>Address: {' '}{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}</Text>
                            <Text style={styles.label}>Phone: {order.shippingAddress.phone}</Text>
                        </Card>
                        <Card style={styles.card}>
                            {order.isDispatched ? (
                                <Message variant='success' data={`Dispatched on ${order.dispatchedAt}`} />
                            ) : (
                                <Message data="Not Dispatched"></Message>
                            )}

                            {order.isDelivered ? (
                                <Message variant='success' data={`Delivered on ${order.deliveredAt}`} />
                            ) : (
                                <Message data="Not Delivered"></Message>
                            )}
                        </Card>
                        <Card style={styles.card}>
                            <Text style={styles.title}>Payment Method</Text>
                            <Text style={styles.label}>{order.paymentMethod}</Text>
                            {order.isPaid ? (
                                <Message variant='success' data={`Paid on ${order.paidAt}`} />
                            ) : (
                                <Message data="Not Paid" />
                            )}
                        </Card>
                        <Card style={styles.card}>
                            <Text style={styles.title}>Order Item</Text>
                            {order.orderItems.length === 0 ? (
                                <Message data="Order is empty" />
                            ) : (
                                <View>
                                    <Image style={{ marginHorizontal: 10, height: 60, width: 60 }} source={{ uri: `${baseUrl}/api${order.orderItems[0].images[0]}` }} />
                                    <Text style={styles.label}>
                                        {order.orderItems[0].name}
                                    </Text>
                                    <Text style={styles.label}>
                                        {order.orderItems[0].qty} x ₹{order.orderItems[0].price} = ₹{order.orderItems[0].qty * order.orderItems[0].price}                                    </Text>
                                </View>
                            )}
                        </Card>
                        <Card style={styles.card}>
                            <Text style={styles.title}>Order Summary</Text>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Item</Text>
                                <Text style={styles.label}>₹{order.itemsPrice}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Shipping</Text>
                                <Text style={styles.label}>₹{order.shippingPrice}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Tax</Text>
                                <Text style={styles.label}>₹{order.taxPrice}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Total</Text>
                                <Text style={styles.label}>₹{order.totalPrice}</Text>
                            </View>
                        </Card>
                        <Card style={styles.card}>
                            <Message variant="success" data="Your Order is Placed Successfully! You will get your Product very soon." />
                        </Card>
                    </View>
                )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 20
    },
    title: {
        fontSize: 25,
        margin: 10
    },
    label: {
        fontSize: 20,
        margin: 10
    },
    textContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        margin: 10,
        alignItems: 'flex-start'
    }
})

export default OrderScreen