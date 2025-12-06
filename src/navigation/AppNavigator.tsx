import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SuperAdminHome from '../screens/SuperAdmin/SuperAdminHome';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  SuperAdminHome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('Register');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        setInitialRoute('SuperAdminHome');  // ✅ DIRECTLY OPEN DRAWER
      } else {
        setInitialRoute('Register');
      }
      setReady(true);
    };
    init();
  }, []);

  if (!ready) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SuperAdminHome" component={SuperAdminHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
