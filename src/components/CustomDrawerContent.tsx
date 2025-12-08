import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { state, navigation } = props;

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.ROLE,
      STORAGE_KEYS.USER_NAME,
    ]);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Super Admin</Text>

      {/* ✅ KEEP DRAWER OPEN WHEN CHANGING SCREENS */}
      {state.routeNames.map((name, index) => (
        <TouchableOpacity
          key={name}
          style={[
            styles.item,
            state.index === index && styles.itemActive,
          ]}
          onPress={() => {
            navigation.jumpTo(name as never); // ✅ DOES NOT CLOSE DRAWER
          }}
        >
          <Text style={styles.itemText}>{name}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ flex: 1 }} />

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: '#020617',
  },
  title: {
    color: '#E5E7EB',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24,
  },
  item: {
    paddingVertical: 10,
  },
  itemActive: {
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#374151',
  },
  logoutText: {
    color: '#F97373',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CustomDrawerContent;
