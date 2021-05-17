import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import { IMAGES } from '~/assets';

const Header = (props) => {
  const { title, onPress, writeToPeripheral } = props;

  const handleOnLongPress = () => {
    //   writeToPeripheral()
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress} onLongPress={handleOnLongPress}>
        <Image source={IMAGES.logoSquare} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
