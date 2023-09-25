import React,{useEffect,useState} from 'react';
import {View, StyleSheet,TouchableOpacity,Image,FlatList,ImageBackground} from 'react-native';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import { useSelector } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import { useGetWarrantyByAppUserIdMutation } from '../../apiServices/workflow/warranty/ActivateWarrantyApi';
import { BaseUrlImages } from '../../utils/BaseUrlImages';
import moment from 'moment';

const WarrantyHistory = ({navigation}) => {
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';
    const [
        getWarrantyListFunc,{
            data:getWarrantylistData,
            error:getWarrantylistError,
            isLoading:getWarrantylistIsLoading,
            isError:getWarrantylistIsError
        }
    ]=useGetWarrantyByAppUserIdMutation()

 
    useEffect(()=>{
        const getData=async()=>{
            const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                  console.log(
                    'Credentials successfully loaded for user ' + credentials.username
                  );
                  const token = credentials.username
            getWarrantyListFunc({token:token})
                  }
        }
        getData()
    },[])

    useEffect(()=>{
        if(getWarrantylistData)
        {
            console.log("getWarrantylistData",getWarrantylistData)
            
        }
        else if(getWarrantylistError){
            console.log("getWarrantylistError",getWarrantylistError)
        }
    },[getWarrantylistData,getWarrantylistError])

    const Header=()=>{
        return(
            <View style={{height:40,width:'100%',backgroundColor:'#DDDDDD',alignItems:"center",justifyContent:"center",flexDirection:"row",marginTop:20}}>
                <PoppinsTextMedium style={{marginLeft:20,fontSize:16,position:"absolute",left:10}} content="Warranty Ladger"></PoppinsTextMedium>
                <TouchableOpacity style={{position:"absolute",right:20}}>
                <Image style={{height:22,width:22,resizeMode:"contain"}} source={require('../../../assets/images/settings.png')}></Image>

                </TouchableOpacity>
            </View>
        )
    }


    const DisplayEarnings=()=>{
        var activated = 0
        var pending = 0
        if(getWarrantylistData)
        {
            getWarrantylistData && getWarrantylistData.body.map((item,index)=>{
                if(item.status!=="1")
                {
                    activated++
                }
            })
             pending = getWarrantylistData.body.length - activated
        }
       
        return(
            <View style={{alignItems:"center",justifyContent:"center",width:'100%',marginTop:20}}>
                <View style={{alignItems:"center",justifyContent:"center",position:"absolute",left:40,top:0}}>
                 
                    <PoppinsText style={{color:"black",fontSize:16}} content="Warranty"></PoppinsText>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:20}}>
                
                <View style={{alignItems:"center",justifyContent:"center"}}>
                   {getWarrantylistData &&  <PoppinsText style={{color:"black"}} content={activated}></PoppinsText>}
                    <PoppinsTextMedium style={{color:"black",fontSize:14}} content="Activated"></PoppinsTextMedium>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginLeft:40}}>
                   {getWarrantylistData &&<PoppinsText style={{color:"black"}} content={pending}></PoppinsText>}
                    <PoppinsTextMedium style={{color:"black",fontSize:14}} content="Pending"></PoppinsTextMedium>
                </View>
                <Image style={{height:80,width:80,resizeMode:"contain",marginLeft:40}} source={require('../../../assets/images/boxReward.png')}></Image>
            </View>
            </View>
        )
    }

    const WarrantyList=(props)=>{
        const warrantyTillDate=props.date
        const productName = props.productName
        const warrantyStatus = props.warrantyStatus
        return(
            <View style={{width:"90%",height:150,borderRadius:20,backgroundColor:'#F2F2F2',elevation:6,margin:20}}>
                <ImageBackground resizeMode='contain' style={{position:"absolute",height:100,width:100,right:10,top:-20,alignItems:"center",justifyContent:"center"}} source={require('../../../assets/images/blueEnvelope.png')}>
                    <PoppinsTextMedium style={{fontSize:11,color:'white'}} content="Warranty Till"></PoppinsTextMedium>
                    <PoppinsTextMedium style={{fontSize:12,color:'white'}} content={moment(warrantyTillDate).format("DD MMM YYYY")}></PoppinsTextMedium>
                </ImageBackground>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:'60%'}}>
                    <Image style={{height:60,width:60,resizeMode:'contain'}} source={require('../../../assets/images/box.png')}></Image>
                    <View style={{alignItems:'flex-start',justifyContent:"center",marginLeft:8}}>
                        <PoppinsTextMedium style={{color:'black'}} content = "Product Name /Code : "></PoppinsTextMedium>
                        <PoppinsTextMedium style={{color:'black',fontWeight:'700',marginTop:2}} content = {productName}></PoppinsTextMedium>
                        <PoppinsTextMedium style={{color:'black',marginTop:4}} content = "Warranty Status"></PoppinsTextMedium>
                        <PoppinsTextMedium style={{color:'black',marginTop:2}} content = {warrantyStatus}></PoppinsTextMedium>


                    </View>
                </View>
                <View style ={{flexDirection:"row",alignItems:"center",justifyContent:"center",position:"absolute",bottom:10,left:20}}>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                        <Image style={{height:20,width:20,resizeMode:"contain"}} source={require('../../../assets/images/greenDownload.png')}></Image>
                        <PoppinsTextMedium style={{color:'#353535',fontWeight:"700",marginLeft:4}} content="Download Warranty"></PoppinsTextMedium>
                    </View>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('WarrantyDetails',{data:props.data})
                        }} style={{backgroundColor:'#3B6CE9',height:40,borderRadius:20,alignItems:"center",justifyContent:"center",padding:10,flexDirection:'row',marginLeft:30}}>
                            <Image style={{height:20,width:20,resizeMode:"contain"}} source={require('../../../assets/images/eye.png')}></Image>
                            <PoppinsTextMedium style={{marginLeft:4,color:"white",fontWeight:"700",fontSize:12}} content = "View Details"></PoppinsTextMedium>
                        <View style={{height:30,width:30,borderRadius:15,backgroundColor:"white",alignItems:"center",justifyContent:"center",marginLeft:4}}>
                            <Image style={{height:20,width:20,resizeMode:"contain",transform:[{rotate:'180deg'}]}} source={require('../../../assets/images/blackBack.png')}></Image>
                        </View>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={{alignItems:"center",justifyContent:"flex-start",backgroundColor:"white"}}>
            <View style={{alignItems:"center",justifyContent:"flex-start",flexDirection:"row",width:'100%',marginTop:10,height:40,marginLeft:20}}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
            <Image style={{height:24,width:24,resizeMode:'contain',marginLeft:10}} source={require('../../../assets/images/blackBack.png')}></Image>

                </TouchableOpacity>
            <PoppinsTextMedium content ="Warranty List" style={{marginLeft:10,fontSize:16,fontWeight:'600',color:'#171717'}}></PoppinsTextMedium>
            <TouchableOpacity style={{marginLeft:160}}>
            <Image style={{height:30,width:30,resizeMode:'contain'}} source={require('../../../assets/images/notificationOn.png')}></Image>
            </TouchableOpacity>
            </View>
            <DisplayEarnings></DisplayEarnings>
            <Header></Header>
            {getWarrantylistData && <FlatList
        data={getWarrantylistData.body}
        style={{width:'100%'}}
        contentContainerStyle={{width:'100%',paddingBottom:300}}
        renderItem={({item,index}) => {
            console.log(index+1,item)
            return(
            <WarrantyList data={item} date={item.end_date} warrantyTillDate={item.end_date} productName={item.product_name} warrantyStatus={item.status==="1" ? "Not Activated" : "Activated"} ></WarrantyList>
                
                )
        }}
        keyExtractor={item => item.id}
      />}
        </View>
    );
}

const styles = StyleSheet.create({})

export default WarrantyHistory;
