// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Context
import { ScanProvider } from './src/Context/ScanContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SmartCameraScreen from './src/screens/SmartCameraScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ScanProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SmartCamera" component={SmartCameraScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ScanProvider>
    </SafeAreaProvider>
  );
}
