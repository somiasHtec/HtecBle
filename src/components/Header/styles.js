import { StyleSheet } from 'react-native';

import { COLORS } from '~/assets';

export default StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    marginBottom: 30,
  },
  title: {
    color: COLORS.grey,
    fontSize: 35,
    fontWeight: '600',
  },
  image: {
    width: 80,
    height: 80,
  },
});
