import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { forgotPassword } from '../../api/auth';

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!email) return Alert.alert('Error', 'Enter email');

    try {
      await forgotPassword(email);

      Alert.alert(
        'Success',
        'If an account with this email exists, a reset code was sent.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ResetPassword'),
          },
        ],
      );
    } catch {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.heading}>Forgot Password</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
        />

        <CustomButton title="Submit" onPress={handleSubmit} />

        <Text style={styles.link} onPress={() => navigation.replace('Login')}>
          Back to Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0A0F1F', justifyContent: 'center', paddingHorizontal: 28 },
  card: { backgroundColor: '#0F1629', padding: 28, borderRadius: 14, borderWidth: 1, borderColor: '#1E293B' },
  heading: { color: '#F8FAFC', fontSize: 22, fontWeight: '700', marginBottom: 16 },
  input: { backgroundColor: '#020617', borderWidth: 1, borderColor: '#1E293B', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, color: '#E5E7EB', marginTop: 14 },
  link: { color: '#60A5FA', textAlign: 'center', marginTop: 16 },
});

export default ForgotPassword;
