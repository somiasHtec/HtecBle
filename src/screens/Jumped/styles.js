import { StyleSheet } from 'react-native';

import { COLORS } from '~/assets';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    paddingTop: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightWhite,
  },
  modeItemWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
