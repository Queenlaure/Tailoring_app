import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../utils/colors';
import MainHeading from '../components/headings/MainHeading';
import InputField from '../components/inputFields/InputField';
import GreyInputField from '../components/inputFields/GreyInputField';
import BlueButton from '../components/buttons/BlueButton';
import Calendar from '../components/inputFields/Calendar';
import UrgentCheckBox from '../components/buttons/UrgentCheckBox';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  userOption?: any;
  route?: any;
}

const Shirt = ({ route, userOption }: Props) => {
  const { selectedUserOption } = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 30,
        paddingTop: 55,
        alignItems: 'center',
      }}
    >
      <MainHeading title="John Davie" userOption={selectedUserOption} />
      <View style={{ height: 580 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <GreyInputField label="Chest:" />
          <GreyInputField label="Waist:" />
          <GreyInputField label="Seat:" />
          <GreyInputField label="Bicep:" />
          <GreyInputField label="Shirt length:" />
          <GreyInputField label="Shoulder width:" />
          <GreyInputField label="Sleeve length:" />
          <GreyInputField label="Cuff circumference:" />
          <GreyInputField label="Collar size:" />
          <GreyInputField label="Charge (FCFA):" placeholder="0000" />
          {/* <Calendar label='Delivery date' placeholder='Thur 4 May 2023' /> */}
          <View>
            <UrgentCheckBox />
          </View>
          <View style={styles.picSection}>
            <View>
              <Text style={{fontWeight:'bold', fontSize:14}}>Add Cloth Image</Text>
              <View style={styles.cameraContainer}>
                <Text>
                  <Ionicons name={'camera'} size={50} color={COLORS.grey} />
                </Text>
              </View>
            </View>
            <View style={{width:130, height: 130,}}>
            <Image source={require('../assets/tailor2.jpg')} style={styles.pic}  /> 
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ marginTop: 30 }}>
        <BlueButton text="Save" />
      </View>
    </View>
  );
};

export default Shirt;

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
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  pic: {
    width: '100%',
    height: '100%',
    marginTop: 30
  },
});
