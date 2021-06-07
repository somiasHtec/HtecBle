import { StyleSheet } from 'react-native';

import { COLORS } from '~/assets';

export default StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  labelWrapper: {
    width: 80,
    height: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 10,
  },
  label: {
    color: COLORS.grey,
    fontWeight: 'bold',
    fontSize: 12,
  },
  valueWrapper: {
    borderRadius: 5,
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  value: {
    color: COLORS.grey,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
