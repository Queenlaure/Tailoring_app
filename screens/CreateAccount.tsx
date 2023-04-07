import React from 'react';
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

const CreateAccount = ({ navigation }: any) => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center' }}
    >
      <View style={styles.hero}>
        <Text style={styles.heading}>Create An Account</Text>
        <Text style={styles.subHeading}>
          Create your account, it takes less than a munite
        </Text>
      </View>
      <View style={styles.input}>
        <InputField label="Name:" placeholder="name" />
        <PasswordField label="Password:" placeholder="xxxxxxxxxx" password />
        <PasswordField label="Tel:" placeholder="000000000" />
      </View>
      <View style={styles.create}>
        <BlueButton text="Create an Account" />
      </View>
      <View style={styles.orSection}>
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
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{ color: COLORS.dark, fontWeight: 'bold', marginRight: 5 }}
        >
          Already have an Account?
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login', { name: 'Login' })}
        >
          <Text style={{ color: COLORS.blue, fontWeight: 'bold' }}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
    hero: {
      marginTop: 20,
      alignItems: 'center'
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
    marginTop: 20,
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
