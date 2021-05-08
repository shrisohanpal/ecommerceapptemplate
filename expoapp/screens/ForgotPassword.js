import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { forgotPassword } from '../actions/userActions'
import Colors from '../constants/Colors'

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userForgotPassword = useSelector((state) => state.userForgotPassword)
    const { loading, error, success } = userForgotPassword

    const submitHandler = () => {
        dispatch(forgotPassword(email))
    }

    useEffect(() => {
        if (success) {
            navigation.navigate('Login')
        }
    }, [userInfo, success])

    return (
        <ScrollView>
            <View style={styles.screen}>
                {error && <Message data={error} />}
                {loading && <ActivityIndicator size="large" color={Colors.primary} />}
                <Text style={styles.text}>Email Address</Text>
                <TextInput style={styles.textInput}
                    placeholder="Enter Email"
                    onChangeText={setEmail}
                    value={email}
                />
                <View style={{ marginVertical: 20 }}>
                    <Button
                        title="Get New Password"
                        onPress={submitHandler}
                    />
                </View>
                <Text style={styles.text}>
                    We will send you a new Password on your Email Address. After login with new Password you can change your password.
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').height,
        alignItems: 'center',
        padding: 10
        //   backgroundColor: 'red',
    },
    text: {
        fontSize: 20,
        marginHorizontal: 10
    },

    textInput: {
        fontSize: 18,
        borderWidth: 1,
        backgroundColor: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        width: 320
    },
})

export default ForgotPassword