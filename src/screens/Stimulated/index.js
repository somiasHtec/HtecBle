import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';

import { useDebouncedCallback } from 'use-debounce';

import Slider from '~/components/Slider';
import Switch from '~/components/Switch';

import { ID } from '~/const/devices';

import { IMAGES } from '~/assets';
import styles from './styles';

const Stimulated = (props) => {
  const { writeToPeripheral, peripheralId } = props.route.params;

  // Switch
  const [vibStatus, setVibStatus] = useState(false);
  const [ledStatus, setLedStatus] = useState(false);

  const [sliders, setSliders] = useState({
    vibhi: 0,
    viblo: 0,
    ledhi: 0,
    ledlo: 0,
    vib: 0,
    led: 0,
  });

  // Debounce
  const debounced = useDebouncedCallback(
    (value) => {
      const stringifiedObj = JSON.stringify(value);

      writeToPeripheral(
        peripheralId,
        stringifiedObj,
        ID.STIMULATED.serviceUUID,
        ID.STIMULATED.charasteristicUUID,
      );
    },

    100,
  );

  // Handlers
  const toggleVibSwitch = () => {
    setVibStatus((previousState) => !previousState);

    const vibVal = !vibStatus ? 1 : 0;

    handleSliders(vibVal, 'vib');
  };
  const toggleLedSwitch = () => {
    setLedStatus((previousState) => !previousState);

    const ledVal = !ledStatus ? 1 : 0;

    handleSliders(ledVal, 'led');
  };

  // Handler to send data to device
  const handleSliders = (value, key) => {
    let spreadObject = {};

    if (key === 'vib' || 'led') {
      spreadObject = { ...sliders, [key]: !value ? 1 : 0 };
    }

    spreadObject = { ...sliders, [key]: value };

    setSliders(spreadObject);
    debounced(spreadObject);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.stimulated}
        style={styles.backgroundImage}
      >
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

export default Stimulated;
