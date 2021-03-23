import React, {useState} from 'react';
import {View} from 'react-native';

import BlockItem from '../BlockItem';
import BlockItemLabel from '../BlockItemLabel';

import styles from './styles';

import {bank} from '../../data/bank';

const Blocks = () => {
  const [banksPosition, setBanksPosition] = useState(0);

  const handleBankChange = () => {
    banksPosition === 4
      ? setBanksPosition(0)
      : setBanksPosition((prevValue) => prevValue + 1);
  };

  return (
    <View>
      {bank[banksPosition].map((icon) => {
        console.log('ICON -->', icon);
        return (
          <View>
            <View style={styles.itemsWrapper}>
              <BlockItemLabel label="Set 1" />
              <BlockItem position="L1" icon={icon.first} color="red" />
              <BlockItemLabel
                onPress={handleBankChange}
                label={`Bank ${banksPosition + 1}`}
              />
            </View>
            <View style={[styles.itemsWrapper, styles.itemsSpacing]}>
              <BlockItem position="R1" icon={icon.second} color="blue" />
              <BlockItem position="C1" icon={icon.third} color="grey" />
              <BlockItem position="F1" icon={icon.fourth} color="yellow" />
            </View>
            <View style={styles.itemsWrapper}>
              <BlockItemLabel label="OK" color="green" />
              <BlockItem position="r1" icon={icon.fifth} color="green" />
              <BlockItemLabel label="NOT OK" color="redNotOk" />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Blocks;
