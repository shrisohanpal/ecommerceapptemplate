import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Card from '../components/Card'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { logout } from '../actions/userActions'
import Colors from '../constants/Colors'


const Order = ({ navigation, order }) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Order', { id: order._id })}>
        <Text style={styles.text}>
          Id: {order._id}
        </Text>
        <Text style={styles.text}>
          Name: {order.name}
        </Text>

      </TouchableOpacity>
    </Card>
  )
}



const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(getUserDetails('profile'))
      dispatch(listMyOrders())
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, userInfo, user, success])

  const submitHandler = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <View style={styles.profile}>
      {message && <Message data={message} />}
      {success && <Message data="Profile Updated" />}

      {loading ?
        <ActivityIndicator size="large" color={Colors.primary} />
        : error ?
          <Message data={error} />
          : (
            <ScrollView>
              <View style={styles.form}>
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
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setPassword}
                />
                <Text style={styles.label}>Conform Password</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setConfirmPassword}
                />
                <View style={{ marginVertical: 10 }}>
                  <Button
                    title="Update"
                    onPress={submitHandler}
                  />
                </View>
                <Button
                  title="Logout"
                  color='red'
                  onPress={() => dispatch(logout())}
                />
                <View style={{ margin: 20 }} />
                <Text style={styles.label}>Orders</Text>
                {loadingOrders ? (
                  <ActivityIndicator size="large" color={Colors.primary} />
                ) : errorOrders ? (
                  <Message data={errorOrders} />
                ) : (
                  <FlatList
                    keyExtractor={(item, index) => item._id}
                    data={orders}
                    renderItem={({ item }) => <Order order={item} navigation={navigation} />}
                  />
                )}
              </View>
            </ScrollView>
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    padding: 10
  },
  form: {
    margin: 20
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
  card: {
    marginVertical: 5,
    paddingVertical: 10
  },
  text: {
    fontSize: 18,
    marginHorizontal: 10
  }
})

export default ProfileScreen
