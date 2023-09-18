import React,{useEffect, useId} from 'react';
import {View, StyleSheet,TouchableOpacity,Image,FlatList} from 'react-native';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import { useSelector } from 'react-redux';
import { useFetchGiftsRedemptionsOfUserMutation } from '../../apiServices/workflow/RedemptionApi';
import * as Keychain from 'react-native-keychain';
import { useAllUserPointsEntryMutation } from '../../apiServices/workflow/rewards/GetPointsApi';

const RedeemedHistory = ({navigation}) => {
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';
  const userData = useSelector(state=>state.appusersdata.userData)
  const userId = useSelector(state => state.appusersdata.userId);

  const fetchPoints=async()=>{
      const credentials = await Keychain.getGenericPassword();
      const token = credentials.username;
      const params ={userId:userId,
      token:token}
      userPointEntryFunc(params)

  }
  useEffect(()=>{
    fetchPoints()
  },[])
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

    const [
        FetchGiftsRedemptionsOfUser,
        {
          data: fetchGiftsRedemptionsOfUserData,
          isLoading: fetchGiftsRedemptionsOfUserIsLoading,
          isError: fetchGiftsRedemptionsOfUserIsError,
          error: fetchGiftsRedemptionsOfUserError,
        },
      ] = useFetchGiftsRedemptionsOfUserMutation();

      const [userPointEntryFunc,{
        data:userPointEntryData,
        error:userPointEntryError,
        isLoading:userPointEntryIsLoading,
        isError:userPointEntryIsError
    }]= useAllUserPointsEntryMutation()
     

      useEffect(() => {
        (async () => {
            const credentials = await Keychain.getGenericPassword();
            const token =credentials.username;
          const userId = userData.id
    
          FetchGiftsRedemptionsOfUser({
            token: token,
            userId:userId,
            type: "1",
            
          });
        })();
      }, []);
      useEffect(()=>{
        if(fetchGiftsRedemptionsOfUserData)
        {
            console.log("fetchGiftsRedemptionsOfUserData",fetchGiftsRedemptionsOfUserData)
        }
        else if(fetchGiftsRedemptionsOfUserIsLoading)
        {
            console.log("fetchGiftsRedemptionsOfUserIsLoading",fetchGiftsRedemptionsOfUserIsLoading)
        }
      },[fetchGiftsRedemptionsOfUserData,fetchGiftsRedemptionsOfUserIsLoading])
    const DisplayEarnings=()=>{
        return(
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    {userPointEntryData && <PoppinsText style={{color:"black"}} content={userPointEntryData.body.point_earned}></PoppinsText>}
                    <PoppinsTextMedium style={{color:"black",fontSize:14}} content="Lifetime Earnings"></PoppinsTextMedium>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginLeft:20}}>
                    {userPointEntryData && <PoppinsText style={{color:"black"}} content={userPointEntryData.body.point_redeemed}></PoppinsText>}
                    <PoppinsTextMedium style={{color:"black",fontSize:14}} content="Lifetime Burns"></PoppinsTextMedium>
                </View>
                <TouchableOpacity style={{borderRadius:2,height:40,width:100,backgroundColor:"#FFD11E",alignItems:"center",justifyContent:"center",marginLeft:20}}>
                    <PoppinsTextMedium  style={{color:'black'}} content="Redeem"></PoppinsTextMedium>
                </TouchableOpacity> 
            </View>
        )
    }
    const Header=()=>{
        return(
            <View style={{height:40,width:'100%',backgroundColor:'#DDDDDD',alignItems:"center",justifyContent:"center",flexDirection:"row",marginTop:20}}>
                <PoppinsTextMedium style={{marginLeft:20,fontSize:16,position:"absolute",left:10}} content="Redeemed Ladger"></PoppinsTextMedium>
                <TouchableOpacity style={{position:"absolute",right:20}}>
                <Image style={{height:22,width:22,resizeMode:"contain"}} source={require('../../../assets/images/settings.png')}></Image>

                </TouchableOpacity>
            </View>
        )
    }
    const ListItem=(props)=>{
        const description = props.description
        const productCode = props.productCode
        const time = props.time
        const amount =props.amount
        return(
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",margin:8}}>
                <View style={{height:70,width:70,alignItems:"center",justifyContent:"center",borderRadius:10,borderWidth:1,borderColor:'#DDDDDD'}}>
                    <Image style={{height:50,width:50,resizeMode:"contain"}} source={require('../../../assets/images/box.png')}></Image>
                </View>
                <View style={{alignItems:"flex-start",justifyContent:"center",marginLeft:20}}>
                    <PoppinsTextMedium style={{fontWeight:'600',fontSize:18,color:'black'}} content={description}></PoppinsTextMedium>
                    <View style={{backgroundColor:ternaryThemeColor,alignItems:'center',justifyContent:"center",borderRadius:4,padding:3,paddingLeft:5,paddingRight:5}}>
                    <PoppinsTextMedium style={{fontWeight:'400',fontSize:12,color:'white'}} content="Track Product"></PoppinsTextMedium>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:4}}>
                        <Image style={{height:14,width:14,resizeMode:"contain"}} source={require('../../../assets/images/clock.png')}></Image>
                        <PoppinsTextMedium style={{fontWeight:'200',fontSize:12,color:'grey',marginLeft:4}} content={time}></PoppinsTextMedium>
                    
                    </View>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginLeft:26}}>
                    
                    <PoppinsTextMedium style={{color:ternaryThemeColor,fontSize:18,fontWeight:"700"}} content={` - ${amount}`}></PoppinsTextMedium>
                    <PoppinsTextMedium style={{color:"grey",fontSize:14}} content="PTS"></PoppinsTextMedium>

                </View>
            </View>
        )
    }
    return (
        <View style={{alignItems:"center",justifyContent:"flex-start"}}>
            <View style={{alignItems:"center",justifyContent:"flex-start",flexDirection:"row",width:'100%',marginTop:10,height:40,marginLeft:20}}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
            <Image style={{height:24,width:24,resizeMode:'contain',marginLeft:10}} source={require('../../../assets/images/blackBack.png')}></Image>

                </TouchableOpacity>
            <PoppinsTextMedium content ="Redeemed History" style={{marginLeft:10,fontSize:16,fontWeight:'600',color:'#171717'}}></PoppinsTextMedium>
            <TouchableOpacity style={{marginLeft:160}}>
            <Image style={{height:30,width:30,resizeMode:'contain'}} source={require('../../../assets/images/notificationOn.png')}></Image>
            </TouchableOpacity>
            </View>
            <View style={{padding:14,alignItems:"flex-start",justifyContent:"flex-start",width:"100%"}}>
                <PoppinsTextMedium style={{marginLeft:10,fontSize:20,fontWeight:'600',color:'#6E6E6E'}} content="You Have"></PoppinsTextMedium>
                {userPointEntryData && 
                <PoppinsText style={{marginLeft:10,fontSize:34,fontWeight:'600',color:'#373737'}} content={userPointEntryData.body.point_balance}></PoppinsText>
                
                }
                <PoppinsTextMedium style={{marginLeft:10,fontSize:20,fontWeight:'600',color:'#6E6E6E'}} content="Points Balance"></PoppinsTextMedium>
            </View>
            <Header></Header>
            {fetchGiftsRedemptionsOfUserData && <FlatList
        data={fetchGiftsRedemptionsOfUserData.body.userPointsRedemptionList}
        renderItem={({item,index}) => {
            console.log(index+1,item)
            return(
                <ListItem description={item.product_name} productCode={item.product_code} amount={item.points} time={moment(item.created_at).format('HH:MM')}/>
            )
        }}
        keyExtractor={item => item.id}
      />}
        </View>
    );
}

const styles = StyleSheet.create({})

export default RedeemedHistory;
