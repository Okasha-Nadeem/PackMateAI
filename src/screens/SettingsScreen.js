import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScans } from "../Context/ScanContext";
import { scale, verticalScale, responsiveFont } from "../utils/responsive";

const SettingsScreen = () => {
  const { theme, toggleTheme } = useScans();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="settings" size={28} color="#333" />
        <Text style={styles.headerTitle}>SETTINGS</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* DARK MODE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>

      {/* VERSION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>App Version</Text>
        <Text style={styles.version}>1.0.0</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F6",
    paddingHorizontal: scale(16),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(5),
  },

  headerTitle: {
    fontSize: responsiveFont(16),
    fontWeight: "700",
    color: "#333",
  },

  card: {
    backgroundColor: "#fff",
    padding: scale(18),
    borderRadius: scale(14),
    marginTop: verticalScale(14),
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: responsiveFont(16),
    fontWeight: "600",
    color: "#333",
  },

  version: {
    fontSize: responsiveFont(12),
    color: "#777",
  },
});

export default SettingsScreen;
