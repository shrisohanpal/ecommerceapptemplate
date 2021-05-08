import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ActivityIndicator, Text, Button, ScrollView, Image, Dimensions, FlatList, StyleSheet } from 'react-native'
import Categories from '../components/Categories'
import Shop from '../components/Shop'
import Product from '../components/Product'
import SquareProduct from '../components/SquareProduct'
import Message from '../components/Message'
import { listCategorys } from '../actions/categoryActions'
import { listProducts } from '../actions/productActions'
import Colors from '../constants/Colors'


const HomeScreen = ({ navigation }) => {
    // console.log(props)

    const images = [require('../assets/banners/a.jpg'), require('../assets/banners/b.jpg'), require('../assets/banners/c.jpg')]

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading: loadingCategories, error: errorCategories, categorys } = categoryList

    const shopList = useSelector(state => state.shopList)
    //   const { loading: , error: errorShops, shops } = shopList

    const loadingShops = true
    const errorShops = false


    const productList = useSelector(state => state.productList)
    const { loading: loadingProducts, error: errorProducts, products } = productList

    useEffect(() => {
        dispatch(listProducts(''))
        dispatch(listCategorys())
    }, [dispatch])

    return (
        <ScrollView>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <FlatList
                    keyExtractor={(item, index) => String(item)}
                    data={images}
                    renderItem={({ item }) => <Image style={styles.scrollImage} source={item} />}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    snapToInterval={Dimensions.get('window').width}
                    decelerationRate="fast"
                    bounces={false}
                />

                <Text style={styles.text}>Featured Products</Text>
                {
                    (loadingProducts || loadingCategories)
                        ? <ActivityIndicator size="large" color={Colors.primary} />
                        : errorProducts
                            ? <Message data={errorProducts} />
                            : errorCategories
                                ? <Message data={errorCategories} />
                                : <Categories navigation={navigation} products={products} categorys={categorys} />
                }

                <Image source={require('../assets/banners/ba.jpg')} style={styles.banner} fluid />

                <Text style={styles.text}>Featured Shops</Text>
                {loadingShops ? <ActivityIndicator size="large" color={Colors.primary} />
                    : errorShops
                        ? (<Message data={errorShops} />)
                        : (
                            <FlatList
                                keyExtractor={(item, index) => item._id}
                                data={shops}
                                renderItem={({ item }) => <Shop shop={item} navigation={navigation} />}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                            />
                        )
                }

                <Image source={require('../assets/banners/bb.jpg')} style={styles.banner} fluid />

                <Text style={styles.text}>Featured Products</Text>
                {loadingProducts ? <ActivityIndicator size="large" color={Colors.primary} />
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

                <Image source={require('../assets/banners/bc.jpg')} style={styles.banner} fluid />


                <Image source={require('../assets/banners/cc.jpg')} style={styles.footerBanner} fluid />

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    scrollImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 400 / 1080,
    },
    text: {
        marginTop: 20,
        fontSize: 25
    },
    banner: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 704 / 1312,
    },
    footerBanner: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 280 / 1500,
    },
})

export default HomeScreen
