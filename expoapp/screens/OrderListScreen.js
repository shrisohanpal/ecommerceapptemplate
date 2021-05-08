import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Order from '../components/ListOrder'
import { listOrders } from '../actions/orderActions'
import Colors from '../constants/Colors'

const OrderListScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            //  history.push('/login')
        }
    }, [dispatch, navigation, userInfo])

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : error ? (
                <Message data={error} />
            ) : (
                <FlatList
                    keyExtractor={(item, index) => item._id}
                    data={orders}
                    renderItem={({ item }) => <Order order={item} navigation={navigation} />}
                />
            )}
        </View>
    )
}


export default OrderListScreen
