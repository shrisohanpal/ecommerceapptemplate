import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Card from '../components/Card'
import { listCategoryDetails, updateCategory } from '../actions/categoryActions'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'
import Colors from '../constants/Colors'

const CategoryEditScreen = ({ route, navigation }) => {

    const categoryId = route.params.id
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    const categoryDetails = useSelector((state) => state.categoryDetails)
    const { loading, error, category } = categoryDetails

    const categoryUpdate = useSelector((state) => state.categoryUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = categoryUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            navigation.navigate('CategoryList')
            //console.log('Called')
        } else {
            if (!category || !category._id || category._id !== categoryId) {
                dispatch(listCategoryDetails(categoryId))
            } else {
                setName(category.name)
            }
        }
    }, [dispatch, navigation, categoryId, category, successUpdate])

    const submitHandler = () => {
        // e.preventDefault()
        dispatch(
            updateCategory({
                _id: categoryId,
                name
            })
        )
    }

    return (
        <ScrollView>
            <Card style={styles.card}>
                {loadingUpdate && <ActivityIndicator size="large" color={Colors.primary} />}
                {errorUpdate && <Message data={errorUpdate} />}
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : error ? (
                    <Message data={error} />
                ) : (
                    <View>
                        <Text style={styles.title}>Edit Category</Text>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.textInput}
                            placeholder="Enter name"
                            value={name}
                            onChangeText={setName}
                        />
                        <View style={styles.buttonContainer} >
                            <Button title="Update"
                                onPress={submitHandler}
                            />
                        </View>
                    </View>
                )
                }
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 20
    },
    title: {
        fontSize: 25,
        margin: 10
    },
    label: {
        fontSize: 20,
        margin: 10
    },
    textInput: {
        fontSize: 18,
        borderWidth: 1,
        backgroundColor: 1,
        padding: 10,
        margin: 10,
        borderRadius: 5
    },
    buttonContainer: {
        margin: 10,
        alignItems: 'flex-start'
    }
})

export default CategoryEditScreen