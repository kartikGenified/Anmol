import React from 'react';
import {View, StyleSheet,TouchableOpacity} from 'react-native';
import PoppinsTextMedium from '../electrons/customFonts/PoppinsTextMedium';
import { BaseUrlImages } from '../../utils/BaseUrlImages';
import {SvgUri} from 'react-native-svg'
const SelectUserBox = (props) => {
    // const image = BaseUrlImages+props.image
    const image = 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/atom.svg'
    // console.log(image)
    const color = props.color
    const otpLogin = props.otpLogin
    // const passwordLogin = props.passwordLogin
    // const autoApproval = props.autoApproval
    const manualApproval = props.manualApproval

    const checkApprovalFlow=()=>{
        if(manualApproval.includes(props.content))
        {
            handleNavigation(true)
        }
        else{
            handleNavigation(false)
        }
        
    }

    const handleNavigation=(needsApproval)=>{
        if(otpLogin.includes(props.content)
        ){
            props.navigation.navigate('OtpLogin',{needsApproval:needsApproval, userType:props.content, userId:props.id})
        }
        else{
            props.navigation.navigate('PasswordLogin',{needsApproval:needsApproval})
        }

    }

    return (
        <TouchableOpacity onPress={()=>{
            handleNavigation()
        }} style={{...styles.container,backgroundColor:color}}>
            
            {image && <SvgUri color="white" uri = {image} style={styles.image}></SvgUri>}

            
            <PoppinsTextMedium style={{color:'white'}} content ={props.content}></PoppinsTextMedium>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        height:'20%',
        width:'40%',
        alignItems:"center",
        justifyContent:"center",
        margin:10,
        elevation:10,
        borderRadius:10
       
    },
    image:{
        height:80,
        width:80,
       
        
    }
})

export default SelectUserBox;
