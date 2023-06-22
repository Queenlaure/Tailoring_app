import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../utils/colors';
import GreyInputField from '../components/inputFields/GreyInputField';
import { Ionicons } from '@expo/vector-icons';
import BlueButton from '../components/buttons/BlueButton';
import { useForm, Controller } from 'react-hook-form';
import CustomGreyInput from '../components/inputFields/CustomGreyInput';
import NativeUIText from '../components/NativeUIText/NativeUIText';
import { db, auth, storage } from '../firebase-config';
import { getDoc, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

const width = Dimensions.get('screen').width / 2 - 30;

const AddCustomer = ({ navigation }: any) => {
  const [userRole, setUserRole] = useState('');
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [checked, setChecked] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [newCreatedID, setNewCreatedID] = useState<any>('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      number: '',
      category: userRole,
      address: '',
    },
  });

  console.log(userRole);

  const onSubmit = async (data: any) => {
    console.log('hello');
    const studentCollectionRef = collection(db, 'clients');

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

      await addDoc(studentCollectionRef, {
        name: data.name,
        number: data.number,
        category: userRole,
        address: data.address,
      }).then((response) => {
        console.log(response.id);
        const imageRef = ref(storage, `clients/${response.id}`);
        const metadata = {
          contentType: 'image/jpg',
        };

        uploadBytes(imageRef, blob, metadata)
          .then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);
            console.log(downloadURL);
            const imageDoc = doc(db, 'clients', response.id);

            await updateDoc(imageDoc, {
              imageUrl: downloadURL,
            });
            blob.close();
          })
          .then(navigation.navigate('HomeStack'));
        setNewCreatedID(response.id);
      });

      console.log(newCreatedID);

      // navigation.navigate('HomeStack');
    } catch (err: any) {
      console.log(err.message);
    }
    // setLoading(false);
    // dispatch(stopButtonLoading());
    reset({
      name: '',
      number: '',
      category: userRole,
      address: '',
      // phone: ""
    });

    // setLoading(!loading);
    // dispatch(stopButtonLoading());
  };

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

  console.log(images[0]?.uri);

  const category = ['Male', 'Female'];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 30,
        paddingTop: 45,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={styles.heading}>Enter Customer Details</Text>
        </View>
        <View>
          <CustomGreyInput
            label="Name:"
            placeholder="name"
            control={control}
            name={'name'}
            secureTextEntry={false}
          />
          {errors.name && (
            <NativeUIText textColor="red">name is requuired</NativeUIText>
          )}
          <CustomGreyInput
            label="Number:"
            placeholder="nunber"
            control={control}
            name={'number'}
            secureTextEntry={false}
          />
          {errors.number && (
            <NativeUIText textColor="red">number is requuired</NativeUIText>
          )}
          {/* <CustomGreyInput
          label="Email:"
          placeholder="example@gmail.com"
          control={control}
          name={'email'}
          secureTextEntry={false}
        /> */}
          {/* {errors.email && (
          <NativeUIText textColor="red">email is requuired</NativeUIText>
        )} */}
          <CustomGreyInput
            label="Address:"
            placeholder="address"
            control={control}
            name={'address'}
            secureTextEntry={false}
          />
          {errors.address && (
            <NativeUIText textColor="red">address is requuired</NativeUIText>
          )}
          {/* <GreyInputField label="Name" placeholder="name" />
          <GreyInputField label="Number" placeholder="number" />
          <GreyInputField label="Email (Optional)" placeholder="email" />
          <GreyInputField label="Address (Optional)" placeholder="address" /> */}
        </View>
        <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
          <Text style={{ fontWeight: 'bold', marginTop: 5 }}>
            Signing In as:
          </Text>
          {category.slice(0, 3).map((category, key) => {
            return (
              <View style={styles.spacing} key={category}>
                {checked == key ? (
                  <TouchableOpacity style={styles.btn}>
                    <Image
                      style={styles.img}
                      source={require('../components/buttons/radio-checked.png')}
                    />
                    <Text>{category}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setChecked(key);
                      setUserRole(category);
                    }}
                    style={styles.btn}
                  >
                    <Image
                      style={styles.img}
                      source={require('../components/buttons/radio-unchecked.png')}
                    />
                    <Text>{category}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.photoHeading}>
        <View style={styles.firstSection}>
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
            <Text>Add Photo (optional)</Text>
          </TouchableOpacity>
        </View>

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

      <BlueButton text="Save" onClickButton={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingBottom: 15,
  },
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 6,
  },
  spacing: {
    justifyContent: 'space-between',
  },
  photoHeading: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 10,
    // display: 'flex',
    // flexDirection: 'row',
  },
  cameraContainer: {
    width: 130,
    height: 130,
    backgroundColor: COLORS.lightGrey,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstSection: {
    marginRight: 10,
  },
  secondSection: {
    // marginTop: 26,
  },
});
