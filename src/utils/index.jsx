import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;
export const fp = RFPercentage;

/* way of using */
// example:
// import { fp, hp, wp } from './src/utils'
// fontSize: fp(2.5),color: 'red', width: wp(100), height: hp(100),
// marginRight : wp(2.5)
