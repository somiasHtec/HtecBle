import React from 'react';
import { View } from 'react-native';

import Blocks from '../../components/Blocks';
import Slider from '../../components/SurroundedSlider';

import styles from './styles';

const Surrounded = (props) => {
  const { writeToPeripheral, peripheralId } = props.route.params;

  const handlePeripheralWrite = (value) => {
    writeToPeripheral(peripheralId, value);
  };
  return (
    <View style={styles.container}>
      <Blocks handlePeripheralWrite={handlePeripheralWrite} />
      <Slider handlePeripheralWrite={handlePeripheralWrite} />
    </View>
  );
};

export default Surrounded;
