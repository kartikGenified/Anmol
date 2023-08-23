import React from 'react';
import {View, StyleSheet,TouchableOpacity} from 'react-native';
import PoppinsTextMedium from '../../electrons/customFonts/PoppinsTextMedium';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImageInput = (props) => {
    const data=props.data
    const action = props.action

    const handleOpenImageGallery = async () => {
        const result = await launchImageLibrary();
      };
    return (
        <TouchableOpacity onPress={()=>{
            handleOpenImageGallery()
        }} style={{flexDirection:'row',width:'86%',alignItems:"center",justifyContent:"center",borderWidth:1,height:50,borderColor:'#DDDDDD',marginTop:20}}>
            <View style={{width:'60%',height:50,alignItems:'center',justifyContent:"center"}}>
                <PoppinsTextMedium content ={data}></PoppinsTextMedium>
            </View>
            <View style={{width:'40%',height:50,backgroundColor:'#D6D6D6',alignItems:"center",justifyContent:"center"}}>
                <PoppinsTextMedium content ={action}></PoppinsTextMedium>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default ImageInput;
