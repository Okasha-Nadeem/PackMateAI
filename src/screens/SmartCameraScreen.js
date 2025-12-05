import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, responsiveFont } from "../utils/responsive";

const SmartCameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isGridDetected] = useState(true); // Fake detection (UI only)

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera Access Needed</Text>

        <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        skipProcessing: true, // Avoid Android processing delay
      });

      navigation.navigate("Verification", { imageUri: photo.uri });

    } catch (e) {
      console.log("Camera Error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"       // 🔥 Required for stable camera behavior
        autofocus="on"
      />

      {/* GRID BADGE */}
      {isGridDetected && (
        <View style={styles.gridBadge}>
          <Ionicons name="checkmark-circle" size={scale(16)} color="#fff" />
          <Text style={styles.gridText}>Grid Detected</Text>
        </View>
      )}

      {/* GREEN SCAN BOX */}
      <View style={styles.scanBox} />

      {/* CAPTURE BUTTON */}
      <View style={styles.captureContainer}>
        <TouchableOpacity
          style={styles.captureBtn}
          onPress={handleCapture}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} // better touch behaviour
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },

  /* PERMISSION VIEW */
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  permissionText: {
    fontSize: responsiveFont(16),
    marginBottom: verticalScale(10),
  },
  permissionBtn: {
    backgroundColor: "#5F8D8B",
    padding: verticalScale(12),
    borderRadius: scale(10),
  },
  permissionBtnText: {
    color: "#fff",
    fontSize: responsiveFont(14),
    fontWeight: "600",
  },

  /* GRID BADGE */
  gridBadge: {
    position: "absolute",
    top: verticalScale(60),
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    alignItems: "center",
  },
  gridText: {
    color: "#fff",
    marginLeft: scale(6),
    fontWeight: "600",
    fontSize: responsiveFont(13),
  },

  /* GREEN SCAN BOX */
  scanBox: {
    position: "absolute",
    top: "18%",
    left: "10%",
    width: "80%",
    height: "58%",
    borderColor: "#00e676",
    borderWidth: scale(3),
    borderRadius: scale(12),
  },

  /* CAPTURE BUTTON */
  captureContainer: {
    position: "absolute",
    bottom: verticalScale(40),
    alignSelf: "center",
  },
  captureBtn: {
    width: scale(80),
    height: scale(80),
    backgroundColor: "#fff",
    borderRadius: scale(50),
    borderWidth: scale(5),
    borderColor: "#bbb",
  },
});

export default SmartCameraScreen;
