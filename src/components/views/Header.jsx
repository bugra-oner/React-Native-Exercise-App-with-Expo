import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Platform } from 'react-native';
import React from 'react';

import CustomIcon from '../CustomIcon';
import { hp, wp, fp } from '../../utils';

export default function Header({
  LeftIconOnPress,
  title,
  RightIconOnPress,
  LeftIcon = 'bell-outline',
  RightIcon = 'account-circle',
  LeftIconSize = 26,
  RightIconSize = 26,
  RightIconColor = '#fff',
}) {
  return (
    <View style={styles.outBackground}>
      <StatusBar backgroundColor="#1A1624" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={LeftIconOnPress}>
          <CustomIcon name={LeftIcon} size={LeftIconSize} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>

        <TouchableOpacity onPress={RightIconOnPress}>
          <CustomIcon name={RightIcon} size={RightIconSize} color={RightIconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1A1624',
    height: Platform.OS == 'ios' ? hp(11) : hp(7.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS == 'ios' ? hp(4) : hp(0),
  },
  headerText: {
    color: '#ffff',
    fontSize: fp(3.7),
    fontFamily: 'Gilroy-Bold',
  },
});