import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/dashboard/Dashboard';
import BottomNavigator from './BottomNavigator';
import RedeemRewardHistory from '../screens/historyPages/RedeemRewardHistory';
import AddBankAccountAndUpi from '../screens/payments/AddBankAccountAndUpi';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen options={{headerShown:false}} name="DashboardDrawer" component={BottomNavigator} />
      <Drawer.Screen options={{headerShown:false}} name="Redeem Reward" component={RedeemRewardHistory} />
      <Drawer.Screen options={{headerShown:false}} name="Add BankAccount And Upi" component={AddBankAccountAndUpi} />


    </Drawer.Navigator>
  );
}

export default DrawerNavigator