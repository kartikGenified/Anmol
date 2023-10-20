import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import DisplayOnlyTextInput from '../../components/atoms/DisplayOnlyTextInput';
import { useFetchProfileMutation } from '../../apiServices/profile/profileApi';
import * as Keychain from 'react-native-keychain';
import { useGetFormMutation } from '../../apiServices/workflow/GetForms';
import { BaseUrlImages } from '../../utils/BaseUrlImages';
import { useGetActiveMembershipMutation } from '../../apiServices/membership/AppMembershipApi';
import { useIsFocused } from '@react-navigation/native';
import PlatinumModal from '../../components/platinum/PlatinumModal';
const Profile = ({ navigation }) => {
  const [formFields, setFormFields] = useState();
  const [formValues, setFormValues] = useState();
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [profileName, setProfileName] = useState(false);
  const [showNoDataFoundMessage, setShowNoDataFoundMessage] = useState(false)
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : 'grey';
  const focused = useIsFocused()
  const [
    fetchProfileFunc,
    {
      data: fetchProfileData,
      error: fetchProfileError,
      isLoading: fetchProfileIsLoading,
      isError: fetchProfileIsError,
    },
  ] = useFetchProfileMutation();
  const [
    getFormFunc,
    {
      data: getFormData,
      error: getFormError,
      isLoading: getFormIsLoading,
      isError: getFormIsError,
    },
  ] = useGetFormMutation();
  
  const [getActiveMembershipFunc, {
    data: getActiveMembershipData,
    error: getActiveMembershipError,
    isLoading: getActiveMembershipIsLoading,
    isError: getActiveMembershipIsError
  }] = useGetActiveMembershipMutation()

  

  useEffect(() => {
    if (getActiveMembershipData) {
      console.log("getActiveMembershipData", JSON.stringify(getActiveMembershipData))
    }
    else if (getActiveMembershipError) {
      console.log("getActiveMembershipError", getActiveMembershipError)
    }
  }, [getActiveMembershipData, getActiveMembershipError])
  useEffect(() => {
    if (getFormData) {
      if (getFormData.body.length !== 0) {
        console.log('Form Fields', JSON.stringify(getFormData));

        const filteredData = Object.values(getFormData.body.template).filter(
          (item, index) => {
            if (item.name === 'profile_pic' || item.name === "picture") {
              setShowProfilePic(true);
            }
            return item.name !== 'profile_pic' || item.name == "picture";
          },
        );

        setFormFields(filteredData);
        filterNameFromFormFields(filteredData);
      }
      else {
        console.log("no Form")
        setShowNoDataFoundMessage(true)
      }

    } else {
      console.log('Form Field Error', getFormError);
    }
  }, [getFormData, getFormError]);

  useEffect(() => {
    const fetchData = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username,
        );
        const token = credentials.username;
        const form_type = '6';
        fetchProfileFunc(token);

        getFormFunc({ form_type, token });
      }
    };
    fetchData();
    getMembership()
  }, [focused]);
  const getMembership = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username
      );
      const token = credentials.username
      getActiveMembershipFunc(token)
    }
  }
  useEffect(() => {
    if (fetchProfileData) {
      console.log('fetchProfileData', fetchProfileData.body);
    } else if (fetchProfileError) {
      console.log('fetchProfileError', fetchProfileError);
    }
  }, [fetchProfileData, fetchProfileError]);

  const filterNameFromFormFields = data => {
    console.log(data);
    const nameFromFormFields = data.map(item => {
      if (item.name === 'name') {
        setProfileName(true);
      }
      return item.name;
    });
    console.log(nameFromFormFields);
    filterProfileDataAccordingToForm(nameFromFormFields);
  };
  const filterProfileDataAccordingToForm = arrayNames => {
    if (arrayNames && fetchProfileData) {
      let temparr = [];
      arrayNames.map(item => {
        temparr.push(fetchProfileData.body[item]);
      });
      setFormValues(temparr);
      console.log(temparr);
    }
  };

  const name = profileName ? fetchProfileData?.body.name : '';
  const membership = getActiveMembershipData && getActiveMembershipData.body?.tier.name
  const accountVerified = true;
  const mobile = '91-8712312312';
  const gender = 'Male';
  const age = '30 year';
  const aadharNumber = '1231231231231123';
  const panNo = 'QWERT12345';
  const email = 'Qwerty@gmail.com';
  const address =
    '314, 3rd Floor, HB Twin tower NSP, Pitampura, Delhi, India, 110034';

  const ProfileBox=(props)=>{
    const image = props.image
    const title = props.title
    const buttonTitle = props.buttonTitle
    const handleNavigation=()=>{
      if(title==="Payment Methods")
      {
        navigation.navigate("BankAccounts")
      }
      else if(title==="Passbook")
      {
        navigation.navigate("Passbook")
      }
    }
    return(
      <View style={{height:70,width:'50%',alignItems:'center',justifyContent:'center',flexDirection:'row',borderWidth:1.4,borderColor:ternaryThemeColor,borderRadius:10,marginLeft:10,backgroundColor:'white',elevation:10}}>
      <View style={{width:'30%',alignItems:"center",justifyContent:"center",height:'100%'}}>
        <View style={{height:50,width:50,borderRadius:25,alignItems:"center",justifyContent:'center',borderColor:'#DDDDDD',borderWidth:1,marginLeft:4}}>
          <Image style={{height:30,width:30,resizeMode:'contain'}} source={image}></Image>
        </View>
      </View>
      <View style={{width:'70%',alignItems:"center",justifyContent:"center",height:'100%'}}>
        <PoppinsTextMedium style={{color:'black',fontWeight:'600',marginBottom:4}} content={title}></PoppinsTextMedium>
        <TouchableOpacity onPress={()=>{handleNavigation()}} style={{height:24,width:60,borderRadius:4,backgroundColor:ternaryThemeColor,alignItems:'center',justifyContent:'center'}}>
          <PoppinsTextMedium style={{color:'white'}} content={buttonTitle}></PoppinsTextMedium>
        </TouchableOpacity>
      </View>
    </View>
    )
    
  }

  const ProfileHeader = () => {

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)


    const hideSuccessModal = () => {
      setIsSuccessModalVisible(false);
    };

    const showSuccessModal = () => {
      setIsSuccessModalVisible(true);
      console.log("hello")
    };

    return (
      <View style={{ width: '100%' }}>
        <View
          style={{
            height: 120,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 0.3,
            borderColor: 'white',
          }}>
          {showProfilePic && (
            <View
              style={{
                height: 100,
                width: 100,
                backgroundColor: 'white',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {fetchProfileData ? (
                <Image
                  style={{ height: 98, width: 98, resizeMode: 'contain', borderRadius: 49 }}
                  source={{ uri: BaseUrlImages + fetchProfileData.body.profile_pic }}></Image>
              ) : (
                <Image
                  style={{ height: 60, width: 60, resizeMode: 'contain' }}
                  source={require('../../../assets/images/userGrey.png')}></Image>
              )}
            </View>
          )}
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: 140,
              height: 100,
              marginLeft: 10,
            }}>
            <PoppinsText
              style={{ color: 'white', fontSize: 20 }}
              content={name}></PoppinsText>
            {getActiveMembershipData && <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{ height: 16, width: 16, resizeMode: 'contain' }}
                source={require('../../../assets/images/reward.png')}></Image>
              <TouchableOpacity    onPress={
                  showSuccessModal
                }>
                <PoppinsTextMedium
                  style={{ color: 'white', fontSize: 14 }}
                  content={membership}></PoppinsTextMedium>
              </TouchableOpacity>

            </View>}
            {accountVerified && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={{ height: 16, width: 16, resizeMode: 'contain' }}
                  source={require('../../../assets/images/verified.png')}></Image>

                <PoppinsTextMedium
                  style={{ color: 'white' }}
                  content="Account Verified"></PoppinsTextMedium>


                <PlatinumModal isVisible={isSuccessModalVisible} onClose={hideSuccessModal} getActiveMembershipData={getActiveMembershipData} />


              </TouchableOpacity>

             

            )}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 50,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditProfile', {
                  formFields: formFields,
                  formValues: formValues,
                  savedImage: fetchProfileData.body.profile_pic
                });
              }}
              style={{ height: 30, width: 30 }}>
              <Image
                style={{ height: 30, width: 30, resizeMode: 'contain' }}
                source={require('../../../assets/images/editWhite.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10,marginBottom:6}}>
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
            </View> */}
      </View>
    );
  };

  return (
      <View style={{ ...styles.container, backgroundColor: ternaryThemeColor }}>
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: 'transparent',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{ height: 20, width: 20, position: 'absolute', left: 20 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
              source={require('../../../assets/images/blackBack.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 30, width: 30, position: 'absolute', right: 20 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{ height: 30, width: 30, resizeMode: 'contain' }}
              source={require('../../../assets/images/notificationOn.png')}></Image>
          </TouchableOpacity>
        </View>
        {!showNoDataFoundMessage && <ProfileHeader></ProfileHeader>}
    <ScrollView>

        <View
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: 'white',

            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <ProfileData></ProfileData> */}
          {formFields &&
            
            formFields.map((item, index) => {
              console.log(item, formValues[index]);
              return (
                <DisplayOnlyTextInput
                  key={index}
                  data={formValues[index] === null ? 'N/A' : formValues[index]}
                  title={item.label}
                  photo={require('../../../assets/images/eye.png')}></DisplayOnlyTextInput>
              );
            })}
            {
              showNoDataFoundMessage && <PoppinsTextMedium content="No "></PoppinsTextMedium>
            }
        
        </View>
        <View style={{width:'100%',backgroundColor:"white",alignItems:"center",justifyContent:'center'}}>
        <View style={{height:100,width:'90%',backgroundColor:"white",alignItems:"flex-start",justifyContent:'center',flexDirection:'row',marginTop:20}}>

      <ProfileBox buttonTitle="+ Add" title="Payment Methods" image={require('../../../assets/images/money.png')}></ProfileBox>
      <ProfileBox buttonTitle="View" title="Check Passbook" image={require('../../../assets/images/gift.png')}></ProfileBox>
        </View>
        </View>
        </ScrollView>
      </View>
   
    
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
});

export default Profile;
