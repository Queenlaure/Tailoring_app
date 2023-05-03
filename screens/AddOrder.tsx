import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../utils/colors';
import Search from '../components/inputFields/Search';
import { Entypo } from '@expo/vector-icons';

const AddOrder = ({ navigation }: any) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 30,
        paddingTop: 65,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.heading}>Order</Text>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddCustomer')}
        >
          <Text>
            <Entypo name="plus" size={24} color={COLORS.white} />
          </Text>
          <Text style={styles.text}>Add New Customer</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 30 }}>
          <Search label="Enter name or Contact" />
        </View>
        <TouchableOpacity
          style={styles.clientName}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SelectItem')}
        >
          <Text
            style={{ marginLeft: 10, color: COLORS.darkGrey, fontSize: 15 }}
          >
            John Davie
          </Text>
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
  btn: {
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    width: 250,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 30,
    flexDirection: 'row',
  },
  text: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },
  clientName: {
    backgroundColor: COLORS.white,
    width: 350,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: COLORS.lightGrey,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    marginTop: 20,
  },
});

export default AddOrder;
