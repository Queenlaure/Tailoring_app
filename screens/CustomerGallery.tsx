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
import React, { useEffect, useState } from 'react';
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

import { db, auth, storage } from '../firebase-config';
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import NativeUIText from '../components/NativeUIText/NativeUIText';
import { galleryInfo } from '../store/gallery/gallerySlice';

// import { CustomerType, customersInfo } from '../store/customer/customerSlice';

const width = Dimensions.get('screen').width / 2 - 30;

interface Props {
  navigation?: any;
  route?: any;
}

const CustomerGallery = ({ navigation, route }: any) => {
  const { email } = route.params;
  // const [visible, setVisible] = useState(false);
  // const show = () => setVisible(true);
  // const hide = () => setVisible(false);

  const dispatch = useDispatch();

  const [images, setImages] = useState<any>([]);
  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const gallerySlice = useSelector((state: RootState) => state.gallery);

  const [gallery, setGallery] = useState<any>([]);

  useEffect(() => {
    const getGallery = async () => {
      try {
        // Create a query against the collection.
        const galleryRef = collection(db, 'gallery');
        const q = query(galleryRef, where('tailorEmail', '==', email));

        const querySnapshot = await getDocs(q);
        setGallery(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        dispatch(galleryInfo(gallery));
        // console.log('queens', customers);

        // querySnapshot.docs.forEach((doc) => {
        //   dispatch(customersInfo([doc.data()]));
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, ' => cc ', doc.data());
        // });
      } catch (error: any) {
        // console.log(error.message);
        // setFirebaseErr(error.message);
      }
    };

    getGallery();
    // console.log(gallery);
  }, [gallery]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightestGrey,
        paddingHorizontal: 18,
        paddingTop: 65,
      }}
    >
      <View style={styles.hero}>
        <Text style={styles.heading}>Available Designs</Text>
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
        {gallery.map((galleryCard: any, index: number) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('ImageFolderDetails', {
                image: galleryCard.imageUrl,
                name: galleryCard.folderName,
              })
            }
          >
            <View style={styles.card}>
              <View
                style={{
                  height: 100,
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{
                    uri: galleryCard.imageUrl,
                  }}
                  style={{
                    flex: 1,
                    resizeMode: 'contain',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>

              <Text style={{ fontSize: 17, marginTop: 10 }}>
                {galleryCard.folderName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomerGallery;

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
  images: {
    // flex: 1,
    flexDirection: 'row',
    // marginTop: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 5,
    marginBottom: -15,
    paddingHorizontal: 15,
    // position: "absolute",
    // bottom: 0,
  },
});
