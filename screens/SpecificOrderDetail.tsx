import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../utils/colors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
// import { CustomerType, customersInfo } from '../store/customer/customerSlice';
import { OrdersType, ordersInfo } from '../store/orders/ordersSlice';

interface Props {
  navigation?: any;
  route?: any;
}

const SpecificOrderDetail = ({ navigation, route }: Props) => {
  const { jacket, blouse, jumpsuit, suit, gown, agbada, shirt, pants } =
    route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.light,
        paddingHorizontal: 30,
        paddingTop: 65,
        alignItems: 'center',
      }}
    >
      <View>
        {shirt ? (
          <View>
            <Text>{shirt.bicep}</Text>
          </View>
        ) : (
          ''
        )}
      </View>
      <Text>hello there</Text>
    </View>
  );
};

export default SpecificOrderDetail;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingBottom: 15,
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
