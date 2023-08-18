import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Introduction from '../screens/common/Introduction';
import SelectLanguage from '../screens/common/SelectLanguage';
import SelectUser from '../screens/common/SelectUser';
import OtpLogin from '../screens/login/OtpLogin';
import PasswordLogin from '../screens/login/PasswordLogin';
import VerifyOtp from '../screens/login/VerifyOtp';
import RegisterUser from '../screens/register/RegisterUser';
import Dashboard from '../screens/dashboard/Dashboard';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator()

const StackNavigator=()=>{
    return(
        <NavigationContainer>
                <Stack.Navigator>
                <Stack.Screen options={
                    {
                        headerShown:false
                    }
                } name="Introduction" component={Introduction}></Stack.Screen>
                <Stack.Screen  options={
                    {
                        headerShown:false
                    }
                }  name="SelectLanguage" component={SelectLanguage}></Stack.Screen>
               
                <Stack.Screen  options={
                    {
                        headerShown:false
                    }
                }  name="SelectUser" component={SelectUser}></Stack.Screen>
                <Stack.Screen  options={
                    {
                        headerShown:false
                    }
                }  name="OtpLogin" component={OtpLogin}></Stack.Screen>
                <Stack.Screen  options={
                    {
                        headerShown:false
                    }
                }  name="PasswordLogin" component={PasswordLogin}></Stack.Screen>
                <Stack.Screen  options={
                    {
                        headerShown:false
                    }
                }  name="VerifyOtp" component={VerifyOtp}></Stack.Screen>
                 <Stack.Screen  options={
                    {
                        headerShown:false
                    }
                }  name="RegisterUser" component={RegisterUser}></Stack.Screen>
                <Stack.Screen  options={
                    {
                        headerShown:false
                    }
                }  name="Dashboard" component={DrawerNavigator}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
    )
}

export default StackNavigator