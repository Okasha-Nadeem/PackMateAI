import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale, responsiveFont } from "../utils/responsive";

import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const insets = useSafeAreaInsets(); // ⭐ VERY IMPORTANT

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#4F837F",
        tabBarInactiveTintColor: "#888",

        // ⭐ PERFECT RESPONSIVE NAVIGATION BAR
        tabBarStyle: {
          height: verticalScale(60) + insets.bottom,   // ⭐ adjusts height automatically
          paddingBottom: insets.bottom > 0 ? insets.bottom : verticalScale(6),
          paddingTop: verticalScale(6),
          backgroundColor: "#fff",
          borderTopWidth: 0.8,
          borderTopColor: "#dcdcdc",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 20,
        },

        tabBarLabelStyle: {
          fontSize: responsiveFont(10),
          fontWeight: "600",
        },

        tabBarIcon: ({ color }) => {
          let icon;

          if (route.name === "Home") icon = "home";
          if (route.name === "History") icon = "time";
          if (route.name === "Settings") icon = "settings";

          return <Ionicons name={icon} size={scale(22)} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
