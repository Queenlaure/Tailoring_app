import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '../firebase-config';
import {
  getDoc,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {
  TailorInfo,
  TailorsInfo,
  TailorType,
} from '../store/tailor/tailorSlice';
import { RootState } from '../store';
import { COLORS } from '../utils/colors';
import Search from '../components/inputFields/Search';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const AvailableTailors = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const [tailors, setTailors] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<TailorType[]>(
    [] as TailorType[]
  );

  const tailorRef = collection(db, 'tailor');

  useEffect(() => {
    const getTailors = async () => {
      const data = await getDocs(tailorRef);
      setTailors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    dispatch(TailorsInfo(tailors));
    dispatch(TailorInfo(tailors));

    getTailors();
  }, []);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const handleFilter = (valueText: any) => {
    setSearchText(valueText);
    const newFilter: TailorType[] = tailorSlice?.users.filter((value) => {
      return value.shopName?.toLowerCase().includes(searchText.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const [visible, setVisible] = useState(false);
  const toggleDropdown = () => {
    setVisible(!visible);
  };
  const renderDropdown = () => {
    if (visible) {
      return (
        <View>
          <Text style={style.dropdown}>
            Hello <Text>there</Text>
          </Text>
        </View>
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingHorizontal: 30,
        paddingTop: 45,
        // alignItems: 'center',
      }}
    >
      <View style={style.hero}>
        <Text style={style.heading}>Welcome 🤩 </Text>
        <Text style={style.subHeading}>
          Find your perfect tailor on our platform. Search now and get the best
          fit for your style!
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Search setSearchText={handleFilter} searchText={searchText} />
          {/* <Search setSearchText={handleFilter} searchText={searchText} /> */}
        </View>
      </View>

      {searchText ? (
        <View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: COLORS.lightGrey,
              // marginTop: 20,
            }}
          ></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredData.map((tailor: TailorType, index: any) => (
              <View>
                <TouchableOpacity
                  // key={index}
                  activeOpacity={0.8}
                  // onPress={() => navigation.navigate('SpecificOrderDetail')}
                  style={style.cardSection}
                >
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: generateColor(),
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {/* <Image
                   source={{
                     uri: order.imageUrl,
                   }}
                   style={style.pic}
                 /> */}
                      <Text style={style.initial}>
                        {/* {tailorSlice?.user?.shopName?.charAt(0)} */}
                        {tailor.shopName?.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'center', paddingLeft: 9 }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {tailor.shopName}
                      </Text>
                      <Text style={{ fontSize: 13, color: COLORS.darkGrey }}>
                        {tailor.address}
                      </Text>
                      <Text style={{ fontSize: 13, color: COLORS.darkGrey }}>
                        wears for:{' '}
                        <Text style={{ fontSize: 14, color: COLORS.green }}>
                          {tailor.specialty}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        // alignItems: 'flex-end',
                        // justifyContent: 'flex-end',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 23,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          navigation.navigate('CustomerGallery', {
                            email: tailor.email,
                          })
                        }
                      >
                        <MaterialCommunityIcons
                          name="view-gallery"
                          size={18}
                          // color={COLORS.darkGrey}
                          color="grey"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        //  onPress={() => {
                        //    toggleDropdown(renderDropdown);
                        //  }}
                      >
                        <MaterialIcons
                          name="chat"
                          size={18}
                          // color={COLORS.blue}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 13, color: COLORS.blue }}>
                      {tailor.contact}
                    </Text>
                  </View>
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
        </View>
      ) : (
        <View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: COLORS.lightGrey,
              // marginTop: 20,
            }}
          ></View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {tailorSlice.users.map((tailor: TailorType, index: any) => (
              <View>
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  // onPress={() => navigation.navigate('SpecificOrderDetail')}
                  style={style.cardSection}
                >
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: generateColor(),
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {/* <Image
                   source={{
                     uri: order.imageUrl,
                   }}
                   style={style.pic}
                 /> */}
                      <Text style={style.initial}>
                        {/* {tailorSlice?.user?.shopName?.charAt(0)} */}
                        {tailor.shopName?.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'center', paddingLeft: 9 }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {tailor.shopName}
                      </Text>
                      <Text style={{ fontSize: 13, color: COLORS.darkGrey }}>
                        {tailor.address}
                      </Text>
                      <Text style={{ fontSize: 13, color: COLORS.darkGrey }}>
                        wears for:{' '}
                        <Text style={{ fontSize: 14, color: COLORS.green }}>
                          {tailor.specialty}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={{}}>
                    <View
                      style={{
                        // alignItems: 'flex-end',
                        // justifyContent: 'flex-end',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 23,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          navigation.navigate('CustomerGallery', {
                            email: tailor.email,
                          })
                        }
                      >
                        <MaterialCommunityIcons
                          name="view-gallery"
                          size={18}
                          // color={COLORS.darkGrey}
                          color="grey"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        //  onPress={() => {
                        //    toggleDropdown(renderDropdown);
                        //  }}
                      >
                        <MaterialIcons
                          name="chat"
                          size={18}
                          // color={COLORS.blue}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 13, color: COLORS.blue }}>
                      {tailor.contact}
                    </Text>
                  </View>
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
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  hero: {
    // marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 9,
  },
  subHeading: {
    color: COLORS.darkGrey,
    paddingHorizontal: 30,
    textAlign: 'center',
    fontSize: 11,
  },
  searchContainer: {
    // height: 50,
    // width: '90%',
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    // fontWeight: "bold",
    color: COLORS.dark,
    // flex: 1,
  },
  cardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 13,
  },
  pic: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
  initial: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    // padding: 10,
  },
  dropdown: {
    // position: 'absolute',
    // backgroundColor: '#fff',
    // top: 50,
  },
});

export default AvailableTailors;
