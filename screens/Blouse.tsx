import { View, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../utils/colors';

const Blouse = () => {
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
      <Text>Blouse</Text>
    </View>
  );
};

export default Blouse;
