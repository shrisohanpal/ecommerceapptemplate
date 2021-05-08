import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, TextInput, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native'
import Product from '../components/SquareProduct'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import Colors from '../constants/Colors'


const SearchScreen = ({ navigation }) => {

    const [keyword, setKeyword] = useState('')
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
        console.log(keyword)
    }, [dispatch, keyword])

    return (
        <View>
            <TextInput
                style={styles.textInput}
                value={keyword}
                onChangeText={setKeyword}
                placeholder="Enter name or details..."
            />
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : error ? (
                <Message data={error} />
            ) : (
                <View>
                    <FlatList
                        style={{ marginBottom: 160 }}
                        keyExtractor={(item, index) => item._id}
                        data={products}
                        renderItem={({ item }) => <Product product={item} navigation={navigation} />}
                        numColumns={2}
                    />
                    <Button title="SDF" />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        margin: 15,
        fontSize: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default SearchScreen