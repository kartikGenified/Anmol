import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Image} from 'react-native';

const SpinWheel = () => {
    const [upperSemiCircle, setUpperSemiCircle] = useState()
    const [lowerSemiCircle, setLowerSemiCircle] = useState()

    const items =["jeep","lambo","ferrari","maruti"]
    
    useEffect(()=>{
        const halfLength = items.length/2;
        const tempUpper = items.fliter((item,index)=>{
            if(index<halfLength)
            {
                return item
            }
        })
        console.log(tempUpper)
        const tempLower = items.fliter((item,index)=>{
            if(index>=halfLength)
            {
                return item
            }
        })
        console.log(tempLower)
    },[])
    const ItemComponent = (props)=>{
        const width = props.width
        const image  = props.image
        return(
            <View style={{height:'100%',width:width,alignItems:'center',justifyContent:'center'}}>
                <Image style={{height:'90%',width:'90%'}} source={{uri:image}}></Image>
            </View>
        )
    }
    return (
        <View style={{height:200,width:200,borderRadius:100,backgroundColor:'white',elevation:10}}>
            <View style={{height:'50%',width:'100%',alignItems:'center',justifyContent:'center'}}>
            <ItemComponent></ItemComponent>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SpinWheel;
