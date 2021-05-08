import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Shop from '../components/ListShop'
import {
    listShops,
    deleteShop,
    createShop
} from '../actions/shopActions'
import { SHOP_CREATE_RESET } from '../constants/shopConstants'
import Colors from '../constants/Colors'


const ShopListScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const shopList = useSelector((state) => state.shopList)
    const { loading, error, shops } = shopList

    const shopDelete = useSelector((state) => state.shopDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = shopDelete

    const shopCreate = useSelector((state) => state.shopCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        shop: createdShop,
    } = shopCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: SHOP_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            //    navigation.push('/login')
        }

        if (successCreate) {
            navigation.navigate('ShopEdit', { id: createdShop._id })
        } else {
            dispatch(listShops)
        }
    }, [
        dispatch,
        navigation,
        userInfo,
        successDelete,
        successCreate,
        createdShop,
    ])

    const deleteHandler = (id) => {
        //    if (window.confirm('Are you sure')) {
        dispatch(deleteShop(id))
        //  }
    }

    const createShopHandler = () => {
        dispatch(createShop())
    }

    return (
        <View>
            {/*
            <Row className='align-items-center'>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createShopHandler} disabled={shop}>
                        <i className='fas fa-plus'></i> Create Shop
                    </Button>
                </Col>
            </Row>
                    */}
            {loadingDelete && <ActivityIndicator size="large" color={Colors.primary} />}
            {errorDelete && <Message data={errorDelete} />}
            {loadingCreate && <ActivityIndicator size="large" color={Colors.primary} />}
            {errorCreate && <Message data={errorDelete} />}
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : error ? (
                <Message data={errorDelete} />
            ) : shops && (
                <FlatList
                    keyExtractor={(item, index) => item._id}
                    data={shops}
                    renderItem={({ item }) => <Shop shop={item} navigation={navigation} />}
                />
            )}
        </View>
    )
}


export default ShopListScreen