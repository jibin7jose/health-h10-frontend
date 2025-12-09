import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '../../components/context/ThemeContext';
import SidebarCoach from './SidebarCoach';
import Navbar from '../../components/Navbar';

const CoachHome = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleLogoutRedirect = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#020617' : '#F1F5F9' },
      ]}
    >
      {sidebarOpen && (
        <SidebarCoach
          closeSidebar={toggleSidebar}
          onLogout={handleLogoutRedirect}
        />
      )}

      <View style={styles.content}>
        <Navbar
          title="Coach"
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* ✅ MAIN CONTENT */}
        <View style={styles.center}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: theme === 'dark' ? '#E5E7EB' : '#020617',
            }}
          >
            Welcome Coach
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  content: {
    flex: 1,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CoachHome;
