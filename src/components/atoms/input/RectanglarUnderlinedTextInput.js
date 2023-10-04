
import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Text,Image,TouchableOpacity,TextInput} from 'react-native';

const RectanglarUnderlinedTextInput = (props) => {
    
    const title = props.title
    const placeHolder = props.placeHolder
   
    
    return (
        <View style={{backgroundColor:"white",width:'90%',borderBottomWidth:1,borderColor:'#DDDDDD',alignItems:"center",justifyContent:'center',height:50,marginTop:20}}>
            <Text style={{color:"#818181",fontSize:14,marginBottom:10,position:"absolute",left:20,fontWeight:"600"}}>{title}</Text>
            <TextInput placeholder={placeHolder} style={{width:'100%',height:40}}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({})

export default RectanglarUnderlinedTextInput;
