import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, responsiveFont } from '../utils/responsive';

// Helper function to format date
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
    padding: scale(14),
    borderRadius: scale(15),
    marginBottom: verticalScale(12),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: scale(5),
    elevation: 2,
  },

  recentImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(10),
    backgroundColor: "#eee",
  },

  recentInfo: {
    marginLeft: scale(15),
    flex: 1,
  },

  // 🔥 Responsive font size applied here
  recentTitle: {
    fontSize: responsiveFont(16),
    fontWeight: "bold",
    color: "#333",
  },

  recentDesc: {
    fontSize: responsiveFont(13),
    color: "#888",
    marginTop: verticalScale(3),
  },

  recentDateContainer: {
    marginLeft: scale(10),
  },

  recentDate: {
    fontSize: responsiveFont(10),
    color: "#999",
    fontWeight: "500",
  },
});

export default RecentScanItem;
