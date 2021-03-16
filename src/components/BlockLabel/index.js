import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

const BlockLabel = (props) => {
  const {label} = props;

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BlockLabel;
