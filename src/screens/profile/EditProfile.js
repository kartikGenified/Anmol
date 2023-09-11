import React from 'react';
import {View, StyleSheet,Image,TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';


const EditProfile = () => {
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';
    return (
        <View style={{...styles.container,backgroundColor:ternaryThemeColor}}>
            <View style={{height:50,width:'100%',backgroundColor:"transparent",alignItems:"flex-start",justifyContent:"center",flexDirection:"row",marginTop:10}}>
            <TouchableOpacity
            style={{height: 20, width: 20,position:"absolute",left:20}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain'}}
              source={require('../../../assets/images/blackBack.png')}></Image>
          </TouchableOpacity>
            
        </View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",marginLeft:20}}>
       <View style={{backgroundColor:"white",height:100,width:100,borderRadius:60,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
       <Image
              style={{height: 80, width: 80, resizeMode: 'contain'}}
              source={require('../../../assets/images/languageHindi.png')}></Image>
       </View>
       <View style={{height:50,width:160,padding:4,backgroundColor:"white",marginLeft:20,borderRadius:20,alignItems:"center",justifyContent:'center'}}>
        <PoppinsTextMedium content ="Chage Profile Picture"></PoppinsTextMedium>
       </View>

        </View>
        <View style={{height:'96%',width:"100%",borderRadius:40,alignItems:"center",justifyContent:"center",backgroundColor:"white",marginTop:20}}></View>
        </View>

    );
}

const styles = StyleSheet.create({})

export default EditProfile;
