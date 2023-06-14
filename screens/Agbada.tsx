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

const Agbada = ({ route, userOption, navigation }: Props) => {
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
      chest: '',
      waist: '',
      thigh: '',
      hips: '',
      knee: '',
      calf: '',
      ankle: '',
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
            label="Chest:"
            control={control}
            name={'chest'}
            secureTextEntry={false}
          />
          {errors.chest && (
            <NativeUIText textColor="red">chest is required</NativeUIText>
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
            label="Hips:"
            control={control}
            name={'hips'}
            secureTextEntry={false}
          />
          {errors.hips && (
            <NativeUIText textColor="red">hips is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Thigh:"
            control={control}
            name={'thigh'}
            secureTextEntry={false}
          />
          {errors.thigh && (
            <NativeUIText textColor="red">thigh is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Knee:"
            control={control}
            name={'knee'}
            secureTextEntry={false}
          />
          {errors.knee && (
            <NativeUIText textColor="red">knee is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Calf:"
            control={control}
            name={'calf'}
            secureTextEntry={false}
          />
          {errors.calf && (
            <NativeUIText textColor="red">calf is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Ankle:"
            control={control}
            name={'ankle'}
            secureTextEntry={false}
          />
          {errors.ankle && (
            <NativeUIText textColor="red">ankle is required</NativeUIText>
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
            <UrgentCheckBox setUrgent={setUrgent}/>
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

export default Agbada;

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
