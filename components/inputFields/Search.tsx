import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

interface Props {
  label?: string;
  onChange?: () => void;
  searchText?: string;
  setSearchText: (value: any) => void;
}

const Search = ({ label, onChange, searchText, setSearchText }: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={25}
          style={{ marginHorizontal: 10 }}
          color={COLORS.lightGrey}
        />
        <TextInput
          placeholder="Search Customer"
          style={styles.input}
          value={searchText}
          onChangeText={(value) => setSearchText(value)}
        />
      </View>
      {/* <Text style={styles.searchBtn}>search</Text> */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  label: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
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
  searchBtn: {
    marginTop: 15,
    color: COLORS.blue,
    marginLeft: 5,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.blue,
  },
});
