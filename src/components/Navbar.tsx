import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ThemeToggle from './context/ThemeToggle';
import { fetchProfile } from '../api/auth';
import { useTheme } from './context/ThemeContext';

const { width, height } = Dimensions.get('window');

// ✅ SAFE TOP PADDING FOR ALL DEVICES
const TOP_PADDING =
  Platform.OS === 'android' ? StatusBar.currentHeight || 12 : 20;

interface Props {
  title: string;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar: React.FC<Props> = ({ title, toggleSidebar, sidebarOpen }) => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    fetchProfile()
      .then(setUser)
      .catch(err => console.log('PROFILE ERR', err?.message));
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('token');
  };

  return (
    <View style={{ zIndex: 1000 }}>
      {/* ✅ Outside click for profile close */}
      {menuOpen && (
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            zIndex: 999,
          }}
          onPress={() => setMenuOpen(false)}
        />
      )}

      <View
        style={[
          styles.container,
          {
            backgroundColor: theme === 'dark' ? '#050816' : '#F8FAFC',
            paddingTop: TOP_PADDING, // ✅ THIS IS THE FIX
            height: 56 + TOP_PADDING,
          },
        ]}
      >
        {/* ✅ SHOW MENU ICON ONLY WHEN SIDEBAR CLOSED */}
        {!sidebarOpen && (
          <TouchableOpacity onPress={toggleSidebar} style={styles.menuBtn}>
            <Ionicons
              name="menu"
              size={26}
              color={theme === 'dark' ? '#FFFFFF' : '#000000'}
            />
          </TouchableOpacity>
        )}

        <Text
          style={[
            styles.logo,
            { color: theme === 'dark' ? '#FFFFFF' : '#020617' },
          ]}
        >
          Tabb Control
        </Text>

        <Text
          style={[
            styles.title,
            { color: theme === 'dark' ? '#9CA3AF' : '#475569' },
          ]}
        >
          {title}
        </Text>

        <View style={{ flex: 1 }} />

        <ThemeToggle />

        {user && (
          <TouchableOpacity onPress={() => setMenuOpen(prev => !prev)}>
            <Ionicons
              name="person-circle"
              size={36}
              color={theme === 'dark' ? '#22D3EE' : '#2563EB'}
            />
          </TouchableOpacity>
        )}

        {menuOpen && user && (
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor:
                  theme === 'dark' ? '#0B1220' : '#FFFFFF',
              },
            ]}
          >
            <Text
              style={[
                styles.profileName,
                { color: theme === 'dark' ? '#E5E7EB' : '#020617' },
              ]}
            >
              {user.name}
            </Text>

            <Text
              style={[
                styles.profileEmail,
                { color: theme === 'dark' ? '#9CA3AF' : '#475569' },
              ]}
            >
              {user.email}
            </Text>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSignOut}
            >
              <Text style={[styles.menuText, { color: '#EF4444' }]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#111827',
  },
  menuBtn: {
    marginRight: 12,
  },
  logo: {
    fontWeight: '700',
    fontSize: 18,
  },
  title: {
    marginLeft: 16,
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 80, // ✅ Adjusted for new navbar height
    right: 10,
    width: 190,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    zIndex: 2000,
    elevation: 20,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
  },
  profileEmail: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#1F2937',
    marginVertical: 8,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 14,
  },
});

export default Navbar;
