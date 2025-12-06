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
import { registerSuperAdmin } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) {
      return Alert.alert('Error', 'All fields are required');
    }

    if (password !== confirm) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    try {
      const data = await registerSuperAdmin({
        name,
        email,
        phone,
        password,
      });

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN, data.access_token],
        [STORAGE_KEYS.ROLE, data.role],
        [STORAGE_KEYS.USER_NAME, data.user?.name || ''],
      ]);

      Alert.alert('Success', 'Registration successful! Please login.', [
        {
          text: 'OK',
          onPress: () => navigation.replace('Login'),
        },
      ]);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.message?.message ||
        'Registration failed';

      Alert.alert('Register failed', String(msg));
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.heading}>Create Super Admin</Text>
        <Text style={styles.subtitle}>Enter your details below</Text>

        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor="#9CA3AF"
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* ✅ PASSWORD */}
        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        {/* ✅ CONFIRM PASSWORD */}
        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!showConfirm}
            style={styles.passwordInput}
            value={confirm}
            onChangeText={setConfirm}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        <CustomButton title="Register" onPress={handleRegister} />

        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
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
  },

  link: {
    color: '#60A5FA',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default RegisterScreen;
