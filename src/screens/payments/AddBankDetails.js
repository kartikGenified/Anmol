import React,{useEffect, useId, useState} from 'react';
import {View, StyleSheet,TouchableOpacity,Image,FlatList,ScrollView,Dimensions} from 'react-native';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import { useSelector } from 'react-redux';
import { useFetchGiftsRedemptionsOfUserMutation } from '../../apiServices/workflow/RedemptionApi';
import * as Keychain from 'react-native-keychain';
import { useFetchUserPointsMutation } from '../../apiServices/workflow/rewards/GetPointsApi';
import moment from 'moment';
import { BaseUrlImages } from '../../utils/BaseUrlImages';
import RectangularUnderlinedDropDown from '../../components/atoms/dropdown/RectangularUnderlinedDropDown';
import RectanglarUnderlinedTextInput from '../../components/atoms/input/RectanglarUnderlinedTextInput';
const AddBankDetails = ({navigation}) => {
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';
    const bankNames=["State Bank Of India","Punjab National Bank","IndusInd Bank","Canara Bank","Axis bank","HDFC Bank"]
    const height = Dimensions.get('window').height
    let selectedBankName = ''
    const getBankName=(data)=>{
        console.log(data)
        selectedBankName=data
    }
    console.log(selectedBankName)
    const BankDetails=()=>{
        return(
            <View style={{minHeight:200,width:'90%',backgroundColor:'white',borderRadius:20,marginTop:20,marginBottom:20,alignItems:'center',justifyContent:'center'}}>
                <RectangularUnderlinedDropDown data={bankNames} handleData={getBankName}></RectangularUnderlinedDropDown>
                <RectanglarUnderlinedTextInput title = "IFSC"></RectanglarUnderlinedTextInput>
            </View>
        )
    }
    return (
        <View style={{alignItems:"center",justifyContent:"center",width:'100%',backgroundColor:ternaryThemeColor,height:'100%'}}>
            <ScrollView style={{width:'100%',height:height}}>
            <View style={{alignItems:"center",justifyContent:"flex-start",flexDirection:"row",width:'100%',marginTop:20,height:30}}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
            <Image style={{height:24,width:24,resizeMode:'contain',marginLeft:20}} source={require('../../../assets/images/blackBack.png')}></Image>

                </TouchableOpacity>
            <PoppinsTextMedium content ="Add Bank Details" style={{marginLeft:10,fontSize:16,fontWeight:'700',color:'white'}}></PoppinsTextMedium>
            
            </View>
            
            <View style={{alignItems:"center",justifyContent:'center',borderTopRightRadius:40,borderTopLeftRadius:40,backgroundColor:"#F6F6F6",height:'80%',width:'100%',marginTop:40}}>
                <BankDetails></BankDetails>
            </View>
            </ScrollView>
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default AddBankDetails;
