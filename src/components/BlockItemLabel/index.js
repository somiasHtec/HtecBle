import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {COLORS} from '../../assets';
import styles from './styles';

const BlockLabel = (props) => {
  const {onPress, label, color} = props;

  const labelBgColor = color && {backgroundColor: COLORS.block[color]};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, labelBgColor]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BlockLabel;
