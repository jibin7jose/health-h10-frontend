import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const CreateCoach = () => {
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (!name) {
      Alert.alert('Error', 'Coach name required');
      return;
    }

    Alert.alert('Success', `Coach Created: ${name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Coach</Text>

      <TextInput
        placeholder="Coach Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.btn} onPress={handleCreate}>
        <Text style={styles.btnText}>Create Coach</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#16A34A',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600' },
});

export default CreateCoach;
