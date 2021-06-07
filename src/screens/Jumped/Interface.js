import React from 'react';
import { View, ImageBackground } from 'react-native';

import Header from '~/components/Header';
import ModeItem from '~/components/Mode/ModeItem';
import Sound from '~/components/Mode/Sound';
import Jump from '~/components/Mode/Jump';
import Snoezelen from '~/components/Mode/Snoezelen';

import { IMAGES } from '~/assets';
import styles from './styles';

const Interface = (props) => {
  const { mode, handleMode, peak, handlePeak, display, handleDisplay } = props;

  const peakCheck = !peak ? 'off' : 'on';

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.stimulated}
        style={styles.backgroundImage}
      >
        <Header
          title="Jumped"
          //   onPress={handleGoBack}
          //   onLongPress={updateFirmware}
          border="red"
        />

        <View style={styles.modeItemWrapper}>
          <ModeItem
            label="Mode"
            value={mode}
            onPress={handleMode}
            color="yellow"
          />
          <ModeItem
            label="Peak"
            value={peakCheck}
            onPress={handlePeak}
            color="red"
          />
          <ModeItem
            label="Display"
            value={display}
            onPress={handleDisplay}
            color="blue"
          />
        </View>

        {(() => {
          switch (mode) {
            case 'sound':
              return <Sound peak={peak} />;
            case 'jump':
              return <Jump peak={peak} />;
            case 'snoezelen':
              return <Snoezelen />;
            default:
              return null;
          }
        })()}
      </ImageBackground>
    </View>
  );
};

export default Interface;
