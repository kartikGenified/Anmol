import React from 'react';
import {View, StyleSheet,Image,Text} from 'react-native';
import PoppinsText from '../electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../electrons/customFonts/PoppinsTextMedium';

const DashboardDataBox = (props) => {
    const image = props.image
    const header = props.header
    const data=props.data
    return (
        <View style={{height:64,flexDirection:"row",alignItems:"center",justifyContent:"center",padding:10,margin:10,borderWidth:1,borderColor:'#DDDDDD',width:150,borderRadius:14,elevation:2,backgroundColor:"white"}}>
            <View style={{width:'40%'}}></View>
            <Image source={image} style={{height:40,width:40,resizeMode:'contain',borderRadius:30,position:'absolute',left:10}}></Image>
            <View style={{width:'70%',alignItems:"center",justifyContent:"center",marginTop:10}}>
                <Text style={{color:"black",fontSize:12,fontWeight:'400'}}>{header}</Text>
                <PoppinsText style={{fontSize:18,fontWeight:'600'}} content={data}></PoppinsText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default DashboardDataBox;
