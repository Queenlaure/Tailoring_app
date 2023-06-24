import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Orders from '../screens/Orders';
import Gallery from '../screens/Gallery';
import { COLORS } from '../utils/colors';

// import HomeScreen from "./HomeScreen";
// import ProfileScreen from "./ProfileScreen";
// import ChatScreen from "./ChatScreen";

const BottomTab = createBottomTabNavigator();

const homeName = 'Home';
const GalleryName = 'Gallery';
const OrdersName = 'Orders';

const HomeStack = () => {
  const [images, setImages] = useState([]);
  return (
    <BottomTab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === OrdersName) {
            iconName = focused ? 'copy' : 'copy-outline';
          } else if (rn === GalleryName) {
            iconName = focused ? 'albums' : 'albums-outline';
          }

          // You can return any component that you like here!
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          borderRadius: 20,
          position: 'absolute',
          marginBottom: 30,
          left: 30,
          right: 30,
          // marginHorizontal: 'auto',
          // marginLeft: 'auto',
          // marginRight: 'auto',
        },
      })}

      //   tabBarOptions={{
      //     activeTintColor: "#6C63FF",
      //     inactiveTintColor: "grey",
      //     labelStyle: { marginBottom: 10,  fontSize: 10},
      //     style: { padding: 5, height: 90 },
      //   }}
    >
      <BottomTab.Screen
        name={homeName}
        component={Home}
        options={{ headerShown: false }}

        // options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name={OrdersName}
        component={Orders}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name={GalleryName}
        component={Gallery}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeStack;
