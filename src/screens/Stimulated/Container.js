import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';

import BleManager from 'react-native-ble-manager';

import { useDebouncedCallback } from 'use-debounce';

import Header from '~/components/Header';
import Slider from '~/components/Slider';
import Switch from '~/components/Switch';

import { IMAGES } from '~/assets';
import styles from './styles';

import { ID } from '~/const/devices';

const Buffer = require('buffer/').Buffer;

const Container = (props) => {
  const { navigation } = props;
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

  useEffect(() => {
    const readPeripheral = async () => {
      await BleManager.retrieveServices(peripheralId).then((peripheralInfo) => {
        // Success code
        console.log(
          'Peripheral info from Stimulated before read:',
          peripheralInfo,
        );
      });

      await BleManager.read(
        peripheralId,
        ID.STIMULATED.serviceUUID,
        ID.STIMULATED.readUUID,
      )
        .then((readData) => {
          const buffer = Buffer.from(readData).toString();
          const parsedData = JSON.parse(buffer);

          setSliders(parsedData);
        })
        .catch((error) => {
          console.log(error, '!!!!!!!');
        });
    };

    readPeripheral();

    return () => {
      console.log('**** Stimulated is Unmounted ****');

      BleManager.disconnect(peripheralId)
        .then(() => {
          // Success code
          console.log('Disconnected Stimulated -->>', peripheralId);

          //   BleManager.retrieveServices(peripheralId).then((peripheralInfo) => {
          //     console.log(
          //       'Peripheral info from retrieve services -->>',
          //       peripheralInfo,
          //     );
          //   });
        })
        .catch((error) => {
          // Failure code
          console.log('Disconnect Stimulated error -->> ', error);
        });
    };
  }, [peripheralId]);

  // Debounce
  const debounced = useDebouncedCallback(
    (value) => {
      const stringifiedObj = JSON.stringify(value);

      BleManager.retrieveServices(peripheralId).then((peripheralInfo) => {
        // Success code
        console.log(
          'Peripheral info before WRITE TO PERIPHERAL:',
          peripheralInfo,
        );
      });

      writeToPeripheral(
        peripheralId,
        stringifiedObj,
        ID.STIMULATED.serviceUUID,
        ID.STIMULATED.readUUID,
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

  const handleGoBack = () => navigation.goBack();

  const updateFirmware = () => {
    writeToPeripheral(
      peripheralId,
      'UPD',
      ID.STIMULATED.serviceUUID,
      ID.STIMULATED.charasteristicUUID,
    );
  };

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

export default Container;
