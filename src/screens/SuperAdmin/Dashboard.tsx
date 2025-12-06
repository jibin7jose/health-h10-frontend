import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../../components/Navbar';

const Dashboard = () => (
  <View style={{ flex: 1, backgroundColor: '#020617' }}>
    <Navbar title="Dashboard" />
    <View style={styles.body}>
      <Text style={styles.text}>Dashboard content here</Text>
    </View>
  </View>
);


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
  },
});

export default Dashboard;
