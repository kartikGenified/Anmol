import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PoppinsText from '../electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../electrons/customFonts/PoppinsTextMedium';
import AnimatedDots from '../animations/AnimatedDots';
const RewardSquare = (props) => {
    const image = props.image
    const amount = props.amount
    const title = props.title
    const color = props.color
    const imageHeight = title === "Cashback" ? 60 : 40
    const imageWidth = title === "Cashback" ? 60 : 40
    console.log("RewardSquare", amount)
    return (
        <View style={{ height: 130, width: 130, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: color, margin: 8 }}>
            <Image style={{ height: imageHeight, width: imageWidth, resizeMode: "contain", margin: 10 }} source={image}></Image>
            {
           amount ?  <PoppinsText content={amount} style={{ fontSize: 18, color: 'black' }}></PoppinsText> : <AnimatedDots color={'black'}/>
            }
            <PoppinsTextMedium content={title} style={{ fontSize: 16, color: 'black' }}></PoppinsTextMedium>
        </View>
    );
}

const styles = StyleSheet.create({})

export default RewardSquare;
