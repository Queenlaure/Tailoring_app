import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../utils/colors';
import MainHeading from '../components/headings/MainHeading';
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

const CustomerDetails = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();

  const { customer } = route.params;

  // console.log(customer);

  // console.log(customer);

  // const [searchText, setSearchText] = useState('');
  // const [filteredData, setFilteredData] = useState<CustomerType[]>(
  //   [] as CustomerType[]
  // );
  const [orders, setOrders] = useState<any>([]);

  const ordersSlice = useSelector((state: RootState) => state.orders);
  const customersSlice = useSelector(
    (state: RootState) => state.customer.customers
  );

  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(!active);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        // Create a query against the collection.
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          // where('tailorEmail', '==', tailorSlice.user.email)
          where('customerName', '==', customer)
        );

        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);

        setOrders(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        // dispatch(ordersInfo(orders));
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
    // console.log(customer);
  }, []);

  // console.log(orders);

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
        <Text style={styles.heading}>Available Measurements</Text>
      </View>
      <View>
        {orders.map((order: OrdersType, index: any) => (
          <TouchableOpacity
            key={index}
            style={styles.clientName}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('SpecificOrderDetail', {
                shirt: order.shirt,
                jacket: order.jacket,
                blouse: order.blouse,
                jumpsuit: order.jumpsuit,
                suit: order.suit,
                gown: order.gown,
                pants: order.pants,
                agbada: order.agbada,
                imageUrl: order.imageUrl,
              })
            }
          >
            <Text
              style={{
                marginLeft: 10,
                color: COLORS.darkGrey,
                fontSize: 15,
              }}
            >
              {order.shirt
                ? 'Shirt'
                : order.gown
                ? 'Gown'
                : order.agbada
                ? 'Agbada'
                : order.blouse
                ? 'Blouse'
                : order.jacket
                ? 'Jacket'
                : order.jumpsuit
                ? 'Jumpsuit'
                : order.pants
                ? 'Pants'
                : order.suit
                ? 'Suit'
                : ''}
            </Text>
            {/* <Text>{order.shirt ? 'Shirt' : ''}</Text>
            <Text>{order.suit ? 'Suit' : ''}</Text>
            <Text>{order.gown ? 'Gown' : ''}</Text>
            <Text>{order.pants ? 'Pants' : ''}</Text>
            <Text>{order.jacket ? 'Jacket' : ''}</Text>
            <Text>{order.agbada ? 'Agbada' : ''}</Text>
            <Text>{order.blouse ? 'Blouse' : ''}</Text>
            <Text>{order.jumpsuit ? 'Jumpsuit' : ''}</Text> */}
          </TouchableOpacity>
        ))}
        {/* <Text>{customer?.name}</Text> */}
      </View>
    </View>
  );
};

export default CustomerDetails;

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
