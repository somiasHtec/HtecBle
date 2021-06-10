import React from 'react';
import { View } from 'react-native';

import Slider from '~/components/Slider';

import styles from './styles';

const Snoezelen = () => {
  return (
    <View style={styles.container}>
      <Slider
        name="Pattern"
        sliderValue={100}
        onValueChange={(value) => console.log('Slider value ->', value)}
        maxValue={255}
      />
      <Slider
        name="Speed"
        sliderValue={100}
        onValueChange={(value) => console.log('Slider value ->', value)}
        maxValue={255}
      />
      <Slider
        name="Colors"
        sliderValue={100}
        onValueChange={(value) => console.log('Slider value ->', value)}
        maxValue={255}
      />
    </View>
  );
};

export default Snoezelen;
