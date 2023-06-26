import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from './utils/colors';
import GetStarted from './screens/GetStarted';
import Signup from './screens/Signup';
import CreateAccount from './screens/CreateAccount';
import Login from './screens/Login';
import SetProfile from './screens/SetProfile';
// import Home from './screens/Home';
import AddCustomer from './screens/AddCustomer';
import AddOrder from './screens/AddOrder';
import SelectItem from './screens/SelectItem';
import Shirt from './screens/Shirt';
import Gown from './screens/Gown';
import Agbada from './screens/Agbada';
import Pants from './screens/Pants';
import Jumpsuit from './screens/Jumpsuit';
import Corperate from './screens/Corperate';
import Suit from './screens/Suit';
import Jacket from './screens/Jacket';
import Blouse from './screens/Blouse';
import ImageFolderDetails from './screens/ImageFolderDetails';
import ViewCustomers from './screens/ViewCustomer';
import CustomerDetails from './screens/CustomerDetails';
import SpecificOrderDetail from './screens/SpecificOrderDetail';
import HomeStack from './navigation/Homestack';
import Provider from 'react-redux';
import { store } from './store';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Raleway_200ExtraLight,
  Raleway_400Regular,
  Raleway_900Black,
} from '@expo-google-fonts/raleway';

const Tab = createBottomTabNavigator();

export default function Appwrapper() {
  let [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" backgroundColor={COLORS.white} />
        <Stack.Navigator>
          <Stack.Screen
            name="Get Started"
            component={GetStarted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign Up"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Create Account"
            component={CreateAccount}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Set Profile"
            component={SetProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCustomer"
            component={AddCustomer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddOrder"
            component={AddOrder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectItem"
            component={SelectItem}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Shirt"
            component={Shirt}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Gown"
            component={Gown}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Agbada"
            component={Agbada}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pants"
            component={Pants}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Jumpsuit"
            component={Jumpsuit}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Corperate"
            component={Corperate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Suit"
            component={Suit}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Jacket"
            component={Jacket}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Blouse"
            component={Blouse}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomerDetails"
            component={CustomerDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ImageFolderDetails"
            component={ImageFolderDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewCustomers"
            component={ViewCustomers}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SpecificOrderDetail"
            component={SpecificOrderDetail}
            options={{ headerShown: false }}
          />

          {/* <Stack.Screen name="Home" component={Home} options={{headerShown: false}} /> */}
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
