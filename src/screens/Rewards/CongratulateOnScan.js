import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import {useSelector} from 'react-redux';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import CongratulationActionBox from '../../components/atoms/CongratulationActionBox';
import Win from '../../components/molecules/Win';
import ButtonSquare from '../../components/atoms/buttons/ButtonSquare';
import {useGetCouponOnCategoryMutation} from '../../apiServices/workflow/rewards/GetCouponApi';
import {
  useCheckUserPointMutation,
  useUserPointsEntryMutation,
} from '../../apiServices/workflow/rewards/GetPointsApi';
import * as Keychain from 'react-native-keychain';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import { slug } from '../../utils/Slug';
const CongratulateOnScan = ({navigation, route}) => {
  const buttonThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : '#ef6110';

  //  data from scanning qr code
  const qrData = useSelector(state => state.qrData.qrData);
  console.log(qrData);
  // product data recieved from scanned product
  const productData = useSelector(state => state.productData.productData);
  const userData = useSelector(state => state.appusersdata.userData);
  // getting location from redux state
  const location = useSelector(state => state.userLocation.location);
  console.log('Location', location, userData, productData, qrData);
  const height = Dimensions.get('window').height;
  // workflow for the given user
  const workflowProgram = route.params.workflowProgram;
  const rewardType = route.params.rewardType;
  console.log('rewardType', rewardType);
  const platform = Platform.OS === 'ios' ? '1' : '2';

  const [
    getCouponOnCategoryFunc,
    {
      data: getCouponOnCategoryData,
      error: getCouponOnCategoryError,
      isLoading: getCouponOnCategoryIsLoading,
      isError: getCouponOnCategoryIsError,
    },
  ] = useGetCouponOnCategoryMutation();

  const [
    checkUserPointFunc,
    {
      data: checkUserPointData,
      error: checkUserPointError,
      isLoading: checkUserPointIsLoading,
      isError: checkUserPointIsError,
    },
  ] = useCheckUserPointMutation();

  const [
    userPointEntryFunc,
    {
      data: userPointEntryData,
      error: userPointEntryError,
      isLoading: userPointEntryIsLoading,
      isError: userPointEntryIsError,
    },
  ] = useUserPointsEntryMutation();

  const fetchRewardsAccToWorkflow = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
      );

      const token = credentials.username;

      if (rewardType === 'Static Coupon') {
        const params = {
          token: token,
          catId: productData.category_id,
          qr_code: qrData.unique_code,
        };
        getCouponOnCategoryFunc(params);
      } else if (rewardType === 'Points On Product') {
        const params = {
          token: token,
          qr_code: qrData.id,
        };
        checkUserPointFunc(params);
      }
    } else {
      console.log('No credentials stored');
    }
  };

  useEffect(() => {
    fetchRewardsAccToWorkflow();
  }, []);
  useEffect(() => {
    if (getCouponOnCategoryData) {
      console.log('getCouponOnCategoryData', getCouponOnCategoryData);
    } else if (getCouponOnCategoryError) {
      console.log('getCouponOnCategoryError', getCouponOnCategoryError);
    }
  }, [getCouponOnCategoryData, getCouponOnCategoryError]);

  useEffect(() => {
    if (checkUserPointData) {
      console.log('checkUserPointData', checkUserPointData);
      if (!checkUserPointData.body) {
        const submitPoints=async()=>{
          const credentials = await Keychain.getGenericPassword();
          const token = credentials.username
          const body = {
            data:{
              app_user_id: userData.id.toString(),
            user_type_id: userData.user_type_id,
            user_type: userData.user_type,
            product_id: productData.product_id,
            product_code: productData.product_code,
            platform_id: Number(platform),
            pincode: location.address.postcode,
            platform: 'mobile',
            state: location.address.state,
            district: location.address.state_district,
            city: location.address.county,
            area: location.address.county,
            known_name: location.address.county,
            lat: location.lat.substring(0,10),
            log: location.lon.substring(0,10),
            method_id: 1,
            method:  'point on product',
            points: productData.consumer_points,
            type: 'point on product',
            },
            qrId: Number(qrData.id),
            tenant_id: slug,
            token: token,
          };
          console.log(body)
          userPointEntryFunc(body)
        }
        submitPoints()

      }
    } else if (checkUserPointError) {
      console.log('checkUserPointError', checkUserPointError);
    }
  }, [checkUserPointData, checkUserPointError]);

  useEffect(()=>{
    if(userPointEntryData)
    {
      console.log("userPointEntryData",userPointEntryData)
    }
    else if(userPointEntryError)
    {
      console.log("userPointEntryError",userPointEntryError)
    }
  },[userPointEntryData,userPointEntryError])
  console.log('workflowProgram', workflowProgram);
  const handleWorkflowNavigation = () => {
    console.log('scccess');

    if (workflowProgram[0] === 'Static Coupon') {
      navigation.navigate('CongratulateOnScan', {
        workflowProgram: workflowProgram.slice(1),
        rewardType: 'Static Coupon',
      });
    } else if (workflowProgram[0] === 'Warranty') {
      navigation.navigate('ActivateWarranty', {
        workflowProgram: workflowProgram.slice(1),
      });
    } else if (workflowProgram[0] === 'Points On Product') {
      console.log(workflowProgram.slice(1));
      navigation.navigate('CongratulateOnScan', {
        workflowProgram: workflowProgram.slice(1),
        rewardType: 'Points On Product',
      });
    } else if (workflowProgram[0] === 'Cashback') {
      console.log(workflowProgram.slice(1));
      navigation.navigate('CongratulateOnScan', {
        workflowProgram: workflowProgram.slice(1),
        rewardType: 'Cashback',
      });
    } else if (workflowProgram[0] === 'Wheel') {
      console.log(workflowProgram.slice(1));
      navigation.navigate('CongratulateOnScan', {
        workflowProgram: workflowProgram.slice(1),
        rewardType: 'Wheel',
      });
    } else {
      navigation.navigate('Dashboard', {
        workflowProgram: workflowProgram.slice(1),
      });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: buttonThemeColor,
      }}>
      <View
        style={{
          height: '8%',
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              position: 'absolute',
              left: 20,
            }}
            source={require('../../../assets/images/blackBack.png')}></Image>
        </TouchableOpacity>
        <PoppinsTextMedium
          style={{color: 'white', fontSize: 18, right: 10}}
          content="Congratulations"></PoppinsTextMedium>
      </View>

      {/* main view */}

      <View
        style={{
          height: '92%',
          width: '100%',
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ScrollView style={{width: '100%', height: '100%', marginTop: 30}}>
          <View
            style={{
              width: '100%',
              height: height - 100,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: 'white',
            }}>
            {/* actions pperformed container----------------------------------- */}
            <View
              style={{
                height: '50%',
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#DDDDDD',
                marginTop: 50,
              }}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  resizeMode: 'contain',
                  margin: 10,
                }}
                source={require('../../../assets/images/gold.png')}></Image>
              <PoppinsTextMedium
                style={{color: '#7BC143', fontSize: 24, fontWeight: '700'}}
                content="Congratulations"></PoppinsTextMedium>
              <PoppinsTextMedium
                style={{
                  color: '#333333',
                  fontSize: 20,
                  fontWeight: '500',
                  width: '60%',
                  marginTop: 6,
                }}
                content="You have successfully perform the action"></PoppinsTextMedium>
              {/* action box ---------------------------------------------- */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                {getCouponOnCategoryData && (
                  <CongratulationActionBox
                    title="Product Scanned"
                    data={[qrData].length}
                    primaryColor={buttonThemeColor}
                    secondaryColor={buttonThemeColor}></CongratulationActionBox>
                )}
                {/* {getCouponOnCategoryData &&<CongratulationActionBox title="Points Earned" data={productData.consumer_points} primaryColor={buttonThemeColor} secondaryColor={buttonThemeColor}></CongratulationActionBox>} */}
              </View>
              {/* -------------------------------------------------------- */}
            </View>
            {/* -------------------------------------------------------- */}
            {/* rewards container---------------------------------------------- */}
            <View
              style={{
                height: '50%',
                width: '90%',
                backgroundColor: '#DDDDDD',
                borderRadius: 4,
                marginTop: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 48,
                  width: 160,
                  backgroundColor: buttonThemeColor,
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: 'white',
                  borderRadius: 2,
                  position: 'absolute',
                  top: -20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <PoppinsTextMedium
                  style={{fontSize: 16, fontWeight: '800', color: 'white'}}
                  content="You Have Won"></PoppinsTextMedium>
              </View>

              {/* reward user according to the workflow ------------------------*/}

              {rewardType === 'Static Coupon' && getCouponOnCategoryData && (
                <Win
                  data={getCouponOnCategoryData.body}
                  title={getCouponOnCategoryData.body.brand}></Win>
              )}
              {getCouponOnCategoryError && (
                <PoppinsText
                  content={getCouponOnCategoryError.data.message}></PoppinsText>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={{width: '100%', height: 80, backgroundColor: 'white'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ButtonSquare
              style={{color: 'white'}}
              content="Cancel"></ButtonSquare>
            <ButtonSquare
              handleOperation={handleWorkflowNavigation}
              style={{color: 'white'}}
              content="Okay"></ButtonSquare>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CongratulateOnScan;
