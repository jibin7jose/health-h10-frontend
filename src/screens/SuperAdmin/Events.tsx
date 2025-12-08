import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Events = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Events Page 🎉</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#E5E7EB',
    fontSize: 18,
  },
});

export default Events;
