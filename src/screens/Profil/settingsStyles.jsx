// style folder

import { StyleSheet } from 'react-native';


import { hp, fp, wp } from '../../utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  HeaderText: {
    fontSize: 18,
    
    marginTop: hp(2.5),
    marginLeft: wp(6.5),
    color: 'black',
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
  ButtonText: {
    
    color: 'black',
    fontSize: fp(1.8),
  },
  LastButton: {
    width: wp(90),
    height: hp(4.6),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelStyle: {
    
    color: 'black',
    fontSize: fp(1.5),
    alignSelf: 'center',
    opacity: 0.5,
  },
  AccountContainer: {
    backgroundColor: 'white',
    width: wp(90),
    height: hp(10),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(2.3),
    shadowColor: 'black',
    opacity: 0.64,
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  iconStyle: {
    marginRight: wp(1.6),
  },
  threeText: {
    flexDirection: 'row',
    width: wp(18),
    justifyContent: 'space-between',
  },
  freezeAccountView: {
    width: wp(90),
    height: hp(4.8),
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: hp(5),
    shadowColor: 'black',
    opacity: 0.67,
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
});
