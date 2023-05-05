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

const Jacket = ({route, userOption}: Props) => {
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
      <GreyInputField label='Shoulder:' />
      <GreyInputField label='Sleeve length:' />
      <GreyInputField label='Chest:' />
      <GreyInputField label='Waist:' />
      <GreyInputField label='Center back:' />
      <GreyInputField label='Charge (FCFA):' placeholder='0000' />
    </ScrollView>
    </View>
    <View style={{marginTop: 30}}>
    <BlueButton text='Save' />
    </View>
    
    </View>
  );
};

export default Jacket;

const styles = StyleSheet.create({

});

