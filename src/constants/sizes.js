import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import pixelPerfect from '../utils/pixelPerfect';

export const SIZES = {
  height,
  width,
  base: pixelPerfect(8),
  text: pixelPerfect(14),
  radius: pixelPerfect(8),
  padding: pixelPerfect(20),
  divider: pixelPerfect(10),

  // button sizes
  buttonBorder: pixelPerfect(1),
  buttonRadius: pixelPerfect(10),
  //margin top

  marginTop: pixelPerfect(20),
};
