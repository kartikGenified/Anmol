import React from 'react';
import {View, StyleSheet,ScrollView} from 'react-native';
import MenuItems from '../atoms/MenuItems';
import { BaseUrl } from '../../utils/BaseUrl';


const DashboardMenuBox=(props)=>{
    const data = props.data
    const navigation = props.navigation
    const handleMenuItemPress=(data)=>{
        console.log(data)
        if(data==="Scan QR Code" || data==="Scan and Win")
        {
            navigation.navigate('QrCodeScanner')
        }
        else{
            navigation.navigate('RedeemRewardHistory')
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
