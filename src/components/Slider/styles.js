import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../assets';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  sliderWrapper: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  sliderStyle: {
    width: width * 0.85,
    // height: 40,
    // marginVertical: 15,
  },
  valueWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.55,
  },
  boldText: {
    color: COLORS.grey,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
