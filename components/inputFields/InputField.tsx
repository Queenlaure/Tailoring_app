import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { COLORS } from '../../utils/colors';

interface Props {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: () => void;
  value?: any
}

const InputField = ({ label, placeholder,secureTextEntry,onChangeText,value }: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
         placeholder={placeholder} 
         style={styles.placeholder}  
         secureTextEntry={secureTextEntry}
         value={value}
         onChangeText={onChangeText}
         />
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: ' transparent',
    width: 350,
    height: 45,
    borderRadius: 10,
    borderColor: COLORS.darkGrey,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginBottom: 15
  },

  label: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10
  },
  placeholder: {
    color: COLORS.dark,
    marginLeft: 10,
    marginTop: 7
  },
});
