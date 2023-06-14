import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../utils/colors';
import MainHeading from '../components/headings/MainHeading';
import InputField from '../components/inputFields/InputField';
import GreyInputField from '../components/inputFields/GreyInputField';
import BlueButton from '../components/buttons/BlueButton';
import Calendar from '../components/inputFields/Calendar';
import UrgentCheckBox from '../components/buttons/UrgentCheckBox';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import CustomGreyInput from '../components/inputFields/CustomGreyInput';
import NativeUIText from '../components/NativeUIText/NativeUIText';

interface Props {
  userOption?: any;
  route?: any;
  navigation?:any
}

const Shirt = ({ route, userOption, navigation }: Props) => {
  const { selectedUserOption } = route.params;

  const [urgent, setUrgent] = useState(false);

  if (urgent){
    console.log(urgent)
  } 

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      chest: '',
      waist: '',
      seat: '',
      bicep: '',
      shirtLength: '',
      shoulderWidth: '',
      sleeveLength: '',
      cuffCircumference: '',
      collarSize: '',
      charge: '',
    },
  });


  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('HomeStack');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingHorizontal: 30,
        paddingTop: 35,
        alignItems: 'center',
      }}
    >
      <MainHeading title="John Davie" userOption={selectedUserOption} />
      <View style={{ height: 580 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <CustomGreyInput
          label="Chest:"
          control={control}
          name={'chest'}
          secureTextEntry={false}
        />
        {errors.chest && (
          <NativeUIText textColor="red">chest is requuired</NativeUIText>
        )}
        <CustomGreyInput
          label="Waist:"
          control={control}
          name={'waist'}
          secureTextEntry={false}
        />
        {errors.waist && (
          <NativeUIText textColor="red">waist is requuired</NativeUIText>
        )}
        <CustomGreyInput
          label="Seat:"
          control={control}
          name={'seat'}
          secureTextEntry={false}
        />
        {errors.seat && (
          <NativeUIText textColor="red">seat is requuired</NativeUIText>
        )}
        <CustomGreyInput
          label="Bicep:"
          control={control}
          name={'bicep'}
          secureTextEntry={false}
        />
        {errors.bicep && (
          <NativeUIText textColor="red">bicep is requuired</NativeUIText>
        )}
        <CustomGreyInput
          label="Shirt length:"
          control={control}
          name={'shirtLength'}
          secureTextEntry={false}
        />
        {errors.shirtLength && (
          <NativeUIText textColor="red">shirt length is requuired</NativeUIText>
        )}
        <CustomGreyInput
          label="Shoulder Width:"
          control={control}
          name={'shoulderWidth'}
          secureTextEntry={false}
        />
        {errors.shoulderWidth && (
          <NativeUIText textColor="red">shoulder width is requuired</NativeUIText>
        )}
        <CustomGreyInput
          label="Sleeve Length:"
          control={control}
          name={'sleeveLength'}
          secureTextEntry={false}
        />
        {errors.sleeveLength && (
          <NativeUIText textColor="red">sleeve length is requuired</NativeUIText>
        )}
        <CustomGreyInput
          label="Cuff Circumference:"
          control={control}
          name={'cuffCircumference'}
          secureTextEntry={false}
        />
        {errors.cuffCircumference && (
          <NativeUIText textColor="red">cuff circumference is requuired</NativeUIText>
        )}
        <CustomGreyInput
          label="Collar Size:"
          control={control}
          name={'collarSize'}
          secureTextEntry={false}
        />
        {errors.collarSize && (
          <NativeUIText textColor="red">collarSize is requuired</NativeUIText>
        )}
        <CustomGreyInput
          label="Charge (FCFA):"
          placeholder='0000'
          control={control}
          name={'charge'}
          secureTextEntry={false}
        />
        {errors.charge && (
          <NativeUIText textColor="red">charge is requuired</NativeUIText>
        )}
          {/* <GreyInputField label="Chest:" />
          <GreyInputField label="Waist:" />
          <GreyInputField label="Seat:" />
          <GreyInputField label="Bicep:" />
          <GreyInputField label="Shirt length:" />
          <GreyInputField label="Shoulder width:" />
          <GreyInputField label="Sleeve length:" />
          <GreyInputField label="Cuff circumference:" />
          <GreyInputField label="Collar size:" />
          <GreyInputField label="Charge (FCFA):" placeholder="0000" /> */}
          {/* <Calendar label='Delivery date' placeholder='Thur 4 May 2023' /> */}
          <View>
            <UrgentCheckBox setUrgent={setUrgent} />
          </View>
          <View style={styles.picSection}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                Add Cloth Image
              </Text>
              <View style={styles.cameraContainer}>
                <Text>
                  <Ionicons name={'camera'} size={50} color={COLORS.grey} />
                </Text>
              </View>
            </View>
            <View style={{ width: 130, height: 130 }}>
              <Image
                source={require('../assets/tailor2.jpg')}
                style={styles.pic}
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <BlueButton text="Save" onClickButton={handleSubmit(onSubmit)} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Shirt;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingBottom: 15,
  },
  cameraContainer: {
    width: 130,
    height: 130,
    backgroundColor: COLORS.lightGrey,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pic: {
    width: '100%',
    height: '100%',
    marginTop: 30,
  },
});
