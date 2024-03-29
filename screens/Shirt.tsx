import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
import { db, auth, storage } from '../firebase-config';
import * as ImagePicker from 'expo-image-picker';
import { getDoc, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import CustomModalText from '../components/modals/CustomModalText';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  setButtonLoading,
  stopButtonLoading,
} from '../store/loading/buttonSlice';
import DateInput from '../components/inputFields/DateInput.component';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const width = Dimensions.get('screen').width / 2 - 30;

interface Props {
  userOption?: any;
  route?: any;
  navigation?: any;
}

const Shirt = ({ route, userOption, navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedUserOption, customer } = route.params;

  const tailorSlice = useSelector((state: RootState) => state.tailor);

  const [urgent, setUrgent] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const buttonSlice = useSelector((state: RootState) => state.button);
  const [date, setDate] = useState(new Date(Date.now()));
  const [receiverName, setReceiverName] = useState('');

  const [expoPushToken, setExpoPushToken] = useState<any>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const [showModal, setShowModal] = useState(false);

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

  const onSubmit = async (data: any) => {
    // console.log('hello');
    const ordersCollectionRef = collection(db, 'orders');
    dispatch(setButtonLoading());
    // setReceiverName(customer);

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
        shirt: {
          chest: data.chest,
          waist: data.waist,
          seat: data.seat,
          bicep: data.bicep,
          shirtLength: data.shirtLength,
          shoulderWidth: data.shoulderWidth,
          sleeveLength: data.sleeveLength,
          cuffCircumference: data.cuffCircumference,
          collarSize: data.collarSize,
          charge: data.charge,
        },
        tailorEmail: tailorSlice.user.email,
        urgent: urgent,
        completed: completed,
        customerName: customer,
        dueDate: date,
      }).then((response) => {
        console.log(response.id);
        const imageRef = ref(storage, `orders/${response.id}`);
        const metadata = {
          contentType: 'image/jpg',
        };

        uploadBytes(imageRef, blob, metadata).then(async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          console.log(downloadURL);
          const imageDoc = doc(db, 'orders', response.id);

          await updateDoc(imageDoc, {
            imageUrl: downloadURL,
          });
          blob.close();
          dispatch(stopButtonLoading());

          setShowModal(!showModal);
          schedulePushNotification();
          console.log('Hello THere', showModal);
        });
        // .then(navigation.navigate('HomeStack'));
        setNewCreatedID(response.id);
      });

      // navigation.navigate('HomeStack');
    } catch (err: any) {
      console.log(err.message);
    }
    // setLoading(false);
    // dispatch(stopButtonLoading());
    reset({
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
    });

    // setLoading(!loading);
    // dispatch(stopButtonLoading());
  };

  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   navigation.navigate('HomeStack');
  // };

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

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'TailorEazy ✂️',
        body: `${customer} order is due tommorow`,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingHorizontal: 30,
        paddingTop: 65,
        paddingBottom: 70,
        alignItems: 'center',
      }}
    >
      <MainHeading title={customer} userOption={selectedUserOption} />
      <View>
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
            <NativeUIText textColor="red">
              shirt length is requuired
            </NativeUIText>
          )}
          <CustomGreyInput
            label="Shoulder Width:"
            control={control}
            name={'shoulderWidth'}
            secureTextEntry={false}
          />
          {errors.shoulderWidth && (
            <NativeUIText textColor="red">
              shoulder width is requuired
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
            label="Cuff Circumference:"
            control={control}
            name={'cuffCircumference'}
            secureTextEntry={false}
          />
          {errors.cuffCircumference && (
            <NativeUIText textColor="red">
              cuff circumference is requuired
            </NativeUIText>
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
            placeholder="0000"
            control={control}
            name={'charge'}
            secureTextEntry={false}
          />
          {errors.charge && (
            <NativeUIText textColor="red">charge is requuired</NativeUIText>
          )}

          <View>
            <DateInput date={date} setDate={setDate} />
            {/* <Calendar /> */}
          </View>
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
            <BlueButton
              text="Save"
              onClickButton={handleSubmit(onSubmit)}
              isLoading={buttonSlice.buttonLoading}
            />
          </View>
        </ScrollView>
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
    </View>
  );
};

export default Shirt;

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
