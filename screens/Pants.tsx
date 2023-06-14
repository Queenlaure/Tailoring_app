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

const Pants = ({ route, userOption, navigation }: Props) => {
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
      waist: '',
      outseam: '',
      inseam: '',
      frontRise: '',
      backRise: '',
      hips: '',
      thigh: '',
      knee: '',
      sura: '',
      legOpening: '',
      length: '',
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
            label="Waist:"
            control={control}
            name={'waist'}
            secureTextEntry={false}
          />
          {errors.waist && (
            <NativeUIText textColor="red">waist is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Outseam:"
            control={control}
            name={'outseam'}
            secureTextEntry={false}
          />
          {errors.outseam && (
            <NativeUIText textColor="red">outseam is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Inseam:"
            control={control}
            name={'inseam'}
            secureTextEntry={false}
          />
          {errors.inseam && (
            <NativeUIText textColor="red">inseam is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Front Rise:"
            control={control}
            name={'frontRise'}
            secureTextEntry={false}
          />
          {errors.frontRise && (
            <NativeUIText textColor="red">front rise is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Back Rise:"
            control={control}
            name={'backRise'}
            secureTextEntry={false}
          />
          {errors.backRise && (
            <NativeUIText textColor="red">back rise is required</NativeUIText>
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
            label="Sura:"
            control={control}
            name={'sura'}
            secureTextEntry={false}
          />
          {errors.sura && (
            <NativeUIText textColor="red">sura is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Leg Opening:"
            control={control}
            name={'legOpening'}
            secureTextEntry={false}
          />
          {errors.legOpening && (
            <NativeUIText textColor="red">leg opening is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Length:"
            control={control}
            name={'lenght'}
            secureTextEntry={false}
          />
          {errors.length && (
            <NativeUIText textColor="red">length is required</NativeUIText>
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

export default Pants;

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
