import React, { useState, useEffect } from 'react';

import BleManager from 'react-native-ble-manager';

import { useDebouncedCallback } from 'use-debounce';

import Interface from './Interface';

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

          BleManager.retrieveServices(peripheralId).then((peripheralInfo) => {
            console.log(
              'Peripheral info from retrieve services -->>',
              peripheralInfo,
            );
          });
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
    <Interface
      handleGoBack={handleGoBack}
      toggleVibSwitch={toggleVibSwitch}
      vibStatus={vibStatus}
      toggleLedSwitch={toggleLedSwitch}
      ledStatus={ledStatus}
      sliders={sliders}
      handleSliders={handleSliders}
      updateFirmware={updateFirmware}
    />
  );
};

export default Container;
