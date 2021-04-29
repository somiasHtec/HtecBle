import React from 'react';
import { View, Text } from 'react-native';

import { default as CommunitySlider } from '@react-native-community/slider';

import { COLORS } from '../../assets';
import styles from './styles';

const Slider = (props) => {
  const { name, sliderValue, onValueChange, maxValue } = props;

  return (
    <View style={styles.sliderWrapper}>
      <View style={styles.valueWrapper}>
        <Text style={styles.boldText}>{name}</Text>
        <Text style={styles.boldText}> {sliderValue} </Text>
      </View>

      <CommunitySlider
        style={styles.sliderStyle}
        minimumValue={0}
        maximumValue={maxValue}
        onValueChange={onValueChange}
        maximumTrackTintColor={COLORS.slider.maxTrack}
        step={1}
        value={sliderValue}
      />
    </View>
  );
};

export default Slider;
