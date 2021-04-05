import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { default as CommunitySlider } from '@react-native-community/slider';

import { COLORS } from '../../assets';
import styles from './styles';

const Slider = ({ handlePeripheralWrite }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderValue = (value) => {
    setSliderValue(value);
    handlePeripheralWrite(`V${value}`);
  };

  return (
    <View style={styles.sliderWrapper}>
      <View style={styles.volumeWrapper}>
        <Text style={styles.lightText}>Volume</Text>
        <Text> {sliderValue} </Text>
      </View>

      <CommunitySlider
        style={styles.sliderStyle}
        minimumValue={0}
        maximumValue={30}
        onValueChange={handleSliderValue}
        maximumTrackTintColor={COLORS.slider.maxTrack}
        step={1}
      />

      <View style={styles.timeContainer}>
        <View style={styles.timeWrapper}>
          <Text style={styles.lightText}>Last</Text>
          <Text>0 s</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.lightText}>Avg</Text>
          <Text>0 s</Text>
        </View>
      </View>
    </View>
  );
};

export default Slider;
