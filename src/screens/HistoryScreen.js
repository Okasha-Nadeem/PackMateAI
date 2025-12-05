import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScans } from "../Context/ScanContext";
import { scale, verticalScale, responsiveFont } from "../utils/responsive";

const HistoryScreen = ({ navigation }) => {
  const { historyScans } = useScans();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="time" size={28} color="#333" />
        <Text style={styles.headerTitle}>HISTORY</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* EMPTY STATE */}
      {historyScans.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="folder-open" size={scale(60)} color="#888" />
          <Text style={styles.emptyText}>No history yet</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: verticalScale(30) }}
          data={historyScans}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imageUri }} style={styles.image} />
              <View style={{ marginLeft: scale(12), flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.details}</Text>
              </View>
            </View>
          )}
        />
      )}
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

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: verticalScale(10),
    fontSize: responsiveFont(14),
    color: "#777",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: scale(12),
    borderRadius: scale(14),
    marginBottom: verticalScale(12),
    elevation: 3,
  },

  image: {
    width: scale(65),
    height: scale(65),
    borderRadius: scale(10),
  },

  cardTitle: {
    fontSize: responsiveFont(16),
    fontWeight: "600",
    color: "#333",
  },

  cardSubtitle: {
    marginTop: verticalScale(4),
    fontSize: responsiveFont(12),
    color: "#777",
  },
});

export default HistoryScreen;
