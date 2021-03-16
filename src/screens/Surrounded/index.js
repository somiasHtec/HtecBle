import React from 'react';
import {View} from 'react-native';

import Block from '../../components/Block';
import BlockLabel from '../../components/BlockLabel';

import styles from './styles';

const Surrounded = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemsWrapper}>
        <BlockLabel label="Set 1" />
        <Block color="red" icon="dog" />
        <BlockLabel label="Bank 1" />
      </View>
      <View style={[styles.itemsWrapper, styles.itemsSpacing]}>
        <Block color="blue" icon="horse" />
        <Block color="grey" icon="chicken" />
        <Block color="yellow" icon="cat" />
      </View>
      <View style={styles.itemsWrapper}>
        <BlockLabel label="OK" />
        <Block color="green" icon="parrot" />
        <BlockLabel label="NOT OK" />
      </View>
    </View>
  );
};

export default Surrounded;
