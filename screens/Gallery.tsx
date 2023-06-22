import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { galleryCards } from '../utils/galleryCards';
import { GalleryCardsProps } from '../utils/galleryCards';
import { COLORS } from '../utils/colors';
import usePictureUpload from '../components/hooks/usePictureUpload';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import GreyInputField from '../components/inputFields/GreyInputField';
import BlueButton from '../components/buttons/BlueButton';

const width = Dimensions.get('screen').width / 2 - 30;

interface Props {
  navigation?: any;
  setImages?: any;
}

const Gallery = ({ navigation }: any) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const [images, setImages] = useState<any>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      // selectionLimit: 5,
    });

    console.log(result);

    if (!result.canceled) {
      setImages(result.assets);
      setVisible(true);
      console.log(result.assets);
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

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginTop: 20,
          gap: 15,
        }}
      >
        {galleryCards.map((galleryCard: GalleryCardsProps, index: number) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ImageFolderDetails')}
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
          onPress={pickImage}
          activeOpacity={0.8}
          // activeOpacity={0.8}
          // onPress={() => navigation.navigate('Details', plant)}
        >
          <View style={styles.card}>
            <View
              style={{
                width: 140,
                height: 100,
                backgroundColor: COLORS.lightGrey,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name={'camera'} size={80} color={COLORS.light} />
            </View>
            <View>
              <Text style={{ fontSize: 17, marginTop: 10 }}>
                Add New folder
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.fill}>
        <Modal
          visible={visible}
          onRequestClose={hide}
          animationType="fade"
          transparent
        >
          <Pressable style={styles.upper} />
          <View style={styles.lower}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.dark,
                  textAlign: 'right',
                  paddingRight: 30,
                  paddingTop: 15,
                }}
                onPress={hide}
              >
                X
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.dark,
                  paddingTop: 0,
                  textAlign: 'center',
                }}
              >
                Selected Images
              </Text>
            </View>

            <View style={styles.images}>
              <ScrollView horizontal={true} keyboardShouldPersistTaps="handled">
                {images?.map((image: any, index:any) => {
                  return (
                    <Pressable
                      style={{
                        height: 200,
                        width: Dimensions.get('window').width / 2 - 30,
                        margin: 5,
                      }}
                      key={index}
                      onPress={() => console.log(image.uri)}
                    >
                      <Image
                        source={{ uri: image.uri }}
                        style={{
                          height: 200,
                          width: Dimensions.get('window').width / 2 - 30,
                          borderRadius: 10,
                        }}
                      />
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ alignItems: 'center' }}>
              <GreyInputField placeholder="folder name" />
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <BlueButton text="Save" />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
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
    shadowOpacity: 1.0,
  },
  upper: {
    height: 300,
    backgroundColor: '#DDD',
    opacity: 0.5,
  },
  lower: {
    flex: 1,
    backgroundColor: 'white',
  },
  fill: { flex: 1 },
  images: {
    // flex: 1,
    flexDirection: 'row',
    // marginTop: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    marginBottom: -15,
    // position: "absolute",
    // bottom: 0,
  },
});
