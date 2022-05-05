import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import ListingDetailsScreen from './screens/ListingDetailsScreen';
// import ListingsScreen from './screens/ListingsScreen';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/rootNavigation";
import navigationTheme from "./navigation/navigationTheme";
import AuthNavigator from "./navigation/AuthNavigator";
import AppNavigator from './navigation/AppNavigator';
import AuthContext from './auth/context';
import authStorage from "./auth/storage";
import ApplyFormScreen from './screens/ApplyFormScreen';



export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);


  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} onError={console.error} />
    );
  else
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {/* <OfflineNotice /> */}
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>

    );
}
