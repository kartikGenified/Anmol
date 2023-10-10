import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView,TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BaseUrl} from '../../utils/BaseUrl';
import LinearGradient from 'react-native-linear-gradient';import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import CustomTextInput from '../../components/organisms/CustomTextInput';
import { usePasswordLoginMutation } from '../../apiServices/login/passwordBased/PasswordLoginApi';
import ButtonNavigateArrow from '../../components/atoms/buttons/ButtonNavigateArrow';
import ButtonNavigate from '../../components/atoms/buttons/ButtonNavigate';
import TextInputRectangularWithPlaceholder from '../../components/atoms/input/TextInputRectangularWithPlaceholder';


const PasswordLogin = ({navigation,route}) => {
  const [username, setUsername] = useState()
  const [passwords, setPasswords] = useState()
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


    const [passwordLoginfunc,{
      data:passwordLoginData,
      error:passwordLoginError,
      isLoading:passwordIsLoading,
      isError:passwordIsError
    }] = usePasswordLoginMutation()
    
 // ------------------------------------------

// retrieving data from api calls--------------------------

    useEffect(()=>{
      if(passwordLoginData)
      {
        console.log("Password Login Data",passwordLoginData)
        if(passwordLoginData.success)
        {
          navigation.navigate('Dashboard')
        }
      }
      else{
        console.log("Password Login Error",passwordLoginError)
      }
    },[passwordLoginData,passwordLoginError])

 // ------------------------------------------


    const userType = route.params.userType
    const userId = route.params.userId
    const needsApproval = route.params.needsApproval
    console.log("Needs approval",needsApproval)
    const getUserId=(data)=>{
        console.log(data)
        setUsername(data)
    }
    const getPassword=(data)=>{
        console.log(data)
        setPasswords(data)
    }
    const handleLogin=()=>{
      console.log( username,passwords)
      const user_id = username
      const password = passwords
      passwordLoginfunc({user_id,password})

    }
    const handleNavigationToRegister=()=>{
    // navigation.navigate('BasicInfo',{needsApproval:needsApproval, userType:userType, userId:userId})

      navigation.navigate('RegisterUser',{needsApproval:needsApproval, userType:userType, userId:userId})


    }


  return (
    <LinearGradient
      colors={["white", "white"]}
      style={styles.container}>
      {/* <View
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
      </View> */}
      <View style={{width:'100%',alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:ternaryThemeColor,}}>
      <View
        style={{
          height: 120,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:ternaryThemeColor,
          flexDirection:'row',
          
        }}>
        
          <TouchableOpacity
          style={{height:50,alignItems:"center",justifyContent:'center',position:"absolute",left:10,top:20}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain'}}
              source={require('../../../assets/images/blackBack.png')}></Image>
          </TouchableOpacity>
          <Image
            style={{
              height: 50,
              width: 100,
              resizeMode: 'contain',
              top:20,
            position:"absolute",
            left:50,
              borderRadius:10
              
              
            }}
            source={{uri: `${BaseUrl}/api/images/${icon}`}}></Image>
      </View>
      <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginTop: 10,
              width:'90%'
            }}>
            <PoppinsText
              style={{color: 'white', fontSize: 28}}
              content="Login To Your Account"></PoppinsText>
            
          </View>
      </View>
      <ScrollView style={{width:'100%'}}>
       
        
        <View style={{width:"100%",alignItems:"center",justifyContent:"center",marginTop:30}}>
            {/* <CustomTextInput sendData={getUserId} title="Username" image={require('../../../assets/images/whiteUser.png')}></CustomTextInput>
            <CustomTextInput sendData={getPassword} title="Password" image={require('../../../assets/images/whitePassword.png')}></CustomTextInput> */}

            <TextInputRectangularWithPlaceholder
            placeHolder="UserName"
            handleData={getUserId}
            maxLength={10}
              ></TextInputRectangularWithPlaceholder>
              <TextInputRectangularWithPlaceholder
            placeHolder="Password"
            handleData={getPassword}
            maxLength={10}
              ></TextInputRectangularWithPlaceholder>
        </View>
        <View style={{width:"100%",alignItems:'center',justifyContent:"center"}}>
        <ButtonNavigateArrow
              handleOperation={handleLogin}
              backgroundColor={buttonThemeColor}
              style={{color: 'white', fontSize: 16}}
              content="Login">
        </ButtonNavigateArrow>

        </View>

        <View style={{width:"100%",alignItems:'center',justifyContent:"center",marginTop:20}}>
        <PoppinsTextMedium style={{fontSize:18}} content ="Don't have an account ?"></PoppinsTextMedium>
        <ButtonNavigate
              handleOperation={handleNavigationToRegister}
              backgroundColor={buttonThemeColor}
              style={{color: 'white', fontSize: 16}}
              content="Register"
              >
        </ButtonNavigate>

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

export default PasswordLogin;
