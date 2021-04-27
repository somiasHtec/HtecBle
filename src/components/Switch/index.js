import React from 'react';
import { View, Text, Switch as CommunitySwitch } from 'react-native';

import { COLORS } from '../../assets';
import styles from './styles';

const Switch = ({ label, value, toggleSwitch, labelBold = true }) => {
  const labelStyle = labelBold && { fontWeight: 'bold' };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>

      <CommunitySwitch
        trackColor={{ false: COLORS.lightGrey, true: COLORS.lightGreen }}
        thumbColor={value ? COLORS.darkGreen : COLORS.white}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={value}
      />
    </View>
  );
};

export default Switch;
