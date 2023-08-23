import React from 'react';
import {View, StyleSheet, TouchableOpacity,Image,Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import TextInputRectangleMandatory from '../../components/atoms/input/TextInputRectangleMandatory';
import TextInputRectangle from '../../components/atoms/input/TextInputRectangle';
import InputDate from '../../components/atoms/input/InputDate';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageInput from '../../components/atoms/input/ImageInput';
import ButtonOval from '../../components/atoms/buttons/ButtonOval';
const ActivateWarranty = ({navigation}) => {
    const buttonThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : '#ef6110';

    const height = Dimensions.get('window').height;

    const handleDataTextInputMandatory=(data)=>{
        console.log(data)
    }
    const handleDataTextInput=(data)=>{
        console.log(data)
    }
    const handleOpenImageGallery = async () => {
        const result = await launchImageLibrary();
      };

    return (
        <View style={{height:"100%",width:'100%',alignItems:"center",justifyContent:"center",backgroundColor:buttonThemeColor}}>
            <View style={{height:'10%',width:'100%',alignItems:'center',justifyContent:"center",position:'absolute',top:0}}>
            <TouchableOpacity
            style={{height:20,width:20,position:"absolute",left:10}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain'}}
              source={require('../../../assets/images/blackBack.png')}></Image>
          </TouchableOpacity>

            </View>
            <View style={{height:'90%',width:'100%',backgroundColor:'white',borderTopRightRadius:30,borderTopLeftRadius:30,position:"absolute",bottom:0,alignItems:'center',justifyContent:"flex-start"}}>
            <TextInputRectangleMandatory handleDataTextInputMandatory={handleDataTextInputMandatory} placeHolder="Enter Mobile No"> </TextInputRectangleMandatory>
            
            <TextInputRectangle handleDataTextInput={handleDataTextInput} placeHolder="Enter Name"> </TextInputRectangle>
            <InputDate></InputDate>
            <ImageInput data="Invoice Images" action="Select File"></ImageInput>
            <ButtonOval style={{color:'white',margin:10}} content="Submit"></ButtonOval>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ActivateWarranty;
