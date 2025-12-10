// src/screens/Auth/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from '../../components/CustomButton';
import { loginUser } from '../../api/auth';
import { STORAGE_KEYS } from '../../utils/constants';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // false = hidden, true = visible
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Email and password required');
    }

    try {
      setLoading(true);
      const data = await loginUser({ email, password });

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN, data?.access_token || ''],
        [STORAGE_KEYS.ROLE, data?.role || ''],
        [STORAGE_KEYS.USER_NAME, data?.user?.name || ''],
      ]);

      if (data.role === 'SUPER_ADMIN') {
        navigation.reset({ index: 0, routes: [{ name: 'SuperAdminHome' }] });
      } else if (data.role === 'CLUB_ADMIN') {
        navigation.reset({ index: 0, routes: [{ name: 'ClubAdminHome' }] });
      } else if (data.role === 'COACH') {
        navigation.reset({ index: 0, routes: [{ name: 'CoachHome' }] });
      } else {
        Alert.alert('Access Denied', 'Invalid role assigned');
      }
    } catch (error: any) {
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

        {/* EMAIL */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* PASSWORD */}
        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword} // hidden when false
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.iconBtn}
          >
            <Ionicons
              // 👇 YOUR CUSTOM MAPPING
              // hidden (showPassword false)  → eye-off-outline
              // visible (showPassword true)  → eye-outline
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <CustomButton
          title={loading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
          disabled={loading}
        />
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
  forgot: {
    color: '#60A5FA',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'right',
  },
});

export default LoginScreen;
