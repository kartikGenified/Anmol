import React, { useState,useEffect} from 'react';
import {View, StyleSheet,TouchableOpacity,Image,FlatList,ScrollView,Dimensions} from 'react-native';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import { useSelector } from 'react-redux';
import { useAddBankDetailsMutation } from '../../apiServices/bankAccount.js/AddBankAccount';
import * as Keychain from 'react-native-keychain';
import TextInputRectangularWithPlaceholder from '../../components/atoms/input/TextInputRectangularWithPlaceholder';
import ShowLoadingButtonSmall from '../../components/atoms/buttons/ShowLoadingButtonSmall';
import MessageModal from '../../components/modals/MessageModal';
import ErrorModal from '../../components/modals/ErrorModal';
const AddUpi = ({navigation}) => {
    const [upi, setUpi] = useState()
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';

    const getUpiId=(data)=>{
        console.log(data)
        setUpi(data)
    }
    const submitUpi=()=>{
        console.log(upi)
        submitData()
    }
    const [addBankDetailsFunc,{
        data:addBankDetailsData,
        error:addBankDetailsError,
        isError:addBankDetailsIsError,
        isLoading:addBankDetailsIsLoading
    }] = useAddBankDetailsMutation()    

    useEffect(()=>{
        if(addBankDetailsData){
            console.log("addBankDetailsData",addBankDetailsData)
            if(addBankDetailsData.message==="Bank Account Created")
            {
                setSuccess(true)
                setMessage("UPI Added Successfully")
                setTimeout(() => {
                    setSuccess(false)
                navigation.navigate("BankAccounts",{refresh:true})
                    
                }, 2000);
            }
        }
        else if(addBankDetailsError)
        {
            console.log("addBankDetailsError",addBankDetailsError)
            setError(true)
            setMessage(addBankDetailsError.data.message)
        }
    },[addBankDetailsData,addBankDetailsError])
    const modalClose = () => {
        setError(false);
      };
    const submitData=async()=>{
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log(
            'Credentials successfully loaded for user ' + credentials.username,
          );
          const token = credentials.username;
            const data = {
        "upi_id": upi,
        "transfer_mode":"upi"
    }
        console.log(data)
        const params = {token:token,
        data:data}
        console.log(params)
        addBankDetailsFunc(params)
        }
        
    }
    return (
        <View style={{alignItems:"center",justifyContent:"flex-start",width:'100%',backgroundColor:ternaryThemeColor,height:'100%'}}>
            {error && (
            <ErrorModal
              modalClose={modalClose}
              title="Error"
              message={message}
              openModal={error}></ErrorModal>
          )}
           {success && (
            <MessageModal
              modalClose={modalClose}
              title="Success"
              message={message}
              openModal={success}></MessageModal>
          )}
            <View style={{alignItems:"flex-start",justifyContent:"center",width:'100%',height:'14%',marginTop:10}}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
            <Image style={{height:24,width:24,resizeMode:'contain',marginLeft:10}} source={require('../../../assets/images/blackBack.png')}></Image>

                </TouchableOpacity>
                <PoppinsTextMedium content ="Enter UPI Address" style={{fontSize:22,fontWeight:'700',color:'white',marginLeft:30}}></PoppinsTextMedium>
            
            </View>
            <View style={{alignItems:'center',justifyContent:"flex-start",width:'100%',backgroundColor:"white",height:'86%',paddingTop:40}}>
                <TextInputRectangularWithPlaceholder handleData={getUpiId} placeHolder="Enter UPI ID"></TextInputRectangularWithPlaceholder>
                <View style={{width:'100%',alignItems:'center',justifyContent:"center",flexDirection:'row'}}>
                    <View style={{flexDirection:"row",position:"absolute",left:0}}>
                    <PoppinsTextMedium style={{color:'#919191',marginLeft:30}} content="don't have UPI?"></PoppinsTextMedium>
                    <TouchableOpacity onPress={()=>{navigation.navigate('AddBankDetails')}}>
                    <PoppinsTextMedium style={{color:'#2C2C2C',marginLeft:10,textDecorationLine: 'underline'}} content="add acount details"></PoppinsTextMedium>
                    </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={{alignItems:"center",justifyContent:"center",position:"absolute",bottom:20,width:'100%'}}>
                <ShowLoadingButtonSmall handleData={submitUpi} title="Verify"></ShowLoadingButtonSmall>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default AddUpi;
