import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { COLORS } from '../utils/colors';
import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { CustomerType, customersInfo } from '../store/customer/customerSlice';
import { OrdersType, ordersInfo } from '../store/orders/ordersSlice';
import Search from '../components/inputFields/Search';
import CustomModalText from '../components/modals/CustomModalText';

const Orders = ({ navigation }: any) => {
  const categories = ['ALL', 'URGENT', 'COMPLETED'];
  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  const [searchText, setSearchText] = useState('');
  // const [completed, setCompleted] = useState(false);
  const [filteredData, setFilteredData] = useState<OrdersType[]>(
    [] as OrdersType[]
  );
  const [showModal, setShowModal] = useState(false);

  const UpdateToCompleted = (id: string) => {
    const docRef = doc(db, 'orders', id);
    return updateDoc(docRef, { completed: true })
      .then((docRef) => {
        setShowModal(!showModal);

        console.log(
          'A New Document Field has been added to an existing document'
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}
          >
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const dispatch = useDispatch();

  // const [searchText, setSearchText] = useState('');
  // const [filteredData, setFilteredData] = useState<CustomerType[]>(
  //   [] as CustomerType[]
  // );
  const [orders, setOrders] = useState<any>([]);

  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const ordersSlice = useSelector((state: RootState) => state.orders);

  // console.log('queens', filteredData);
  // console.log('queens', customers);

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

  const handleFilter = (valueText: any) => {
    setSearchText(valueText);
    const newFilter: OrdersType[] = ordersSlice?.orders.filter((value) => {
      return value.customerName
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // if (completed) {
  //   console.log(completed);
  // }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 65,
      }}
    >
      <CategoryList />
      <View style={{ alignItems: 'center' }}>
        <View>
          <Search setSearchText={handleFilter} searchText={searchText} />
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: COLORS.lightGrey,
          marginTop: 20,
        }}
      ></View>

      {searchText ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredData.map((order: OrdersType, index: any) => (
            <View>
              <TouchableOpacity
                key={index}
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
                style={style.cardSection}
              >
                <View style={{ width: 150, height: 110 }}>
                  <Image
                    source={{
                      uri: order.imageUrl,
                    }}
                    style={style.pic}
                  />
                </View>
                <View
                  style={{ justifyContent: 'center', paddingHorizontal: 5 }}
                >
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {order.customerName}
                  </Text>
                  <Text style={{ fontSize: 13 }}>
                    {order.agbada?.charge ||
                      order.blouse?.charge ||
                      order.gown?.charge ||
                      order.jacket?.charge ||
                      order.jumpsuit?.charge ||
                      order.pants?.charge ||
                      order.shirt?.charge ||
                      order.suit?.charge}
                    frs (1 item)
                  </Text>
                  <Text style={{ fontSize: 13, color: COLORS.lightBrown }}>
                    Due: 30/08/2023
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    UpdateToCompleted(order.id);
                  }}
                  style={{
                    justifyContent: 'flex-end',
                  }}
                >
                  <MaterialIcons name="archive" size={24} color="grey" />
                </TouchableOpacity>
              </TouchableOpacity>

              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGrey,
                  marginTop: 20,
                }}
              ></View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {ordersSlice.orders.map((order: OrdersType, index: any) => (
            <View>
              {catergoryIndex === 0 && order.completed === false ? (
                <View>
                  <TouchableOpacity
                    key={index}
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
                    style={style.cardSection}
                  >
                    <View style={{ width: 150, height: 110 }}>
                      <Image
                        source={{
                          uri: order.imageUrl,
                        }}
                        style={style.pic}
                      />
                    </View>
                    <View
                      style={{ justifyContent: 'center', paddingHorizontal: 5 }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {order.customerName}
                      </Text>
                      <Text style={{ fontSize: 13 }}>
                        {order.agbada?.charge ||
                          order.blouse?.charge ||
                          order.gown?.charge ||
                          order.jacket?.charge ||
                          order.jumpsuit?.charge ||
                          order.pants?.charge ||
                          order.shirt?.charge ||
                          order.suit?.charge}
                        frs (1 item)
                      </Text>
                      <Text style={{ fontSize: 13 }}>
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
                      <Text style={{ fontSize: 13, color: COLORS.lightBrown }}>
                        Due: 30/08/2023
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        UpdateToCompleted(order.id);
                      }}
                      style={{
                        justifyContent: 'flex-end',
                      }}
                    >
                      <MaterialIcons name="archive" size={24} color="grey" />
                    </TouchableOpacity>
                  </TouchableOpacity>

                  {catergoryIndex === 0 && order.completed === false ? (
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: COLORS.lightGrey,
                        marginTop: 20,
                      }}
                    ></View>
                  ) : (
                    ''
                  )}
                </View>
              ) : catergoryIndex === 1 &&
                order.urgent === true &&
                order.completed === false ? (
                <View>
                  <TouchableOpacity
                    key={index}
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
                    style={style.cardSection}
                  >
                    <View style={{ width: 150, height: 110 }}>
                      <Image
                        source={{
                          uri: order.imageUrl,
                        }}
                        style={style.pic}
                      />
                    </View>
                    <View
                      style={{ justifyContent: 'center', paddingHorizontal: 5 }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {order.customerName}
                      </Text>
                      <Text style={{ fontSize: 13 }}>
                        {order.agbada?.charge ||
                          order.blouse?.charge ||
                          order.gown?.charge ||
                          order.jacket?.charge ||
                          order.jumpsuit?.charge ||
                          order.pants?.charge ||
                          order.shirt?.charge ||
                          order.suit?.charge}
                        frs (1 item)
                      </Text>
                      <Text style={{ fontSize: 13 }}>
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
                      <Text style={{ fontSize: 13, color: COLORS.lightBrown }}>
                        Due: 30/08/2023
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        UpdateToCompleted(order.id);
                      }}
                      style={{
                        justifyContent: 'flex-end',
                      }}
                    >
                      <MaterialIcons name="archive" size={24} color="grey" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {catergoryIndex === 1 && order.urgent === true ? (
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: COLORS.lightGrey,
                        marginTop: 20,
                      }}
                    ></View>
                  ) : (
                    ''
                  )}
                </View>
              ) : catergoryIndex === 2 && order.completed ? (
                <View>
                  <TouchableOpacity
                    key={index}
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
                    style={style.cardSection}
                  >
                    <View style={{ width: 150, height: 110 }}>
                      <Image
                        source={{
                          uri: order.imageUrl,
                        }}
                        style={style.pic}
                      />
                    </View>
                    <View
                      style={{ justifyContent: 'center', paddingHorizontal: 5 }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {order.customerName}
                      </Text>
                      <Text style={{ fontSize: 13 }}>
                        {order.agbada?.charge ||
                          order.blouse?.charge ||
                          order.gown?.charge ||
                          order.jacket?.charge ||
                          order.jumpsuit?.charge ||
                          order.pants?.charge ||
                          order.shirt?.charge ||
                          order.suit?.charge}
                        frs (1 item)
                      </Text>
                      <Text style={{ fontSize: 13 }}>
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
                      <Text style={{ fontSize: 13, color: COLORS.lightBrown }}>
                        Due: 30/08/2023
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {catergoryIndex === 2 && order.completed ? (
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: COLORS.lightGrey,
                        marginTop: 20,
                      }}
                    ></View>
                  ) : (
                    ''
                  )}
                </View>
              ) : (
                ''
              )}

              {/* <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGrey,
                  marginTop: 20,
                }}
              ></View> */}
            </View>
          ))}
        </ScrollView>
      )}
      <View>
        {
          <CustomModalText
            title={'Order completed successfully 🎊 '}
            visible={showModal}
            setVisible={setShowModal}
            extraFunction={() => {
              navigation.navigate('HomeStack');
            }}
            showIcon={false}
          />
        }
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
    // marginBottom: 25,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold',
  },
  categoryTextSelected: {
    color: COLORS.blue,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.blue,
  },
  searchContainer: {
    height: 50,
    width: '90%',
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    // fontWeight: "bold",
    color: COLORS.dark,
    flex: 1,
  },
  cardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 30,
  },
  pic: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
});

export default Orders;
