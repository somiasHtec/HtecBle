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
    vibHi: '0',
    vibLo: '0',
    ledHi: '0',
    ledLo: '0',
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

    700,
  );

  // Handlers
  const toggleVibSwitch = () => {
    setVibStatus((previousState) => !previousState);

    const vibVal = !vibStatus ? 1 : 0;
    const stringifiedVib = JSON.stringify(vibVal);

    writeToPeripheral(
      peripheralId,
      stringifiedVib,
      ID.STIMULATED.serviceUUID,
      ID.STIMULATED.charasteristicUUID,
    );
  };
  const toggleLedSwitch = () => {
    setLedStatus((previousState) => !previousState);

    const ledVal = !ledStatus ? 1 : 0;
    const stringifiedLed = JSON.stringify(ledVal);

    writeToPeripheral(
      peripheralId,
      stringifiedLed,
      ID.STIMULATED.serviceUUID,
      ID.STIMULATED.charasteristicUUID,
    );
  };

  // Handler to send data to device
  const handleSliders = (value, key) => {
    const valueToString = value.toString();

    const spreadObject = { ...sliders, [key]: valueToString };

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
          sliderValue={sliders.vibHi}
          onValueChange={(value) => handleSliders(value, 'vibHi')}
          maxValue={255}
        />
        <Slider
          name="VibLo"
          sliderValue={sliders.vibLo}
          onValueChange={(value) => handleSliders(value, 'vibLo')}
          maxValue={150}
        />
        <Slider
          name="LedHi"
          sliderValue={sliders.ledHi}
          onValueChange={(value) => handleSliders(value, 'ledHi')}
          maxValue={255}
        />
        <Slider
          name="LedLo"
          sliderValue={sliders.ledLo}
          onValueChange={(value) => handleSliders(value, 'ledLo')}
          maxValue={255}
        />
      </ImageBackground>
    </View>
  );
};

export default Stimulated;
