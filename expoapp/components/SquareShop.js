import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { baseUrl } from '../urls'

const width = Dimensions.get('window').width / 2

const Shop = ({ shop, navigation }) => {

    return (
        <View style={styles.shop}>
            <View style={styles.touchable}>
                <TouchableOpacity onPress={() => navigation.navigate('Shop', { id: shop._id })}>
                    <View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{shop.name}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={{ uri: `${baseUrl}/api${shop.image}` }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shop: {
        width: width,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        padding: 10,
        borderColor: '#ccc',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    touchable: {
        overflow: 'hidden'
    },
    imageContainer: {
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: 10,
        borderRadius: 10,
        alignSelf: 'center',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        //   height: width * 0.3,
    },
    title: {
        //  fontFamily: 'open-sans-bold',
        fontSize: 15,
    },
    price: {
        //  fontFamily: 'open-sans',
        fontSize: 15,
        color: '#888'
    }
});

export default Shop