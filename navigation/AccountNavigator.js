import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import FormsScreen from "../screens/FormsScreen";
import ResponsesScreen from "../screens/ResponsesScreen";
import ResponseDetailsScreen from "../screens/ResponseDetailsScreen";
import FormDetailsScreen from "../screens/FormDetailsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="My Forms" component={FormsScreen} />
    <Stack.Screen name="My Responses" component={ResponsesScreen} />
    <Stack.Screen name="Response Details" component={ResponseDetailsScreen} />
    <Stack.Screen name="Form Details" component={FormDetailsScreen} />

  </Stack.Navigator>
);

export default AccountNavigator;
