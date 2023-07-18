import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import InputField from '../components/inputFields/InputField';
import Radio from '../components/buttons/RadioButton';

import { COLORS } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import BlueButton from '../components/buttons/BlueButton';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { OrdersType, ordersInfo } from '../store/orders/ordersSlice';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCards from '../components/carousel/CarouselCard';

const width = Dimensions.get('screen').width / 2 - 30;

const Home = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<any>([]);
  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const ordersSlice = useSelector((state: RootState) => state.orders);

  // console.log(ordersSlice);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 40,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          maxWidth: 300,
          maxHeight: 100,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            marginTop: 10,
            backgroundColor: generateColor(),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <Image
            source={require('../assets/tailor4.jpg')}
            style={styles.img1}
          /> */}
          <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
            {tailorSlice.user?.shopName?.charAt(0)}
          </Text>
        </View>

        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {tailorSlice.user.shopName}
          </Text>
          <Text>{tailorSlice.user.address}</Text>
        </View>
      </View>
      <View>
        {/* <View style={styles.img2Container}>
          <Image
            source={require('../assets/tailor4.jpg')}
            style={styles.img2}
          />
        </View> */}

        {/* <View
          style={{
            // alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.lightestGrey,
            width: '100%',
            height: '47%',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 50,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              // justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <Text style={{ color: COLORS.blue }}>No of customers</Text>
              <View
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: COLORS.purple,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.thickPurple,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  32
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <Text style={{ color: COLORS.blue }}>All orders</Text>
              <View
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: COLORS.brown,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.thickBrown,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  12
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              // justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <Text style={{ color: COLORS.blue }}>Urgent Orders</Text>
              <View
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: COLORS.lightGreen,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.green,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  32
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <Text style={{ color: COLORS.blue }}>Completed Orders</Text>
              <View
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: COLORS.lightGrey,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.grey,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  12
                </Text>
              </View>
            </View>
          </View>
          
        </View> */}

        <View style={{ width: '100%', height: '62%' }}>
          <SafeAreaView style={styles.carouselContainer}>
            <CarouselCards />
          </SafeAreaView>
        </View>

        <View>
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>EXPLORE</Text>
          <View style={styles.btnsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AddCustomer')}
              style={styles.addCustomer}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 35,
                }}
              >
                <Ionicons
                  name={'person-add-outline'}
                  size={40}
                  color={COLORS.thickPurple}
                  //   style={styles.eye}
                />
                <Text style={{ color: COLORS.thickPurple, fontSize: 11 }}>
                  {' '}
                  Add Customer
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AddOrder')}
              style={styles.addOrder}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 35,
                }}
              >
                <Ionicons
                  name={'newspaper-outline'}
                  size={40}
                  color={COLORS.thickBlue}
                  //   style={styles.eye}
                />
                <Text style={{ color: COLORS.thickBlue, fontSize: 11 }}>
                  {' '}
                  Add Order
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ViewCustomers')}
              style={styles.viewCustomers}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 35,
                }}
              >
                <Ionicons
                  name={'people-outline'}
                  size={40}
                  color={COLORS.thickBrown}
                  //   style={styles.eye}
                />
                <Text style={{ color: COLORS.thickBrown, fontSize: 11 }}>
                  {' '}
                  View Customers
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // height: '40%',
    backgroundColor: 'white',
    borderRadius: 8,
    // width: ITEM_WIDTH,
    // width: 200,
    // paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    // width: ITEM_WIDTH,
    width: 200,
    height: 300,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    // paddingLeft: 20,
    paddingRight: 20,
  },
  carouselContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  img1: {
    width: '100%',
    height: '60%',
    borderRadius: 50,
  },
  img1Container: {
    width: '20%',
    height: '100%',
    marginTop: 60,
  },
  img2: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    margin: 10,
  },
  img2Container: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
  },
  addCustomer: {
    backgroundColor: COLORS.purple,
    width,
    height: 130,
    flex: 2,
    margin: 5,
    borderRadius: 10,
  },
  addOrder: {
    backgroundColor: COLORS.lightBlue,
    width,
    height: 130,
    flex: 2,
    margin: 5,
    borderRadius: 10,
  },
  viewCustomers: {
    backgroundColor: COLORS.brown,
    width,
    height: 130,
    flex: 2,
    margin: 5,
    borderRadius: 10,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
