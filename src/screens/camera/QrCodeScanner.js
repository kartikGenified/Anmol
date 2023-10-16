import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ScannedListItem from '../../components/atoms/ScannedListItem';
import * as Keychain from 'react-native-keychain';
import {useVerifyQrMutation} from '../../apiServices/qrScan/VerifyQrApi';
import ErrorModal from '../../components/modals/ErrorModal';
import ButtonProceed from '../../components/atoms/buttons/ButtonProceed';
import {useAddQrMutation} from '../../apiServices/qrScan/AddQrApi';
import {useSelector, useDispatch} from 'react-redux';
import {setQrData} from '../../../redux/slices/qrCodeDataSlice';
import {useCheckGenuinityMutation} from '../../apiServices/workflow/genuinity/GetGenuinityApi';
import {useCheckWarrantyMutation} from '../../apiServices/workflow/warranty/ActivateWarrantyApi';
import {useGetProductDataMutation} from '../../apiServices/product/productApi';
import {setProductData} from '../../../redux/slices/getProductSlice';

const QrCodeScanner = ({navigation}) => {
  const [zoom, setZoom] = useState(0);
  const [zoomText, setZoomText] = useState('1');
  const [flash, setFlash] = useState(false);
  const [addedQrList, setAddedQrList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  const [savedToken, setSavedToken] = useState();
  const [productId, setProductId] = useState();
  const [qr_id, setQr_id] = useState();
  const userId = useSelector(state => state.appusersdata.userId);
  const userType = useSelector(state => state.appusersdata.userType);
  const userName = useSelector(state => state.appusersdata.name);
  const workflowProgram = useSelector(state => state.appWorkflow.program);
  const dispatch = useDispatch();
  console.log('Workflow Program is ', workflowProgram);
  // console.log("Selector state",useSelector((state)=>state.appusersdata.userId))

  // mutations ----------------------------------------
  const [
    verifyQrFunc,
    {
      data: verifyQrData,
      error: verifyQrError,
      isLoading: verifyQrIsLoading,
      isError: verifyQrIsError,
    },
  ] = useVerifyQrMutation();
  const [
    addQrFunc,
    {
      data: addQrData,
      error: addQrError,
      isLoading: addQrIsLoading,
      isError: addQrIsError,
    },
  ] = useAddQrMutation();

  const [
    checkGenuinityFunc,
    {
      data: checkGenuinityData,
      error: checkGenuinityError,
      isLoading: checkGenuinityIsLoading,
      isError: checkGenuinityIsError,
    },
  ] = useCheckGenuinityMutation();

  const [checkWarrantyFunc,{
    data:checkWarrantyData,
    error:checkWarrantyError,
    isLoading:checkWarrantyIsLoading,
    isError:checkWarrantyIsError
  }] = useCheckWarrantyMutation()

  const [
    productDataFunc,
    {
      data: productDataData,
      error: productDataError,
      isLoading: productDataIsLoading,
      isError: productDataIsError,
    },
  ] = useGetProductDataMutation();

  // ----------------------------------------------------
  const height = Dimensions.get('window').height;
  const platform = Platform.OS === 'ios' ? '1' : '2';
  const platformMargin = Platform.OS === 'ios' ? -60 : -160;

  useEffect(() => {
    if (checkGenuinityData) {
      console.log('genuinity check', checkGenuinityData);
    } else if (checkGenuinityError) {
      console.log('Error', checkGenuinityError);
    }
  }, [checkGenuinityData, checkGenuinityError]);

  useEffect(() => {
    if (checkWarrantyData) {
      console.log('warranty check', checkWarrantyData);
    } else if (checkWarrantyError) {
      console.log('warranty Error', checkWarrantyError);
    }
  }, [checkWarrantyData, checkWarrantyError]);

  useEffect(() => {
    if (productDataData) {
    const form_type = '2';
    const token =savedToken
    const body = {product_id: productDataData.body.products[0].product_id, qr_id: qr_id};
      console.log('Product Data is ',  productDataData.body.products[0].product_id);
      console.log("productdata", token,body)
      dispatch(setProductData(productDataData.body.products[0]));
      setProductId(productDataData.body.product_id);
      
      checkWarrantyFunc({form_type, token, body})

    } else if (productDataError) {
      console.log('Error', productDataError);
    }
  }, [productDataData, productDataError]);

  const modalClose = () => {
    setError(false);
  };

  // function called on successfull scan --------------------------------------
  const onSuccess = e => {
    console.log('Qr data is ------', JSON.stringify(e));
    const qrData = e.data.split('=')[1];
    // console.log(typeof qrData);

    const requestData = {unique_code: qrData};
    const verifyQR = async data => {
      // console.log('qrData', data);
      try {
        // Retrieve the credentials

        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log(
            'Credentials successfully loaded for user ' + credentials.username,
          );
          setSavedToken(credentials.username);
          const token = credentials.username;

          data && verifyQrFunc({token, data});
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    };
    verifyQR(requestData);
  };

  // add qr to the list of qr--------------------------------------

  const addQrDataToList = data => {
    const qrId = data.id;
    setQr_id(qrId);
    const token = savedToken;
    const productCode = data.product_code;
    

   
    checkGenuinityFunc({qrId, token});
    productDataFunc({productCode, userType, token});
    console.log({productCode, userType, token})

    if (addedQrList.length === 0) {
      setAddedQrList([...addedQrList, data]);
    } else {
      const existingObject = addedQrList.find(
        obj => obj.unique_code === data.unique_code,
      );
      if (!existingObject) {
        setAddedQrList([...addedQrList, data]);
      } else {
        setError(true);
        setMessage('This Qr is already added to the list');
      }
    }
  };
  // --------------------------------------------------------

  // delete qr from list of qr-------------------------------------
  const deleteQrFromList = code => {
    const removedList = addedQrList.filter((item, index) => {
      return item.unique_code !== code;
    });
    setAddedQrList(removedList);
  };
  // --------------------------------------------------------

  // function to handle workflow navigation-----------------------
  const handleWorkflowNavigation = (item1, item2, item3) => {
    console.log('success');
    console.log("Items are",item1, item2, item3);

    const itemsToRemove = [item1, item2, item3];
    const updatedWorkflowProgram = workflowProgram.filter(item => !itemsToRemove.includes(item));

    if (updatedWorkflowProgram[0] === 'Static Coupon') {
        console.log(updatedWorkflowProgram.slice(1));
        navigation.navigate('CongratulateOnScan', {
            workflowProgram: updatedWorkflowProgram.slice(1),
            rewardType:updatedWorkflowProgram[0]
        });
    } else if (updatedWorkflowProgram[0] === 'Warranty') {
        console.log(updatedWorkflowProgram.slice(1));
        navigation.navigate('ActivateWarranty', {
            workflowProgram: updatedWorkflowProgram.slice(1),
            rewardType:updatedWorkflowProgram[0]

        });
    } else if (updatedWorkflowProgram[0] === 'Points On Product' || updatedWorkflowProgram[0] === 'Cashback' || updatedWorkflowProgram[0] === 'Wheel') {
        console.log(updatedWorkflowProgram.slice(1));
        navigation.navigate('CongratulateOnScan', {
            workflowProgram: updatedWorkflowProgram.slice(1),
            rewardType:updatedWorkflowProgram[0]
            
        });
    } else if (updatedWorkflowProgram[0] === 'Genuinity+') {
        console.log(updatedWorkflowProgram.slice(1));
        navigation.navigate('GenuinityScratch', {
            workflowProgram: updatedWorkflowProgram.slice(1),
            rewardType:updatedWorkflowProgram[0]
        });
    } else if (updatedWorkflowProgram[0] === 'Genuinity'){
        console.log(updatedWorkflowProgram.slice(1));
        navigation.navigate('Genuinity', {
            workflowProgram: updatedWorkflowProgram.slice(1),
            rewardType:updatedWorkflowProgram[0]
        });
    }
    else{
      console.log("You have completed the workflow")
    }
};

  // --------------------------------------------------------
  //check if warranty is claimed
  // useEffect(() => {
  //   if (checkWarrantyData) {
  //     console.log("Check Warranty Is Already Claimed",checkWarrantyData.body);

  //   } else {
  //     console.log(checkWarrantyError);
  //   }
  // }, [checkWarrantyData, checkWarrantyError]);
  // --------------------------------------------------------

  // getting verify qr data --------------------------
  useEffect(() => {
    if (verifyQrData) {
      console.log('Verify qr data', verifyQrData.body);
      if(verifyQrData.body.qr_status==="1" || verifyQrData.body.qr_status==="2")
      {
      addQrDataToList(verifyQrData.body);
      }
      // else if(verifyQrData.body.qr_status==="2")
      // {
      //   setError(true);
      //   setMessage('This Qr is already Scanned');
      // }
    } else {
      console.log('Verify qr error', verifyQrError);
    }
  }, [verifyQrData, verifyQrError]);
  // --------------------------------------------------------

  //getting add qr data ------------------------------------
  useEffect(() => {
    if (addQrData) {
      console.log('Add qr data', addQrData.body);
      if (addQrData.success) {
        dispatch(setQrData(addQrData.body));
        console.log("check Genuinity and warranty",checkGenuinityData,checkWarrantyData)

        if(checkGenuinityData){
          
          if(checkGenuinityData.body){
          console.log("check warranty data",checkWarrantyData)
          if(checkWarrantyError)
          {
          if(checkWarrantyError.data.body)
          {
            handleWorkflowNavigation("Genuinity+","Warranty")
          }
          else{
            handleWorkflowNavigation("Genuinity+")
          }
        }
        else if(checkWarrantyData)
        {
          if(checkWarrantyData.body)
        {
          handleWorkflowNavigation("Genuinity+","Warranty")
        }
        else{
          handleWorkflowNavigation("Genuinity+")
        }
        }
        }
        else
        {
          if(checkWarrantyError)
          {
          if(checkWarrantyError.data.body)
          {
            handleWorkflowNavigation("Warranty")
          }
          else{
            handleWorkflowNavigation()
          }
        }
        else if(checkWarrantyData)
        {
          if(checkWarrantyData.body)
        {
          handleWorkflowNavigation("Warranty")
        }
        else{
          handleWorkflowNavigation()
        }
        }
        else{
          handleWorkflowNavigation()
        }
        }
      }
        else if(checkWarrantyError){
          if(checkWarrantyError.data.body){
            if(checkGenuinityData)
          {
          if(checkGenuinityData.body)
          {
            handleWorkflowNavigation("Genuinity+","Warranty")
          }
          else{
            handleWorkflowNavigation("Warranty")
          }
        }
        
      }
      }
      else{
        console.log("else")
        handleWorkflowNavigation()
      }
       
      }
    } else if(addQrError) {
      console.log("addQrError",addQrError);
    }
  }, [addQrData, addQrError]);
  // --------------------------------------------------------

  // handle camera functions --------------------------------------

  const handleFlash = () => {
    setFlash(!flash);
  };

  const handleZoom = () => {
    if (zoom === 0) {
      setZoom(0.5);
      setZoomText('2');
    } else {
      setZoom(0);
      setZoomText('1');
    }
  };

  const handleOpenImageGallery = async () => {
    const result = await launchImageLibrary();
  };

  // --------------------------------------------------------

  // function to call add qr api -------------------------------

  const handleAddQr = () => {
    const token = savedToken;
    addedQrList.length !== 0 &&
      addedQrList.map((item, index) => {
        const requestData = {
          qr_id: item.id,
          user_type_id: userId,
          user_type: userType,
          platform_id: platform,
          scanned_by_name: userName,
        };
        token && addQrFunc({token, requestData});
      });
  };
  // --------------------------------------------------------

  return (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={true}
      vibrate={true}
      reactivateTimeout={2000}
      fadeIn={true}
      flashMode={
        !flash
          ? RNCamera.Constants.FlashMode.off
          : RNCamera.Constants.FlashMode.torch
      }
      customMarker={
        <View style={{height: '100%', width: '100%', flexDirection: 'row'}}>
          <View
            style={{
              height: '36%',
              width: '80%',
              position: 'absolute',
              top: 10,
              alignItems: 'center',
              justifyContent: 'center',
              left: 0,
            }}>
            <PoppinsText
              style={{
                fontSize: 20,
                color: 'white',
                position: 'absolute',
                right: 0,
                top: 0,
              }}
              content="Scan Product QR Code"></PoppinsText>
            <View
              style={{
                backgroundColor: 'transparent',
                borderWidth: 4,
                borderColor: '#305CB8',
                height: 200,
                width: 240,
                borderRadius: 20,
                position: 'absolute',
                right: 0,
                top: 40,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: '#58585A',
                  borderRadius: 20,
                  marginBottom: 8,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Modal');
                  }}
                  style={{
                    backgroundColor: 'black',
                    height: 34,
                    width: 34,
                    borderRadius: 17,
                    position: 'absolute',
                    left: 5,
                    top: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{height: 16, width: 16, resizeMode: 'contain'}}
                    source={require('../../../assets/images/qrQuestionMark.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleZoom();
                  }}
                  style={{
                    backgroundColor: 'black',
                    height: 34,
                    width: 34,
                    borderRadius: 17,
                    position: 'absolute',
                    right: 5,
                    top: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 14, color: '#FB774F'}}>
                    {zoomText}X
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '20%',
              height: '36%',
              position: 'absolute',
              right: 0,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
              style={{height: 34, width: 34, margin: 10, left: 20}}>
              <Image
                style={{height: 34, width: 34, resizeMode: 'contain'}}
                source={require('../../../assets/images/qrCancel.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleFlash();
              }}
              style={{height: 44, width: 44, margin: 20}}>
              <Image
                style={{height: 44, width: 44, resizeMode: 'contain'}}
                source={require('../../../assets/images/qrTorch.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleOpenImageGallery();
              }}
              style={{height: 44, width: 44, margin: 20}}>
              <Image
                style={{height: 44, width: 44, resizeMode: 'contain'}}
                source={require('../../../assets/images/qrGallery.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      }
      showMarker={true}
      cameraStyle={{height: '100%'}}
      cameraProps={{zoom: zoom}}
      bottomContent={
        <View
          style={{
            height: height - 100,
            backgroundColor: 'white',
            width: '100%',
            top: platformMargin,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          {error && (
            <ErrorModal
              modalClose={modalClose}
              message={message}
              openModal={error}></ErrorModal>
          )}

          {addedQrList.length === 0 ? (
            <View
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <ScrollView>
                <Image
                  style={{height: 300, width: 300}}
                  source={require('../../../assets/images/qrHowTo.png')}></Image>
                <PoppinsTextMedium
                  style={{color: 'grey', fontWeight: '700', fontSize: 20}}
                  content="Please start scanning by pointing the camera towards QR code"></PoppinsTextMedium>
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FlatList
                style={{width: '100%'}}
                data={addedQrList}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {!error && (
                      <ScannedListItem
                        handleDelete={deleteQrFromList}
                        unique_code={item.unique_code}
                        index={index}
                        serialNo={item.batch_running_code}
                        productName={item.created_by_name}
                        productCode={item.product_code}
                        batchCode={item.batch_code}></ScannedListItem>
                    )}
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          )}
          <ButtonProceed
            handleOperation={handleAddQr}
            style={{color: 'white'}}
            content="Proceed"
            navigateTo={'QrCodeScanner'}></ButtonProceed>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'black',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QrCodeScanner;
