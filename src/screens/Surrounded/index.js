import React from 'react';
import { View } from 'react-native';

import Blocks from '../../components/Blocks';
import Slider from '../../components/SurroundedSlider';

import styles from './styles';

const Surrounded = (props) => {
  console.log('PROPS -->>', props);
  return (
    <View style={styles.container}>
      <Blocks
        writeToPeripheral={props.route.params.writeToPeripheral}
        peripheralId={props.route.params.peripheralId}
      />
      <Slider />
    </View>
  );
};

export default Surrounded;
