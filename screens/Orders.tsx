import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS } from '../utils/colors';
import React, { useState, useEffect, useRef } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { CustomerType, customersInfo } from '../store/customer/customerSlice';
import { OrdersType, ordersInfo } from '../store/orders/ordersSlice';
import Search from '../components/inputFields/Search';
import CustomModalText from '../components/modals/CustomModalText';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Orders = ({ navigation }: any) => {
  const categories = ['ALL', 'URGENT', 'COMPLETED'];
  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  const [searchText, setSearchText] = useState('');
  // const [completed, setCompleted] = useState(false);
  const [filteredData, setFilteredData] = useState<OrdersType[]>(
    [] as OrdersType[]
  );
  const [showModal, setShowModal] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState<any>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const UpdateToCompleted = async (id: string) => {
    const docRef = doc(db, 'orders', id);
    return await updateDoc(docRef, { completed: true })
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

  // console.log(catergoryIndex);

  const dispatch = useDispatch();

  // const [searchText, setSearchText] = useState('');
  // const [filteredData, setFilteredData] = useState<CustomerType[]>(
  //   [] as CustomerType[]
  // );
  const [orders, setOrders] = useState<any>([]);

  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const ordersSlice = useSelector((state: RootState) => state.orders);

  const doSomething = async () => {
    console.log('Action fgwhgfhgfghtwr asdasd performed at 6:15am');
    await schedulePushNotification();
  };

  var now: any = new Date();
  var millisTill9: any =
    (new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      7,
      13,
      0,
      0
    ) as any) - now;
  if (millisTill9 < 0) {
    millisTill9 += 86400000; // it's after 9am, try 9am tomorrow.
  }
  setTimeout(doSomething, millisTill9);

  // console.log('queens');
  // console.log('queens', ordersSlice.orders[0].dueDate);
  // var orderDate;
  // var previousDay;
  ordersSlice.orders.map((order) => {
    const today = new Date();
    const orderDate = new Date(order.dueDate.seconds * 1000);
    orderDate.setDate(orderDate.getDate() - 1);

    if (today === orderDate) {
      // console.log('The date is exactly one day before today');
    } else {
      // console.log('The date is not exactly one day before today');
      var now: any = new Date();
      var millisTill9: any =
        (new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          12,
          0,
          0,
          0
        ) as any) - now;
      if (millisTill9 < 0) {
        millisTill9 += 86400000; // it's after 9am, try 9am tomorrow.
      }
      setTimeout(doSomething, millisTill9);
    }
  });

  // const edit = new Date(
  //   ordersSlice?.orders[0]?.dueDate.seconds * 1000
  // ).toLocaleDateString('en-US', {
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });

  // console.log(edit);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     const getOrders = async () => {
  //       try {
  //         // Create a query against the collection.
  //         const ordersRef = collection(db, 'orders');
  //         const q = query(
  //           ordersRef,
  //           // where('tailorEmail', '==', tailorSlice.user.email)
  //           where('tailorEmail', '==', tailorSlice.user.email)
  //         );

  //         const querySnapshot = await getDocs(q);
  //         // console.log(querySnapshot);

  //         setOrders(
  //           querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //         );

  //         dispatch(ordersInfo(orders));
  //         // console.log('queens', customers);

  //         // querySnapshot.docs.forEach((doc) => {
  //         //   dispatch(customersInfo([doc.data()]));
  //         //   // doc.data() is never undefined for query doc snapshots
  //         //   console.log(doc.id, ' => cc ', doc.data());
  //         // });
  //       } catch (error: any) {
  //         console.log(error.message);
  //         // setFirebaseErr(error.message);
  //       }
  //     };

  //     // console.log('Helloooooo there ', ordersSlice);

  //     getOrders();
  //   }, 2500);

  //   return () => clearTimeout(timeout);
  // }, []);

  // console.log('asdsa');

  // const timeObj = new Timestamp();

  // console.log(timeObj instanceof Timestamp)
  // console.log(timeObj.toDate());

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
            <View key={index}>
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
            <View key={index}>
              {catergoryIndex === 0 && order.completed === false ? (
                <View key={index}>
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
                        {/* {new Date(order.dueDate?.seconds * 1000)} */}
                        {/* {order.dueDate} */}
                        {new Date(
                          order?.dueDate.seconds * 1000
                        ).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
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
                <View key={index}>
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
                        {/* {new Date(
                          order?.dueDate.seconds * 1000
                        ).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })} */}
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
                <View key={index}>
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
                        {new Date(
                          order?.dueDate.seconds * 1000
                        ).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'TailorEazy ✂️',
      body: "Naomi's order is due tommorow",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

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
