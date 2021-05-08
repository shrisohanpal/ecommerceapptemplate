import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Card from '../components/Card'
import { baseUrl } from '../urls'

const Shop = ({ navigation, shop }) => {
    return (
        <Card style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('ShopEdit', { id: shop._id })}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.image}
                        source={{ uri: `${baseUrl}/api${shop.image}` }}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            {shop.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', //backgroundColor: 'red',
        width: '70%'
    },
    text: {
        fontSize: 18,
        marginHorizontal: 10, //backgroundColor: 'red'
    },
})


export default Shop