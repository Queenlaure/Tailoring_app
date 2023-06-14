import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Props {
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
}

const CreateAccountRadiobtn = ({ setUserRole }: Props) => {
  const [checked, setChecked] = useState(0);
  const category = ['Tailor', 'Client'];

  return (
    <View>
      <View style={styles.btn}>
        {category.map((category, key) => {
          return (
            <View style={styles.spacing} key={category}>
              {checked == key ? (
                <TouchableOpacity  style={styles.btn}>
                  <Image
                    style={styles.img}
                    source={require('./radio-checked.png')}
                  />
                  <Text>{category}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(key);
                    setUserRole(category);
                  }}
                  style={styles.btn}
                >
                  <Image
                    style={styles.img}
                    source={require('./radio-unchecked.png')}
                  />
                  <Text>{category}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      {/* <Text>{gender[checked]}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 8,
  },
  spacing: {
    justifyContent: 'space-between',
  },
});

export default CreateAccountRadiobtn;
