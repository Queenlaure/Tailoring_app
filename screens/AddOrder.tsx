import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../utils/colors';
import Search from '../components/inputFields/Search';
import { Entypo } from '@expo/vector-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { CustomerType, customersInfo } from '../store/customer/customerSlice';

const AddOrder = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<CustomerType[]>(
    [] as CustomerType[]
  );
  const [customers, setCustomers] = useState<any>([]);

  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const customersSlice = useSelector(
    (state: RootState) => state.customer.customers
  );

  // console.log('queens', filteredData);
  // console.log('queens', customers);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        // Create a query against the collection.
        const customerRef = collection(db, 'customers');
        const q = query(
          customerRef,
          where('tailorEmail', '==', tailorSlice.user.email)
        );

        const querySnapshot = await getDocs(q);
        setCustomers(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        dispatch(customersInfo(customers));
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

    getCustomers();
  }, [customers]);

  const handleFilter = (valueText: any) => {
    setSearchText(valueText);
    const newFilter: CustomerType[] = customersSlice?.filter((value) => {
      return value.name?.toLowerCase().includes(searchText.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
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
          <Search
            label="Enter name or Contact"
            setSearchText={handleFilter}
            searchText={searchText}
          />
        </View>
        {searchText ? (
          // filteredData.map
          <View>
            {filteredData.map((customer, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.clientName}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('SelectItem', {
                      customer: customer.name,
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
                    {customer.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View>
            {customersSlice.map((customer, index) => {
              return (
                <TouchableOpacity
                  style={styles.clientName}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('SelectItem', {
                      customer: customer.name,
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
                    {customer.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
