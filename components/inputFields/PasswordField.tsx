import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';

interface Props {
  label?: string;
  placeholder?: string;
  password?: boolean;
}

const PasswordField = ({ label, placeholder, password = false }: Props) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder={placeholder} style={styles.placeholder} />
        <View >
        {password && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye-outline'}
              size={20}
              style={styles.eye}
            />
          </TouchableOpacity>
        )}
          
        </View>
      </View>
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: ' transparent',
    width: 350,
    height: 45,
    borderRadius: 10,
    borderColor: COLORS.dark,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },

  label: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  placeholder: {
    color: COLORS.dark,
    marginLeft: 10,
    marginTop: 7,
    width: 280,
  },
  container: {
    marginTop: 20,
  },
  eye: {
    marginRight: 18,
    marginTop: 10
  },
});
