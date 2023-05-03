import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../utils/colors';
import GreyInputField from '../components/inputFields/GreyInputField';
import { Ionicons } from '@expo/vector-icons';
import BlueButton from '../components/buttons/BlueButton';

const AddCustomer = ({ navigation }: any) => {
  const [checked, setChecked] = useState(0);
  const category = ['Male', 'Female'];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 30,
        paddingTop: 55,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={styles.heading}>Enter Customer Details</Text>
        </View>
        <View>
          <GreyInputField label="Name" placeholder="name" />
          <GreyInputField label="Number" placeholder="number" />
          <GreyInputField label="Email (Optional)" placeholder="email" />
          <GreyInputField label="Address (Optional)" placeholder="address" />
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
        <Text>Add Photo (optional)</Text>
        <View style={styles.cameraContainer}>
          <Text>
            <Ionicons name={'camera'} size={50} color={COLORS.grey} />
          </Text>
        </View>
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 20 }} activeOpacity={0.8}
        onPress={() => navigation.navigate('HomeStack')}>
          <BlueButton text="Save" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  },
  cameraContainer: {
    width: 130,
    height: 130,
    backgroundColor: COLORS.lightGrey,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddCustomer;
