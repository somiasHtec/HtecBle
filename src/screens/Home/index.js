import React from 'react';
import { View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import { IMAGES } from '../../assets';
import styles from './styles';

const Home = (props) => {
  const {
    navigation: { navigate },
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wallpaperWrapper}>
        <Image source={IMAGES.voicetoys} style={styles.wallpaper} />
      </View>
      <View style={styles.devicesContainer}>
        <View style={styles.devicesWrapper}>
          <TouchableOpacity
            onPress={() => navigate('Spread')}
            style={styles.borderBlue}>
            <Image source={IMAGES.spread} style={styles.deviceImage} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Stimulated')}
            style={styles.borderYellow}>
            <Image source={IMAGES.stimulated} style={styles.deviceImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.devicesWrapper}>
          <TouchableOpacity
            onPress={() => navigate('Surrounded')}
            style={styles.borderGreen}>
            <Image source={IMAGES.surrounded} style={styles.deviceImage} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Jumped')}
            style={styles.borderRed}>
            <Image
              source={IMAGES.jumped}
              style={styles.deviceImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
