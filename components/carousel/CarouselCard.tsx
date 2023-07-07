import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
// import data from './data'

import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase-config';
import { ordersInfo } from '../../store/orders/ordersSlice';

const CarouselCards = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const [orders, setOrders] = useState<any>([]);
  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const ordersSlice = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    const getOrders = async () => {
      try {
        // Create a query against the collection.
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          // where('tailorEmail', '==', tailorSlice.user.email)
          where('tailorEmail', '==', tailorSlice.user.email)
        );

        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);

        setOrders(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        dispatch(ordersInfo(orders));
        // console.log('queens', customers);

        // querySnapshot.docs.forEach((doc) => {
        //   dispatch(customersInfo([doc.data()]));
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, ' => cc ', doc.data());
        // });
      } catch (error: any) {
        console.log(error.message);
        // setFirebaseErr(error.message);
      }
    };

    // console.log('Helloooooo there ', ordersSlice);

    getOrders();
  }, [orders]);

  return (
    <View>
      <View>
        {ordersSlice.orders.length > 0 ? (
          <View>
            <Carousel
              layout="default"
              layoutCardOffset={9}
              ref={isCarousel}
              data={ordersSlice.orders}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true}
            />
            <Pagination
              dotsLength={ordersSlice.orders.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.92)',
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            />
          </View>
        ) : (
          <View>
            <Image
              source={require('../../assets/tailor-me7.jpg')}
              style={{ width: 330, height: 330 }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CarouselCards;

// function dispatch(arg0: { payload: import("../../store/orders/ordersSlice").OrdersType[]; type: "orders/ordersInfo"; }) {
//     throw new Error('Function not implemented.');
// }
