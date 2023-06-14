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

const Jumpsuit = ({ route, userOption, navigation }: Props) => {
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
      shoulders: '',
      sleeveLength: '',
      chest: '',
      hips: '',
      thigh: '',
      knee: '',
      inseam: '',
      cuff: '',
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
            label="Shoulders:"
            control={control}
            name={'shoulders'}
            secureTextEntry={false}
          />
          {errors.shoulders && (
            <NativeUIText textColor="red">shoulders is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Sleeve length:"
            control={control}
            name={'sleeveLength'}
            secureTextEntry={false}
          />
          {errors.sleeveLength && (
            <NativeUIText textColor="red">sleeve length is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Chest:"
            control={control}
            name={'chest'}
            secureTextEntry={false}
          />
          {errors.chest && (
            <NativeUIText textColor="red">chest length is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Hips:"
            control={control}
            name={'hips'}
            secureTextEntry={false}
          />
          {errors.hips && (
            <NativeUIText textColor="red">hips length is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Thigh:"
            control={control}
            name={'thigh'}
            secureTextEntry={false}
          />
          {errors.thigh && (
            <NativeUIText textColor="red">thigh length is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Knee:"
            control={control}
            name={'knee'}
            secureTextEntry={false}
          />
          {errors.knee && (
            <NativeUIText textColor="red">knee length is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Inseam:"
            control={control}
            name={'inseam'}
            secureTextEntry={false}
          />
          {errors.inseam && (
            <NativeUIText textColor="red">inseam length is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Cuff:"
            control={control}
            name={'cuff'}
            secureTextEntry={false}
          />
          {errors.cuff && (
            <NativeUIText textColor="red">cuff length is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Charge (FCFA):"
            placeholder='0000'
            control={control}
            name={'charge'}
            secureTextEntry={false}
          />
          {errors.charge && (
            <NativeUIText textColor="red">charge length is required</NativeUIText>
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

export default Jumpsuit;

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
