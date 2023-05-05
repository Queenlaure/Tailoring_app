import { View, Text , StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import { COLORS } from '../utils/colors';
import MainHeading from '../components/headings/MainHeading';
import InputField from '../components/inputFields/InputField';
import GreyInputField from '../components/inputFields/GreyInputField';
import BlueButton from '../components/buttons/BlueButton';
import Calendar from '../components/inputFields/Calendar';
import UrgentRadioBtn from '../components/buttons/UrgentRadioBtn';

interface Props {
userOption?: any;
route?: any;
}

const Shirt = ({route,userOption}: Props) => {
   const {selectedUserOption} = route.params;
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
    <MainHeading title='John Davie' userOption={selectedUserOption}  />
    <View style={{height:580}} >
    <ScrollView showsVerticalScrollIndicator={false} >
      <GreyInputField label='Chest:' />
      <GreyInputField label='Waist:' />
      <GreyInputField label='Seat:' />
      <GreyInputField label='Bicep:' />
      <GreyInputField label='Shirt length:' />
      <GreyInputField label='Shoulder width:' />
      <GreyInputField label='Sleeve length:' />
      <GreyInputField label='Cuff circumference:' />
      <GreyInputField label='Collar size:' />
      <GreyInputField label='Charge (FCFA):' placeholder='0000' />
      {/* <Calendar label='Delivery date' placeholder='Thur 4 May 2023' /> */}
      <View>
        <UrgentRadioBtn />
      </View>
    </ScrollView>
    </View>
    <View style={{marginTop: 30}}>
    <BlueButton text='Save' />
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
});
