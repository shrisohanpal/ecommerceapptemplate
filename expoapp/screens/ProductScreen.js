import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, View, FlatList, Dimensions, Text, ActivityIndicator, Image, Button, Picker, StyleSheet } from 'react-native'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Colors from '../constants/Colors'
import { baseUrl } from '../urls'

const width = Dimensions.get('window').width

const ProductScreen = ({ navigation, route }) => {

    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(route.params.id))
    }, [dispatch, route])

    const addToCartHandler = () => {
        navigation.navigate('Cart', { id: product._id, qty: qty })
    }

    return (
        <View style={styles.container}>
            {loading ?
                <ActivityIndicator size="large" color={Colors.primary} />
                : error ? <Message data={error} />
                    : (
                        <ScrollView>
                            <View>
                                <FlatList
                                    keyExtractor={(item, index) => String(1 + index)}
                                    data={product.images}
                                    renderItem={({ item }) => <Image style={styles.image}
                                        source={{ uri: `${baseUrl}/api${item}` }} />}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    snapToInterval={width}
                                    decelerationRate="fast"
                                    bounces={false}
                                />
                                <Text style={styles.name}>{product.name}</Text>
                                <Text style={styles.text}>Description: {product.description}</Text>
                                <Text style={styles.text}>Price: ₹{product.price}</Text>
                                <Text style={styles.text}>GST: {product.gst} % </Text>
                                <Text style={styles.text}>Final Price: ₹{product.finalPrice}</Text>
                                <Text style={styles.text}>
                                    Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </Text>

                                {product.countInStock > 0 && (
                                    <>
                                        <Text style={styles.text}>
                                            Select Quantity
                                </Text>
                                        <Picker
                                            selectedValue={qty}
                                            style={{ marginLeft: 10, width: 120 }}
                                            onValueChange={(itemValue, itemIndex) => setQty(itemValue)}                                >
                                            {[...Array(product.countInStock).keys()].map(
                                                (x) => (
                                                    <Picker.Item key={x + 1} label={String(x + 1)} value={x + 1} />
                                                )
                                            )}
                                        </Picker>
                                    </>)
                                }
                                <Text style={styles.text}>
                                    {product.returnable
                                        ? "Returnable"
                                        : "Not Returnable"
                                    }
                                </Text>
                                <Text style={styles.text}>
                                    {product.refundable
                                        ? "Refundable"
                                        : "Not Refundable"
                                    }
                                </Text>
                                <Text style={styles.text}>
                                    {product.exchange === 0
                                        ? "No Exchange"
                                        : `Exchange with in ${product.exchange} days`

                                    }
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Add To Cart"
                                        color={Colors.primary}
                                        disabled={product.countInStock === 0}
                                        onPress={addToCartHandler}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10
    },
    product: {
        flex: 1,// backgroundColor: 'red'
    },
    image: {
        width: width,
        height: 200,
    },
    name: {
        margin: 10,
        fontSize: 25
    },
    text: {
        margin: 10,
        fontSize: 18
    },
    buttonContainer: {
        margin: 30,
    }
})

export default ProductScreen