import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { baseUrl } from '../urls'

const width = Dimensions.get('window').width / 2

const Product = ({ product, navigation }) => {

    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableOpacity onPress={() => navigation.navigate('Product', { id: product._id })}>
                    <View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{product.name}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={{ uri: `${baseUrl}/api${product.images[0]}` }}
                            />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        width: width,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    touchable: {
        overflow: 'hidden',
    },
    imageContainer: {
        width: width * 0.7,
        height: width * 0.7,
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        // height: width * 0.15,
        overflow: 'scroll'
    },
    title: {
        //  fontFamily: 'open-sans-bold',
        fontSize: 14,
    },
    price: {
        //  fontFamily: 'open-sans',
        fontSize: 15,
        color: '#888'
    }
});

export default Product