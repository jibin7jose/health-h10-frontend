import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from '../../api/axios';

const AssignPodHolder = () => {
  const [coaches, setCoaches] = useState<any[]>([]);
  const [podHolders, setPodHolders] = useState<any[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [selectedPodHolder, setSelectedPodHolder] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const coachRes = await axios.get('/coaches');
      const podRes = await axios.get('/pod-holders');

      setCoaches(coachRes.data);
      setPodHolders(podRes.data);
    } catch (e) {
      Alert.alert('Error', 'Failed to load data');
    }
  };

  const handleAssign = async () => {
    if (!selectedCoach || !selectedPodHolder) {
      return Alert.alert('Error', 'Select Coach & Pod Holder');
    }

    try {
      await axios.post('/coaches/assign-pod-holder', {
        coach_id: selectedCoach,
        pod_holder_id: selectedPodHolder,
      });

      Alert.alert('Success', 'Pod Holder assigned to Coach');
    } catch (e) {
      Alert.alert('Error', 'Assignment failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Pod Holder to Coach</Text>

      <Text style={styles.label}>Select Coach</Text>
      {coaches.map(coach => (
        <TouchableOpacity
          key={coach.coach_id}
          style={[
            styles.item,
            selectedCoach === coach.coach_id && styles.selected,
          ]}
          onPress={() => setSelectedCoach(coach.coach_id)}
        >
          <Text>{coach.coach_name}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Select Pod Holder</Text>
      {podHolders.map(pod => (
        <TouchableOpacity
          key={pod.pod_holder_id}
          style={[
            styles.item,
            selectedPodHolder === pod.pod_holder_id && styles.selected,
          ]}
          onPress={() => setSelectedPodHolder(pod.pod_holder_id)}
        >
          <Text>{pod.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleAssign}>
        <Text style={styles.btnText}>Assign</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  label: { fontWeight: '600', marginTop: 16, marginBottom: 6 },
  item: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 6,
  },
  selected: {
    backgroundColor: '#BFDBFE',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default AssignPodHolder;
