import React,{useState,useEffect} from 'react';
import {View, StyleSheet,TextInput} from 'react-native';

const TextInputSquare = (props) => {
    const [value,setValue] = useState()
    const placeHolder = props.placeHolder

    const handleInput=(text)=>{
        setValue(text)
        props.handleDataTextInput(text)
    }


    return (
        <View style={{height:50,width:'86%',borderWidth:1,borderColor:'#DDDDDD',alignItems:"center",justifyContent:"center",backgroundColor:'#0000000D',margin:10}}>
            <TextInput style={{height:50,width:'100%',alignItems:"center",justifyContent:"flex-start",fontWeight:'500',marginLeft:20}} placeholderTextColor="grey" onChangeText={(text)=>{handleInput(text)}} value={value} placeholder={placeHolder}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({})

export default TextInputSquare;
