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
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '../utils/colors';

const width = Dimensions.get('screen').width / 2 - 30;

const ViewCustomers = () => {
  const clients = [
    { gender: 'male', name: 'John' },
    { gender: 'female', name: 'Queen' },
    { gender: 'male', name: 'Joseph' },
    { gender: 'female', name: 'Beri' },
  ];

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
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={25}
          style={{ marginHorizontal: 10 }}
          color={COLORS.lightGrey}
        />
        <TextInput placeholder="Search Orders" style={styles.input} />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {clients.map((client, index: number) => (
          <View style={styles.card} key={index}>
            <View
              style={{
                height: 115,
                alignItems: 'center',
              }}
            >
              {client.gender === 'male' ? (
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
            <Text style={styles.name}>{client.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ViewCustomers;

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    marginBottom: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  searchContainer: {
    height: 50,
    width: 350,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginStart: 11
    
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
    borderColor: '#52006A'
  },

  icon: {
    marginTop: 32,
  },
  name: {
    marginTop: -40,
    paddingBottom: 40,
  },
});
