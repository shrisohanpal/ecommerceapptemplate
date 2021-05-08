import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity, View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'

import Message from '../components/Message'
import Card from '../components/Card'
import { listCategorys } from '../actions/categoryActions'


const Category = ({ category, navigation }) => {
    return (
        <Card style={styles.category}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductsByCat', { id: category._id, title: category.name })}
            >
                <Text style={styles.text}>{category.name}</Text>
            </TouchableOpacity>
        </Card>
    )
}


const CategoryScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categorys } = categoryList

    useEffect(() => {
        dispatch(listCategorys())
    }, [dispatch])

    return (
        <View>
            {loading ? <ActivityIndicator size="large" />
                : error
                    ? (<Message data={error} />)
                    : (
                        <FlatList
                            keyExtractor={(item, index) => item._id}
                            data={categorys}
                            renderItem={({ item }) => <Category category={item} navigation={navigation} />}
                            showsHorizontalScrollIndicator={false}
                        />
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    category: {
        margin: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 25
    }
})

export default CategoryScreen