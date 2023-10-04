
import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Text,Image,TouchableOpacity,TextInput} from 'react-native';

const RectanglarUnderlinedTextInput = (props) => {
    const [input ,setInput] = useState('')
    const title = props.title
    const placeHolder = props.placeHolder
    const handleTextInput=(data)=>{
        setInput(data)
        props.handleData(data)
    }    
    return (
        <View style={{backgroundColor:"white",width:'90%',borderBottomWidth:1,borderColor:'#DDDDDD',alignItems:"flex-start",justifyContent:'center',marginTop:6}}>
            <Text style={{color:"#818181",fontSize:13,marginBottom:4,fontWeight:"600",marginLeft:14}}>{title}</Text>
            <TextInput value={input} onChangeText={(inp)=>{
                handleTextInput(inp)
            }} placeholder={placeHolder} style={{width:'100%',height:40,fontWeight:'400',color:'black',marginLeft:10}}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({})

export default RectanglarUnderlinedTextInput;
