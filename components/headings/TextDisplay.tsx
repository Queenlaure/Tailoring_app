import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../utils/colors';

interface Props {
  text?: string;
  value?: string;
}

const TextDisplay = ({ text, value }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default TextDisplay;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    borderTopWidth: 5,
    borderTopColor: COLORS.lightBlue,
    backgroundColor: COLORS.lightestGrey,
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: COLORS.dark,
    // paddingBottom: 10,
  },
  value: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: COLORS.darkGrey,
    // paddingBottom: 10,
    // paddingLeft: 20,
  },
});
