//styles folder for user account screens

// Path: src\screens\account\Styles.jsx

import { StyleSheet } from 'react-native';
import { hp,wp,fp } from '../../utils';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageColor,
  },
  HeaderText: {
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
    marginTop: hp(2.5),
    marginLeft: wp(6.5),
    color: 'black',
    opacity: 0.6,
  },
  SubHeaderText: {
    fontSize: 13,
    fontFamily: 'Gilroy-Bold',
    marginTop: hp(1),
    marginLeft: wp(6.5),
    color: 'black',
    opacity: 0.5,
  },

  input: {
    width: wp(90),
    height: hp(5.5),
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: hp(1.5),
    alignSelf: 'center',
    paddingLeft: wp(5),
    fontSize: fp(1.8),
    fontFamily: 'Gilroy-SemiBold',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    opacity: 0.68,
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 10,
  },
  Button: {
    width: wp(90),
    height: hp(4.6),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#d6d6cd',
    borderBottomWidth: wp(0.26),
    borderStyle: 'solid',
    alignSelf: 'center',
  },
  threeContainer: {
    marginTop: hp(2.3),
    backgroundColor: 'white',
    width: wp(90),
    height: hp(14.5),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    opacity: 0.66,
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRightIcon: {
    marginRight: wp(2.9),
  },
  ButtonText: {
    fontFamily: 'Gilroy-Medium',
    color: 'black',
    fontSize: fp(1.8),
  },
  selectedButton: {
    borderWidth: 1,
    borderBottomColor: colors.settingColors.selectedButton,
    borderRadius: 15,
    backgroundColor: 'white',
    height: hp(4.7),
  },
  twoContainer: {
    backgroundColor: 'white',
    width: wp(90),
    height: hp(9.5),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(2.3),
    shadowColor: 'black',
    opacity: 0.6,
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
});
