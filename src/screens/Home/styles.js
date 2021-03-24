import { StyleSheet, Dimensions } from 'react-native';

import { COLORS } from '../../assets';

const { width, height } = Dimensions.get('window');

const borderStyle = {
  borderLeftWidth: 5,
  marginVertical: 20,
  paddingHorizontal: 5,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wallpaperWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wallpaper: {
    height: 50,
    resizeMode: 'contain',
  },
  devicesContainer: {
    height: height * 0.7,
    width: width,
    paddingHorizontal: 5,
    justifyContent: 'flex-end',
    marginHorizontal: 5,
  },
  devicesWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deviceImage: {
    height: 160,
    width: width * 0.45,
  },
  borderBlue: {
    ...borderStyle,
    borderLeftColor: COLORS.blue,
  },
  borderYellow: {
    ...borderStyle,
    borderLeftColor: COLORS.yellow,
  },
  borderGreen: {
    ...borderStyle,
    borderLeftColor: COLORS.green,
  },
  borderRed: {
    ...borderStyle,
    borderLeftColor: COLORS.red,
  },
});
