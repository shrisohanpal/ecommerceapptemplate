import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ActivityIndicator, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { listShops } from '../actions/shopActions'
import Shop from '../components/SquareShop'
import Colors from '../constants/Colors';


const NearMeScreen = ({ navigation }) => {

    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const dispatch = useDispatch()

    const shopList = useSelector(state => state.shopList)
    const { loading: loadingShops, error: errorShops, shops } = shopList

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };


    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again later.',
                [{ text: 'Okay' }]
            );
        }
        setIsFetching(false);
    };

    useEffect(() => {
        dispatch(listShops)
        getLocationHandler()
    }, [dispatch])

    return (
        <FlatList
            keyExtractor={(item, index) => item._id}
            data={shops}
            renderItem={({ item }) => <Shop shop={item} navigation={navigation} />}
            numColumns={2}
        />
    )
}


export default NearMeScreen