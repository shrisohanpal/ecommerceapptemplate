import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Image, Button, StyleSheet, FlatList, ScrollView, Alert } from 'react-native'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { baseUrl } from '../urls'

const CartItem = ({ item }) => {
    //  console.log(item)
    return (
        <View style={{ padding: 20 }}>
            <Image style={styles.image} source={{ uri: `${baseUrl}/api${item.images[0]}` }} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>Price: ₹{item.price}</Text>
            <Text>Scroll </Text>
            <Text>Delete </Text>
        </View>
    )
}

const CartScreen = ({ route, navigation }) => {

    const productId = route.params && route.params.id

    const qty = 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        //    history.push('/login?redirect=shipping')
        if (userInfo) {
            navigation.navigate('Shipping')
        } else {
            Alert.alert("Login to Continue.", "you are not logged in this app. If you want to continue then you have to login.")
            // navigation.navigate('Login')
        }
    }

    return (
        <View>
            {
                cartItems.length === 0
                    ? <Message data="Your cart is empty" variant="success" />
                    : <ScrollView>
                        {/**
                        <FlatList
                            keyExtractor={(item, index) => item._id}
                            data={cartItems}
                            renderItem={({ item }) => <CartItem item={item} />}
                        />
                         */}
                        {cartItems.map((item) => {
                            return (
                                <CartItem key={item.product} item={item} />
                            )
                        })}
                        <Text style={styles.text2}>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</Text>
                        <Text style={styles.text2}>₹{cartItems
                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                            .toFixed(2)}
                        </Text>
                        <View style={{ margin: 10, alignItems: 'flex-start' }}>
                            <Button title="Proceed To Checkout" onPress={checkoutHandler} />
                        </View>
                    </ScrollView>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    image: {
        //   width: width,
        height: 200,
    },
    name: {
        fontSize: 25
    },
    text: {
        fontSize: 18
    },
    text2: {
        fontSize: 25,
        marginVertical: 10,
        marginHorizontal: 20
    }
})

export default CartScreen