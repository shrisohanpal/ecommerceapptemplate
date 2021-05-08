import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress, savePaymentMethod } from '../actions/cartActions'

const ShippingScreen = ({ navigation }) => {

    const [paymentMethod, setPaymentMethod] = useState('Cash')

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    // shippingAddress.address = "Da"
    // console.log(shippingAddress)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [phone, setPhone] = useState(shippingAddress.phone)

    const dispatch = useDispatch()

    const submitHandler = () => {
        dispatch(saveShippingAddress({ address, city, postalCode, phone }))
        // navigation.navigate('Payment')
        dispatch(savePaymentMethod(paymentMethod))
        navigation.navigate('PlaceOrder')
    }


    return (
        <View style={styles.shipping}>
            <ScrollView>
                <View style={styles.form}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setAddress}
                        value={address}
                    />
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setCity}
                        value={city}
                    />
                    <Text style={styles.label}>Postal Code</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setPostalCode}
                        value={postalCode}
                    />
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setPhone}
                        value={phone}
                    />
                    <View style={{ marginVertical: 10 }}>
                        <Button
                            title="Continue"
                            onPress={submitHandler}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    shipping: {
        flex: 1,
        padding: 10
    },
    form: {
        margin: 20
    },
    label: {
        fontSize: 18,
        marginVertical: 5
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default ShippingScreen