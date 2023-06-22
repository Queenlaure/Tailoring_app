import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';

const width = Dimensions.get('screen').width / 2 - 30;

interface Props {
  userOption?: any;
  route?: any;
  navigation?: any;
}

const Gown = ({ route, userOption, navigation }: Props) => {
  const { selectedUserOption } = route.params;

  const [urgent, setUrgent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<any>([]);

  if (urgent) {
    console.log(urgent);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gownLength: '',
      upperChest: '',
      chest: '',
      waist: '',
      stomach: '',
      hips: '',
      shoulder: '',
      frontNeckDepth: '',
      sleeveLength: '',
      sleevesRound: '',
      armHoles: '',
      charge: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('HomeStack');
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      // selectionLimit: 5,
    });

    console.log(result);

    if (!result.canceled) {
      setImages(result.assets);
      setVisible(true);
      console.log(result.assets);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingHorizontal: 30,
        paddingTop: 35,
        paddingBottom: 70,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MainHeading title="John Davie" userOption={selectedUserOption} />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomGreyInput
            label="Upper Chest:"
            control={control}
            name={'upperChest'}
            secureTextEntry={false}
          />
          {errors.upperChest && (
            <NativeUIText textColor="red">
              upper chest is requuired
            </NativeUIText>
          )}
          <CustomGreyInput
            label="Gown Length:"
            control={control}
            name={'gownLength'}
            secureTextEntry={false}
          />
          {errors.gownLength && (
            <NativeUIText textColor="red">
              gown length is requuired
            </NativeUIText>
          )}
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
            label="Stomach:"
            control={control}
            name={'stomach'}
            secureTextEntry={false}
          />
          {errors.stomach && (
            <NativeUIText textColor="red">stomach is requuired</NativeUIText>
          )}
          <CustomGreyInput
            label="Hips:"
            control={control}
            name={'hips'}
            secureTextEntry={false}
          />
          {errors.hips && (
            <NativeUIText textColor="red">hips is requuired</NativeUIText>
          )}
          <CustomGreyInput
            label="Shoulder:"
            control={control}
            name={'shoulder'}
            secureTextEntry={false}
          />
          {errors.shoulder && (
            <NativeUIText textColor="red">shoulder is requuired</NativeUIText>
          )}
          <CustomGreyInput
            label="Front Neck Depth:"
            control={control}
            name={'frontNeckDepth'}
            secureTextEntry={false}
          />
          {errors.frontNeckDepth && (
            <NativeUIText textColor="red">
              front neck depth is requuired
            </NativeUIText>
          )}
          <CustomGreyInput
            label="Sleeve Length:"
            control={control}
            name={'sleeveLength'}
            secureTextEntry={false}
          />
          {errors.sleeveLength && (
            <NativeUIText textColor="red">
              sleeve length is requuired
            </NativeUIText>
          )}
          <CustomGreyInput
            label="Sleeves Round:"
            control={control}
            name={'sleevesRound'}
            secureTextEntry={false}
          />
          {errors.sleevesRound && (
            <NativeUIText textColor="red">
              sleeves round is requuired
            </NativeUIText>
          )}
          <CustomGreyInput
            label="Arm Hole:"
            control={control}
            name={'armHole'}
            secureTextEntry={false}
          />
          {errors.armHoles && (
            <NativeUIText textColor="red">arm hole is requuired</NativeUIText>
          )}

          <GreyInputField label="Arm hole:" />
          <GreyInputField label="Charge (FCFA):" placeholder="0000" />
          <View>
            <UrgentCheckBox setUrgent={setUrgent} />
          </View>
          <View style={styles.picSection}>
            <View  style={styles.addButton} >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={pickImage}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name={'add-circle-outline'}
                  size={40}
                  color={COLORS.dark}
                />
                <Text>Add Cloth Image</Text>
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView
                horizontal={true}
                style={styles.secondSection}
                keyboardShouldPersistTaps="handled"
              >
                {images?.map((image: any, index: any) => {
                  return (
                    <Pressable
                      style={{
                        height: 130,
                        width: Dimensions.get('window').width / 4 - 30,
                        margin: 5,
                      }}
                      key={index}
                      onPress={() => console.log(image.uri)}
                    >
                      <Image
                        source={{ uri: image.uri }}
                        style={{
                          height: 130,
                          width: Dimensions.get('window').width / 4 - 30,
                        }}
                      />
                    </Pressable>
                  );
                })}
              </ScrollView>
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

export default Gown;

const styles = StyleSheet.create({
  // cameraContainer: {
  //   width: 130,
  //   height: 130,
  //   backgroundColor: COLORS.lightGrey,
  //   marginTop: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  picSection: {
    marginTop: 10,
    
  },
  addButton: {
    alignItems: 'flex-start',
  },
  pic: {
    width: '100%',
    height: '100%',
    marginTop: 30,
  },
  firstSection: {
    marginRight: 10,
  },
  secondSection: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 320,
  },
});
