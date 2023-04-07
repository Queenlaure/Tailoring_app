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

const OutlineButton = ({ text }: Props) => {
  return (
    <View style={styles.btn}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
    btn: {
       backgroundColor:'transparent',
       alignItems: 'center',
       width: 350,
       height: 45,
       borderRadius: 10,
       justifyContent: 'center',
       borderColor: COLORS.blue,
       borderBottomWidth:1,
       borderTopWidth:1,
       borderLeftWidth:1,
       borderRightWidth:1

       
      },
    text: {
        color:COLORS.blue,
        fontWeight: 'bold',
        fontSize: 15
      },
});
