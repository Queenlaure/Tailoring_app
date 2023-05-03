import { View, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../utils/colors';

const Jumpsuit = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightestGrey,
        paddingHorizontal: 30,
        paddingTop: 55,
        alignItems: 'center',
      }}
    >
      <Text>Jumpsuit</Text>
    </View>
  );
};

export default Jumpsuit;
