import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import Product from '../components/SquareProduct'
import Message from '../components/Message'
import { listProductsByCat } from '../actions/productActions'
import Colors from '../constants/Colors'

const ProductByCat = ({ route, navigation }) => {

    const catId = route.params.id
    const dispatch = useDispatch()

    const productListByCat = useSelector((state) => state.productListByCat)
    const { loading, error, products } = productListByCat

    useEffect(() => {
        dispatch(listProductsByCat(catId))
    }, [dispatch, catId])

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : error ? (
                <Message data={error} />
            ) : (
                <FlatList
                    keyExtractor={(item, index) => item._id}
                    data={products}
                    renderItem={({ item }) => <Product product={item} navigation={navigation} />}
                    numColumns={2}
                />
            )}
        </View>
    )
}

export default ProductByCat