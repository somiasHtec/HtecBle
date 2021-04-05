import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { ICONS, COLORS } from '../../assets';
import styles from './styles';

const Block = (props) => {
  const { color, icon, position, writeToPeripheral, peripheralId } = props;

  const borderColor = { borderColor: COLORS.block[color] };

  const handleOnPress = () => {
    console.log('ON PRES', position);
    writeToPeripheral(peripheralId, position);
  };

  return (
    <TouchableOpacity
      onPress={() => handleOnPress(position)}
      style={[styles.container, borderColor]}>
      <Text style={styles.iconStyle}>{ICONS[icon]}</Text>
    </TouchableOpacity>
  );
};

export default Block;
