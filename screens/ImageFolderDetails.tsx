import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    Pressable
  } from 'react-native';
  import React, { useState } from 'react';
  import { galleryCards } from '../utils/galleryCards';
  import { GalleryCardsProps } from '../utils/galleryCards';
  import { COLORS } from '../utils/colors';
  
  const width = Dimensions.get('screen').width / 2 - 30;
  
  
  const ImageFolderDetails = () => {
  
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.light,
          paddingHorizontal: 18,
          paddingTop: 55,
        }}
      >
        <View style={styles.hero}>
          <Text style={styles.heading}>Details</Text>
        </View>
  
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: 20,
            gap: 16,
          }}
        >
          {galleryCards.map((galleryCard: GalleryCardsProps, index: number) => (
            <TouchableOpacity
              key={index}
            >
              <View style={styles.card}>
                <View
                  style={{
                    height: 115,
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={galleryCard.pic}
                    style={{ flex: 1, resizeMode: 'contain' }}
                  />
                </View>
  

              </View>
            </TouchableOpacity>
          ))}
  
        </View>
  
      </View>
    );
  };
  
  export default ImageFolderDetails;
  
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
      width,
      marginHorizontal: 2,
    //   borderRadius: 10,
      marginBottom: 5,
    //   padding: 15,
      alignItems: 'center',
    
    },

  });
  