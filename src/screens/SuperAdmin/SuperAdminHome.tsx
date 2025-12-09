import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Dashboard from './Dashboard';
import Events from './Events';
import Compare from './Compare';
import Advice from './Advice';
import Reports from './Reports';
import CreateClub from './CreateClub';
import CreateCoach from './CreateCoach';
import ClubsListScreen from './ClubsListScreen';
import ClubAdminsListScreen from './ClubAdminsListScreen';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useTheme } from '../../components/context/ThemeContext';

type ScreenType =
  | 'Dashboard'
  | 'Events'
  | 'Compare'
  | 'Advice'
  | 'Reports'
  | 'CreateClub'
  | 'CreateCoach'
  | 'Clubs'
  | 'ClubAdmins';

const SuperAdminHome = () => {
  const { theme } = useTheme();
  const [activeScreen, setActiveScreen] = useState<ScreenType>('Dashboard');

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Events':
        return <Events />;
      case 'Compare':
        return <Compare />;
      case 'Advice':
        return <Advice />;
      case 'Reports':
        return <Reports />;
      case 'CreateClub':
        return <CreateClub />;
      case 'CreateCoach':
        return <CreateCoach />;
      case 'Clubs':
        return <ClubsListScreen />;
      case 'ClubAdmins':
        return <ClubAdminsListScreen />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#020617' : '#F1F5F9' },
      ]}
    >
      {sidebarOpen && (
        <Sidebar
          active={activeScreen}
          setActive={setActiveScreen}
          closeSidebar={toggleSidebar}
        />
      )}

      <View style={styles.content}>
        <Navbar
          title={activeScreen}
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        {renderScreen()}
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
});

export default SuperAdminHome;
