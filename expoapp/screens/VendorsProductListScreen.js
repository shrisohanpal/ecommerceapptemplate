import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Product from '../components/ListProduct'
import {
    listProductsByVendor,
    deleteProduct,
    createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Colors from '../constants/Colors'

const VendorsProductListScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const productListByVendor = useSelector(state => state.productListByVendor)
    const { loading, error, products } = productListByVendor

    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isVendor) {
            //  navigation.push('/login')
        }

        if (successCreate) {
            navigation.navigate('ProductEdit', { id: createdProduct._id })
        } else {
            dispatch(listProductsByVendor(userInfo._id))
        }
    }, [
        dispatch,
        navigation,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
    ])

    const deleteHandler = (id) => {
        //   if (window.confirm('Are you sure')) {
        dispatch(deleteProduct(id))
        // }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <View>
            {/*
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            */}
            {loadingDelete && <ActivityIndicator size="large" color={Colors.primary} />}
            {errorDelete && <Message data={errorDelete} />}
            {loadingCreate && <ActivityIndicator size="large" color={Colors.primary} />}
            {errorCreate && <Message data={errorCreate} />}
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : error ? (
                <Message data={error} />
            ) : (
                <FlatList
                    keyExtractor={(item, index) => item._id}
                    data={products}
                    renderItem={({ item }) => <Product product={item} navigation={navigation} />}
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


export default VendorsProductListScreen