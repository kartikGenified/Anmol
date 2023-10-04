import React, {useEffect, useId, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {BaseUrlImages} from '../../utils/BaseUrlImages';
import {useRedeemCashbackMutation} from '../../apiServices/cashback/CashbackRedeemApi';
import * as Keychain from 'react-native-keychain';
import ErrorModal from '../../components/modals/ErrorModal';

const RedeemCashback = ({navigation}) => {
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : 'grey';

  const secondaryThemeColor = useSelector(
    state => state.apptheme.secondaryThemeColor,
  )
    ? useSelector(state => state.apptheme.secondaryThemeColor)
    : '#FFB533';
  const userData = useSelector(state => state.appusersdata.userData);
  console.log("userData",userData)
  const modalClose = () => {
    setError(false);
  };
  const [
    redeemCashbackFunc,
    {
      data: redeemCashbackData,
      error: redeemCashbackError,
      isLoading: redeemCashbackIsLoading,
      isError: redeemCashbackIsError,
    },
  ] = useRedeemCashbackMutation();

  const points = '2000';
  const pointsConversion = '2000';
  const cashConversion = '1000';
  const height = Dimensions.get('window').height
  const redeemCashback = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
      );
      const token = credentials.username;
      const params = {
        user_type_id: userData.user_type_id,
        user_type: userData.user_type,
        platform_id: 1,
        platform: 'mobile',
        points: points,
        approved_by_id: 1,
        app_user_id: userData.id,
        remarks: 'demo',
        token:token
      };
      redeemCashbackFunc(params)
    }
  };

  useEffect(()=>{
    if(redeemCashbackData)
    {
        console.log("redeemCashbackData",redeemCashbackData)
    }
    else if(redeemCashbackError){
        console.log("redeemCashbackError",redeemCashbackError)
        setError(true)
        setMessage(redeemCashbackError.data.message)
    }
  },[redeemCashbackData,redeemCashbackError])

  
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white',
        height: '100%',
      }}>
      <ScrollView style={{width:'100%',height:'100%'}}>

      {error && (
        <ErrorModal
          modalClose={modalClose}
          message={message}
          openModal={error}></ErrorModal>
      )}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '100%',

          height: '10%',
          position: 'absolute',
          top: 0,
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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <PoppinsTextMedium
            content="Redeem Cashback"
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: '700',
              color: 'black',
            }}></PoppinsTextMedium>
        </View>
      </View>
        <View style={{alignItems:"center",justifyContent:'center',width:'100%',marginTop:40}}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop:40}}>
        <Image
          style={{height: 140, width: 140}}
          source={require('../../../assets/images/redeemCashback.png')}></Image>
        <PoppinsText
          style={{fontSize: 24, color: 'black', marginTop: 20}}
          content={points}></PoppinsText>
        <PoppinsTextMedium
          content="Available Points"
          style={{
            color: 'black',
            fontWeight: '600',
            marginBottom: 20,
          }}></PoppinsTextMedium>
        <PoppinsTextMedium
          content="Convert your Points to Cash"
          style={{
            color: '#909090',
            fontWeight: '600',
            fontSize: 16,
          }}></PoppinsTextMedium>
        <PoppinsTextMedium
          style={{color: 'black', fontWeight: '600'}}
          content={`${pointsConversion} Points = ${cashConversion} Rupees`}></PoppinsTextMedium>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 20,
          paddingTop: 20,
        }}>
        <PoppinsTextMedium
          content="ENTER POINTS"
          style={{
            color: '#909090',
            fontWeight: '600',
            marginBottom: 20,
            position: 'absolute',
            left: 20,
            top: 0,
          }}></PoppinsTextMedium>
        <View
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.8,
            borderColor: '#DDDDDD',
            height: 60,
            borderRadius: 10,
            backgroundColor: '#F5F7F9',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRightWidth: 1,
              borderColor: '#DDDDDD',
            }}>
            <PoppinsTextMedium
              content="Points"
              style={{
                color: '#909090',
                fontWeight: '600',
                fontSize: 14,
              }}></PoppinsTextMedium>
            <PoppinsText
              style={{fontSize: 20, color: 'black'}}
              content={pointsConversion}></PoppinsText>
          </View>
          <Image
            style={{height: 24, width: 24, resizeMode: 'contain', right: 12}}
            source={require('../../../assets/images/goNext.png')}></Image>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#DDDDDD',
            }}>
            <PoppinsTextMedium
              content="Cash"
              style={{
                color: '#909090',
                fontWeight: '600',
                fontSize: 14,
              }}></PoppinsTextMedium>
            <PoppinsText
              style={{fontSize: 20, color: 'black'}}
              content={cashConversion}></PoppinsText>
          </View>
        </View>

        <View
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:20
          }}>
          <PoppinsTextMedium
            content="You need minimum 2000 points to redeem"
            style={{
              color: 'black',
              fontWeight: '600',
              marginBottom: 20,
              position: 'absolute',
              left: 0,
              top: 4,
            }}></PoppinsTextMedium>
        </View>
      </View>
      <View style={{alignItems:"center", justifyContent:"center", width:"100%",marginTop:20,marginBottom:20}}>
      <TouchableOpacity
        onPress={() => {
          console.log('redeem'), redeemCashback();
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          backgroundColor: ternaryThemeColor,
          borderRadius: 6,
          height: 50,
          flexDirection: 'row',
          marginTop:20
        }}>
        <PoppinsTextMedium
          content="Redeem Now"
          style={{color: 'white', fontWeight: '600'}}></PoppinsTextMedium>
        <Image
          style={{height: 24, width: 24, resizeMode: 'contain', marginLeft: 10}}
          source={require('../../../assets/images/whiteArrowRight.png')}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BasicInfo",{
            "userType":userData.user_type,
            "userTypeId":userData.user_type_id
          })
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          backgroundColor: ternaryThemeColor,
          borderRadius: 6,
          height: 50,
          marginTop:20,
          
          flexDirection: 'row',
        }}><PoppinsTextMedium
        content="Complete Registration"
        style={{color: 'white', fontWeight: '600'}}></PoppinsTextMedium>
        </TouchableOpacity>
      </View>
      
        </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RedeemCashback;
