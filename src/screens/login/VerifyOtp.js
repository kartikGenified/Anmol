import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BaseUrl} from '../../utils/BaseUrl';
import LinearGradient from 'react-native-linear-gradient';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import CustomTextInput from '../../components/organisms/CustomTextInput';
import CustomTextInputNumeric from '../../components/organisms/CustomTextInputNumeric';
import ButtonNavigateArrow from '../../components/atoms/buttons/ButtonNavigateArrow';
import {useGetLoginOtpMutation} from '../../apiServices/login/otpBased/SendOtpApi';
import {useGetAppLoginMutation} from '../../apiServices/login/otpBased/OtpLoginApi';
import {useVerifyOtpMutation} from '../../apiServices/login/otpBased/VerifyOtpApi';
import { setAppUserId,setAppUserName,setAppUserType,setUserData,setId} from '../../../redux/slices/appUserDataSlice';
import OtpInput from '../../components/organisms/OtpInput';
import * as Keychain from 'react-native-keychain';
import { useGetNameMutation } from '../../apiServices/login/GetNameByMobile';

const VerifyOtp = ({navigation, route}) => {
  const [mobile, setMobile] = useState(route.params.navigationParams.mobile);
  const [otp, setOtp] = useState('');

  const dispatch = useDispatch()
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

  // initializing mutations --------------------------------
  const [
    sendOtpFunc,
    {
      data: sendOtpData,
      error: sendOtpError,
      isLoading: sendOtpIsLoading,
      isError: sendOtpIsError,
    },
  ] = useGetLoginOtpMutation();

  const [
    verifyLoginOtpFunc,
    {
      data: verifyLoginOtpData,
      error: verifyLoginOtpError,
      isLoading: verifyLoginOtpIsLoading,
      isError: verifyLoginOtpIsError,
    },
  ] = useGetAppLoginMutation();

  const [
    verifyOtpFunc,
    {
      data: verifyOtpData,
      error: verifyOtpError,
      isLoading: verifyOtpIsLoading,
      isError: verifyOtpIsError,
    },
  ] = useVerifyOtpMutation();
  const [
    getNameFunc,
    {
      data:getNameData,
      error:getNameError,
      isLoading:getLoading,
      isError:getIsError
    }
  ] = useGetNameMutation()
  // -----------------------------------------

  // fetching navigation route params ------------------------

  // console.log("Navigation Params are", route.params.navigationParams)
  const navigationParams = route.params.navigationParams;
  //   const needsApproval = route.params.navigationParams.needsApproval;
  //   const userType = route.params.navigationParams.userType;
  //   const userId = route.params.navigationParams.userId;

  // -----------------------------------------
  

  const width = Dimensions.get('window').width;

  // retrieving data from api calls--------------------------

  useEffect(() => {
    if (sendOtpData) {
      // console.log(sendOtpData)
    } else {
      // console.log(sendOtpError)
    }
  }, [sendOtpData, sendOtpError]);

  const saveUserDetails=(data)=>{
    
    try{
  console.log("Saving user details",data)
  dispatch(setAppUserId(data.user_type_id))
  dispatch(setAppUserName(data.name))
  dispatch(setAppUserType(data.user_type))
  dispatch(setUserData(data))
  dispatch(setId(data.id))
      }
catch(e){
  console.log("error",e)
}
}

  useEffect(() => {
    if (verifyOtpData) {
      console.log("user Login Data",verifyOtpData)
      if(verifyOtpData.success)
      {
        console.log(verifyOtpData.body.user_type_id,verifyOtpData.body.name,verifyOtpData.body.user_type)
    
        console.log("successfullyLoggedIn")
        saveToken(verifyOtpData.body.token)
        saveUserDetails(verifyOtpData.body)
        navigation.navigate('Dashboard')
      }
    } else {
      console.log(verifyOtpError)
    }
  }, [verifyOtpData, verifyOtpError]);

  useEffect(() => {
    if (verifyLoginOtpData) {
      console.log(verifyLoginOtpData)
      const mobile = navigationParams.mobile;
      const name = navigationParams.name;
      const user_type_id = navigationParams.user_type_id;
      const user_type = navigationParams.user_type;
      if (verifyLoginOtpData.success) {
        verifyOtpFunc({mobile, name,otp, user_type_id, user_type});
      }
    } else {
      console.log(verifyLoginOtpError)
    }
  }, [verifyLoginOtpData, verifyLoginOtpError]);

  // -------------------------------------------------

  const handleOtpResend = () => {
    console.log('Resend');
    const mobile = navigationParams.mobile;
    const name = navigationParams.name;
    const user_type_id = navigationParams.user_type_id;
    const user_type = navigationParams.user_type;

    console.log(mobile, name, user_type_id, user_type);

    sendOtpFunc({mobile, name, user_type_id, user_type});
  };

  const getOtpFromComponent = value => {
    console.log("value",value)
    if (value.length === 6) {
      setOtp(value);
      console.log('From Verify Otp', value);
    }
  };

  const verifyOtp = () => {
    console.log("first")
    const mobile = navigationParams.mobile;
    const name = navigationParams.name;
    const user_type_id = navigationParams.user_type_id;
    const user_type = navigationParams.user_type;
    const is_approved_needed = navigationParams.needsApproval;
    console.log(mobile, name, user_type_id, user_type, otp, is_approved_needed);

    verifyLoginOtpFunc({
      mobile,
      name,
      user_type_id,
      user_type,
      otp,
      is_approved_needed,
    });
  };

  const saveToken=async(data)=>{
  const token = data 
  const password ='17dec1998'

    await Keychain.setGenericPassword(token,password);
  }

  return (
    <LinearGradient
      colors={[ternaryThemeColor, secondaryThemeColor]}
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
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain', right: 90}}
              source={require('../../../assets/images/blackBack.png')}></Image>
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

      <View
        style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
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
      <ScrollView style={{width: '100%'}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{height: 160, width: 160, resizeMode: 'contain'}}
            source={require('../../../assets/images/otpScreenImage.png')}></Image>
          <PoppinsText
            style={{color: 'white', fontSize: 24}}
            content="OTP Verification"></PoppinsText>

          <View style={{flexDirection: 'row'}}>
            <PoppinsTextMedium
              style={{fontSize: 14, color: 'white'}}
              content="Enter the OTP sent to"></PoppinsTextMedium>
            <View style={{marginLeft: 4}}>
              {mobile && (
                <PoppinsTextMedium
                  style={{fontSize: 14, color: 'white'}}
                  content={navigationParams.mobile}></PoppinsTextMedium>
              )}
            </View>
          </View>
        </View>
        <OtpInput
          getOtpFromComponent={getOtpFromComponent}
          color={'white'}></OtpInput>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <PoppinsTextMedium
            style={{fontSize: 14, color: 'white'}}
            content="Didn't you recieve the OTP?"></PoppinsTextMedium>
          <Text
            style={{
              color: buttonThemeColor,
              fontSize: 14,
              marginLeft: 4,
              fontWeight: '800',
            }}
            onPress={() => {
              handleOtpResend();
            }}>
            Resend
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {otp && (
            <ButtonNavigateArrow
              handleOperation={verifyOtp}
              backgroundColor={buttonThemeColor}
              style={{color: 'white', fontSize: 16}}
              content="Verify"></ButtonNavigateArrow>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  semicircle: {
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  banner: {
    height: 184,
    width: '90%',
    borderRadius: 10,
  },
  userListContainer: {
    width: '100%',
    height: 600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default VerifyOtp;
