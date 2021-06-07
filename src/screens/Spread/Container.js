import React, { useState } from 'react';

import Interface from './Interface';

import { ID } from '../../const/devices';

const Container = (props) => {
  const { navigation } = props;
  const { writeToPeripheral, peripheralId } = props.route.params;

  // Switch
  const [isEnabled, setIsEnabled] = useState(false);

  // Sliders
  const [threshold, setThreshold] = useState(0);
  const [sensitivity, setSensitivity] = useState(0);
  const [decay, setDecay] = useState(0);

  // Handlers
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // Handler to send data to device
  const handlePeripheralWrite = (key, value, hook) => {
    const valueToString = value.toString();

    const stringifiedValue = JSON.stringify({ [key]: valueToString });

    hook(value);
    writeToPeripheral(
      peripheralId,
      stringifiedValue,
      ID.SPREAD.serviceUUID,
      ID.SPREAD.charasteristicUUID,
    );
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
      toggleSwitch={toggleSwitch}
      isEnabled={isEnabled}
      threshold={threshold}
      setThreshold={setThreshold}
      sensitivity={sensitivity}
      setSensitivity={setSensitivity}
      decay={decay}
      setDecay={setDecay}
      handlePeripheralWrite={handlePeripheralWrite}
      handleGoBack={handleGoBack}
      updateFirmware={updateFirmware}
    />
  );
};

export default Container;
