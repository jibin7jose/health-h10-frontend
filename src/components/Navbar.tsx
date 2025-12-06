import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

interface Props {
  title: string;
}

const Navbar: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* ✅ DRAWER MENU BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuBtn}
      >
        <Ionicons name="menu" size={26} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.logo}>Tabb Control</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#050816',
  },
  menuBtn: {
    marginRight: 14,
  },
  logo: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  title: {
    marginLeft: 16,
    color: '#9CA3AF',
    fontSize: 16,
  },
});

export default Navbar;
