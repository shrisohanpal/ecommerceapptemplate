import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, View, FlatList, Dimensions, Text, ActivityIndicator, Image, Button, StyleSheet } from 'react-native'
import { listShopDetails } from '../actions/shopActions'
import { listProductsByShop } from '../actions/productActions'
import Message from '../components/Message'
import Product from '../components/Product'
import Colors from '../constants/Colors'
import { baseUrl } from '../urls'

const width = Dimensions.get('window').width

const ShopScreen = ({ route, navigation }) => {

    const dispatch = useDispatch()

    const shopDetails = useSelector(state => state.shopDetails)
    const { loading: loadingShop, error: errorShop, shop } = shopDetails

    const categoryList = useSelector((state) => state.categoryList)
    const { loading: categoryLoading, error: categoryError, categorys } = categoryList

    const productListByShop = useSelector(state => state.productListByShop)
    const { loading: loadingProducts, error: errorProducts, products } = productListByShop

    useEffect(() => {
        const shopId = route.params.id
        dispatch(listShopDetails(shopId))
        dispatch(listProductsByShop(shopId))
    }, [dispatch, route])

    return (
        <View style={styles.container}>
            <ScrollView>
                {loadingShop ?
                    <ActivityIndicator size="large" color={Colors.primary} />
                    : errorShop ? <Message data={errorShop} />
                        : (
                            <View>
                                <Image style={styles.image} source={{ uri: `${baseUrl}/api${shop.image}` }} />
                                <Text style={styles.name}>{shop.name}</Text>
                                <Text style={styles.text}>Address: {shop.address}</Text>
                                <Text style={styles.text}>Description: {shop.description}</Text>
                            </View>
                        )
                }
                <Text style={styles.name}>Our Products</Text>
                {loadingProducts ?
                    <ActivityIndicator size="large" color={Colors.primary} />
                    : errorProducts
                        ? (<Message data={errorProducts} />)
                        : (
                            <FlatList
                                keyExtractor={(item, index) => item._id}
                                data={products}
                                renderItem={({ item }) => <Product product={item} navigation={navigation} />}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                            />
                        )
                }
            </ScrollView>
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
    }
})

export default ShopScreen