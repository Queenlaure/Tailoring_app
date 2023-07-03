import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS } from '../../utils/colors';

const Loader = ({ color = COLORS.light }) => {
  return (
    <View>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loader;
