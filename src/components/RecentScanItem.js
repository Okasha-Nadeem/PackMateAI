import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Helper function
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const RecentScanItem = ({ scan }) => {
  return (
    <View style={styles.recentItem}>
      <Image
        source={{ uri: scan.imageUri || 'https://placehold.co/60x60/eeeeee/888888?text=N/A' }}
        style={styles.recentImage}
      />

      <View style={styles.recentInfo}>
        <Text style={styles.recentTitle}>{scan.title}</Text>

        <Text style={styles.recentDesc} numberOfLines={2}>
          {scan.details || `Scan saved on ${formatDate(scan.date)}.`}
        </Text>
      </View>

      <View style={styles.recentDateContainer}>
        <Text style={styles.recentDate}>{formatDate(scan.date)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recentItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  recentImage: { width: 60, height: 60, borderRadius: 10, backgroundColor: "#eee" },
  recentInfo: { marginLeft: 15, flex: 1 },
  recentTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  recentDesc: { fontSize: 13, color: "#888", marginTop: 3 },
  recentDateContainer: { marginLeft: 10 },
  recentDate: { fontSize: 10, color: "#999", fontWeight: "500" }
});

export default RecentScanItem;
