import React from 'react';
import { COLORS } from '../utils/colors';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import BlueButton from '../components/buttons/BlueButton';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Raleway_200ExtraLight,
  Raleway_400Regular,
  Raleway_900Black,
} from '@expo-google-fonts/raleway';

const GetStarted = ({ navigation }: any) => {
  let [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '60%', height: '30%', marginTop: 60 }}>
        <Image source={require('../assets/tailor1.jpg')} style={styles.img1} />
        <Image source={require('../assets/tailor2.jpg')} style={styles.img2} />
        <Image source={require('../assets/tailor3.jpg')} style={styles.img3} />
        <Image source={require('../assets/tailor4.jpg')} style={styles.img4} />
      </View>
      <Text style={styles.description}>
        Keep track of your orders and customer's measurements and locate
        available tailors in your community.
      </Text>
      <View
        // activeOpacity={0.8}
        // onPress={() => navigation.navigate('Sign Up', { name: 'Signup' })}
      >
        <View style={styles.bluebtn}>
          <BlueButton text="Get Started" onClickButton={() => navigation.navigate('Sign Up', { name: 'Signup' })} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: COLORS.white,
    fontFamily:'Poppins'
  },
  img1: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  img2: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    marginTop: 150,
    marginLeft: 145,
  },
  img3: {
    width: '50%',
    height: '50%',
    borderRadius: 10,
    position: 'absolute',
    marginTop: 30,
    marginLeft: 230,
  },
  img4: {
    width: '50%',
    height: '50%',
    borderRadius: 10,
    position: 'absolute',
    marginTop: 232,
    marginLeft: 25,
  },
  description: {
    fontSize: 16,
    marginTop: 170,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    padding: 15,
  },
  bluebtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});
