import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const SmartCameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isGridDetected, setGridDetected] = useState(true); // fake grid detection for UI

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Camera Access Needed</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
          <Text style={{ color: "#fff" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });

      // 👉 Go to verification screen with imageUri
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
      />

      {/* Fake Grid Detected Badge */}
      {isGridDetected && (
        <View style={styles.gridBadge}>
          <Ionicons name="checkmark-circle" size={18} color="#fff" />
          <Text style={styles.gridText}>Grid Detected</Text>
        </View>
      )}

      {/* Scanner Green Box */}
      <View style={styles.scanBox} />

      {/* Capture Button */}
      <View style={styles.captureContainer}>
        <TouchableOpacity style={styles.captureBtn} onPress={handleCapture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  permissionContainer: {
    flex: 1, justifyContent: "center", alignItems: "center", padding: 20,
  },
  permissionBtn: {
    backgroundColor: "#5F8D8B", padding: 12, borderRadius: 10,
  },
  gridBadge: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
  },
  gridText: { color: "#fff", marginLeft: 6, fontWeight: "600" },
  scanBox: {
    position: "absolute",
    top: "20%",
    left: "10%",
    width: "80%",
    height: "55%",
    borderColor: "#00e676",
    borderWidth: 3,
    borderRadius: 12,
  },
  captureContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  captureBtn: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#bbb",
  },
});

export default SmartCameraScreen;
