import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './utils/colors';
import GetStarted from './screens/GetStarted';
import Signup from './screens/Signup';
import CreateAccount from './screens/CreateAccount';
import Login from './screens/Login';
import Home from './screens/Home';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
    <NavigationContainer>
      <StatusBar style='auto' backgroundColor={COLORS.white} />
      <Stack.Navigator>
        <Stack.Screen name="Get Started" component={GetStarted} options={{headerShown: false}} />
        <Stack.Screen name="Sign Up" component={Signup} options={{headerShown: false}} />
        <Stack.Screen name="Create Account" component={CreateAccount} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
