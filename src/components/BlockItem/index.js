import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { ICONS, COLORS } from '../../assets';
import styles from './styles';

const Block = (props) => {
  const { color, icon, position, handlePeripheralWrite } = props;

  const borderColor = { borderColor: COLORS.block[color] };

  return (
    <TouchableOpacity
      onPress={() => handlePeripheralWrite(position)}
      style={[styles.container, borderColor]}>
      <Text style={styles.iconStyle}>{ICONS[icon]}</Text>
    </TouchableOpacity>
  );
};

export default Block;
