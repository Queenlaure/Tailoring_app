import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { CustomerType, customersInfo } from '../store/customer/customerSlice';

import { COLORS } from '../utils/colors';
import Search from '../components/inputFields/Search';

const width = Dimensions.get('screen').width / 2 - 30;

const ViewCustomers = ({ navigation }: any) => {
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

  // console.log(filteredData);

  const clients = [
    { gender: 'male', name: 'John' },
    { gender: 'female', name: 'Queen' },
    { gender: 'male', name: 'Joseph' },
    { gender: 'female', name: 'Beri' },
  ];

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
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingTop: 55,
      }}
    >
      <View style={styles.hero}>
        <Text style={styles.heading}>View Customers</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Search setSearchText={handleFilter} searchText={searchText} />
      </View>
      <View>
        {searchText ? (
          <View
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {filteredData.map((customer, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('CustomerDetails', {
                    customer: customer,
                  })
                }
                style={styles.card}
                key={index}
              >
                <View
                  style={{
                    height: 115,
                    alignItems: 'center',
                  }}
                >
                  {customer.category === 'male' ? (
                    <Ionicons
                      name={'man'}
                      size={40}
                      color={COLORS.thickPurple}
                      style={styles.icon}
                    />
                  ) : (
                    <Ionicons
                      name={'woman'}
                      size={40}
                      color={COLORS.thickBlue}
                      style={styles.icon}
                    />
                  )}
                </View>
                <Text style={styles.name}>{customer.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <ScrollView
            style={{ height: '75%', width: '100%', marginTop: 15 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {customersSlice.map((customer, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('CustomerDetails', {
                      customer: customer.name,
                    })
                  }
                  style={styles.card}
                  key={index}
                >
                  <View
                    style={{
                      height: 115,
                      alignItems: 'center',
                    }}
                  >
                    {customer.category === 'male' ? (
                      <Ionicons
                        name={'man'}
                        size={40}
                        color={COLORS.thickPurple}
                        style={styles.icon}
                      />
                    ) : (
                      <Ionicons
                        name={'woman'}
                        size={40}
                        color={COLORS.thickBlue}
                        style={styles.icon}
                      />
                    )}
                  </View>
                  <Text style={styles.name}>{customer.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ViewCustomers;

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    // marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  searchContainer: {
    // height: 50,
    // width: 350,
    // backgroundColor: COLORS.light,
    // borderRadius: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 30,
    marginStart: 11,
  },
  input: {
    fontSize: 14,
    // fontWeight: "bold",
    color: COLORS.dark,
    flex: 1,
  },
  card: {
    width,
    marginHorizontal: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    elevation: 1,
    shadowColor: '#52006A',
    borderColor: '#52006A',
  },

  icon: {
    marginTop: 32,
  },
  name: {
    marginTop: -40,
    paddingBottom: 40,
  },
});
