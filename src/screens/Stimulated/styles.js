import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

import { COLORS } from '~/assets';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchWrapper: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
