import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Order from '../components/ListOrder'
import { listOrdersByVendor } from '../actions/orderActions'
import Colors from '../constants/Colors'


const VendorsOrderListScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const orderListByVendor = useSelector((state) => state.orderListByVendor)
    const { loading, error, orders } = orderListByVendor

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isVendor) {
            dispatch(listOrdersByVendor(userInfo._id))
        } else {
            //    navigation.push('/login')
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


export default VendorsOrderListScreen