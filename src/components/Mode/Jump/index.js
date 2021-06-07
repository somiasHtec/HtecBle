import React from 'react';
import { View, ScrollView } from 'react-native';

import Slider from '~/components/Slider';

import styles from './styles';

const Jump = (props) => {
  const { peak } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Slider
        name="Inertia"
        sliderValue={0}
        onValueChange={(value) => console.log('Slider value ->', value)}
        maxValue={200}
      />
      <Slider
        name="Decay"
        sliderValue={0}
        onValueChange={(value) => console.log('Slider value ->', value)}
        maxValue={200}
      />
      <Slider
        name="Range"
        sliderValue={0}
        onValueChange={(value) => console.log('Slider value ->', value)}
        maxValue={100}
      />
      {peak && (
        <View>
          <Slider
            name="PeakHold"
            sliderValue={0}
            onValueChange={(value) => console.log('Slider value ->', value)}
            maxValue={255}
          />
          <Slider
            name="PeakDecay"
            sliderValue={0}
            onValueChange={(value) => console.log('Slider value ->', value)}
            maxValue={30}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Jump;
