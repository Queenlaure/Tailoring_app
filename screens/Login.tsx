import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import InputField from '../components/inputFields/InputField';
import PasswordField from '../components/inputFields/PasswordField';
import BlueButton from '../components/buttons/BlueButton';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import CreateAccountRadiobtn from '../components/buttons/CreateAccountRadiobtn';
import { useForm, Controller } from 'react-hook-form';
import FieldInput from '../components/inputFields/FieldInput';
import NativeUIText from '../components/NativeUIText/NativeUIText';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { TailorsInfo, TailorInfo } from '../store/tailor/tailorSlice';
import CustomModalText from '../components/modals/CustomModalText';
import {
  setButtonLoading,
  stopButtonLoading,
} from '../store/loading/buttonSlice';
import { TailorType } from '../store/tailor/tailorSlice';
import { ClientInfo } from '../store/client/clientSlice';
import { ordersInfo } from '../store/orders/ordersSlice';

const Login = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const buttonSlice = useSelector((state: RootState) => state.button);
  // const [showModal, setShowModal] = useState(false);
  const [tailorList, setTailorList] = useState<TailorType[] | any[]>([]);
  const [clientList, setClientList] = useState<any[]>([]);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [specificUser, setSpecificUser] = useState<any[]>([]);
  const [userID, setUserID] = useState('');
  const [orders, setOrders] = useState<any>(false);

  const [loading, setLoading] = useState(false);

  const clientsCollectionRef = collection(db, 'client');
  const tailorsCollectionRef = collection(db, 'tailor');
  const ordersCollectionRef = collection(db, 'orders');

  // console.log('taikor silice', tailorSlice);
  // console.log('clients', tailorList);

  // log

  // console.log(tailorSlice);

  const [firebaseErr, setFirebaseErr] = useState('');
  const [presentUser, setPresentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [comparedData, setComparedData] = useState('');

  onAuthStateChanged(auth, (currentUser: any) => {
    setUserEmail(currentUser.email);
    setUserID(currentUser.uid);
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // console.log(userEmail);

  useEffect(() => {
    const getTailors = async () => {
      dispatch(stopButtonLoading());
      const tailorData = await getDocs(tailorsCollectionRef);
      setTailorList(
        tailorData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    dispatch(TailorsInfo(tailorList));
    getTailors();

    const getClients = async () => {
      const clientData = await getDocs(clientsCollectionRef);
      setClientList(
        clientData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getClients();

    const getOrders = async () => {
      const OrderData = await getDocs(ordersCollectionRef);
      setOrderList(
        OrderData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getOrders();
  }, []);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     const getOrders = async () => {
  //       try {
  //         // Create a query against the collection.
  //         const ordersRef = collection(db, 'orders');
  //         const q = query(
  //           ordersRef,

  //           where('tailorEmail', '==', userEmail)
  //         );

  //         const querySnapshot = await getDocs(q);
  //         // console.log(querySnapshot);

  //         setOrders(
  //           querySnapshot.docs.map((doc) => ({
  //             ...doc.data(),
  //             id: doc.id,
  //           }))
  //         );

  //         console.log('sadas', orders);

  //         dispatch(ordersInfo(orders));

  //         // });
  //       } catch (error: any) {
  //         console.log(error.message);
  //         // setFirebaseErr(error.message);
  //       }
  //     };
  //     getOrders();
  //   }, 2500);

  //   return () => clearTimeout(timeout);

  //   // console.log('Helloooooo there ', ordersSlice);
  // }, []);

  const emptyArray: any = [];

  const onSubmit = async (data: any) => {
    dispatch(setButtonLoading());
    // console.log(data.email);

    // console.log(data);

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // console.log(auth?.currentUser?.uid);

      if (user) {
        tailorList.map((tailor) => {
          // console.log(tailor.user.id);
          if (tailor.tailorID === auth?.currentUser?.uid) {
            // dispatch(studentInfo(student));
            // console.log("yes");
            // orderList.map((order) => {
            //   if (order.tailorEmail === tailor.email) {
            //     emptyArray.push(order);
            //   }
            // });

            dispatch(TailorInfo(tailor));

            navigation.navigate('HomeStack');
          }
        });

        clientList.map((client) => {
          if (client.clientID === auth?.currentUser?.uid) {
            dispatch(ClientInfo(client));

            // console.log("teacher", teacher.user.id);

            navigation.navigate('AvailableTailors');
          }
        });
        dispatch(stopButtonLoading());
        // reset({
        //   email: '',
        //   password: '',
        // });

        // navigation.navigate("HomeStack");
        // setLoading(!loading);/searchEngines
      } else {
        // setLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
      setFirebaseErr(error.message);
    }

    // console.log(data);
    // navigation.navigate('HomeStack')
  };
  dispatch(TailorsInfo(tailorList));

  const data = [
    { value: 'Apple', key: 1 },
    { value: 'Samsung', key: 2 },
    { value: 'Blackberry', key: 3 },
  ];

  // console.log(orderList);
  // console.log(emptyArray);

  // dispatch(ordersInfo(emptyArray));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}
    >
      <View style={styles.hero}>
        <Text style={styles.heading}>Log In to your Account</Text>
        <Text style={styles.subHeading}>Fill in the Information.</Text>
      </View>
      <View style={styles.input}>
        <FieldInput
          label="Email:"
          placeholder="example@gmail.com"
          control={control}
          name={'email'}
          secureTextEntry={false}
        />
        {errors.email && (
          <NativeUIText textColor="red">email is required</NativeUIText>
        )}
        <FieldInput
          label="Password:"
          placeholder="******"
          control={control}
          name={'password'}
          secureTextEntry={true}
        />
        {errors.password && (
          <NativeUIText textColor="red">password is required</NativeUIText>
        )}
        {/* <PasswordField label="Password:" placeholder="xxxxxxxxxx" password /> */}
      </View>

      <View
        // activeOpacity={0.8}
        // onPress={() => navigation.navigate('HomeStack')}
        style={styles.create}
      >
        <BlueButton
          text="Login"
          onClickButton={handleSubmit(onSubmit)}
          isLoading={buttonSlice.buttonLoading}
        />
      </View>

      {/* <View>
        {
          <CustomModalText
            title={'Succesfully logged in '}
            visible={showModal}
            setVisible={setShowModal}
            extraFunction={() => {
              navigation.navigate('HomeStack');
            }}
            showIcon={false}
          />
        }
      </View> */}

      {/* <View style={styles.orSection}>
        <View style={styles.line}></View>
        <Text>or</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.btn}>
        <Ionicons
          name={'logo-google'}
          size={20}
          //   style={styles.eye}
        />
        <Text style={styles.text}>Sign In with Google</Text>
      </View> */}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  hero: {
    marginTop: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  subHeading: {
    color: COLORS.grey,
  },
  input: {
    marginTop: 30,
  },
  create: {
    marginTop: 40,
  },
  line: {
    width: 160,
    height: 2,
    backgroundColor: COLORS.grey,
    marginTop: 12,
  },
  orSection: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 10,
  },
  btn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: 350,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: COLORS.dark,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginTop: 40,
    flexDirection: 'row',
  },
  text: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
});
