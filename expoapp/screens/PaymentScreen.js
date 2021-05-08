import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'


const PaymentScreen = ({ navigation }) => {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress.address) {
        navigation.navigate('Shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Cash')

    const dispatch = useDispatch()

    const submitHandler = () => {
        dispatch(savePaymentMethod(paymentMethod))
        navigation.navigate('PlaceOrder')
    }

    submitHandler()
    /*    useEffect(() => {
            navigation.navigate('PlaceOrder')
        }, [navigation])*/

    return (
        <View>
            <Text style={{ fontSize: 22, margin: 10 }}>
                Select Payment Method
            </Text>
            <View>
                <Text>Check Box</Text>
            </View>
            <View style={{ margin: 10, alignItems: 'flex-start' }}>
                <Button title="Go to Place Order Screen" onPress={submitHandler} />
            </View>
        </View>
    )
}

export default PaymentScreen