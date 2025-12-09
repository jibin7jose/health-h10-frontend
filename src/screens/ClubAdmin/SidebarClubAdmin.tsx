import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { STORAGE_KEYS } from '../../utils/constants';
import { useTheme } from '../../components/context/ThemeContext';

const SidebarClubAdmin = ({ active, setActive, closeSidebar }: any) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.ROLE,
      STORAGE_KEYS.USER_NAME,
    ]);
  };

  const getItemStyle = (key: string) => ({
    backgroundColor:
      active === key ? (isDark ? '#1F2937' : '#E2E8F0') : 'transparent',
  });

  const getTextStyle = (key: string) => ({
    color: active === key ? '#000000' : isDark ? '#E5E7EB' : '#020617',
    fontWeight: active === key ? '700' : '500',
  });

  return (
    <View
      style={[
        styles.sidebar,
        { backgroundColor: isDark ? '#050816' : '#F1F5F9' },
      ]}
    >
      {/* HEADER */}
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: isDark ? '#E5E7EB' : '#020617' }]}>
          Club Admin
        </Text>

        <TouchableOpacity onPress={closeSidebar} style={styles.drawerBtn}>
          <Ionicons
            name="menu"
            size={24}
            color={isDark ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
      </View>

      {/* DASHBOARD */}
      <TouchableOpacity
        style={[styles.item, getItemStyle('Home')]}
        onPress={() => setActive('Home')}
      >
        <Text style={[styles.itemText, getTextStyle('Home')]}>
          Dashboard
        </Text>
      </TouchableOpacity>

      {/* CREATE COACH */}
      <TouchableOpacity
        style={[styles.item, getItemStyle('CreateCoach')]}
        onPress={() => setActive('CreateCoach')}
      >
        <Text style={[styles.itemText, getTextStyle('CreateCoach')]}>
          Create Coach
        </Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text
          style={[
            styles.logoutText,
            { color: isDark ? '#F97373' : '#DC2626' },
          ]}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    paddingTop: 28,
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  drawerBtn: {
    padding: 6,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
  },
  itemText: {
    fontSize: 16,
  },
  logout: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SidebarClubAdmin;
