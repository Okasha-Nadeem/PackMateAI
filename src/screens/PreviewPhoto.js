import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

import Output from "../../assets/output.jpeg"

const PreviewPhoto = ({ route, navigation }) => {
  const { photoUri, box, imgWidth, imgHeight } = route.params;
  const { x1, y1, x2, y2 } = box;

  const [imageLayout, setImageLayout] = useState({ width: 1, height: 1 });

  // Calculate scaled bounding box
  const getScaledBox = () => {
    const scale = Math.min(imageLayout.width / imgWidth, imageLayout.height / imgHeight);

    // actual image size in container
    const displayWidth = imgWidth * scale;
    const displayHeight = imgHeight * scale;

    // offsets due to letterboxing
    const offsetX = (imageLayout.width - displayWidth) / 2;
    const offsetY = (imageLayout.height - displayHeight) / 2;

    return {
      left: x1 * scale + offsetX,
      top: y1 * scale + offsetY,
      width: (x2 - x1) * scale,
      height: (y2 - y1) * scale,
    };
  };

  const scaledBox = getScaledBox();

  return (
    <View style={styles.container}>
      <Image
        source={{uri: `data:image/jpeg;base64,${photoUri}`}}
        style={styles.image}
        resizeMode="contain"
        
      />

      {/* Bounding Box */}
      {/* <View
        style={{
          position: "absolute",
          left: scaledBox.left,
          top: scaledBox.top,
          width: scaledBox.width,
          height: scaledBox.height,
          borderWidth: 3,
          borderColor: "lime",
        }}
      /> */}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
  {/* RETAKE Button */}
  <TouchableOpacity
    style={[styles.btn, styles.crossBtn]}
    onPress={() => navigation.goBack()}
    activeOpacity={0.8}
  >
    <Text style={styles.btnIcon}>✖</Text>
    <Text style={styles.btnLabel}>Retake</Text>
  </TouchableOpacity>

  {/* ACCEPT Button */}
  <TouchableOpacity
    style={[styles.btn, styles.tickBtn]}
    onPress={() => navigation.navigate("Products")}
    activeOpacity={0.8}
  >
    <Text style={styles.btnIcon}>✔</Text>
    <Text style={styles.btnLabel}>Accept</Text>
  </TouchableOpacity>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { width: "100%", height: "100%" },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  crossBtn: {
    backgroundColor: "#ff4c4cb7",
  },
  tickBtn: {
    backgroundColor: "#5F8D8B",
  },
  btnIcon: {
    fontSize: 20,
    color: "#fff",
    marginRight: 8,
    fontWeight: "700",
  },
  btnLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});

export default PreviewPhoto;
