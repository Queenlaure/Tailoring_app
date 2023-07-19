import { Provider } from 'react-redux';
import { store } from './store';
import AppWrapper from './Appwrapper';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

function App() {
  LogBox.ignoreLogs([
    'ViewPropTypes will be removed',
    'ColorPropType will be removed',
    'expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync) instead. https://docs.expo.devversions/latest/sdk/splash-screen/',
    "Possible Unhandled Promise Rejection (id: 2): TypeError: Cannot read property 'email' of null TypeError: Cannot read property 'email' of nul",
    "Possible Unhandled Promise Rejection (id: 10): TypeError: Cannot read property 'email' of null TypeError: Cannot read property 'email' of nul",
    "Key 'cancelled' in the image picker result is deprecated and will be removed in SDK 48, use 'canceled' instead",
    "Key 'cancelled' in the image picker result is deprecated and will be removed in SDK 48, use 'canceled' instead",
    'Possible Unhandled Promise Rejection (id: 11): Error: Encountered an exception while calling native method: Exception occurred while executing exported method requestPermissionsAsync on module ExpoNotificationPermissionsModule: String resource ID #0xfffffff Error: Encountered an exception while calling native method: Exception occurred while executing exported method requestPermissionsAsync on module ExpoNotification PermissionsModule: String resource ID #0xffffffff',
  ]);

  // console.disableYellowBox = true;

  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;
