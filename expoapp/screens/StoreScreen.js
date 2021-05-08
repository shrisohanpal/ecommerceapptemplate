import React, { useState } from 'react'
import { ScrollView, Image, Text, View, Button, StyleSheet, Alert } from 'react-native'
import Card from '../components/Card'


const SingleCard = ({ title, image, description }) => {
    return (
        <Card style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Image style={styles.image}
                source={image}
            />
            <Text style={styles.description}>{description}</Text>
        </Card>
    )
}

const StoreScreen = ({ navigation }) => {
    return (
        <ScrollView>
            <Card style={styles.card}>
                <Text style={styles.label}>How to Sell?</Text>
            </Card>
            <SingleCard
                title="1. Create your Account"
                image={require('../assets/store/createaccount.jpg')}
                description="To become a Kalpavrikshcart seller,all you need a GST number and bank account."
            />
            <SingleCard
                title="2. Add your Products"
                image={require('../assets/store/addproduct.jpg')}
                description="List your Products for crores of customer and businesses to purchase"
            />
            <SingleCard
                title="3. Start Selling"
                image={require('../assets/store/startselling.jpg')}
                description="Payments will be done directly and securly into your bank account"
            />
            <View style={styles.buttonContainer}>
                <Button title="Register as a Seller" onPress={() => Alert.alert('We are still working on this feature.')} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 25,
        margin: 10
    },
    card: {
        margin: 10,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        margin: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    description: {
        fontSize: 18,
        margin: 10,
    },
    buttonContainer: {
        margin: 20,
        marginBottom: 100,
        alignItems: 'center',
    }
})

export default StoreScreen