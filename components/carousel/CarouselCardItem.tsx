import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import { OrdersType, ordersInfo } from '../../store/orders/ordersSlice';

export const SLIDER_WIDTH = Dimensions.get('window').width + 40;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

interface Props {
  item: OrdersType;
  index: number;
}
const CarouselCardItem = ({ item, index }: Props) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.header}>{item.customerName}</Text>
      <Text style={styles.body}>
        {item.shirt
          ? 'Shirt'
          : item.gown
          ? 'Gown'
          : item.agbada
          ? 'Agbada'
          : item.blouse
          ? 'Blouse'
          : item.jacket
          ? 'Jacket'
          : item.jumpsuit
          ? 'Jumpsuit'
          : item.pants
          ? 'Pants'
          : item.suit
          ? 'Suit'
          : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 0,
    width: ITEM_WIDTH,
    // paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: '80%',
  },
  header: {
    color: '#222',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 5,
  },
  body: {
    color: '#222',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 2,
  },
});

export default CarouselCardItem;

function dispatch(arg0: { payload: OrdersType[]; type: 'orders/ordersInfo' }) {
  throw new Error('Function not implemented.');
}
