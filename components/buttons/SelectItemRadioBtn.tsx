import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { COLORS } from '../../utils/colors';

interface Props {
  data?: any;
  onSelect?: boolean;
  navigation?: boolean;
  userOption: any;
  setUserOption?: any;
}

const SelectItemRadioBtn = ({
  data,
  onSelect,
  userOption,
  setUserOption,
}: Props) => {
  return (
    <View style={{ marginTop: 10 }}>
      {data.map((item: any, index: number) => {
        return (
          <Pressable
            key={index}
            style={
              item.value === userOption ? styles.selected : styles.unselected
            }
            onPress={() => setUserOption(item.value)}
          >
            <Text style={styles.option}> {item.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    fontSize: 16,
  },
  unselected: {
    backgroundColor: COLORS.white,
    margin: 10,
    width: 340,
    height: 48,
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: COLORS.blue,
    color: COLORS.white,
    margin: 6,
    padding: 15,
    borderRadius: 10,
  },
});

export default SelectItemRadioBtn;
