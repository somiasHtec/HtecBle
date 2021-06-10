import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import { IMAGES, COLORS } from '~/assets';

const Header = (props) => {
  const { title, onPress, onLongPress, border } = props;

  const borderColor = { borderColor: COLORS[border] };
  const bgColor = { backgroundColor: COLORS.headerBg[border] };

  const handleOnLongPress = () => {
    //   writeToPeripheral()
  };

  return (
    <View style={[styles.container, borderColor, bgColor]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.buttonWrapper}
      >
        <Image source={IMAGES.logoSquare} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
