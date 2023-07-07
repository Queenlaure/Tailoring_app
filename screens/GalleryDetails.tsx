import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { galleryCards } from '../utils/galleryCards';
import { GalleryCardsProps } from '../utils/galleryCards';
import { COLORS } from '../utils/colors';

const width = Dimensions.get('screen').width / 2 - 30;

const GalleryDetails = ({ route }: any) => {
  const { image, name } = route.params;

  console.log(image);
  console.log(name);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.light,
        paddingHorizontal: 18,
        paddingTop: 65,
      }}
    >
      <View style={styles.hero}>
        <Text style={styles.heading}>Details</Text>
      </View>

      <View style={{ width: '100%', height: '50%', marginTop: 30 }}>
        <Image
          source={{
            uri: image,
          }}
          // style={{ flex: 1, resizeMode: 'contain' }}
          style={styles.pic}
        />
      </View>
      <View>
        <Text style={{ fontSize: 20, fontStyle: 'italic' }}>{name}</Text>
      </View>
    </View>
  );
};

export default GalleryDetails;

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  card: {
    //   height: 160,
    //   backgroundColor: COLORS.light,
    // width,
    marginHorizontal: 2,
    //   borderRadius: 10,
    marginBottom: 5,
    //   padding: 15,
    alignItems: 'center',
  },
  pic: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});
