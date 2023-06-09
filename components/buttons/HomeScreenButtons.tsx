import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../utils/colors';

interface Props {
  text: string;
}

const HomeScreenButtons = ({ text }: Props) => {
  return (
    <View>

    </View>
  );
};

export default HomeScreenButtons;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    width: 350,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
