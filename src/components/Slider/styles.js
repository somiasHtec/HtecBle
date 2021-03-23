import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

export default StyleSheet.create({
  sliderWrapper: {
    flex: 2,
    justifyContent: 'center',
  },
  sliderStyle: {
    width: width * 0.85,
    height: 40,
    marginVertical: 15,
  },
  volumeWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: width * 0.55,
  },
  lightText: {
    color: '#747474',
  },
  timeContainer: {
    width: width * 0.85,
    flexDirection: 'row',
  },
  timeWrapper: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
