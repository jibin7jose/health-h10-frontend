// src/navigation/AppNavigator.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '../utils/constants';

import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ResetPassword from '../screens/Auth/ResetPassword';

import SuperAdminHome from '../screens/SuperAdmin/SuperAdminHome';
import ClubAdminHome from '../screens/ClubAdmin/ClubAdminHome';
import CoachHome from '../screens/Coach/CoachHome';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;

  SuperAdminHome: undefined;
  ClubAdminHome: undefined;
  CoachHome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('Login');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      const role = await AsyncStorage.getItem(STORAGE_KEYS.ROLE);

      if (token && role === 'SUPER_ADMIN') {
        setInitialRoute('SuperAdminHome');
      } else if (token && role === 'CLUB_ADMIN') {
        setInitialRoute('ClubAdminHome');
      } else if (token && role === 'COACH') {
        setInitialRoute('CoachHome');
      } else {
        setInitialRoute('Login');
      }

      setReady(true);
    };

    init();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        {/* ✅ AUTH */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        {/* ✅ SUPER ADMIN ONLY */}
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* ✅ ROLE DASHBOARDS */}
        <Stack.Screen name="SuperAdminHome" component={SuperAdminHome} />
        <Stack.Screen name="ClubAdminHome" component={ClubAdminHome} />
        <Stack.Screen name="CoachHome" component={CoachHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
