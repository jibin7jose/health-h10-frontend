import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import { loginSuperAdmin } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Email and password required');
    }

    try {
      setLoading(true);

      const data = await loginSuperAdmin({ email, password });

      // STORE AUTH DATA
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN, data?.access_token || ''],
        [STORAGE_KEYS.ROLE, data?.role || ''],
        [STORAGE_KEYS.USER_NAME, data?.user?.name || ''],
      ]);

      // ROLE BASED NAVIGATION
      if (data.role === 'SUPER_ADMIN') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SuperAdminHome' }],
        });
      }
      else if (data.role === 'CLUB_ADMIN') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'ClubAdminHome' }],
        });
      }
      else if (data.role === 'COACH') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'CoachHome' }],
        });
      }
      else {
        Alert.alert('Access Denied', 'Invalid role assigned');
      }

    } catch (error: any) {
      console.log('LOGIN ERROR:', error?.response?.data);

      const msg =
        error?.response?.data?.message?.message ||
        error?.response?.data?.message ||
        'Invalid email or password';

      Alert.alert('Login Failed', String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>

        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subtitle}>Enter your details below</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconBtn}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          title={loading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
          disabled={loading}
        />

        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={styles.link}>New user? Register</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0F1F',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  card: {
    backgroundColor: '#0F1629',
    padding: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  heading: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 22,
  },
  input: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#E5E7EB',
    marginTop: 14,
    fontSize: 14,
  },
  passwordRow: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    color: '#E5E7EB',
    paddingVertical: 12,
    fontSize: 14,
  },
  iconBtn: {
    paddingLeft: 10,
  },
  link: {
    color: '#60A5FA',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
});

export default LoginScreen;
