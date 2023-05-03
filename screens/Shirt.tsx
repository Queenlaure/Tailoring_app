import { View, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../utils/colors';

const Shirt = () => {
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
      <Text>Shirt</Text>
    </View>
  );
};

export default Shirt;
