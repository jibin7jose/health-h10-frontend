import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../../components/Navbar';

const Events = () => {
  return (
    <View style={styles.container}>
      {/* ✅ TOP NAVBAR WITH MENU BUTTON */}
      <Navbar title="Events" />

      {/* ✅ PAGE BODY */}
      <View style={styles.body}>
        <Text style={styles.text}>Events Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  body: {
    flex: 1,
    padding: 16,
  },
  text: {
    color: '#E5E7EB',
    fontSize: 16,
  },
});

export default Events;
