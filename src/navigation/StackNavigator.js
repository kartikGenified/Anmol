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
import QrCodeScanner from '../screens/camera/QrCodeScanner';
import CongratulateOnScan from '../screens/Rewards/CongratulateOnScan';
import ActivateWarranty from '../screens/waranty/ActivateWarranty';
import Genuinity from '../screens/genuinity/Genuinity';
import GenuineProduct from '../screens/genuinity/GenuineProduct';
import Notification from '../screens/notification/Notification';
import GenuinityScratch from '../screens/genuinity/GenuinityScratch';
import Profile from '../screens/profile/Profile';
import EditProfile from '../screens/profile/EditProfile';
import Passbook from '../screens/passbook/Passbook';
import ScannedHistory from '../screens/historyPages/ScannedHistory';
import PointHistory from '../screens/historyPages/PointHistory';
import RedeemedHistory from '../screens/historyPages/RedeemedHistory';
import CashbackHistory from '../screens/historyPages/CashbackHistory';
import CouponHistory from '../screens/historyPages/CouponHistory';
import ScannedDetails from '../screens/historyPages/ScannedDetails';
import RedeemedDetails from '../screens/historyPages/RedeemedDetails';
import CashbackDetails from '../screens/historyPages/CashbackDetails';
import CouponDetails from '../screens/historyPages/CouponDetails';
import WheelHistory from '../screens/historyPages/WheelHistory';
import WarrantyHistory from '../screens/historyPages/WarrantyHistory';
import WarrantyDetails from '../screens/historyPages/WarrantyDetails';
import RedeemRewardHistory from '../screens/historyPages/RedeemRewardHistory';
import AddBankAccountAndUpi from '../screens/payments/AddBankAccountAndUpi';
import RedeemGifts from '../screens/redeem/RedeemGifts';
import CartList from '../screens/redeem/CartList';
import Verification from '../screens/verification/Verification';
import RedeemCashback from '../screens/redeem/RedeemCashback';
import BasicInfo from '../screens/register/BasicInfo';
import AddBankDetails from '../screens/payments/AddBankDetails';
import AddUpi from '../screens/payments/AddUpi';
import BankAccounts from '../screens/payments/BankAccounts';
import ReferAndEarn from '../screens/ReferAndEarn/ReferAndEarn';
import MyBonus from '../screens/ReferAndEarn/MyBonus';
import HelpAndSupport from '../screens/helpAndSupport/HelpAndSupport';
import ProductCatalogue from '../screens/product catalogue/ProductCatalogue';
import PdfComponent from '../screens/pdf/PdfComponent';
import VideoPage from '../screens/video/VideoPage';
import VideoGallery from '../screens/video/VideoGallery';
import ImageGallery from '../screens/image/ImageGallery';
import ReportAndIssue from '../screens/reportAnIssue/ReportAndIssue';
import Feedback from '../screens/feedback/Feedback';
import Scheme from '../screens/scheme/Scheme';
import WheelList from '../screens/wheel/WheelList';
import SpinWheel from '../screens/wheel/SpinWheel';
import DataNotFound from '../screens/data not found/DataNotFound';
const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen options={
                    {
                        headerShown:false
                    }
                } name="EditProfile" component={EditProfile}></Stack.Screen>

                <Stack.Screen options={
                    {
                        headerShown:false
                    }
                } name="Profile" component={Profile}></Stack.Screen> */}
                {/* 
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Feedback" component={Feedback}></Stack.Screen>
 */}

                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="WheelList" component={WheelList}></Stack.Screen>


                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Introduction" component={Introduction}></Stack.Screen>

                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Feedback" component={Feedback}></Stack.Screen>

                {/* <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="WheelList" component={WheelList}></Stack.Screen> */}
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="SpinWheel" component={SpinWheel}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="WheelList" component={WheelList}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="DataNotFound" component={DataNotFound}></Stack.Screen>
                {/* <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Feedback" component={Feedback}></Stack.Screen> */}
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="BasicInfo" component={BasicInfo}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Scheme" component={Scheme}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="ImageGallery" component={ImageGallery}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="ReportAndIssue" component={ReportAndIssue}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="VideoPage" component={VideoPage}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="VideoGallery" component={VideoGallery}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="PdfComponent" component={PdfComponent}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="ProductCatalogue" component={ProductCatalogue}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="HelpAndSupport" component={HelpAndSupport}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="MyBonus" component={MyBonus}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="ReferAndEarn" component={ReferAndEarn}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="BankAccounts" component={BankAccounts}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="EditProfile" component={EditProfile}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="AddUpi" component={AddUpi}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="AddBankDetails" component={AddBankDetails}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="RedeemedDetails" component={RedeemedDetails}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="RedeemCashback" component={RedeemCashback}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Verification" component={Verification}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="CartList" component={CartList}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="RedeemGifts" component={RedeemGifts}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="AddBankAccountAndUpi" component={AddBankAccountAndUpi}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="RedeemRewardHistory" component={RedeemRewardHistory}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="WarrantyDetails" component={WarrantyDetails}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="WarrantyHistory" component={WarrantyHistory}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="RedeemedHistory" component={RedeemedHistory}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="WheelHistory" component={WheelHistory}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="CouponDetails" component={CouponDetails}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="CashbackDetails" component={CashbackDetails}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="ScannedDetails" component={ScannedDetails}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="CouponHistory" component={CouponHistory}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="CashbackHistory" component={CashbackHistory}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="PointHistory" component={PointHistory}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="ScannedHistory" component={ScannedHistory}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Passbook" component={Passbook}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="GenuinityScratch" component={GenuinityScratch}></Stack.Screen>

                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="ActivateWarranty" component={ActivateWarranty}></Stack.Screen>

                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Notification" component={Notification}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="GenuineProduct" component={GenuineProduct}></Stack.Screen>

                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Genuinity" component={Genuinity}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="CongratulateOnScan" component={CongratulateOnScan}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="QrCodeScanner" component={QrCodeScanner}></Stack.Screen>

                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="SelectLanguage" component={SelectLanguage}></Stack.Screen>

                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="SelectUser" component={SelectUser}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="OtpLogin" component={OtpLogin}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="PasswordLogin" component={PasswordLogin}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="VerifyOtp" component={VerifyOtp}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="RegisterUser" component={RegisterUser}></Stack.Screen>
                <Stack.Screen options={
                    {
                        headerShown: false
                    }
                } name="Dashboard" component={DrawerNavigator}></Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator