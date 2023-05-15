import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import BlueButton from '../components/buttons/BlueButton';
import OutlineButton from '../components/buttons/OutlineButton';
import { COLORS } from '../utils/colors';

const Signup = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/tailor2.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        {/* <View style={styles.child} /> */}
        <Text style={styles.text}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Create Account', { name: 'CreateAccount' })
            }
          >
            <View>
              <BlueButton text="Sign Up" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Login', { name: 'Login' })
            }
          >
            <OutlineButton text="Log In" />
          </TouchableOpacity>
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    lineHeight: 54,
    textAlign: 'center',
    backgroundColor: '#000000a0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 350,
  },
  //   child: {
  //     flex: 1,
  //     backgroundColor: 'rgba(0,0,0,0.7)',
  //   },
});
