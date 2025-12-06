import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<Props> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4C6FFF',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CustomButton;
