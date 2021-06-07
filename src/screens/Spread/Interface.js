import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import Header from '~/components/Header';
import Slider from '../../components/Slider';
import Switch from '../../components/Switch';

import { IMAGES, COLORS } from '../../assets';
import styles from './styles';

const Interface = (props) => {
  const {
    toggleSwitch,
    isEnabled,
    threshold,
    setThreshold,
    sensitivity,
    setSensitivity,
    decay,
    setDecay,
    handlePeripheralWrite,
    handleGoBack,
    updateFirmware,
  } = props;

  return (
    <View style={styles.container}>
      <ImageBackground source={IMAGES.spread} style={styles.backgroundImage}>
        <Header
          title="Stimulated"
          onPress={handleGoBack}
          onLongPress={updateFirmware}
          border="blue"
        />

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

export default Interface;
