import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  toggleSidebar: () => void;
}

const Navbar: React.FC<Props> = ({ title, toggleSidebar }) => {
  return (
    <View style={styles.container}>

      {/* ✅ LEFT SIDE: LOGO + TITLE */}
      <View style={styles.left}>
        <Text style={styles.logo}>Tabb Control</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* ✅ RIGHT SIDE: DRAWER ICON */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuBtn}>
        <Ionicons name="menu" size={26} color="#FFFFFF" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // ✅ PUSHES ICON TO RIGHT
    paddingHorizontal: 16,
    backgroundColor: '#050816',
    borderBottomWidth: 1,
    borderBottomColor: '#111827',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },

  title: {
    marginLeft: 12,
    color: '#9CA3AF',
    fontSize: 16,
  },

  menuBtn: {
    padding: 4,
  },
});

export default Navbar;
