import React, { useEffect } from 'react';
import {View, StyleSheet,TouchableOpacity,Image,FlatList} from 'react-native';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import { useAllUserPointsEntryMutation,useFetchUserPointsHistoryMutation } from '../../apiServices/workflow/rewards/GetPointsApi';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useGetAllRedeemedCouponsMutation } from '../../apiServices/workflow/rewards/GetCouponApi';
const CouponHistory = ({navigation}) => {
    const [getAllRedeemedFunc,{
        data:getAllRedeemedData,
        error:getAllRedeemedError,
        isLoading:getAllRedeemedIsLoading,
        isError:getAllRedeemedIsError
    }] = useGetAllRedeemedCouponsMutation()

    useEffect(()=>{
        const getRedemptionData=async()=>{
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
              console.log(
                'Credentials successfully loaded for user ' + credentials.username
              );
              const token = credentials.username
              getAllRedeemedFunc({
                token:token
            })
        }
        
        
    }
    getRedemptionData()
        
    },[])
    useEffect(()=>{
        if(getAllRedeemedData)
    {
        console.log("getAllRedeemedData",getAllRedeemedData.body.data)
    }
    else if(getAllRedeemedError){
        console.log("getAllRedeemedError",getAllRedeemedError)
    }
},[getAllRedeemedError,getAllRedeemedData])


    const CouponItems=(props)=>{
        const couponName =props.couponName
        const couponCode = props.couponCode
        const redeemedOn = props.redeemedOn
        const expiresOn = props.expiresOn
        return(
            <View style={{padding:10,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:'grey',borderRadius:10,margin:10}}>
                <View style={{height:80,width:80,alignItems:"center",justifyContent:"center",borderRadius:40}}>
                <Image style={{height:50,width:50,resizeMode:"contain"}} source={require('../../../assets/images/voucher.png')}></Image>
                </View>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    <PoppinsTextMedium style={{color:'grey',fontSize:12}} content="Coupon Name"></PoppinsTextMedium>
                    <PoppinsTextMedium style={{color:'grey',fontSize:12}} content={couponName}></PoppinsTextMedium>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginTop:20}}>
                    <PoppinsTextMedium style={{color:'grey',fontSize:12}} content="Coupon Name"></PoppinsTextMedium>
                    <PoppinsTextMedium style={{color:'grey',fontSize:12}} content={couponCode}></PoppinsTextMedium>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginTop:20,borderWidth:1,borderStyle:'dotted',flexDirection:'row',padding:4}}>
                    <PoppinsTextMedium style={{color:'grey',fontSize:12}} content="Redeemed on"></PoppinsTextMedium>
                    <PoppinsTextMedium style={{color:'grey',fontSize:12,marginLeft:4}} content={redeemedOn}></PoppinsTextMedium>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginTop:20,borderWidth:1,borderStyle:'dotted',flexDirection:'row',padding:4,borderColor:'red',marginBottom:10}}>
                    <PoppinsTextMedium style={{color:'grey',fontSize:12}} content="Expires on"></PoppinsTextMedium>
                    <PoppinsTextMedium style={{color:'grey',fontSize:12,marginLeft:4}} content={expiresOn}></PoppinsTextMedium>
                </View>
                
            </View>
        )
    }

    return (
        <View style={{alignItems:'center',justifyContent:"center"}}>
            <View style={{alignItems:"center",justifyContent:"flex-start",flexDirection:"row",width:'100%',marginTop:10,height:40,marginLeft:20}}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
            <Image style={{height:24,width:24,resizeMode:'contain',marginLeft:10}} source={require('../../../assets/images/blackBack.png')}></Image>

                </TouchableOpacity>
            <PoppinsTextMedium content ="Coupon History" style={{marginLeft:10,fontSize:16,fontWeight:'600',color:'#171717'}}></PoppinsTextMedium>
            <TouchableOpacity style={{marginLeft:180}}>
            <Image style={{height:30,width:30,resizeMode:'contain'}} source={require('../../../assets/images/notificationOn.png')}></Image>
            </TouchableOpacity>
            </View>
            <View style={{padding:14,alignItems:"center",justifyContent:"flex-start",width:"100%",flexDirection:"row"}}>
                <View style={{alignItems:"center"}}>
                <PoppinsTextMedium style={{marginLeft:10,fontSize:18,fontWeight:'600',color:'#6E6E6E'}} content="You Have Redeemed"></PoppinsTextMedium>
                {getAllRedeemedData &&
                <PoppinsText style={{marginLeft:14,fontSize:34,fontWeight:'600',color:'#373737'}} content={getAllRedeemedData.body.data.length}></PoppinsText>

                }
                <PoppinsTextMedium style={{marginLeft:10,fontSize:20,fontWeight:'600',color:'#6E6E6E'}} content="Coupon"></PoppinsTextMedium>
                </View>
                <Image style={{height:80,width:80,resizeMode:'contain',position:'absolute',right:20}} source={require('../../../assets/images/voucher.png')}></Image>
                 </View>
                
                 {getAllRedeemedData && <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{alignItems:"center",justifyContent:"center",paddingBottom:100,width: '100%'}}
                data={getAllRedeemedData.body.data}
                numColumns={2}
                renderItem={({item, index}) => (
                 <CouponItems key ={index} couponName={item.brand} couponCode={item.coupon_code} redeemedOn={moment(item.redeem_date).format("DD-MM-YYYY")} expiresOn={moment(item.expire_date).format("DD-MM-YYYY")}></CouponItems> 
                )}></FlatList>}
                
        </View>
    );
}

const styles = StyleSheet.create({})

export default CouponHistory;
