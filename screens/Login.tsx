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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { TailorInfo } from '../store/tailor/tailorSlice';

const Login = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const tailorSlice = useSelector((state: RootState) => state.tailor);

  // console.log('taikor silice', tailorSlice);

  // console.log(tailorSlice);

  const [firebaseErr, setFirebaseErr] = useState('');
  const [presentUser, setPresentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [comparedData, setComparedData] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data.email);

    try {
      if (data.email) {
        const tailor = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        const tailorRef = collection(db, 'tailor');
        onAuthStateChanged(auth, (currentUser: any) => {
          setUserEmail(currentUser.email);
        });

        console.log(userEmail);

        // Create a query against the collection.
        const q = query(tailorRef, where('email', '==', userEmail));
        setPresentUser(q);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          if (doc.data().tailor) {
            dispatch(TailorInfo(doc.data()));
            // console.log('some',doc.data().tailor);
            navigation.navigate('HomeStack');
          } else {
            navigation.navigate('Gallery');
          }
        });
        // console.log('present user at the monet',q)
        // console.log('a ref for tailor',tailorRef);
        // console.log(' for tailor',tailor);
        // navigation.navigate('HomeStack');
      }
    } catch (error: any) {
      console.log(error.message);
      setFirebaseErr(error.message);
    }

    // console.log(data);
    // navigation.navigate('HomeStack')
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
        <FieldInput
          label="Password:"
          placeholder="******"
          control={control}
          name={'password'}
          secureTextEntry={true}
        />
        {errors.password && (
          <NativeUIText textColor="red">password is requuired</NativeUIText>
        )}
        {/* <PasswordField label="Password:" placeholder="xxxxxxxxxx" password /> */}
      </View>

      <View
        // activeOpacity={0.8}
        // onPress={() => navigation.navigate('HomeStack')}
        style={styles.create}
      >
        <BlueButton text="Login" onClickButton={handleSubmit(onSubmit)} />
      </View>
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
