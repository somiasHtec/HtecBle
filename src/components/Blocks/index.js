import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import BlockItem from '../BlockItem';
import BlockItemLabel from '../BlockItemLabel';

import { bankData } from '../../data/bank';

import styles from './styles';

const Blocks = ({ writeToPeripheral, peripheralId }) => {
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
        <BlockItem
          writeToPeripheral={writeToPeripheral}
          peripheralId={peripheralId}
          position={`F${currentBank[0].position}`}
          icon={currentBank[0].icon}
          color="red"
        />
        <BlockItemLabel
          onPress={handleBankChange}
          label={`Bank ${banksPosition + 1}`}
        />
      </View>
      <View style={[styles.itemsWrapper, styles.itemsSpacing]}>
        <BlockItem
          writeToPeripheral={writeToPeripheral}
          peripheralId={peripheralId}
          position={`L${currentBank[1].position}`}
          icon={currentBank[1].icon}
          color="blue"
        />
        <BlockItem
          writeToPeripheral={writeToPeripheral}
          peripheralId={peripheralId}
          position={`C${currentBank[2].position}`}
          icon={currentBank[2].icon}
          color="grey"
        />
        <BlockItem
          writeToPeripheral={writeToPeripheral}
          peripheralId={peripheralId}
          position={`R${currentBank[3].position}`}
          icon={currentBank[3].icon}
          color="yellow"
        />
      </View>
      <View style={styles.itemsWrapper}>
        <BlockItemLabel label="OK" color="green" />
        <BlockItem
          writeToPeripheral={writeToPeripheral}
          peripheralId={peripheralId}
          position={`r${currentBank[4].position}`}
          icon={currentBank[4].icon}
          color="green"
        />
        <BlockItemLabel label="NOT OK" color="redNotOk" />
      </View>
    </View>
  );
};

export default Blocks;
