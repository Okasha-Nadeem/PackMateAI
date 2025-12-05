// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './src/screens/Tabs';
import SmartCameraScreen from './src/screens/SmartCameraScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import VerificationScreen from "./src/screens/VerificationScreen"

import { ScanProvider } from './src/Context/ScanContext';
import { ResultsProvider } from './src/Context/ResultsContext';
import Toast from 'react-native-toast-message';
import ProductResultsScreen from "./src/screens/ProductResultsScreen"
import HomeScreen from './src/screens/HomeScreen';
import PreviewPhoto from './src/screens/PreviewPhoto';
const Stack = createStackNavigator();

export default function App() {
  return (
    <ScanProvider>
      <ResultsProvider>

        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            {/* Bottom Tabs */}
            <Stack.Screen name="HomeTabs" component={Tabs} />

            {/* Screens */}
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SmartCamera" component={SmartCameraScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="PreviewPhoto" component={PreviewPhoto} />
            <Stack.Screen name="Products" component={ProductResultsScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      <Toast />
      </ResultsProvider>
    </ScanProvider>
  );
}
