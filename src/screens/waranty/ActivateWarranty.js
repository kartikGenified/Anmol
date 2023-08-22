import React from 'react';
import {View, StyleSheet, TouchableOpacity,Image,Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import TextInputSquare from '../../components/atoms/TextInputSquare';

const ActivateWarranty = ({navigation}) => {
    const buttonThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : '#ef6110';

    const height = Dimensions.get('window').height;
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
            <TextInputSquare></TextInputSquare>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ActivateWarranty;
