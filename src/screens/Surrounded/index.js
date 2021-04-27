import React from 'react';
import { View } from 'react-native';

import Blocks from '~/components/Blocks';
import Slider from '~/components/SurroundedSlider';

import styles from './styles';

const Surrounded = (props) => {
  const { writeToPeripheral, peripheralId } = props.route.params;

  // Surrounded ID's
  const serviceUUID = 'c15352c2-9fd7-11e9-a2a3-2a2ae2dbcce4';
  const charasteristicUUID = 'c1535498-9fd7-11e9-a2a3-2a2ae2dbcce4';

  const handlePeripheralWrite = (value) => {
    writeToPeripheral(peripheralId, value, serviceUUID, charasteristicUUID);
  };
  return (
    <View style={styles.container}>
      <Blocks handlePeripheralWrite={handlePeripheralWrite} />
      <Slider handlePeripheralWrite={handlePeripheralWrite} />
    </View>
  );
};

export default Surrounded;
