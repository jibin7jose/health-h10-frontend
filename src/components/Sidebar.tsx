import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';
import { useTheme } from './context/ThemeContext';
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

const Sidebar = ({ active, setActive, closeSidebar }: any) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.ROLE,
      STORAGE_KEYS.USER_NAME,
    ]);
    setActive('Dashboard');
  };

  return (
    <View
      style={[
        styles.sidebar,
        { backgroundColor: isDark ? '#050816' : '#F1F5F9' },
      ]}
    >
      {/* ✅ TOP ROW WITH DRAWER ICON */}
      <View style={styles.topRow}>
        <Text
          style={[
            styles.title,
            { color: isDark ? '#E5E7EB' : '#020617' },
          ]}
        >
          Super Admin
        </Text>

        <TouchableOpacity onPress={closeSidebar} style={styles.drawerBtn}>
          <Ionicons
            name="menu"
            size={24}
            color={isDark ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
      </View>

      {/* ✅ MENU ITEMS */}
      {MENU_ITEMS.map(item => (
        <TouchableOpacity
          key={item}
          style={[
            styles.item,
            active === item && {
              backgroundColor: isDark ? '#111827' : '#E2E8F0',
            },
          ]}
          onPress={() => setActive(item)}
        >
          <Text
            style={[
              styles.itemText,
              { color: isDark ? '#9CA3AF' : '#020617' },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={{ flex: 1 }} />

      {/* ✅ LOGOUT */}
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
    paddingTop: 28,        // ✅ MORE TOP SPACE
    paddingHorizontal: 16, // ✅ MORE SIDE SPACE
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,      // ✅ MORE SPACE BELOW HEADER
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  drawerBtn: {
    padding: 6,           // ✅ TOUCH FRIENDLY ICON
  },

  item: {
    paddingVertical: 14,  // ✅ MORE MENU SPACE
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,      // ✅ GAP BETWEEN ITEMS
  },

  itemText: {
    fontSize: 16,
  },

  logout: {
    paddingVertical: 16,  // ✅ BETTER BOTTOM SPACE
    borderTopWidth: 1,
    borderTopColor: '#374151',
    marginTop: 10,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Sidebar;
