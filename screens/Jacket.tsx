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
import { db, auth, storage } from '../firebase-config';
import { getDoc, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const width = Dimensions.get('screen').width / 2 - 30;

interface Props {
  userOption?: any;
  route?: any;
  navigation?: any;
}

const Jacket = ({ route, userOption, navigation }: Props) => {
  const { selectedUserOption, customer } = route.params;

  const tailorSlice = useSelector((state: RootState) => state.tailor);

  const [urgent, setUrgent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<any>([]);

  if (urgent) {
    console.log(urgent);
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shoulder: '',
      sleeveLength: '',
      chest: '',
      waist: '',
      centerBack: '',
      charge: '',
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: false,
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

  const onSubmit = async (data: any) => {
    // console.log('hello');
    const ordersCollectionRef = collection(db, 'orders');

    try {
      const blob: any = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', images[0]?.uri, true);
        xhr.send(null);
      });

      await addDoc(ordersCollectionRef, {
        jacket: {
          shoulder: data.shoulder,
          sleeveLength: data.sleeveLength,
          chest: data.chest,
          waist: data.waist,
          centerBack: data.centerBack,
          charge: data.charge,
        },
        tailorEmail: tailorSlice.user.email,
        charge: data.charge,
        urgent: urgent,
        customerName: customer,
      }).then((response) => {
        console.log(response.id);
        const imageRef = ref(storage, `orders/${response.id}`);
        const metadata = {
          contentType: 'image/jpg',
        };

        uploadBytes(imageRef, blob, metadata)
          .then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);
            console.log(downloadURL);
            const imageDoc = doc(db, 'orders', response.id);

            await updateDoc(imageDoc, {
              imageUrl: downloadURL,
            });
            blob.close();
          })
          .then(navigation.navigate('HomeStack'));
        setNewCreatedID(response.id);
      });

      // navigation.navigate('HomeStack');
    } catch (err: any) {
      console.log(err.message);
    }
    // setLoading(false);
    // dispatch(stopButtonLoading());
    reset({
      shoulder: '',
      sleeveLength: '',
      chest: '',
      waist: '',
      centerBack: '',
      charge: '',
    });

    // setLoading(!loading);
    // dispatch(stopButtonLoading());
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
      }}
    >
      <MainHeading title={customer} userOption={selectedUserOption} />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            label="Sleeve Length:"
            control={control}
            name={'sleeveLength'}
            secureTextEntry={false}
          />
          {errors.sleeveLength && (
            <NativeUIText textColor="red">
              sleeve length is required
            </NativeUIText>
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
            label="Center Back:"
            control={control}
            name={'centerBack'}
            secureTextEntry={false}
          />
          {errors.centerBack && (
            <NativeUIText textColor="red">center back is required</NativeUIText>
          )}
          <CustomGreyInput
            label="Charge (FCFA):"
            placeholder="0000"
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
            <View style={styles.addButton}>
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

export default Jacket;

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
function setNewCreatedID(id: string) {
  throw new Error('Function not implemented.');
}
