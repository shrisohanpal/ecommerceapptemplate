import React from 'react'
import { View, Text, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeNavigator from './HomeNavigator'
import CategoriesNavigator from './CategoriesNavigator'
import SearchNavigator from './SearchNavigator'
import AccountNavigator from './AccountNavigator'


const BottomTab = createBottomTabNavigator()


export default function App() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = 'home'; break
                        case 'Categories':
                            iconName = 'duplicate'; break
                        case 'Search':
                            iconName = 'search'; break;
                        case 'Near Me':
                            iconName = 'location'; break
                        case 'Account':
                            iconName = 'person'; break
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#007bff',
                inactiveTintColor: 'gray',
            }}
            initialRouteName="Home">
            <BottomTab.Screen name="Home" component={HomeNavigator} />
            <BottomTab.Screen name="Categories" component={CategoriesNavigator} />
            <BottomTab.Screen name="Search" component={SearchNavigator} />
            <BottomTab.Screen name="Account" component={AccountNavigator} />
        </BottomTab.Navigator>
    );
}