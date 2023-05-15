import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { COLORS } from '../utils/colors';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const Orders = () => {
  const categories = ['RECENT', 'URGENT', 'COMPLETED'];
  const [catergoryIndex, setCategoryIndex] = React.useState(0);

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 20,
      }}
    >
      <CategoryList />
      <View style={{paddingHorizontal: 30}}>
      <View style={style.searchContainer}>
        <MaterialIcons
          name="search"
          size={25}
          style={{ marginHorizontal: 10 }}
          color={COLORS.lightGrey}
        />
        <TextInput placeholder="Search Orders" style={style.input} />
      </View>
      </View>
      

      <View style={{width:'100%', height:1, backgroundColor: COLORS.lightGrey, marginTop:20}}></View>

      <View style={style.cardSection}>
        <View style={{ width: 170, height: 110 }}>
          <Image source={require('../assets/tailor1.jpg')} style={style.pic} />
        </View>
        <View style={{justifyContent: 'center', paddingHorizontal:5}}>
          <Text style={{fontSize: 16, fontWeight:'bold'}}>Wernt Faith</Text>
          <Text style={{fontSize: 13}}>5000frs (1 item)</Text>
          <Text style={{fontSize: 13, color: COLORS.lightBrown}}>Due on August 30 2023</Text>
        </View>
      </View>
      <View style={{width:'100%', height:1, backgroundColor: COLORS.lightGrey, marginTop:20}}></View>
    </View>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 25,
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
    width: 350,
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
    borderRadius: 7
  },
});

export default Orders;
