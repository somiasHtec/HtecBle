import { StyleSheet } from 'react-native';

import { COLORS } from '../../assets';

export default StyleSheet.create({
  container: {
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.labelBg,
  },
  label: {
    color: COLORS.white,
    fontSize: 20,
  },
});
