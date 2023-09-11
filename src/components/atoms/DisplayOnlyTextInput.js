import React from 'react';
import {View, StyleSheet,Image} from 'react-native';
import PoppinsTextMedium from '../electrons/customFonts/PoppinsTextMedium';

const DisplayOnlyTextInput = (props) => {
    const photo  = props.photo
    const title = props.title
    const data = props.data
    console.log(photo)
    return (
        <View style={{width:"90%",alignItems:"flex-start",justifyContent:"center",borderBottomWidth:1,marginBottom:10,paddingBottom:20}}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <Image style={{height:30,width:30,resizeMode:"contain"}} source={photo}></Image>
                <PoppinsTextMedium style={{fontSize:14,fontWeight:'600',color:'grey'}} content={title}></PoppinsTextMedium>
            </View>
            <PoppinsTextMedium style={{marginRight:10,fontSize:18,color:'black'}} content={data}></PoppinsTextMedium>
        </View>
    );
}

const styles = StyleSheet.create({})

export default DisplayOnlyTextInput;
