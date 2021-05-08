import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'
import Card from '../components/Card'
import Colors from '../constants/Colors'

const User = ({ navigation, user }) => {
    return (
        <Card style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('UserEdit', { id: user._id })}>
                <Text style={styles.text}>
                    Id: {user._id}
                </Text>
                <Text style={styles.text}>
                    Name: {user.name}
                </Text>
                <Text style={styles.text}>
                    Email: {user.email}
                </Text>
            </TouchableOpacity>
        </Card>
    )
}

const UserList = ({ navigation }) => {

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            //  history.push('/login')
        }
    }, [dispatch, navigation, successDelete, userInfo])

    const deleteHandler = (id) => {
        //  if (window.confirm('Are you sure')) {
        dispatch(deleteUser(id))
        // }
    }

    return (
        <View>
            {loading
                ? <ActivityIndicator size="large" color={Colors.primary} />
                : error
                    ? <Message data={error} />
                    : (
                        <FlatList
                            keyExtractor={(item, index) => item._id}
                            data={users}
                            renderItem={({ item }) => <User user={item} navigation={navigation} />}
                        />
                    )
            }
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

export default UserList