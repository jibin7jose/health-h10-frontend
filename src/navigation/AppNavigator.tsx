import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SuperAdminHome from '../screens/SuperAdmin/SuperAdminHome';
import ClubAdminHome from '../screens/ClubAdmin/ClubAdminHome';
import CoachHome from '../screens/Coach/CoachHome'; // ✅ ✅ ✅ ADD THIS

// ✅ ✅ ✅ ADD COACH HERE
export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  SuperAdminHome: undefined;
  ClubAdminHome: undefined;
  CoachHome: undefined; // ✅ REQUIRED
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
      }
      else if (token && role === 'CLUB_ADMIN') {
        setInitialRoute('ClubAdminHome');
      }
      else if (token && role === 'COACH') {
        setInitialRoute('CoachHome'); // ✅ ✅ ✅ THIS WAS MISSING
      }
      else {
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
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen
          name="SuperAdminHome"
          component={SuperAdminHome}
        />

        <Stack.Screen
          name="ClubAdminHome"
          component={ClubAdminHome}
        />

        {/* ✅ ✅ ✅ THIS FIXES YOUR LOGIN RESET ERROR */}
        <Stack.Screen
          name="CoachHome"
          component={CoachHome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
