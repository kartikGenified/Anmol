import React from 'react';
import {View, StyleSheet,ScrollView} from 'react-native';
import MenuItems from '../atoms/MenuItems';
import { BaseUrl } from '../../utils/BaseUrl';


const DashboardMenuBox=(props)=>{
    const data = props.data
    const navigation = props.navigation
    const handleMenuItemPress=(data)=>{
        console.log(data)
        if(data.substring(0,4).toLowerCase()==="scan" )
        {
            navigation.navigate('QrCodeScanner')
        }
        else if(data.toLowerCase()==="passbook")
        {
            navigation.navigate("Passbook")
        }
        else if(data.toLowerCase() === "rewards"){
            navigation.navigate('RedeemRewardHistory')
        }
        else if(data.toLowerCase() === "profile"){
            navigation.navigate('Profile')
        }
        else if(data.toLowerCase() === "warranty list"){
            navigation.navigate('WarrantyHistory')
        }
        else if(data.toLowerCase() === "bank details" || data.toLowerCase() === "bank account"){
            navigation.navigate('AddBankAccountAndUpi')
        }
        else if(data.toLowerCase().substring(0,5) === "check"){
            if(data.toLowerCase().split(" ")[1]==="genuinity")
            navigation.navigate('QrCodeScanner')
            else if(data.toLowerCase().split(" ")[1]==="warranty")
            navigation.navigate('QrCodeScanner')
        }
        else if(data.toLowerCase().substring(0,8) === "activate"){
            if(data.toLowerCase().split(" ")[1]==="genuinity")
            navigation.navigate('QrCodeScanner')
            else if(data.toLowerCase().split(" ")[1]==="warranty")
            navigation.navigate('QrCodeScanner')
        }
        else if(data.toLowerCase() === "product catalogue"){
            navigation.navigate('ProductCatalogue')
        }
        else if(data.toLowerCase() === "customer support" || data.toLowerCase() === "help and support"){
            navigation.navigate('HelpAndSupport')
        }
    }

    return(
        <View style={{borderColor:'#DDDDDD',borderRadius:20,borderWidth:1.2,width:'90%',alignItems:"center",justifyContent:"center",backgroundColor:'white',padding:4}}>
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{width:500,flexWrap:"wrap",flexDirection:"row"}} horizontal={true}>
        {
            data.map((item,index)=>{
                return(
                   
                    <MenuItems handlePress={handleMenuItemPress} key={index} image={`${BaseUrl}/api/images/${item.icon}`} content={item.name}></MenuItems>
                   
                )
            })
        }
        </ScrollView>
        </View>
    )
}

export default DashboardMenuBox;
