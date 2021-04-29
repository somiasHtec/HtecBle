import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';

import BleManager from 'react-native-ble-manager';

import { useDebouncedCallback } from 'use-debounce';

import Slider from '~/components/Slider';
import Switch from '~/components/Switch';

import { ID } from '~/const/devices';

import { IMAGES } from '~/assets';
import styles from './styles';

const Buffer = require('buffer/').Buffer;

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

  console.log('sliders BEFORE -->>', sliders);

  useEffect(() => {
    const readPeripheral = () => {
      console.log('I have been called');

      BleManager.read(
        peripheralId,
        ID.STIMULATED.serviceUUID,
        ID.STIMULATED.readUUID,
      )
        .then((readData) => {
          // Success code

          const buffer = Buffer.from(readData).toString();
          const parsedData = JSON.parse(buffer);

          setSliders(parsedData);

          console.log('sliders after -->>', sliders);

          console.log('Buffer -->>', buffer);
          console.log('parsedData -->>', parsedData);
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
    };

    readPeripheral();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peripheralId]);

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
