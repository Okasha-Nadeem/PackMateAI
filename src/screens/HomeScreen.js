import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useScans } from "../Context/ScanContext";
import { scale, verticalScale, responsiveFont } from "../utils/responsive";

const HomeScreen = ({ navigation }) => {
  const { recentScans } = useScans();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#333" />
        <Text style={styles.headerTitle}>HOME</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* TITLE AREA */}
      <View style={styles.titleBox}>
        <Text style={styles.appTitle}>
          PackMate <Text style={styles.aiHighlight}>AI</Text>
        </Text>
        <Text style={styles.subtitle}>Welcome, Alex. Ready to ship?</Text>
      </View>

      {/* SCAN NEW PRODUCT CARD */}
      <TouchableOpacity
        style={styles.scanCard}
        onPress={() => navigation.navigate("SmartCamera")}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="camera" size={32} color="#4F837F" />
        </View>
        <Text style={styles.scanTitle}>Scan New Product</Text>
        <Text style={styles.scanInfo}>(Requires Grid Mat)</Text>
      </TouchableOpacity>

      {/* RECENT SCANS */}
      <Text style={styles.recentTitle}>RECENT SCANS ({recentScans.length})</Text>

      {recentScans.length === 0 ? (
        <Text style={styles.noScans}>
          No recent scans yet. Start by scanning a new product!
        </Text>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#F4F5F6",
  paddingHorizontal: scale(16),
  paddingBottom: verticalScale(120), // ⭐ keeps content ABOVE bottom nav
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
    fontWeight: "600",
    color: "#333",
  },

  titleBox: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(20),
  },

  appTitle: {
    fontSize: responsiveFont(30),
    fontWeight: "800",
    color: "#222",
  },

  aiHighlight: {
    color: "#347E7B",
    fontWeight: "900",
  },

  subtitle: {
    marginTop: verticalScale(4),
    fontSize: responsiveFont(14),
    color: "#666",
  },

  scanCard: {
    backgroundColor: "#fff",
    paddingVertical: verticalScale(35),
    borderRadius: scale(20),
    alignItems: "center",
    marginBottom: verticalScale(30),
    elevation: 3,
  },

  iconCircle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(50),
    backgroundColor: "#E2F1EF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(10),
  },

  scanTitle: {
    fontSize: responsiveFont(18),
    fontWeight: "700",
    color: "#333",
  },

  scanInfo: {
    fontSize: responsiveFont(12),
    color: "#777",
    marginTop: verticalScale(2),
  },

  recentTitle: {
    fontSize: responsiveFont(14),
    fontWeight: "700",
    color: "#666",
    marginBottom: verticalScale(12),
  },

  noScans: {
    textAlign: "center",
    fontSize: responsiveFont(14),
    color: "#777",
  },
});

export default HomeScreen;
