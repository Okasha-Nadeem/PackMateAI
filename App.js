// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './src/screens/Tabs';
import SmartCameraScreen from './src/screens/SmartCameraScreen';
import ResultsScreen from './src/screens/ResultsScreen';

import { ScanProvider } from './src/Context/ScanContext';
import { ResultsProvider } from './src/Context/ResultsContext';

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
            <Stack.Screen name="SmartCamera" component={SmartCameraScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />

          </Stack.Navigator>
        </NavigationContainer>

      </ResultsProvider>
    </ScanProvider>
  );
}
