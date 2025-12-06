import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from './Dashboard';
import Events from './Events';
import Compare from './Compare';
import Advice from './Advice';
import Reports from './Reports';
import CreateClub from './CreateClub';
import CreateCoach from './CreateCoach';
import CustomDrawerContent from '../../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const SuperAdminHome = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Events" component={Events} />
      <Drawer.Screen name="Compare" component={Compare} />
      <Drawer.Screen name="Advice" component={Advice} />
      <Drawer.Screen name="Reports" component={Reports} />
      <Drawer.Screen name="CreateClub" component={CreateClub} />
      <Drawer.Screen name="CreateCoach" component={CreateCoach} />
    </Drawer.Navigator>
  );
};


export default SuperAdminHome;
