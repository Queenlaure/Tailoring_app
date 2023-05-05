import { View, Text , StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import { COLORS } from '../utils/colors';
import MainHeading from '../components/headings/MainHeading';
import InputField from '../components/inputFields/InputField';
import GreyInputField from '../components/inputFields/GreyInputField';
import BlueButton from '../components/buttons/BlueButton';

interface Props {
userOption?: any;
route?: any;
}

const Blouse = ({route, userOption}: Props) => {
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
      <GreyInputField label='Back length:' />
      <GreyInputField label='Full Shoulder:' />
      <GreyInputField label='Shoulder strap:' />
      <GreyInputField label='Back neck depth:' />
      <GreyInputField label='Front neck depth:' />
      <GreyInputField label='Shoulder to apex:' />
      <GreyInputField label='Front length:' />
      <GreyInputField label='Chest:' />
      <GreyInputField label='Waist:' />
      <GreyInputField label='Sleeve length:' />
      <GreyInputField label='Arm hole:' />
      <GreyInputField label='Sleeve round:' />
      <GreyInputField label='Arm round:' />
      <GreyInputField label='Charge (FCFA):' placeholder='0000' />
    </ScrollView>
    </View>
    <View style={{marginTop: 30}}>
    <BlueButton text='Save' />
    </View>
    
    </View>
  );
};

export default Blouse;

const styles = StyleSheet.create({

});

