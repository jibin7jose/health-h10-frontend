import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Dashboard from './Dashboard';
import Events from './Events';
import Compare from './Compare';
import Advice from './Advice';
import Reports from './Reports';
import CreateClub from './CreateClub';
import CreateCoach from './CreateCoach';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const SuperAdminHome = () => {
  const [activeScreen, setActiveScreen] = useState<
    'Dashboard' | 'Events' | 'Compare' | 'Advice' | 'Reports' | 'CreateClub' | 'CreateCoach'
  >('Dashboard');

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Dashboard': return <Dashboard />;
      case 'Events': return <Events />;
      case 'Compare': return <Compare />;
      case 'Advice': return <Advice />;
      case 'Reports': return <Reports />;
      case 'CreateClub': return <CreateClub />;
      case 'CreateCoach': return <CreateCoach />;
      default: return <Dashboard />;
    }
  };

  return (
    <View style={styles.container}>

      {/* SIDEBAR */}
      {sidebarOpen && (
        <Sidebar
          active={activeScreen}
          setActive={setActiveScreen}
          toggleSidebar={toggleSidebar}   // <-- IMPORTANT
        />
      )}

      {/* PAGE CONTENT */}
      <View style={styles.content}>
        <Navbar title={activeScreen} toggleSidebar={toggleSidebar} />
        {renderScreen()}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#020617',
  },
  content: {
    flex: 1,
  },
});

export default SuperAdminHome;
