import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { scale, verticalScale, responsiveFont } from "../utils/responsive";
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';



const SmartCameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isGridDetected] = useState(true); // UI only
  const [loading, setLoading] = useState(false);

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
    if (!cameraRef.current || loading) return;

    try {
      setLoading(true); // show loader
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        skipProcessing: true,
      });

      const formData = new FormData();
      formData.append("image", {
        uri: photo.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });
      if (Platform.OS === "android" && !photo.uri.startsWith("file://")) {
        formData.getParts()[0].uri = "file://" + photo.uri;
      }

      const response = await fetch("https://oneaimvpbackend.onrender.com/detect", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });

      const result = await response.json();

      console.log(result)
      // dispatch(setDetectionResult(result));

    const { x1, x2, y1, y2, width: width, height: height } = result.bbox;
    const imgWidth = result.imageWidth || 1920; 
    const imgHeight = result.imageHeight || 1080;

    const widthRatio = (x2 - x1) / imgWidth;
    const heightRatio = (y2 - y1) / imgHeight;
    const aspectRatio = (x2 - x1) / (y2 - y1);


    let warnings = [];
    if (widthRatio < 0.2 || heightRatio < 0.3) warnings.push("Too far from bottle");
    if (aspectRatio > 0.8) warnings.push("Taken from top of bottle");
    if (y1 < 0.1 * imgHeight) warnings.push("Image taken from too high");
    if (x1 < 0.05 * imgWidth || x2 > 0.95 * imgWidth) warnings.push("Bottle not centered");
// navigation.navigate("Products");
    if (warnings.length > 0) {
      Toast.show({
  type: 'error',
  text1: 'Check your photo',
  text2: 'Too far from bottle, or taken from top',
});
      
    } else if(result.message!="No bottle found" && warnings.length == 0) {
      console.log("Photo looks good!");
      navigation.navigate("PreviewPhoto", {
        photoUri: result.image_base64,
        box: { x1, y1, x2, y2 },
        imgWidth,
        imgHeight
    });

    }

      setLoading(false); 

      
    } catch (error) {
      console.log("Error capturing or uploading:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        autofocus="on"
      />

      {/* GRID BADGE */}
      {isGridDetected && (
        <View style={styles.gridBadge}>
          <Text style={styles.gridText}>Default Bottle Detected</Text>
        </View>
      )}

      {/* GREEN SCAN BOX */}
      {!loading && <View style={styles.scanBox} />}

      {/* LOADING ANIMATION */}
      {loading && (
        <View style={styles.loaderContainer}>
          <LottieView
            source={require('../animations/loading_gray.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      )}

      {/* CAPTURE BUTTON */}
      {!loading && (
        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={styles.captureBtn}
            onPress={handleCapture}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          />
        </View>
      )}
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
  permissionText: { fontSize: responsiveFont(16), marginBottom: verticalScale(10) },
  permissionBtn: { backgroundColor: "#5F8D8B", padding: verticalScale(12), borderRadius: scale(10) },
  permissionBtnText: { color: "#fff", fontSize: responsiveFont(14), fontWeight: "600" },

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
  gridText: { color: "#fff", marginLeft: scale(6), fontWeight: "600", fontSize: responsiveFont(13) },

  /* GREEN SCAN BOX */
  scanBox: {
    position: "absolute",
    top: "15%",
    left: "10%",
    width: "80%",
    height: "68%",
    borderColor: "#00e676",
    borderWidth: scale(3),
    borderRadius: scale(12),
  },

  /* CAPTURE BUTTON */
  captureContainer: { position: "absolute", bottom: verticalScale(40), alignSelf: "center" },
  captureBtn: {
    width: scale(80),
    height: scale(80),
    backgroundColor: "#fff",
    borderRadius: scale(50),
    borderWidth: scale(5),
    borderColor: "#bbb",
  },

  /* LOADER */
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent overlay
  },
  lottie: { width: 200, height: 200 },
});

export default SmartCameraScreen;
