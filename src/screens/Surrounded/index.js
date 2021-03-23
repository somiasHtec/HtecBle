import React from 'react';
import {View} from 'react-native';

import Blocks from '../../components/Blocks';
import Slider from '../../components/Slider';

import styles from './styles';

const Surrounded = () => {
  return (
    <View style={styles.container}>
      <Blocks />
      <Slider />
    </View>
  );
};

export default Surrounded;
