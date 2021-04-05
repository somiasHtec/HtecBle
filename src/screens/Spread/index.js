import React, { useState } from 'react';
import { View, ImageBackground, Switch } from 'react-native';

import Slider from '../../components/Slider';

import { IMAGES, COLORS } from '../../assets';
import styles from './styles';

const Spread = () => {
  // Switch
  const [isEnabled, setIsEnabled] = useState(false);

  // Sliders
  const [threshold, setThreshold] = useState(0);
  const [sensitivity, setSensitivity] = useState(0);
  const [decay, setDecay] = useState(0);

  // Handlers
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <ImageBackground source={IMAGES.spread} style={styles.backgroundImage}>
        <Switch
          trackColor={{ false: COLORS.lightGrey, true: COLORS.lightGreen }}
          thumbColor={isEnabled ? COLORS.darkGreen : COLORS.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

        <Slider
          name="Threshold"
          sliderValue={threshold}
          setSliderValue={setThreshold}
          maxValue={40}
        />
        <Slider
          name="Sensitivity"
          sliderValue={sensitivity}
          setSliderValue={setSensitivity}
          maxValue={60}
        />
        <Slider
          name="Decay"
          sliderValue={decay}
          setSliderValue={setDecay}
          maxValue={100}
        />
      </ImageBackground>
    </View>
  );
};

export default Spread;
