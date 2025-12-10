import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../context/ThemeContext';
import { STORAGE_KEYS } from '../../utils/constants';

type Props = {
  title: string;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
};

const HEADER_HEIGHT = 56;

const SuperAdminNavbar: React.FC<Props> = ({
  title,
  toggleSidebar,
  sidebarOpen,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const isDark = theme === 'dark';

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.ROLE,
      STORAGE_KEYS.USER_NAME,
    ]);

    setProfileOpen(false);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <>
      {/* ✅ NAVBAR */}
      <View
        style={[
          styles.navbar,
          { backgroundColor: isDark ? '#020617' : '#FFFFFF' },
        ]}
      >
        {/* ✅ MENU ICON ONLY WHEN SIDEBAR CLOSED */}
        {!sidebarOpen && (
          <TouchableOpacity onPress={toggleSidebar} style={styles.iconBtn}>
            <Ionicons
              name="menu"
              size={26}
              color={isDark ? '#E5E7EB' : '#020617'}
            />
          </TouchableOpacity>
        )}

        {/* ✅ TITLE */}
        <Text
          style={[
            styles.title,
            { color: isDark ? '#E5E7EB' : '#020617' },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* ✅ PROFILE ICON */}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setProfileOpen(prev => !prev)}
        >
          <Ionicons
            name="person-circle-outline"
            size={26}
            color={isDark ? '#E5E7EB' : '#020617'}
          />
        </TouchableOpacity>

        {/* ✅ PROFILE DROPDOWN */}
        {profileOpen && (
          <View
            style={[
              styles.dropdown,
              { backgroundColor: isDark ? '#0F172A' : '#FFFFFF' },
            ]}
          >
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setProfileOpen(false);
                navigation.navigate('EditProfile'); // ✅ create screen later
              }}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={isDark ? '#E5E7EB' : '#020617'}
              />
              <Text
                style={[
                  styles.dropdownText,
                  { color: isDark ? '#E5E7EB' : '#020617' },
                ]}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={18}
                color="#EF4444"
              />
              <Text
                style={[
                  styles.dropdownText,
                  { color: '#EF4444' },
                ]}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ✅ OUTSIDE CLICK OVERLAY (AUTO CLOSE) */}
      {profileOpen && (
        <Pressable
          style={styles.overlay}
          onPress={() => setProfileOpen(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    zIndex: 1000,
  },

  iconBtn: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },

  /* ✅ DROPDOWN */

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    right: 12,
    width: 170,
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    zIndex: 2000,
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  dropdownText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
  },

  /* ✅ FULL SCREEN OVERLAY TO CLOSE DROPDOWN */

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});

export default SuperAdminNavbar;
