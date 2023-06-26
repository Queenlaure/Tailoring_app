import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../utils/colors';

interface Props {
  title?: string;
  userOption?: any;
}

const MainHeading = ({ title, userOption }: Props) => {
  return (
    <View>
      <Text style={styles.heading}>
        {title} ({userOption})
      </Text>
    </View>
  );
};

export default MainHeading;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingBottom: 15,
  },
});
