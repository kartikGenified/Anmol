import React,{useEffect,useState} from 'react';
import {View, StyleSheet,ScrollView,Platform} from 'react-native';
import MenuItems from '../../components/atoms/MenuItems';
import { BaseUrl } from '../../utils/BaseUrl';
import { useGetAppDashboardDataMutation } from '../../apiServices/dashboard/AppUserDashboardApi';
import { useGetAppUserBannerDataMutation } from '../../apiServices/dashboard/AppUserBannerApi';
import * as Keychain from 'react-native-keychain';
import DashboardMenuBox from '../../components/organisms/DashboardMenuBox';
import Banner from '../../components/organisms/Banner';
import DrawerHeader from '../../components/headers/DrawerHeader';
import DashboardDataBox from '../../components/molecules/DashboardDataBox';
import KYCVerificationComponent from '../../components/organisms/KYCVerificationComponent';
import DashboardSupportBox from '../../components/molecules/DashboardSupportBox';
import { useGetWorkflowMutation } from '../../apiServices/workflow/GetWorkflowByTenant';
import { useGetFormMutation } from '../../apiServices/workflow/GetForms';
import { useSelector ,useDispatch} from 'react-redux';
import { setProgram,setWorkflow,setIsGenuinityOnly} from '../../../redux/slices/appWorkflowSlice';
import { setWarrantyForm } from '../../../redux/slices/formSlice';

const Dashboard = ({navigation}) => {

    const [dashboardItems, setDashboardItems] = useState()
    const userId = useSelector((state)=>state.appusersdata.userId)
    console.log("user id is from dashboard",userId)
    const [getDashboardFunc,{
        data:getDashboardData,
        error:getDashboardError,
        isLoading:getDashboardIsLoading,
        isError:getDashboardIsError
    }] =useGetAppDashboardDataMutation()

    const [getBannerFunc,{
        data:getBannerData,
        error:getBannerError,
        isLoading:getBannerIsLoading,
        isError:getBannerIsError
    }] =useGetAppUserBannerDataMutation()

    const [getWorkflowFunc,{
      data:getWorkflowData,
      error:getWorkflowError,
      isLoading:getWorkflowIsLoading,
      isError:getWorkflowIsError
  }] =useGetWorkflowMutation()
    const [getFormFunc,{
      data:getFormData,
      error:getFormError,
      isLoading:getFormIsLoading,
      isError:getFormIsError
  }] =useGetFormMutation()
    const dispatch = useDispatch()

    useEffect(()=>{
        const getDashboardData=async()=>{
            try {
                // Retrieve the credentials
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                  console.log(
                    'Credentials successfully loaded for user ' + credentials.username
                  );
                  const token = credentials.username
                  const form_type = "2"
                  console.log(typeof token)
                  token && getDashboardFunc(token)
                  token && getBannerFunc(token)
                  token && getWorkflowFunc({userId,token})
                  token && getFormFunc({form_type,token})
                } else {
                  console.log('No credentials stored');
                }
              } catch (error) {
                console.log("Keychain couldn't be accessed!", error);
              }
        }
        getDashboardData()
        
    },[])

    useEffect(()=>{
        if(getDashboardData)
        {
            console.log(getDashboardData.body.app_dashboard)
            setDashboardItems(getDashboardData.body.app_dashboard)
        }
        else{
            console.log(getDashboardError)
        }
    },[getDashboardData,getDashboardError])
    
    useEffect(()=>{
      if(getBannerData)
      {
          console.log(getBannerData.body["0"])
      }
      else{
          console.log(getBannerError)
      }
  },[getBannerError,getBannerData])

    useEffect(()=>{
        if(getWorkflowData)
        {
          if(getWorkflowData.length===1 && getWorkflowData[0]==="Genuinity")
          {
            dispatch(setIsGenuinityOnly())
          }
            console.log(getWorkflowData)
            dispatch(setProgram(getWorkflowData.body[0].program))
            dispatch(setWorkflow(getWorkflowData.body[0].workflow_id))
            
        }
        else{
            console.log(getWorkflowError)
        }
    },[getWorkflowData,getWorkflowError])
    useEffect(()=>{
      if(getFormData)
      {
          console.log("Form Fields",getFormData.body)
          dispatch(setWarrantyForm(getFormData.body.template))
          
      }
      else{
          console.log("Form Field Error",getFormError)
      }
  },[getFormData,getFormError])

    const platformMarginScroll = Platform.OS ==='ios' ? 0:0
    

    return (
        <View style={{alignItems:"center",justifyContent:"center",backgroundColor:"#F7F9FA",flex:1,height:'100%'}}>
            <DrawerHeader></DrawerHeader>
            <ScrollView style={{width:'100%',marginBottom:platformMarginScroll,height:'100%'}}>
                <View style={{width:'100%',alignItems:"center",justifyContent:"center",height:"100%"}}>
              <View style={{height:200,width:'100%',marginBottom:20}}>
        <Banner images={["https://picsum.photos/200/300","https://picsum.photos/300/300","https://picsum.photos/200/200"]}></Banner>

          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{paddingLeft:10,paddingRight:10,paddingBottom:4}}>
          <DashboardDataBox header="Total Points"  data="5000" image={require('../../../assets/images/coin.png')} ></DashboardDataBox>
          <DashboardDataBox header="Total Points"  data="5000" image={require('../../../assets/images/coin.png')} ></DashboardDataBox>

          </ScrollView>
          {dashboardItems && <DashboardMenuBox navigation={navigation} data={dashboardItems}></DashboardMenuBox>}  
            <View style={{width:'100%',alignItems:"center",justifyContent:"center",marginBottom:20}}>
          <KYCVerificationComponent buttonTitle="Complete Your KYC" title="Your KYC is not completed"></KYCVerificationComponent>
            </View>
            <View style={{flexDirection:"row",width:'100%',alignItems:"center",justifyContent:"center"}}>
                <DashboardSupportBox text="Report an Issue" backgroundColor="#FFF4EB" borderColor="#FEE8D4" image={require('../../../assets/images/info.png')} ></DashboardSupportBox>
                <DashboardSupportBox text="Customer support" backgroundColor="#EDEAFE" borderColor="#E4E0FC" image={require('../../../assets/images/support.png')} ></DashboardSupportBox>
                <DashboardSupportBox text="Feedback" backgroundColor="#FEE9E9" borderColor="#FDDADA" image={require('../../../assets/images/feedback.png')} ></DashboardSupportBox>

            </View>
          </View>
          </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Dashboard;
