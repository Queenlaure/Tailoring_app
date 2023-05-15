import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import {galleryCards} from '../utils/galleryCards';
import { GalleryCardsProps } from '../utils/galleryCards';
import { COLORS } from '../utils/colors';
import usePictureUpload from '../components/hooks/usePictureUpload';
import { Ionicons } from '@expo/vector-icons';

const width = Dimensions.get('screen').width / 2 - 30;

interface Props {
  navigation?: any;
  setImages?:any;
}


const Gallery = ({setImages}:Props) => {

  const pickImage = async () => {
    let result = await usePictureUpload(true);
    if (result !== null) {
      setImages(result?.assets);
      // this.setImages((prevState:any) => ({
      //   images: [...prevState.images, result?.assets],
      // }));
      // setNavigate(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightestGrey,
        paddingHorizontal: 18,
        paddingTop: 55,
      }}
    >
      <View style={styles.hero}>
        <Text style={styles.heading}>Style Inspiration</Text>
      </View>

      <View style={{display:'flex',flexDirection:'row',flexWrap: 'wrap', alignItems: 'center', marginTop:20, gap: 15}}>
      {galleryCards.map((galleryCard:GalleryCardsProps, index:number) => (
        <TouchableOpacity
        key ={index}
        // activeOpacity={0.8}
        // onPress={() => navigation.navigate('Details', plant)}
      >
        <View style={styles.card}>
          <View
            style={{
              height: 100,
              alignItems: 'center', 
            }}
          >
            <Image
              source={galleryCard.pic}
              style={{ flex: 1, resizeMode: 'contain' }}
            />
          </View>

          <Text style={{ fontSize: 17, marginTop: 10 }}>
          {galleryCard.name}
          </Text>
          
        </View>
      </TouchableOpacity>
  
      ))}
       <TouchableOpacity
       onPress={pickImage} activeOpacity={0.8}
        // activeOpacity={0.8}
        // onPress={() => navigation.navigate('Details', plant)}
      >
        <View style={styles.card}>
          <View style={{width:140, height:100, backgroundColor:COLORS.lightGrey, alignItems:'center', justifyContent:'center'}}>
          <Ionicons name={'camera'} size={80} color={COLORS.light} />
          </View>
          <View>
            <Text style={{  fontSize: 17, marginTop: 10 }}>Add New folder</Text>
          </View>
        </View>
      </TouchableOpacity>
      </View>

    </View>
  );
};

export default Gallery;

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
    height: 160,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 5,
    padding: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'grey',
    shadowOpacity: 1.0
  },

});