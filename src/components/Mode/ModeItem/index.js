import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { COLORS } from '~/assets';
import styles from './styles';

const ModeItem = ({ label, value, onPress, color }) => {
  const borderColor = { borderColor: COLORS[color] };
  const bgColor = { backgroundColor: COLORS.headerBg[color] };

  return (
    <View style={styles.container}>
      <View style={[styles.labelWrapper, borderColor]}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.valueWrapper, bgColor]}
      >
        <Text style={styles.value}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModeItem;
