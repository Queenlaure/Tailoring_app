import { View, Text , StyleSheet, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import { COLORS } from '../utils/colors';
import MainHeading from '../components/headings/MainHeading';
import InputField from '../components/inputFields/InputField';
import GreyInputField from '../components/inputFields/GreyInputField';
import BlueButton from '../components/buttons/BlueButton';
import UrgentCheckBox from '../components/buttons/UrgentCheckBox';
import { Ionicons } from '@expo/vector-icons';


interface Props {
userOption?: any;
route?: any;
}

const Agbada = ({route, userOption}: Props) => {
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
      <GreyInputField label='Neck:' />
      <GreyInputField label='Shoulder:' />
      <GreyInputField label='Chest:' />
      <GreyInputField label='Waist:' />
      <GreyInputField label='Hips:' />
      <GreyInputField label='Thigh:' />
      <GreyInputField label='Knee:' />
      <GreyInputField label='Calf:' />
      <GreyInputField label='Ankle:' />
      <GreyInputField label='Bicep:' />
      <GreyInputField label='Wrist:' />
      <GreyInputField label='Charge (FCFA):' placeholder='0000' />
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
    <View style={{marginTop: 30}}>
    <BlueButton text='Save' />
    </View>
    
    </View>
  );
};

export default Agbada;

const styles = StyleSheet.create({
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
