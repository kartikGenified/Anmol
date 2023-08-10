import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BaseUrl} from '../../utils/BaseUrl';
import LinearGradient from 'react-native-linear-gradient';
import {useGetAppUsersDataMutation} from '../../apiServices/appUsers/AppUsersApi';
import SelectUserBox from '../../components/molecules/SelectUserBox';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import CustomTextInput from '../../components/organisms/CustomTextInput';
import CustomTextInputNumeric from '../../components/organisms/CustomTextInputNumeric';

import ButtonNavigateArrow from '../../components/atoms/ButtonNavigateArrow';

const OtpLogin = ({navigation}) => {
  
  const width = Dimensions.get('window').width;

  // fetching theme for the screen-----------------------

  const primaryThemeColor = useSelector(
    state => state.apptheme.primaryThemeColor,
  )
    ? useSelector(state => state.apptheme.primaryThemeColor)
    : '#FF9B00';
  const secondaryThemeColor = useSelector(
    state => state.apptheme.secondaryThemeColor,
  )
    ? useSelector(state => state.apptheme.secondaryThemeColor)
    : '#FFB533';
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : 'grey';
    const buttonThemeColor = useSelector(
      state => state.apptheme.ternaryThemeColor,
    )
      ? useSelector(state => state.apptheme.ternaryThemeColor)
      : '#ef6110';

  const icon = useSelector(state => state.apptheme.icon)
    ? useSelector(state => state.apptheme.icon)
    : require('../../../assets/images/demoIcon.png');

   
    // ------------------------------------------------
    
  
    const getMobile=(data)=>{
        // console.log(data)
    }
    const getName=(data)=>{
        // console.log(data)
    }


  return (
    <LinearGradient
      colors={[primaryThemeColor, secondaryThemeColor]}
      style={styles.container}>
      <View
        style={{
          height: 140,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            ...styles.semicircle,
            width: width + 60,
            borderRadius: (width + width) / 2,
            height: width + 60,
            top: -(width / 2),
          }}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image style={{height:20,width:20,resizeMode:"contain", right:80}} source={require('../../../assets/images/blackBack.png')}></Image>
            </TouchableOpacity>
          <Image
            style={{
              height: 110,
              width: 140,
              resizeMode: 'contain',
              top: width / 8,
            }}
            source={{uri: `${BaseUrl}/api/images/${icon}`}}></Image>
        </View>
      </View>
      
        <View style={{alignItems:'center',justifyContent:"center",width:'100%'}}>
        <View
        style={{
          ...styles.banner,
          backgroundColor: ternaryThemeColor,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}></View>
        </View>
        <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView>
        <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
            <PoppinsText style={{color:'white',fontSize:22}} content = "Welcome"></PoppinsText>
            <PoppinsTextMedium style={{color:'white', fontSize:16}} content = "Login To Your Account"></PoppinsTextMedium>
        </View>
        
        <View style={{width:"100%",alignItems:"center",justifyContent:"center",marginTop:10}}>
            <CustomTextInputNumeric sendData={getMobile} title="Mobile No" image={require('../../../assets/images/whitePhone.png')}></CustomTextInputNumeric>
            <CustomTextInput sendData={getName} title="Name" image={require('../../../assets/images/whiteUser.png')}></CustomTextInput>
        </View>
        </KeyboardAvoidingView>
        <View style={{width:"100%",alignItems:"center",justifyContent:"center",marginTop:20}}>
        <ButtonNavigateArrow backgroundColor={buttonThemeColor} style={{color:'white',fontSize:16}} content="Login" navigateTo=""></ButtonNavigateArrow>
        </View>
        </ScrollView>
     
      
        
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  semicircle: {
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row"
  },
  banner: {
    height: 184,
    width: '90%',
    borderRadius: 10,
  },
  userListContainer: {
    width: '100%',
    height:600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
});

export default OtpLogin;
