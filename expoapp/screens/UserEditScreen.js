import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, ActivityIndicator, TextInput, CheckBox, Button, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Card from '../components/Card'
import { getUserDetails, updateUser, deleteUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import Colors from '../constants/Colors'

const UserEditScreen = ({ route, navigation }) => {
    const userId = route.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isVendor, setIsVendor] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            //   history.push('/admin/userlist')
        } else {
            if (!user || !user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsVendor(user.isVendor)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, navigation, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isVendor, isAdmin }))
    }

    const deleteHandler = () => {
        dispatch(deleteUser(userId))
    }

    return (
        <View style={styles.userContainer}>
            {loadingUpdate && <ActivityIndicator size="large" color={Colors.primary} />}
            {errorUpdate && <Message data={errorUpdate} />}
            {loading
                ? <ActivityIndicator size="large" color={Colors.primary} />
                : error
                    ? <Message data={error} />
                    : (
                        <ScrollView>
                            <Card style={styles.card}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={setName}
                                    value={name}
                                />
                                <Text style={styles.label}>Email Address</Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={setEmail}
                                    value={email}
                                />
                                <View style={styles.checkBoxContainer}>
                                    <CheckBox value={isVendor}
                                        onValueChange={setIsVendor}
                                        style={styles.checkbox}
                                    />
                                    <Text style={{ fontSize: 18 }}>Is Vendor</Text>
                                </View>
                                <View style={styles.checkBoxContainer}>
                                    <CheckBox value={isAdmin}
                                        onValueChange={setIsAdmin}
                                        style={styles.checkbox}
                                    />
                                    <Text style={{ fontSize: 18 }}>Is Admin</Text>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Button
                                        title="Update"
                                        onPress={submitHandler}
                                    />
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Button
                                        title="Delete"
                                        color="red"
                                        onPress={deleteHandler}
                                    />
                                </View>
                            </Card>
                        </ScrollView>
                    )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        padding: 10
    },
    card: {
        padding: 10
    },
    label: {
        fontSize: 18,
        marginVertical: 5
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
    checkBoxContainer: {
        flexDirection: 'row'
    },
    checkbox: {
        color: 'blue'
    },
})



export default UserEditScreen