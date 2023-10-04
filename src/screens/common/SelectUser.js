import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BaseUrl} from '../../utils/BaseUrl';
import LinearGradient from 'react-native-linear-gradient';
import {useGetAppUsersDataMutation} from '../../apiServices/appUsers/AppUsersApi';
import SelectUserBox from '../../components/molecules/SelectUserBox';
import { setAppUsers } from '../../../redux/slices/appUserSlice';
import { slug } from '../../utils/Slug';

const SelectUser = ({navigation}) => {
  const [listUsers, setListUsers] = useState();
  const [
    getUsers,
    {
      data: getUsersData,
      error: getUsersError,
      isLoading: getUsersDataIsLoading,
      isError: getUsersDataIsError,
    },
  ] = useGetAppUsersDataMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    
    getUsers();
  }, []);
  useEffect(() => {
    if (getUsersData) {
      console.log("type of users",getUsersData.body);
      dispatch(setAppUsers(getUsersData.body))
      setListUsers(getUsersData.body);
    } else if(getUsersError) {
      console.log("getUsersError",getUsersError);
    }
  }, [getUsersData, getUsersError]);


  const primaryThemeColor = useSelector(
    state => state.apptheme.primaryThemeColor,
  )
    ? useSelector(state => state.apptheme.primaryThemeColor)
    : '#FF9B00';
  const secondaryThemeColor = useSelector(
    state => state.apptheme.secondaryThemeColor,
  )
    ? useSelector(state => state.apptheme.secondaryThemeColor)
    : '#FFB533';
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : '#FFB533';

  const icon = useSelector(state => state.apptheme.icon)
    ? useSelector(state => state.apptheme.icon)
    : require('../../../assets/images/demoIcon.png');

    const otpLogin = useSelector(state => state.apptheme.otpLogin)
    // console.log(useSelector(state => state.apptheme.otpLogin))
    const passwordLogin = useSelector(state => state.apptheme.passwordLogin)
    // console.log(useSelector(state => state.apptheme.passwordLogin))
    const manualApproval = useSelector(state => state.appusers.manualApproval)
    const autoApproval = useSelector(state => state.appusers.autoApproval)
    const registrationRequired = useSelector(state => state.appusers.registrationRequired)
    console.log("registration required",registrationRequired)

  const width = Dimensions.get('window').width;
    
  

  return (
    <LinearGradient
      colors={[ternaryThemeColor, secondaryThemeColor]}
      style={styles.container}>
      <View
        style={{
          height: 140,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            ...styles.semicircle,
            width: width + 60,
            borderRadius: (width + width) / 2,
            height: width + 60,
            top: -(width / 2),
          }}>
          <Image
            style={{
              height: 110,
              width: 140,
              resizeMode: 'contain',
              top: width / 8,
            }}
            source={{uri: `${BaseUrl}/api/images/${icon}`}}></Image>
        </View>
      </View>
      <ScrollView style={{flex:1}}>
        <View style={{alignItems:'center',justifyContent:"center",width:'100%'}}>
        <View
        style={{
          ...styles.banner,
          backgroundColor: ternaryThemeColor,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}></View>
        </View>
     
      
        <View style={styles.userListContainer}>
          {listUsers &&
            listUsers.map((item, index) => {
              return (
                <SelectUserBox
                  navigation = {navigation}
                  otpLogin={otpLogin}
                  passwordLogin={passwordLogin}
                  autoApproval={autoApproval}
                  manualApproval={manualApproval}
                  registrationRequired={registrationRequired}
                  key={index}
                  color={ternaryThemeColor}
                  image={item.user_type_logo}
                  content={item.user_type}
                  id={item.user_type_id}></SelectUserBox>
              );
            })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    width: '100%',
    alignItems: 'center'
  },
  semicircle: {
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    height: 184,
    width: '90%',
    borderRadius: 10,
  },
  userListContainer: {
    width: '100%',
    height:600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
});

export default SelectUser;
