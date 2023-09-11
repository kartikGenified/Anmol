import React from 'react';
import {View, StyleSheet,TouchableOpacity,Image} from 'react-native';
import { useSelector } from 'react-redux';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import DisplayOnlyTextInput from '../../components/atoms/DisplayOnlyTextInput';

const Profile = ({navigation}) => {
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';

    const name = "Mr. Amit"
    const membership ="Platinum"
    const accountVerified =true
    const mobile ="91-8712312312"
    const gender = "Male"
    const age = "30 year"
    const aadharNumber = "1231231231231123"
    const panNo = "QWERT12345"
    const email ="Qwerty@gmail.com"
    const address = "314, 3rd Floor, HB Twin tower NSP, Pitampura, Delhi, India, 110034"

      const ProfileData=()=>{

        return(
          <View style={{borderWidth:1,borderStyle:'dotted',borderColor:ternaryThemeColor,width:"80%",borderRadius:10,height:200}}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:'center',position:"absolute",left:-14,top:10,backgroundColor:"white"}}>
              <View style={{height:30,width:30,borderRadius:15,borderWidth:1,alignItems:"center",justifyContent:"center",marginRight:10,backgroundColor:"white",borderColor:ternaryThemeColor}}>
                <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('../../../assets/images/email.png')}></Image>
              </View>
              <PoppinsTextMedium content={email}></PoppinsTextMedium>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:'center',position:"absolute",left:-14,top:50,backgroundColor:"white"}}>
              <View style={{height:30,width:30,borderRadius:15,borderWidth:1,alignItems:"center",justifyContent:"center",marginRight:10,backgroundColor:"white",borderColor:ternaryThemeColor}}>
                <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('../../../assets/images/location.png')}></Image>
              </View>
              <PoppinsTextMedium content={address}></PoppinsTextMedium>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:'center',position:"absolute",left:-14,top:100,backgroundColor:"white"}}>
              <View style={{height:30,width:30,borderRadius:15,borderWidth:1,alignItems:"center",justifyContent:"center",marginRight:10,backgroundColor:"white",borderColor:ternaryThemeColor}}>
                <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('../../../assets/images/aadhaarLogo.png')}></Image>
              </View>
              <PoppinsTextMedium content={aadharNumber}></PoppinsTextMedium>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:'center',position:"absolute",left:-14,top:140,backgroundColor:"white"}}>
              <View style={{height:30,width:30,borderRadius:15,borderWidth:1,alignItems:"center",justifyContent:"center",marginRight:10,backgroundColor:"white",borderColor:ternaryThemeColor}}>
                <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('../../../assets/images/pancard.png')}></Image>
              </View>
              <PoppinsTextMedium content={panNo}></PoppinsTextMedium>
            </View>
          </View>
        )
      }
      
      const ProfileHeader =()=>{
        return(
          <View style={{width:"100%"}}>
            <View style={{height:120,width:'100%',flexDirection:"row",alignItems:"center",justifyContent:"center",borderBottomWidth:0.3,borderColor:'white'}}>
              <View style={{height:100,width:100}}>
                <Image style={{height:100,width:100,resizeMode:"contain"}} source={require('../../../assets/images/support.png')}></Image>
              </View>
              <View style={{alignItems:"flex-start",justifyContent:"center",width:140,height:100,marginLeft:10}}>
              <PoppinsText style={{color:'white',fontSize:20}} content={name}></PoppinsText>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <Image style={{height:16,width:16,resizeMode:'contain'}} source={require('../../../assets/images/reward.png')}></Image>
              <PoppinsTextMedium style={{color:'white',fontSize:14}} content={membership}></PoppinsTextMedium>
              </View>
             {accountVerified &&  <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <Image style={{height:16,width:16,resizeMode:'contain'}} source={require('../../../assets/images/verified.png')}></Image>
              <PoppinsTextMedium style={{color:'white'}} content="Account Verified"></PoppinsTextMedium>
              </View>}
              </View>
              <View style={{alignItems:"center",justifyContent:"center",marginLeft:50}}>
                <TouchableOpacity style={{height:30,width:30}}>
                  <Image style={{height:30,width:30,resizeMode:'contain'}} source={require('../../../assets/images/editWhite.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10,marginBottom:6}}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginLeft:24,marginRight:24}}>
              <Image style={{height:16,width:16,resizeMode:'contain',marginRight:2}} source={require('../../../assets/images/callWhite.png')}></Image>
              <PoppinsTextMedium style={{color:'white'}} content={mobile}></PoppinsTextMedium>
              </View>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginLeft:24,marginRight:24}}>
              <Image style={{height:16,width:16,resizeMode:'contain',marginRight:2}} source={require('../../../assets/images/genderWhite.png')}></Image>
              <PoppinsTextMedium style={{color:'white'}} content={gender}></PoppinsTextMedium>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginLeft:24,marginRight:24}}>
            <Image style={{height:16,width:16,resizeMode:'contain',marginRight:2}} source={require('../../../assets/images/ageWhite.png')}></Image>
              <PoppinsTextMedium style={{color:'white'}} content={age}></PoppinsTextMedium>
            </View>
            </View>
          </View>
        )
      }


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
            <ProfileHeader></ProfileHeader>
            <View style={{borderTopRightRadius:30,borderTopLeftRadius:30,backgroundColor:"white",height:'80%',marginTop:10,alignItems:'center',justifyContent:"center"}}>
            {/* <ProfileData></ProfileData> */}
            <DisplayOnlyTextInput data="nishank@gmail.com" title="Email ID" photo={require('../../../assets/images/eye.png')}></DisplayOnlyTextInput>
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
