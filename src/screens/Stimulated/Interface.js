import React from 'react';
import { View, ImageBackground } from 'react-native';

import Header from '~/components/Header';
import Slider from '~/components/Slider';
import Switch from '~/components/Switch';

import { IMAGES } from '~/assets';
import styles from './styles';

const Interface = (props) => {
  const {
    handleGoBack,
    toggleVibSwitch,
    vibStatus,
    toggleLedSwitch,
    ledStatus,
    sliders,
    handleSliders,
    updateFirmware,
  } = props;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.stimulated}
        style={styles.backgroundImage}
      >
        <Header
          title="Stimulated"
          onPress={handleGoBack}
          onLongPress={updateFirmware}
          border="yellow"
        />

        <View style={styles.switchWrapper}>
          <Switch
            label="Vib"
            toggleSwitch={toggleVibSwitch}
            value={vibStatus}
          />
          <Switch
            label="Led"
            toggleSwitch={toggleLedSwitch}
            value={ledStatus}
          />
        </View>

        <Slider
          name="VibHI"
          sliderValue={sliders.vibhi}
          onValueChange={(value) => handleSliders(value, 'vibhi')}
          maxValue={255}
        />
        <Slider
          name="VibLo"
          sliderValue={sliders.viblo}
          onValueChange={(value) => handleSliders(value, 'viblo')}
          maxValue={150}
        />
        <Slider
          name="LedHi"
          sliderValue={sliders.ledhi}
          onValueChange={(value) => handleSliders(value, 'ledhi')}
          maxValue={255}
        />
        <Slider
          name="LedLo"
          sliderValue={sliders.ledlo}
          onValueChange={(value) => handleSliders(value, 'ledlo')}
          maxValue={255}
        />
      </ImageBackground>
    </View>
  );
};

export default Interface;
