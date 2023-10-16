import React, { useEffect, useState } from 'react';
import {View, StyleSheet,TouchableOpacity,Image,ScrollView, Dimensions, Linking} from 'react-native';
import Video from 'react-native-video';
import { useSelector } from 'react-redux';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import { useGetAppVideoMutation } from '../../apiServices/video/VideoApi';
import * as Keychain from 'react-native-keychain';
import Logo from 'react-native-vector-icons/AntDesign'
import moment from 'moment';
import RectangularUnderlinedDropDown from '../../components/atoms/dropdown/RectangularUnderlinedDropDown';

const ReportAndIssue = ({navigation}) => {
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';
    const height = Dimensions.get('window').height
    const productName = "xyz"

const getReason=(data)=>{
console.log(data)
}

    return (
        <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: ternaryThemeColor,
        height: '100%',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '100%',
          marginTop: 10,
          height: '10%',
          marginLeft: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
              marginLeft: 10,
            }}
            source={require('../../../assets/images/blackBack.png')}></Image>
        </TouchableOpacity>
        <PoppinsTextMedium
          content="Report And Issue"
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: '700',
            color: 'white',
          }}></PoppinsTextMedium>
      </View>
      <ScrollView style={{width:'100%',height:'90%'}}>

      
<View
  style={{
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    minHeight:height-100,
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 40,
  }}>
    <PoppinsTextMedium style={{marginLeft:20,marginTop:20,fontWeight:'700',color:'#55595A',fontSize:16}} content ={`Product Name : ${productName}`}></PoppinsTextMedium>
    <RectangularUnderlinedDropDown header="Select a reason" data={["1","2","3","4"]} handleData={getReason}></RectangularUnderlinedDropDown>
<></>
</View>


        </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({})

export default ReportAndIssue;
