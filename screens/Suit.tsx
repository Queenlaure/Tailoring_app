import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../utils/colors';
import MainHeading from '../components/headings/MainHeading';
import InputField from '../components/inputFields/InputField';
import GreyInputField from '../components/inputFields/GreyInputField';
import BlueButton from '../components/buttons/BlueButton';
import UrgentCheckBox from '../components/buttons/UrgentCheckBox';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import CustomGreyInput from '../components/inputFields/CustomGreyInput';
import NativeUIText from '../components/NativeUIText/NativeUIText';

interface Props {
  userOption?: any;
  route?: any;
  navigation?: any;
}

const Suit = ({ route, userOption, navigation }: Props) => {
  const { selectedUserOption } = route.params;

  const [urgent, setUrgent] = useState(false);

  if (urgent) {
    console.log(urgent);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      neck: '',
      shoulder: '',
      armHole: '',
      chest: '',
      burst: '',
      waist: '',
      armLength: '',
      hips: '',
      crutchDepth: '',
      backWidth: '',
      bicep: '',
      wrist: '',
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
            label="Neck:"
            control={control}
            name={'neck'}
            secureTextEntry={false}
          />
          {errors.neck && (
            <NativeUIText textColor="red">neck is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Shoulder:"
            control={control}
            name={'shoulder'}
            secureTextEntry={false}
          />
          {errors.shoulder && (
            <NativeUIText textColor="red">shoulder is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Arm Hole:"
            control={control}
            name={'armHole'}
            secureTextEntry={false}
          />
          {errors.armHole && (
            <NativeUIText textColor="red">arm hole is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Chest:"
            control={control}
            name={'chest'}
            secureTextEntry={false}
          />
          {errors.chest && (
            <NativeUIText textColor="red">chest is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Burst:"
            control={control}
            name={'burst'}
            secureTextEntry={false}
          />
          {errors.burst && (
            <NativeUIText textColor="red">burst is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Waist:"
            control={control}
            name={'waist'}
            secureTextEntry={false}
          />
          {errors.waist && (
            <NativeUIText textColor="red">waist is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Arm Length:"
            control={control}
            name={'armLength'}
            secureTextEntry={false}
          />
          {errors.armLength && (
            <NativeUIText textColor="red">arm length is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Hips:"
            control={control}
            name={'hips'}
            secureTextEntry={false}
          />
          {errors.hips && (
            <NativeUIText textColor="red">hips is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Crutch depth:"
            control={control}
            name={'crutchDepth'}
            secureTextEntry={false}
          />
          {errors.crutchDepth && (
            <NativeUIText textColor="red">crutch depth is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Back Width:"
            control={control}
            name={'backWidth'}
            secureTextEntry={false}
          />
          {errors.backWidth && (
            <NativeUIText textColor="red">back width is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Bicep:"
            control={control}
            name={'bicep'}
            secureTextEntry={false}
          />
          {errors.bicep && (
            <NativeUIText textColor="red">bicep is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Wrist:"
            control={control}
            name={'wrist'}
            secureTextEntry={false}
          />
          {errors.wrist && (
            <NativeUIText textColor="red">wrist is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Charge (FCFA):"
            placeholder='0000'
            control={control}
            name={'charge'}
            secureTextEntry={false}
          />
          {errors.charge && (
            <NativeUIText textColor="red">charge is required</NativeUIText>
          )}
       
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
        </ScrollView>
      </View>
      <View style={{ marginTop: 30 }}>
        <BlueButton text="Save" onClickButton={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default Suit;

const styles = StyleSheet.create({
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
