import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';
import { useTheme } from './context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* ✅ ✅ ✅ MENU KEYS MUST MATCH SuperAdminHome EXACTLY */
const MENU_BY_ROLE: Record<string, string[]> = {
  SUPER_ADMIN: [
    'Dashboard',
    'Events',
    'Compare',
    'Advice',
    'Reports',
    'CreateClub',     // ✅ FIXED
    'CreateCoach',    // ✅ FIXED
    'Clubs',          // ✅ FIXED
    'ClubAdmins',    // ✅ FIXED
  ],
  CLUB_ADMIN: [
    'Dashboard',
    'Events',
    'Players',
    'Coaches',
    'Reports',
  ],
};

const Sidebar = ({ active, setActive, closeSidebar }: any) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [role, setRole] = useState<string | null>(null);

  /* ✅ LOAD ROLE */
  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await AsyncStorage.getItem(STORAGE_KEYS.ROLE);
      setRole(storedRole || 'SUPER_ADMIN');
    };
    loadRole();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.ROLE,
      STORAGE_KEYS.USER_NAME,
    ]);
    setActive('Dashboard');
  };

  const menuItems = MENU_BY_ROLE[role || 'SUPER_ADMIN'] || [];

  return (
    <View
      style={[
        styles.sidebar,
        { backgroundColor: isDark ? '#050816' : '#F1F5F9' },
      ]}
    >
      {/* ✅ HEADER */}
      <View style={styles.topRow}>
        <Text
          style={[
            styles.title,
            { color: isDark ? '#E5E7EB' : '#020617' },
          ]}
        >
          {role === 'CLUB_ADMIN' ? 'Club Admin' : 'Super Admin'}
        </Text>

        <TouchableOpacity onPress={closeSidebar} style={styles.drawerBtn}>
          <Ionicons
            name="menu"
            size={24}
            color={isDark ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
      </View>

      {/* ✅ ✅ ✅ MENU NOW MATCHES SuperAdminHome */}
      {menuItems.map(item => (
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

export default Sidebar;
