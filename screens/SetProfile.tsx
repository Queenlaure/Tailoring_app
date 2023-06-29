import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import InputField from '../components/inputFields/InputField';
import Radio from '../components/buttons/RadioButton';
import { COLORS } from '../utils/colors';
import BlueButton from '../components/buttons/BlueButton';
import { useForm, Controller } from 'react-hook-form';
import FieldInput from '../components/inputFields/FieldInput';
import NativeUIText from '../components/NativeUIText/NativeUIText';
import { db, auth } from '../firebase-config';
import {
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { TailorInfo } from '../store/tailor/tailorSlice';
import { useDispatch } from 'react-redux';

const SetProfile = ({ navigation }: any) => {
  const [userRole, setUserRole] = useState('Male');
  const [userID, setUserID] = useState('');
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser: any) => {
    setUserID(currentUser.email);
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shopName: '',
      address: '',
      contact: '',
    },
  });

  console.log(userRole);

  const onSubmit = async (data: any) => {
    try {
      const tailorCollectionRef = collection(db, 'tailor');
      await addDoc(tailorCollectionRef, {
        shopName: data.shopName,
        email: userID,
        address: data.address,
        contact: data.contact,
        specialty: userRole,
        tailor: true,
      });
      // Create a query against the collection.
      const q = query(tailorCollectionRef, where('email', '==', userID));
      //  setPresentUser(q);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        if (doc.data().tailor) {
          dispatch(TailorInfo(doc.data()));
          // console.log('some',doc.data().tailor);
          navigation.navigate('HomeStack');
        }
      });
      // console.log(tailorCollectionRef);
    } catch (error: any) {
      console.log(error.message);
    }
    // console.log(data);
  };
  return (
    <View style={{ flex: 1, paddingTop: 70, backgroundColor: COLORS.white }}>
      <View style={styles.hero}>
        <Text style={styles.heading}>Set Up your profile</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <FieldInput
          placeholder="Shop Name"
          control={control}
          name={'shopName'}
          secureTextEntry={false}
        />
        {errors.shopName && (
          <NativeUIText textColor="red">shop name is required</NativeUIText>
        )}
        {/* <FieldInput
          placeholder="Business (Email Address)"
          control={control}
          name={'email'}
          secureTextEntry={false}
        />
        {errors.email && (
          <NativeUIText textColor="red">email is required</NativeUIText>
        )} */}
        <FieldInput
          placeholder="Shop Address"
          control={control}
          name={'address'}
          secureTextEntry={false}
        />
        {errors.address && (
          <NativeUIText textColor="red">address is required</NativeUIText>
        )}
        <FieldInput
          placeholder="Phone Number"
          control={control}
          name={'contact'}
          secureTextEntry={false}
        />
        {errors.contact && (
          <NativeUIText textColor="red">phone number is required</NativeUIText>
        )}
        {/* <InputField placeholder="Shop Name" />
        <InputField placeholder="Business (Email Address)" />
        <InputField placeholder="Shop Address" />
        <InputField placeholder="Phone Number" /> */}
      </View>
      <View style={styles.radioSection}>
        <Text style={styles.radioText}>Wears for:</Text>
        <Radio setUserRole={setUserRole} />
      </View>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <BlueButton text="Save" onClickButton={handleSubmit(onSubmit)} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SetProfile;

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
  radioSection: {
    marginTop: 20,
  },
  radioText: {
    fontWeight: 'bold',
    marginLeft: 40,
  },
});
