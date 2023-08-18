import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/dashboard/Dashboard';
import BottomNavigator from './BottomNavigator';



const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen options={{headerShown:false}} name="DashboardDrawer" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator