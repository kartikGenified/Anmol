// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
//   TouchableOpacity,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {BaseUrl} from '../../utils/BaseUrl';
// import LinearGradient from 'react-native-linear-gradient';
// import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
// import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
// import CustomTextInput from '../../components/organisms/CustomTextInput';
// import CustomTextInputNumeric from '../../components/organisms/CustomTextInputNumeric';
// import ButtonNavigateArrow from '../../components/atoms/buttons/ButtonNavigateArrow';
// import { useGetLoginOtpMutation } from '../../apiServices/login/otpBased/SendOtpApi';
// import ButtonNavigate from '../../components/atoms/buttons/ButtonNavigate';
// import ErrorModal from '../../components/modals/ErrorModal';
// import { useGetNameMutation } from '../../apiServices/login/GetNameByMobile';


// const OtpLogin = ({navigation, route}) => {
//   const [mobile, setMobile] = useState()
//   const [name, setName] = useState()
//   const [success, setSuccess] = useState(false)
//   const [message, setMessage] = useState()
//   const [error,setError] = useState(false)
//   // fetching theme for the screen-----------------------

//   const primaryThemeColor = useSelector(
//     state => state.apptheme.primaryThemeColor,
//   )
//     ? useSelector(state => state.apptheme.primaryThemeColor)
//     : '#FF9B00';
//   const secondaryThemeColor = useSelector(
//     state => state.apptheme.secondaryThemeColor,
//   )
//     ? useSelector(state => state.apptheme.secondaryThemeColor)
//     : '#FFB533';
//   const ternaryThemeColor = useSelector(
//     state => state.apptheme.ternaryThemeColor,
//   )
//     ? useSelector(state => state.apptheme.ternaryThemeColor)
//     : 'grey';
//   const buttonThemeColor = useSelector(
//     state => state.apptheme.ternaryThemeColor,
//   )
//     ? useSelector(state => state.apptheme.ternaryThemeColor)
//     : '#ef6110';

//   const icon = useSelector(state => state.apptheme.icon)
//     ? useSelector(state => state.apptheme.icon)
//     : require('../../../assets/images/demoIcon.png');

//   // ------------------------------------------------

//   // send otp for login--------------------------------
//   const [sendOtpFunc, {
//     data:sendOtpData,
//     error:sendOtpError,
//     isLoading:sendOtpIsLoading,
//     isError:sendOtpIsError
//   }] = useGetLoginOtpMutation()

//   const [
//     getNameFunc,
//     {
//       data:getNameData,
//       error:getNameError,
//       isLoading:getLoading,
//       isError:getIsError
//     }
//   ] = useGetNameMutation()

  

//   const needsApproval = route.params.needsApproval;
//   const user_type_id = route.params.userId;
//   const user_type = route.params.userType;
//   const registrationRequired = route.params.registrationRequired
//   console.log("registrationRequired",registrationRequired)
//   const width = Dimensions.get('window').width;
//   const navigationParams = {"needsApproval":needsApproval,"user_type_id":user_type_id,"user_type":user_type,"mobile":mobile,"name":name}
//   // useEffect(()=>{
//   //   getActiveMembershipFunc()

//   // },[])
//   useEffect(()=>{
//     if(sendOtpData){
//       console.log("data",sendOtpData)
//       if(sendOtpData.success===true)
//       {
//         navigation.navigate('VerifyOtp',{navigationParams})
//       }
//       else
//       {
//         console.log("Trying to open error modal")
//       }
//     }
//     else if(sendOtpError)
//     {
//       console.log("err",sendOtpError)
//       setError(true)
//       setMessage(sendOtpError.data.message)
//     }
     
    

//   },[sendOtpData,sendOtpError])

//   useEffect(()=>{
//     if(getNameData){
//       console.log("getNameData",getNameData)
//       if(getNameData.success)
//       {
//         setName(getNameData.body.name)
//       }
//     }
//     else if(getNameError)
//     {
//       console.log("getNameError",getNameError)
//     }
//   },[getNameData,getNameError])

//   const getMobile = data => {
//     // console.log(data)
//     setMobile(data)
//     if(data.length===10)
//     {
//       getNameFunc({mobile:data})
//     }
//   };

//   const getName = data => {
//     // console.log(data)
//     setName(data)
//   };
  
//   const handleButtonPress=()=>{
//     console.log("first",getNameData.message)
//     if(getNameData.message==="Not Found")
//     {
//       console.log("registrationRequired",registrationRequired)
//     registrationRequired && navigation.navigate('BasicInfo',{needsApproval:needsApproval, userType:user_type, userId:user_type_id,name:name,mobile:mobile})

//     }
//     else{
//       sendOtpFunc({mobile,name,user_type,user_type_id})
//     navigation.navigate('VerifyOtp',{navigationParams})

//     }
//   }
//   const handleNavigationToRegister=()=>{
//     navigation.navigate('BasicInfo',{needsApproval:needsApproval, userType:user_type, userId:user_type_id})
//   }
//   const modalClose=()=>{
//     setError(false)
//   }
//   return (
//     <LinearGradient
//       colors={[ternaryThemeColor, secondaryThemeColor]}
//       style={styles.container}>

//       {error && <ErrorModal modalClose={modalClose} message={message} openModal={error}></ErrorModal>}
//       <View
//         style={{
//           height: 140,
//           width: '100%',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <View
//           style={{
//             ...styles.semicircle,
//             width: width + 60,
//             borderRadius: (width + width) / 2,
//             height: width + 60,
//             top: -(width / 2),
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.goBack();
//             }}>
//             <Image
//               style={{height: 20, width: 20, resizeMode: 'contain', right: 80}}
//               source={require('../../../assets/images/blackBack.png')}></Image>
//           </TouchableOpacity>
//           <Image
//             style={{
//               height: 110,
//               width: 140,
//               resizeMode: 'contain',
//               top: width / 8,
//             }}
//             source={{uri: `${BaseUrl}/api/images/${icon}`}}></Image>
//         </View>
//       </View>

//       <View
//         style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
//         <View
//           style={{
//             ...styles.banner,
//             backgroundColor: ternaryThemeColor,
//             elevation: 10,
//             shadowColor: '#000',
//             shadowOffset: {width: 0, height: 2},
//             shadowOpacity: 0.5,
//             shadowRadius: 2,
//           }}></View>
//       </View>
//       <ScrollView style={{width: '100%'}}>
//         <KeyboardAvoidingView>
//           <View
//             style={{
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginTop: 10,
//             }}>
//             <PoppinsText
//               style={{color: 'white', fontSize: 22}}
//               content="Welcome"></PoppinsText>
//             <PoppinsTextMedium
//               style={{color: 'white', fontSize: 16}}
//               content="Login To Your Account"></PoppinsTextMedium>
//           </View>

//           <View
//             style={{
//               width: '100%',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginTop: 10,
//             }}>
//             <CustomTextInputNumeric
//               sendData={getMobile}
//               title="Mobile No"
//               image={require('../../../assets/images/whitePhone.png')}></CustomTextInputNumeric>
//             <CustomTextInput
//               name={name}
//               sendData={getName}
//               title="Name"
//               image={require('../../../assets/images/whiteUser.png')}></CustomTextInput>
//           </View>
//         </KeyboardAvoidingView>
//         <View
//           style={{
//             width: '100%',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginTop: 20,
//           }}>
//           {<ButtonNavigateArrow
//           success={success}
//             handleOperation={handleButtonPress}
//             backgroundColor={buttonThemeColor}
//             style={{color: 'white', fontSize: 16}}
//             content="Login"
//             navigateTo="VerifyOtp"
//             navigationParams={navigationParams}
//             ></ButtonNavigateArrow>}
//         </View>
//        {/* {registrationRequired && <View style={{width:"100%",alignItems:'center',justifyContent:"center",marginTop:20}}>
//         <PoppinsTextMedium style={{fontSize:18}} content ="Don't have an account ?"></PoppinsTextMedium>
//         <ButtonNavigate
//               handleOperation={handleNavigationToRegister}
//               backgroundColor={buttonThemeColor}
//               style={{color: 'white', fontSize: 16}}
//               content="Register"
//               >
//         </ButtonNavigate>

//         </View>} */}
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//   },
//   semicircle: {
//     backgroundColor: 'white',
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   banner: {
//     height: 184,
//     width: '90%',
//     borderRadius: 10,
//   },
//   userListContainer: {
//     width: '100%',
//     height: 600,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
// });

// export default OtpLogin;
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BaseUrl} from '../../utils/BaseUrl';
import LinearGradient from 'react-native-linear-gradient';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import CustomTextInput from '../../components/organisms/CustomTextInput';
import CustomTextInputNumeric from '../../components/organisms/CustomTextInputNumeric';
import ButtonNavigateArrow from '../../components/atoms/buttons/ButtonNavigateArrow';
import { useGetLoginOtpMutation } from '../../apiServices/login/otpBased/SendOtpApi';
import ButtonNavigate from '../../components/atoms/buttons/ButtonNavigate';
import ErrorModal from '../../components/modals/ErrorModal';
import { useGetNameMutation } from '../../apiServices/login/GetNameByMobile';
import TextInputRectangularWithPlaceholder from '../../components/atoms/input/TextInputRectangularWithPlaceholder';

const OtpLogin = ({navigation, route}) => {
  const [mobile, setMobile] = useState()
  const [name, setName] = useState()
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState()
  const [error,setError] = useState(false)
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

  // send otp for login--------------------------------
  const [sendOtpFunc, {
    data:sendOtpData,
    error:sendOtpError,
    isLoading:sendOtpIsLoading,
    isError:sendOtpIsError
  }] = useGetLoginOtpMutation()

  const [
    getNameFunc,
    {
      data:getNameData,
      error:getNameError,
      isLoading:getLoading,
      isError:getIsError
    }
  ] = useGetNameMutation()

  const needsApproval = route.params.needsApproval;
  const user_type_id = route.params.userId;
  const user_type = route.params.userType;
  const registrationRequired = route.params.registrationRequired
  console.log("registrationRequired",registrationRequired)
  const width = Dimensions.get('window').width;
  const navigationParams = {"needsApproval":needsApproval,"user_type_id":user_type_id,"user_type":user_type,"mobile":mobile,"name":name}
  
  useEffect(()=>{
    if(sendOtpData){
      console.log("data",sendOtpData)
      if(sendOtpData.success===true && mobile.length===10)
      {
        navigation.navigate('VerifyOtp',{navigationParams})
      }
      else
      {
        console.log("Trying to open error modal")
      }
    }
    else if(sendOtpError)
    {
      console.log("err",sendOtpError)
      setError(true)
      setMessage(sendOtpError.data.message)
    }
     
    

  },[sendOtpData,sendOtpError])

  useEffect(()=>{
    if(getNameData){
      console.log("getNameData",getNameData)
      if(getNameData.success)
      {
        setName(getNameData.body.name)
      }
    }
    else if(getNameError)
    {
      console.log("getNameError",getNameError)
    }
  },[getNameData,getNameError])

  const getMobile = data => {
    // console.log(data)
    setMobile(data)
    if(data.length===10)
    {
      getNameFunc({mobile:data})
    }
  };

  const getName = data => {
    // console.log(data)
    setName(data)
  };
  const navigateToOtp=()=>{
    sendOtpFunc({mobile,name,user_type,user_type_id})
    navigation.navigate('VerifyOtp',{navigationParams})
  }
  const handleButtonPress=()=>{
    // console.log("first",getNameData.message)
    if(getNameData)
    {
      if(getNameData.message==="Not Found")
    {
      console.log("registrationRequired",registrationRequired)
    registrationRequired ? navigation.navigate('BasicInfo',{needsApproval:needsApproval, userType:user_type, userId:user_type_id,name:name,mobile:mobile}) : navigateToOtp()

    }
    else{
      sendOtpFunc({mobile,name,user_type,user_type_id})
    navigation.navigate('VerifyOtp',{navigationParams})

    }
    }
  }
  const handleNavigationToRegister=()=>{
    navigation.navigate('BasicInfo',{needsApproval:needsApproval, userType:user_type, userId:user_type_id})
  }
  const modalClose=()=>{
    setError(false)
  }
  return (
    <LinearGradient
      colors={["white", "white"]}
      style={styles.container}>

      {error && <ErrorModal modalClose={modalClose} message={message} openModal={error}></ErrorModal>}
      
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
              content="Tell us your mobile number"></PoppinsText>
            
          </View>
      </View>

     
      <ScrollView style={{width: '100%'}}>
        <KeyboardAvoidingView>
          

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}>
            <TextInputRectangularWithPlaceholder
            placeHolder="Mobile No"
            handleData={getMobile}
            maxLength={10}
              ></TextInputRectangularWithPlaceholder>
            <TextInputRectangularWithPlaceholder
            placeHolder="Name"
            handleData={getName}
            value={name}
              ></TextInputRectangularWithPlaceholder>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {<ButtonNavigateArrow
          success={success}
            handleOperation={handleButtonPress}
            backgroundColor={buttonThemeColor}
            style={{color: 'white', fontSize: 16}}
            content="Login"
            navigateTo="VerifyOtp"
            navigationParams={navigationParams}
            ></ButtonNavigateArrow>}
        </View>
       {/* {registrationRequired && <View style={{width:"100%",alignItems:'center',justifyContent:"center",marginTop:20}}>
        <PoppinsTextMedium style={{fontSize:18}} content ="Don't have an account ?"></PoppinsTextMedium>
        <ButtonNavigate
              handleOperation={handleNavigationToRegister}
              backgroundColor={buttonThemeColor}
              style={{color: 'white', fontSize: 16}}
              content="Register"
              >
        </ButtonNavigate>

        </View>} */}
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

export default OtpLogin;
