import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity, View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { listProducts } from '../actions/productActions'
import Product from './SquareProduct'


const Category = ({ category, navigation }) => {

    return (
        <View>
            {
                category.products && category.products.length > 1 &&
                (
                    <View>
                        <Text style={{ fontSize: 20, alignSelf: 'center', margin: 10 }}>
                            {category.name}
                        </Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Product product={category.products[0]} navigation={navigation} />
                                <Product product={category.products[1]} navigation={navigation} />
                            </View>
                            {
                                category.products.length > 3 && (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Product product={category.products[2]} navigation={navigation} />
                                        <Product product={category.products[3]} navigation={navigation} />
                                    </View>
                                )
                            }
                            {
                                category.products.length > 5 && (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Product product={category.products[4]} navigation={navigation} />
                                        <Product product={category.products[5]} navigation={navigation} />
                                    </View>
                                )
                            }
                        </View>

                    </View>
                )
            }
        </View>
    )
}


const Categories = ({ navigation }) => {

    const { categorys } = useSelector(state => state.categoryList)
    const { products } = useSelector(state => state.productList)

    var i, j;
    for (i = 0; i < categorys.length; i++) {
        categorys[i].products = []
        for (j = 0; j < products.length; j++) {
            if (categorys[i]._id === products[j].category)
                categorys[i].products.push(products[j])
        }
    }

    return (
        <View >
            {
                categorys.map((category) => {
                    return (
                        <Category key={category._id} category={category} navigation={navigation} />
                    )
                })
            }
        </View>
    )

}

export default Categories