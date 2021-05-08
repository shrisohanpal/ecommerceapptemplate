import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card'
import { baseUrl } from '../urls'

const Shop = ({ shop, navigation }) => {
    // console.log(shop)
    return (
        <Card style={styles.shop}>
            <View style={styles.touchable}>
                <TouchableOpacity onPress={() => navigation.navigate('Shop', { id: shop._id })}>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={{ uri: `${baseUrl}/api${shop.image}` }}
                            />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{shop.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Card>
    )
};


const styles = StyleSheet.create({
    shop: {
        height: 200,
        margin: 10,
        width: 200,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10,
        overflow: 'hidden'
    },
    title: {
        //  fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    }
});

export default Shop