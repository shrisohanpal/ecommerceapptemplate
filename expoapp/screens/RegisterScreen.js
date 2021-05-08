import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, View, TextInput, CheckBox, Button, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const submitHandler = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {message && <Message data={message} />}
        {error && <Message data={error} />}
        {loading && <ActivityIndicator size="large" color={Colors.primary} />}

        <Text style={styles.text}>Name</Text>
        <TextInput style={styles.textInput}
          placeholder="Enter Name"
          onChangeText={setName}
          value={name}
        />

        <Text style={styles.text}>Email Address</Text>
        <TextInput style={styles.textInput}
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
        />

        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.textInput}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />

        <Text style={styles.text}>Confirm Password</Text>
        <TextInput style={styles.textInput}
          placeholder="Conform Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />

        <View style={styles.checkBoxContainer}>
          <CheckBox value={showPassword}
            onValueChange={setShowPassword}
            style={styles.checkbox}
          />
          <Text style={{ fontSize: 18 }}>Show Password</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.button}
            title="Register"
            onPress={() => submitHandler()}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.button}
            title="LogIn"
            onPress={() => { navigation.navigate('Login') }}
          />
        </View>

        <TouchableOpacity style={{ margin: 10 }} onPress={() => { navigation.navigate('ForgotPassword') }}>
          <Text style={{ fontSize: 15 }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20
  },
  textInput: {
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  checkBoxContainer: {
    flexDirection: 'row'
  },
  checkbox: {
    color: 'blue'
  },
  buttonContainer: {
    margin: 10
  }
})


export default RegisterScreen