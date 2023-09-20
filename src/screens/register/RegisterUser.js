import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView,TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BaseUrl} from '../../utils/BaseUrl';
import LinearGradient from 'react-native-linear-gradient';import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import CustomTextInput from '../../components/organisms/CustomTextInput';
import { useRegisterUserMutation } from '../../apiServices/register/UserRegisterApi';
import ButtonNavigateArrow from '../../components/atoms/buttons/ButtonNavigateArrow';
import ButtonNavigate from '../../components/atoms/buttons/ButtonNavigate';
import CustomTextInputNumeric from '../../components/organisms/CustomTextInputNumeric';
import { useSendCredentialsMutation } from '../../apiServices/register/SendCrendentialsApi';

const RegisterUser = ({navigation,route}) => {
  const [mobile, setMobile] = useState()
  const [name, setName] = useState()
  
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
    : '#FFB533';

  const icon = useSelector(state => state.apptheme.icon)
    ? useSelector(state => state.apptheme.icon)
    : require('../../../assets/images/demoIcon.png');

  const buttonThemeColor = useSelector(
      state => state.apptheme.ternaryThemeColor,
    )
      ? useSelector(state => state.apptheme.ternaryThemeColor)
      : '#ef6110';
    
// ------------------------------------------

  // initializing mutations --------------------------------


    const [registerUserfunc,{
      data:registerUserData,
      error:registerUserError,
      isLoading:registerUserIsLoading,
      isError:registerUserIsError
    }] = useRegisterUserMutation()

    const [sendCredentialsFunc,{
      data:sendCredentialsData,
      error:sendCredentialsError,
      isLoading:sendCredentialsIsLoading,
      isError:sendCredentialsIsError
    }] = useSendCredentialsMutation()
    
 // ------------------------------------------

// retrieving data from api calls--------------------------

    useEffect(()=>{
      if(registerUserData)
      {
        console.log("user successfully registered",registerUserData.body)
        
        if(registerUserData.success)
        {
          const token = registerUserData.body.token 
          const userId = registerUserData.body.id
          sendCredentialsFunc({userId,token})
          console.log(token, JSON.stringify(userId))
        }
        // sendCredentialsFunc({userId,token})
      }
      else{
        console.log(registerUserError)
      }
    },[registerUserData,registerUserError])

    useEffect(()=>{
      if(sendCredentialsData)
      {
        console.log("send Credentials data",sendCredentialsData)
        if(sendCredentialsData.success)
        {
          navigation.navigate('PasswordLogin')
        }
      }
      else{
        console.log("send Credentials error",sendCredentialsError)
      }
    },[sendCredentialsData,sendCredentialsError])

 // ------------------------------------------
 const user_type = route.params.userType
 const user_type_id = route.params.userId
 const is_approved_needed = route.params.needsApproval
    console.log("From Register Page",is_approved_needed)
    // const userType = route.params.userType

    const getMobile = data => {
        // console.log(data)
        setMobile(data)
      };
      const getName = data => {
        // console.log(data)
        setName(data)
      };
    const handleRegister=()=>{
      if(mobile!==undefined || name!==undefined)
      {
      registerUserfunc({mobile,user_type,user_type_id,name,is_approved_needed})
      }
      else{
        console.log("Mobile or name can't be undefined")
      }

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
      <ScrollView style={{width:'100%'}}>
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
        <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
            <PoppinsText style={{color:'white',fontSize:22}} content = "New User ?"></PoppinsText>
            <PoppinsTextMedium style={{color:'white', fontSize:16}} content = "Register"></PoppinsTextMedium>
        </View>
        <View style={{width:"100%",alignItems:"center",justifyContent:"center",marginTop:10}}>
        <CustomTextInputNumeric
              sendData={getMobile}
              title="Mobile No"
              image={require('../../../assets/images/whitePhone.png')}></CustomTextInputNumeric>
            <CustomTextInput
              sendData={getName}
              title="Name"
              image={require('../../../assets/images/whiteUser.png')}></CustomTextInput>
        </View>
        <View style={{width:"100%",alignItems:'center',justifyContent:"center"}}>
        <ButtonNavigateArrow
              handleOperation={handleRegister}
              backgroundColor={buttonThemeColor}
              style={{color: 'white', fontSize: 16}}
              content="Register">
        </ButtonNavigateArrow>

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
    flexDirection: 'row',
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

export default RegisterUser;
