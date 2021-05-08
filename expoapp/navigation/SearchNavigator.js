import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from '../screens/SearchScreen'


const Stack = createStackNavigator()

export default function App() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#007bff' },
            }}>
            <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    );
}