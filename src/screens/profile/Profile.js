import React from 'react';
import {View, StyleSheet,TouchableOpacity,Image} from 'react-native';
import { useSelector } from 'react-redux';
const Profile = ({navigation}) => {
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';
    return (
        <View style={{...styles.container,backgroundColor:ternaryThemeColor}}>
            <View style={{height:50,width:'100%',backgroundColor:"transparent",position:"absolute",top:10,alignItems:"flex-start",justifyContent:"center",flexDirection:"row"}}>
            <TouchableOpacity
            style={{height: 20, width: 20,position:"absolute",left:20}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain'}}
              source={require('../../../assets/images/blackBack.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{height: 30, width: 30,position:"absolute",right:20}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{height: 30, width: 30, resizeMode: 'contain'}}
              source={require('../../../assets/images/notificationOn.png')}></Image>
          </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height:"100%",
        width:'100%',
        flex:1,
    }
})

export default Profile;
