import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import InputField from '../components/inputFields/InputField';
import PasswordField from '../components/inputFields/PasswordField';
import BlueButton from '../components/buttons/BlueButton';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import CreateAccountRadiobtn from '../components/buttons/CreateAccountRadiobtn';

const Login = ({ navigation }: any) => {
  const data = [
    { value: 'Apple', key: 1 },
    { value: 'Samsung', key: 2 },
    { value: 'Blackberry', key: 3 },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}
    >
      <View style={styles.hero}>
        <Text style={styles.heading}>Log In to your Account</Text>
        <Text style={styles.subHeading}>Fill in the Information.</Text>
      </View>
      <View style={styles.input}>
        <InputField label="Email:" placeholder="example@gmail.com" />
        <PasswordField label="Password:" placeholder="xxxxxxxxxx" password />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('HomeStack')}
        style={styles.create}
      >
        <BlueButton text="Login" />
      </TouchableOpacity>
      {/* <View style={styles.orSection}>
        <View style={styles.line}></View>
        <Text>or</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.btn}>
        <Ionicons
          name={'logo-google'}
          size={20}
          //   style={styles.eye}
        />
        <Text style={styles.text}>Sign In with Google</Text>
      </View> */}

    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  hero: {
    marginTop: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  subHeading: {
    color: COLORS.grey,
  },
  input: {
    marginTop: 30,
  },
  create: {
    marginTop: 40,
  },
  line: {
    width: 160,
    height: 2,
    backgroundColor: COLORS.grey,
    marginTop: 12,
  },
  orSection: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 10,
  },
  btn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: 350,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: COLORS.dark,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginTop: 40,
    flexDirection: 'row',
  },
  text: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
});
