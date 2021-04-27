import { Dimensions, StyleSheet } from 'react-native';

import { COLORS } from '~/assets';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchWrapper: {
    width: width * 0.5,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchSecondText: {
    fontWeight: 'bold',
    color: COLORS.grey,
    fontSize: 16,
  },
});
