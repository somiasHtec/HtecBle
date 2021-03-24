import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import BlockItem from '../BlockItem';
import BlockItemLabel from '../BlockItemLabel';

import { bankData } from '../../data/bank';

import styles from './styles';

const Blocks = () => {
  const [orderPosition, setOrderPosition] = useState(1);
  const [banksPosition, setBanksPosition] = useState(0);
  const [currentBank, setCurrentBank] = useState(bankData[0]);

  useEffect(() => {
    setCurrentBank([...bankData[banksPosition]]);
  }, [banksPosition]);

  const handleBankChange = () => {
    banksPosition === 4
      ? setBanksPosition(0)
      : setBanksPosition((prevValue) => prevValue + 1);
  };

  const handleIconPosition = () => {
    orderPosition === 5
      ? setOrderPosition(1)
      : setOrderPosition((prevValue) => prevValue + 1);

    const cutArr = bankData[banksPosition].slice(orderPosition);
    const leftoverArr = bankData[banksPosition].slice(0, orderPosition);

    const newArray = [...cutArr, ...leftoverArr];

    setCurrentBank(newArray);
  };

  return (
    <View>
      <View style={styles.itemsWrapper}>
        <BlockItemLabel
          onPress={handleIconPosition}
          label={`Set ${orderPosition}`}
        />
        <BlockItem position="F1" icon={currentBank[0]} color="red" />
        <BlockItemLabel
          onPress={handleBankChange}
          label={`Bank ${banksPosition + 1}`}
        />
      </View>
      <View style={[styles.itemsWrapper, styles.itemsSpacing]}>
        <BlockItem position="L1" icon={currentBank[1]} color="blue" />
        <BlockItem position="C1" icon={currentBank[2]} color="grey" />
        <BlockItem position="R1" icon={currentBank[3]} color="yellow" />
      </View>
      <View style={styles.itemsWrapper}>
        <BlockItemLabel label="OK" color="green" />
        <BlockItem position="r1" icon={currentBank[4]} color="green" />
        <BlockItemLabel label="NOT OK" color="redNotOk" />
      </View>
    </View>
  );
};

export default Blocks;
