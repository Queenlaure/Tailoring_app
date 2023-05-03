import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import InputField from '../components/inputFields/InputField';
import Radio from '../components/buttons/RadioButton';

import { COLORS } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import BlueButton from '../components/buttons/BlueButton';

const width = Dimensions.get('screen').width / 2 - 30;

const Home = ({ navigation }: any) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        marginTop: 25,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          maxWidth: 300,
          maxHeight: 100,
        }}
      >
        <View style={styles.img1Container}>
          <Image
            source={require('../assets/tailor4.jpg')}
            style={styles.img1}
          />
        </View>
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Precious</Text>
          <Text>Molyko</Text>
        </View>
      </View>
      <View>
        <View style={styles.img2Container}>
          <Image
            source={require('../assets/tailor4.jpg')}
            style={styles.img2}
          />
        </View>
        <View>
          <Text style={{ marginTop: 40, fontWeight: 'bold' }}>EXPLORE</Text>
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
                  marginTop: 32,
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
                  marginTop: 32,
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
            <View style={styles.viewCustomers}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 32,
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
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
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
    marginTop: 10,
  },
  img2Container: {
    width: '100%',
    height: '50%',
  },
  addCustomer: {
    backgroundColor: COLORS.purple,
    width,
    height: 140,
    flex: 2,
    margin: 5,
    borderRadius: 10,
  },
  addOrder: {
    backgroundColor: COLORS.lightBlue,
    width,
    height: 140,
    flex: 2,
    margin: 5,
    borderRadius: 10,
  },
  viewCustomers: {
    backgroundColor: COLORS.brown,
    width,
    height: 140,
    flex: 2,
    margin: 5,
    borderRadius: 10,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
