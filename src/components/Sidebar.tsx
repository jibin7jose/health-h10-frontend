import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MENU_ITEMS = [
  'Dashboard',
  'Events',
  'Compare',
  'Advice',
  'Reports',
  'CreateClub',
  'CreateCoach',
];

const Sidebar = ({ active, setActive, toggleSidebar }: any) => {

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.ROLE,
      STORAGE_KEYS.USER_NAME,
    ]);
    setActive('Dashboard');
  };

  return (
    <View style={styles.sidebar}>

      {/* HEADER WITH CLOSE ICON */}
      <View style={styles.header}>
        <Text style={styles.title}>Super Admin</Text>

        <TouchableOpacity onPress={toggleSidebar}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* MENU */}
      {MENU_ITEMS.map(item => (
        <TouchableOpacity
          key={item}
          style={[styles.item, active === item && styles.activeItem]}
          onPress={() => setActive(item)}
        >
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ flex: 1 }} />

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: '#050816',
    paddingTop: 40,
    paddingHorizontal: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    color: '#E5E7EB',
    fontSize: 20,
    fontWeight: '700',
  },

  item: {
    paddingVertical: 12,
  },

  activeItem: {
    backgroundColor: '#111827',
    borderRadius: 6,
    paddingHorizontal: 8,
  },

  itemText: {
    color: '#9CA3AF',
    fontSize: 16,
  },

  logout: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },

  logoutText: {
    color: '#F97373',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Sidebar;
