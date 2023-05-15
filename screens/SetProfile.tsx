import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import InputField from '../components/inputFields/InputField';
import Radio from '../components/buttons/RadioButton';
import { COLORS } from '../utils/colors';
import BlueButton from '../components/buttons/BlueButton';

const SetProfile = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, paddingTop: 70, backgroundColor: COLORS.white }}>
      <View style={styles.hero}>
        <Text style={styles.heading}>Set Up your profile</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <InputField placeholder="Shop Name" />
        <InputField placeholder="Business (Email Address)" />
        <InputField placeholder="Shop Address" />
        <InputField placeholder="Phone Number" />
      </View>
      <View style={styles.radioSection}>
        <Text style={styles.radioText}>Wears for:</Text>
        <Radio />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('HomeStack')}
      >
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <BlueButton text="Save" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SetProfile;

const styles = StyleSheet.create({
  hero: {
    marginTop: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  radioSection: {
    marginTop: 20,
  },
  radioText: {
    fontWeight: 'bold',
    marginLeft: 40,
  },
});
