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
import { useForm, Controller } from 'react-hook-form';
import FieldInput from '../components/inputFields/FieldInput';
import NativeUIText from '../components/NativeUIText/NativeUIText';
import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDoc, collection, addDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  setButtonLoading,
  stopButtonLoading,
} from '../store/loading/buttonSlice';

const CreateAccount = ({ navigation }: any) => {
  const [userRole, setUserRole] = useState('Tailor');
  const [firebaseErr, setFirebaseErr] = useState('');
  const [warning, setWarning] = useState({
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const buttonSlice = useSelector((state: RootState) => state.button);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  console.log(userRole);

  const onSubmit = async (data: any) => {
    dispatch(setButtonLoading());
    if (data.password !== data.confirmPassword) {
      return setWarning({ ...warning, password: 'Passwords do not match' });
    }

    if (userRole === 'Tailor') {
      try {
        const tailor = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        console.log(tailor);

        navigation.navigate('Set Profile');
      } catch (error: any) {
        console.log(error.message);
        setFirebaseErr(error.message);
      }
    }
    if (userRole === 'Client') {
      try {
        const customer = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        console.log(customer);

        navigation.navigate('SetClientProfile');
      } catch (error: any) {
        console.log(error.message);
        setFirebaseErr(error.message);
      }
    }
  };
  const data = [
    { value: 'Apple', key: 1 },
    { value: 'Samsung', key: 2 },
    { value: 'Blackberry', key: 3 },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 40,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}
    >
      <View style={styles.hero}>
        <Text style={styles.heading}>Create An Account</Text>
        <Text style={styles.subHeading}>
          Create your account, it takes less than a minute.
        </Text>
      </View>
      <View style={styles.input}>
        <FieldInput
          label="Email:"
          placeholder="example@gmail.com"
          control={control}
          name={'email'}
          secureTextEntry={false}
        />
        {errors.email && (
          <NativeUIText textColor="red">email is requuired</NativeUIText>
        )}
        {firebaseErr && (
          <NativeUIText textColor="red">{firebaseErr}</NativeUIText>
        )}
        <FieldInput
          label="Password:"
          placeholder="******"
          control={control}
          name={'password'}
          secureTextEntry={true}
        />
        {errors.password && (
          <NativeUIText textColor="red">password is required</NativeUIText>
        )}
        {warning.password && (
          <NativeUIText textColor="red">{warning.confirmPassword}</NativeUIText>
        )}
        <FieldInput
          label="Confirm Password:"
          placeholder="******"
          control={control}
          name={'confirmPassword'}
          secureTextEntry={true}
        />
        {errors.password && (
          <NativeUIText textColor="red">password is requuired</NativeUIText>
        )}
      </View>

      <View style={{ flexDirection: 'row', marginTop: 15 }}>
        <Text style={{ fontWeight: 'bold', marginTop: 15 }}>
          Signing In as:
        </Text>
        <CreateAccountRadiobtn setUserRole={setUserRole} />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Set Profile')}
        style={styles.create}
      >
        <BlueButton
          text="Create an Account"
          onClickButton={handleSubmit(onSubmit)}
          isLoading={buttonSlice.buttonLoading}
        />
      </TouchableOpacity>
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
