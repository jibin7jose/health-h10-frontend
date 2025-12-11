import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { resetPassword } from '../../api/auth';

const ResetPassword = ({ navigation }: any) => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    console.log('✅ TOKEN FROM INPUT:', `"${token}"`);

    if (!token || !password || !confirmPassword) {
      return Alert.alert('Error', 'All fields are required');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    try {
      await resetPassword({
        token: token.trim().toUpperCase(),
        password,
      });

      Alert.alert('Success', 'Password updated successfully', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (err: any) {
      console.log('❌ RESET ERROR:', err?.response?.data || err);

      const msg =
        typeof err?.response?.data?.message === 'string'
          ? err.response.data.message
          : 'Invalid or expired token';

      Alert.alert('Error', msg);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.heading}>Reset Password</Text>

        <TextInput
          placeholder="Verification Code"
          value={token}
          onChangeText={setToken}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
          autoCapitalize="characters"
        />

        <TextInput
          placeholder="New Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#9CA3AF"
        />

        <TextInput
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#9CA3AF"
        />

        <CustomButton title="Reset Password" onPress={handleReset} />

        {/* 🔙 BACK TO LOGIN BUTTON */}
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>← Back to Login</Text>
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
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
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

  // BACK BUTTON STYLES
  backBtn: {
    marginTop: 16,
    alignSelf: 'center',
  },
  backText: {
    color: '#60A5FA',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ResetPassword;
