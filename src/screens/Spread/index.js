import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import Slider from '../../components/Slider';
import Switch from '../../components/Switch';

import { IMAGES } from '../../assets';
import styles from './styles';

const Spread = (props) => {
  const { writeToPeripheral, peripheralId } = props.route.params;

  // Switch
  const [isEnabled, setIsEnabled] = useState(false);

  // Sliders
  const [threshold, setThreshold] = useState(0);
  const [sensitivity, setSensitivity] = useState(0);
  const [decay, setDecay] = useState(0);

  // Handlers
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // Spread ID's
  const serviceUUID = 'c1534d9a-9fd7-11e9-a2a3-2a2ae2dbcce4';
  const charasteristicUUID = 'c1535088-9fd7-11e9-a2a3-2a2ae2dbcce4';

  // Handler to send data to device
  const handlePeripheralWrite = (key, value, hook) => {
    const valueToString = value.toString();

    const stringifiedValue = JSON.stringify({ [key]: valueToString });

    console.log('Stringified Value --->>>', stringifiedValue);
    hook(value);
    writeToPeripheral(
      peripheralId,
      stringifiedValue,
      serviceUUID,
      charasteristicUUID,
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={IMAGES.spread} style={styles.backgroundImage}>
        <View style={styles.switchWrapper}>
          <Switch
            label="Style"
            toggleSwitch={toggleSwitch}
            value={isEnabled}
            labelBold={false}
          />
          <Text style={styles.switchSecondText}>
            {isEnabled ? 'Digital' : 'Analog'}
          </Text>
        </View>

        <Slider
          name="Threshold"
          sliderValue={threshold}
          onValueChange={(value) =>
            handlePeripheralWrite('threshold', value, setThreshold)
          }
          maxValue={40}
        />
        <Slider
          name="Sensitivity"
          sliderValue={sensitivity}
          onValueChange={(value) =>
            handlePeripheralWrite('sensitivity', value, setSensitivity)
          }
          maxValue={60}
        />
        <Slider
          name="Decay"
          sliderValue={decay}
          onValueChange={(value) =>
            handlePeripheralWrite('decay', value, setDecay)
          }
          maxValue={100}
        />
      </ImageBackground>
    </View>
  );
};

export default Spread;
