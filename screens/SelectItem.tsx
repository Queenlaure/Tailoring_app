import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import SelectItemRadioBtn from '../components/buttons/SelectItemRadioBtn';
import { COLORS } from '../utils/colors';
import { Entypo } from '@expo/vector-icons';

interface Props {
  navigation?: any;
  route?: any;
}

const SelectItem = ({ navigation, route }: Props) => {
  const { customer } = route.params;

  const [userOption, setUserOption] = useState('');

  const data = [
    { value: 'Shirt', id: 1 },
    { value: 'Gown', id: 2 },
    { value: 'Agbada', id: 3 },
    { value: 'Pants', id: 4 },
    { value: 'Jumpsuit', id: 5 },
    // { value: 'Corperate', id: 6 },
    { value: 'Suit', id: 7 },
    { value: 'Jacket', id: 8 },
    { value: 'Blouse', id: 9 },
  ];

  // const measurement = setUserOption();

  // const handleSelectedOption = (data) => {
  //   setUserOption(data.id);
  // };

  const handleNextPress = () => {
    if (userOption) {
      navigation.navigate(userOption, {
        selectedUserOption: userOption,
        customer: customer,
      });
    } else {
      navigation.navigate('Get Started', { customer: customer });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightestGrey,
        paddingHorizontal: 30,
        paddingTop: 65,
        alignItems: 'center',
      }}
    >
      <Text style={styles.heading}>Select Item</Text>

      <SelectItemRadioBtn
        setUserOption={setUserOption}
        userOption={userOption}
        data={data}
      />

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.blue,
          width: 120,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          flexDirection: 'row',
          borderRadius: 10,
        }}
        onPress={handleNextPress}
      >
        <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
          Next
        </Text>
        <Entypo name="controller-next" size={26} color={COLORS.white} />
      </TouchableOpacity>
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
});

export default SelectItem;
