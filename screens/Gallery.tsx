import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Platform,
  Button,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { galleryCards } from '../utils/galleryCards';
import { GalleryCardsProps } from '../utils/galleryCards';
import { COLORS } from '../utils/colors';
import usePictureUpload from '../components/hooks/usePictureUpload';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Pressable } from 'react-native';
// import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import GreyInputField from '../components/inputFields/GreyInputField';
import BlueButton from '../components/buttons/BlueButton';

import { db, auth, storage } from '../firebase-config';
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import CustomGreyInput from '../components/inputFields/CustomGreyInput';
import NativeUIText from '../components/NativeUIText/NativeUIText';
import { galleryInfo } from '../store/gallery/gallerySlice';
import CustomModalText from '../components/modals/CustomModalText';
// import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// import { CustomerType, customersInfo } from '../store/customer/customerSlice';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const width = Dimensions.get('screen').width / 2 - 30;

interface Props {
  navigation?: any;
  setImages?: any;
}

const Gallery = ({ navigation }: any) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const dispatch = useDispatch();

  const [images, setImages] = useState<any>([]);

  const [showModal, setShowModal] = useState(false);

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

  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const gallerySlice = useSelector((state: RootState) => state.gallery);

  const [gallery, setGallery] = useState<any>([]);

  // const [userRole, setUserRole] = useState('');
  // const [checked, setChecked] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [newCreatedID, setNewCreatedID] = useState<any>('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      folderName: '',
      tailorEmail: tailorSlice.user.email,
      // number: '',
      // category: userRole,
      // address: '',
    },
  });

  // console.log(userRole);

  const onSubmit = async (data: any) => {
    console.log('hello');
    const galleryCollectionRef = collection(db, 'gallery');

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

      await addDoc(galleryCollectionRef, {
        folderName: data.folderName,
        tailorEmail: tailorSlice.user.email,
      }).then((response) => {
        console.log(response.id);
        const imageRef = ref(storage, `gallery/${response.id}`);
        const metadata = {
          contentType: 'image/jpg',
        };

        uploadBytes(imageRef, blob, metadata).then(async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          console.log(downloadURL);
          const imageDoc = doc(db, 'gallery', response.id);

          await updateDoc(imageDoc, {
            imageUrl: downloadURL,
          });
          blob.close();
        });
        // .then(navigation.navigate('Gallery'));
        setNewCreatedID(response.id);
        setVisible(false);
        setShowModal(!showModal);
      });

      // console.log(newCreatedID);

      // navigation.navigate('HomeStack');
    } catch (err: any) {
      console.log(err.message);
    }
    // setLoading(false);
    // dispatch(stopButtonLoading());
    reset({
      folderName: '',
      tailorEmail: tailorSlice.user.email,
      // category: userRole,
      // address: '',
      // phone: ""
    });

    // setLoading(!loading);
    // dispatch(stopButtonLoading());
  };

  useEffect(() => {
    const getGallery = async () => {
      try {
        // Create a query against the collection.
        const galleryRef = collection(db, 'gallery');
        const q = query(
          galleryRef,
          where('tailorEmail', '==', tailorSlice.user.email)
        );

        const querySnapshot = await getDocs(q);
        setGallery(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        dispatch(galleryInfo(gallery));
        // console.log('queens', customers);

        // querySnapshot.docs.forEach((doc) => {
        //   dispatch(customersInfo([doc.data()]));
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, ' => cc ', doc.data());
        // });
      } catch (error: any) {
        // console.log(error.message);
        // setFirebaseErr(error.message);
      }
    };

    getGallery();
    // console.log(gallery);
  }, [gallery]);

  const [expoPushToken, setExpoPushToken] = useState<any>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // console.log(gallerySlice);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightestGrey,
        paddingHorizontal: 18,
        paddingTop: 65,
      }}
    >
      {/* <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 20,
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            Title: {notification && notification.request.content.title}{' '}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{' '}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View> */}

      <View style={styles.hero}>
        <Text style={styles.heading}>Style Inspiration</Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginTop: 20,
          gap: 15,
        }}
      >
        {gallery.map((galleryCard: any, index: number) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('GalleryDetails', {
                image: galleryCard.imageUrl,
                name: galleryCard.folderName,
              })
            }
            // activeOpacity={0.8}
            // onPress={() => navigation.navigate('Details', plant)}
          >
            <View style={styles.card}>
              <View
                style={{
                  height: 100,
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{
                    uri: galleryCard.imageUrl,
                  }}
                  style={{
                    flex: 1,
                    resizeMode: 'contain',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>

              <Text style={{ fontSize: 17, marginTop: 10 }}>
                {galleryCard.folderName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={pickImage}
          activeOpacity={0.8}
          // activeOpacity={0.8}
          // onPress={() => navigation.navigate('Details', plant)}
        >
          <View style={styles.card}>
            <View
              style={{
                width: 140,
                height: 100,
                backgroundColor: COLORS.lightGrey,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name={'camera'} size={80} color={COLORS.light} />
            </View>
            <View>
              <Text style={{ fontSize: 17, marginTop: 10 }}>Add New Image</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.fill}>
        <Modal
          visible={visible}
          onRequestClose={hide}
          animationType="fade"
          transparent
        >
          <Pressable style={styles.upper} />
          <View style={styles.lower}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.dark,
                  textAlign: 'right',
                  paddingRight: 30,
                  paddingTop: 15,
                }}
                onPress={hide}
              >
                X
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.dark,
                  paddingTop: 0,
                  textAlign: 'center',
                }}
              >
                Selected Images
              </Text>
            </View>

            <View style={styles.images}>
              <ScrollView horizontal={true} keyboardShouldPersistTaps="handled">
                {images?.map((image: any, index: any) => {
                  return (
                    <Pressable
                      style={{
                        height: 200,
                        width: Dimensions.get('window').width / 2 - 30,
                        margin: 5,
                      }}
                      key={index}
                      onPress={() => console.log(image.uri)}
                    >
                      <Image
                        source={{ uri: image.uri }}
                        style={{
                          height: 200,
                          width: Dimensions.get('window').width / 2 - 30,
                          borderRadius: 10,
                        }}
                      />
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ alignItems: 'center' }}>
              <CustomGreyInput
                // label="folder name"
                placeholder="name"
                control={control}
                name={'folderName'}
                secureTextEntry={false}
              />
              {errors.folderName && (
                <NativeUIText textColor="red">name is requuired</NativeUIText>
              )}
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <BlueButton text="Save" onClickButton={handleSubmit(onSubmit)} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <View>
        {
          <CustomModalText
            title={'Your order has been saved successfully 🎊 '}
            visible={showModal}
            setVisible={setShowModal}
            extraFunction={() => {
              navigation.navigate('HomeStack');
            }}
            showIcon={false}
          />
        }
      </View>
    </View>
  );
};

export default Gallery;

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'TailorEazy ✂️',
      body: "Naomi's order is due tommorow",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  card: {
    height: 160,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 5,
    padding: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'grey',
    shadowOpacity: 1.0,
  },
  upper: {
    height: 280,
    backgroundColor: '#DDD',
    opacity: 0.5,
  },
  lower: {
    flex: 1,
    backgroundColor: 'white',
  },
  fill: { flex: 1 },
  images: {
    // flex: 1,
    flexDirection: 'row',
    // marginTop: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 5,
    marginBottom: -15,
    paddingHorizontal: 15,
    // position: "absolute",
    // bottom: 0,
  },
});
