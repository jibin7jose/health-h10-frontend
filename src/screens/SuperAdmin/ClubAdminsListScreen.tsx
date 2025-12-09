import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', name: 'Arjun', email: 'arjun@club.com' },
];

const ClubAdminsListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Club Admins</Text>

      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.email}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
  item: {
    padding: 14,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
    borderRadius: 6,
  },
});

export default ClubAdminsListScreen;
