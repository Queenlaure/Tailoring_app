import { View, Text, StyleSheet } from 'react-native';
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

const CustomerDetails = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  // const [searchText, setSearchText] = useState('');
  // const [filteredData, setFilteredData] = useState<CustomerType[]>(
  //   [] as CustomerType[]
  // );
  const [orders, setOrders] = useState<any>([]);

  const ordersSlice = useSelector((state: RootState) => state.orders);
  const customersSlice = useSelector(
    (state: RootState) => state.customer.customers
  );

  useEffect(() => {
    const getOrders = async () => {
      try {
        // Create a query against the collection.
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          // where('tailorEmail', '==', tailorSlice.user.email)
          where(
            'customerName',
            '==',
            customersSlice.map((customer) => customer.name)
          )
        );

        const querySnapshot = await getDocs(q);
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
        // console.log(error.message);
        // setFirebaseErr(error.message);
      }
    };

    console.log('Helloooooo there ', ordersSlice);

    getOrders();
  }, []);

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
        {ordersSlice.orders.map((order: any, index: any) => (
          <View key={index}>{order.name}</View>
        ))}
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
});
