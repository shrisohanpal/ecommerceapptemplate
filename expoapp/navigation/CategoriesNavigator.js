import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import CategoryScreen from '../screens/CategoryScreen'
import ProductsByCatScreen from '../screens/ProductsByCatScreen'

const Stack = createStackNavigator()

export default function App({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#007bff' },
            }}
            initialRouteName="Home">
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{
                    title: 'Kalpvriksh',
                    headerLeft: () => (
                        <FontAwesome name="bars" size={25} color='#ffffff' style={{ margin: 10 }} onPress={() => navigation.openDrawer()} />
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="ios-search" size={25} color='#ffffff' style={{ margin: 10 }} onPress={() => navigation.navigate('Search')} />
                            <Ionicons name="ios-cart" size={25} color='#ffffff' style={{ margin: 10 }} onPress={() => navigation.navigate('Cart')} />
                        </View >
                    )
                }}
            />
            <Stack.Screen
                name="ProductsByCat"
                component={ProductsByCatScreen}
                options={({ route }) => ({ title: route.params.title })}
            />

        </Stack.Navigator>
    );
}