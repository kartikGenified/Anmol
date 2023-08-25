import React,{useState,useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity,Image,Dimensions, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import TextInputRectangleMandatory from '../../components/atoms/input/TextInputRectangleMandatory';
import TextInputRectangle from '../../components/atoms/input/TextInputRectangle';
import TextInputNumericRectangle from '../../components/atoms/input/TextInputNumericRectangle';
import InputDate from '../../components/atoms/input/InputDate';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageInput from '../../components/atoms/input/ImageInput';
import ButtonOval from '../../components/atoms/buttons/ButtonOval';
import ProductList from '../../components/molecules/ProductList';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';


const ActivateWarranty = ({navigation,route}) => {
    const [responseArray, setResponseArray] = useState([])
    const [addressData, setAddressData] = useState()
    const buttonThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : '#ef6110';
    // const productList=route.params.productList
    const height = Dimensions.get('window').height;
    const form = useSelector(state=>state.form.warrantyForm)
const workflowProgram = route.params.workflowProgram

    

        useEffect(()=>{
            let lat=''
            let lon=''
            Geolocation.getCurrentPosition((res)=>{
                lat = res.coords.latitude
                lon = res.coords.longitude
                getLocation(JSON.stringify(lat),JSON.stringify(lon))
            })
            const getLocation=(lat,lon)=>{
                if(lat!=='' && lon!=='')
                {
                    console.log("latitude and longitude",lat,lon)
                    try{
                        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}+&lon=${lon}&format=json`,{headers:{
                            'Content-Type': 'application/json'
                        }}).then((res)=>{console.log(res.data)
                setAddressData(res)})
                    }
                    catch(e)
                    {
                        console.log("Error in fetching location",e)
                    }
                
    
                }
                else{
                    console.log("latitude and longitude",lat,lon)
                }
            }
            
        },[])

    const warrantyForm = Object.values(form)
    // console.log(Object.keys(form))
    console.log(warrantyForm)
    const handleDataTextInputMandatory=(data)=>{
        console.log(data)
    }
    const handleDataTextInput=(data)=>{
        console.log(data)
    }
    const handleOpenImageGallery = async () => {
        const result = await launchImageLibrary();
      };

      const handleWorkflowNavigation=()=>{
        console.log("scccess")
    
        if(workflowProgram[0]==="Static Coupon")
        {
        
        navigation.navigate('CongratulateOnScan',{
          workflowProgram:workflowProgram.slice(1)
        })
        }
        else if (workflowProgram[0]==="Warranty")
        {
        navigation.navigate('ActivateWarranty',{
          workflowProgram:workflowProgram.slice(1)
        })
        }
        else if (workflowProgram[0]==="Points On Product")
    {
      console.log(workflowProgram.slice(1))
    navigation.navigate('CongratulateOnScan',{
      workflowProgram:workflowProgram.slice(1)
    })

    }
    else if (workflowProgram[0]==="Cashback")
    {
      console.log(workflowProgram.slice(1))
    navigation.navigate('CongratulateOnScan',{
      workflowProgram:workflowProgram.slice(1)
    })

    }
    else if (workflowProgram[0]==="Wheel")
    {
      console.log(workflowProgram.slice(1))
    navigation.navigate('CongratulateOnScan',{
      workflowProgram:workflowProgram.slice(1)
    })

    }
        else if (workflowProgram[0]==="Genuinity")
        {
            navigation.navigate('Genuinity',{
              workflowProgram:workflowProgram.slice(1)
            })
        }
        else{
        navigation.navigate('Dashboard')
        }
    
      }

    return (
        <View style={{height:"100%",width:'100%',alignItems:"center",justifyContent:"center",backgroundColor:buttonThemeColor}}>
            <View style={{height:'10%',width:'100%',alignItems:'center',justifyContent:"center",position:'absolute',top:0}}>
            <TouchableOpacity
            style={{height:20,width:20,position:"absolute",left:10}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain'}}
              source={require('../../../assets/images/blackBack.png')}></Image>
          </TouchableOpacity>
            <PoppinsTextMedium style={{fontSize:16,fontWeight:'700',color:"white",position:"absolute" ,left:60}} content="Activate Warranty"></PoppinsTextMedium>
            </View>
            <ScrollView style={{width:'100%',height:'90%',position:"absolute",bottom:0,flex:1,backgroundColor:'white',borderTopRightRadius:30,borderTopLeftRadius:30,}}>
        <View style={{height:'100%',width:'100%',alignItems:'center',justifyContent:"flex-start"}}>
             
            <ProductList list={["Product 1","Product 2","Product 3"]}></ProductList>
            {
                warrantyForm && warrantyForm.map((item,index)=>{
                    if(item.type==="text")
                    {
                        if(item.required===true && item.name!=="phone")
                        {
                            return(
                                <TextInputRectangleMandatory key={index} handleDataTextInputMandatory={handleDataTextInputMandatory} placeHolder={item.name}> </TextInputRectangleMandatory>
                            )
                        }
                        else if(item.name==="phone")
                        {
                            return(
                                <TextInputNumericRectangle key={index} handleDataTextInputMandatory={handleDataTextInputMandatory} placeHolder={item.name}> </TextInputNumericRectangle>

                            )
                        }
                        else{
                            return(
                                <TextInputRectangle key={index} handleDataTextInput={handleDataTextInput} placeHolder={item.name}> </TextInputRectangle>
                            )
                            }
                    }
                    else if(item.type==="file")
                    {
                        return(
                           <ImageInput key={index} data={item.name} action="Select File"></ImageInput>
                        )

                    }
                    else if(item.type==="date")
                    {
                        return(
                            <InputDate data={item.label} key={index}></InputDate>
                        )

                    }
                })
            }
            <ButtonOval handleOperation={handleWorkflowNavigation} content="Submit" style={{paddingLeft:30,paddingRight:30,padding:10,color:'white',fontSize:16}}></ButtonOval>
            </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({})

export default ActivateWarranty;
