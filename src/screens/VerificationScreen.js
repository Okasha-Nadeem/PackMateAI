import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useScans } from "../Context/ScanContext";
import { scale, verticalScale, responsiveFont } from "../utils/responsive";

const VerificationScreen = ({ navigation, route }) => {
  const { addScan } = useScans();
  const imageUri = route.params?.imageUri;
  const detectionData = route.params?.detectionData; // API response with x1,x2,y1,y2,width,height

  useEffect(() => {
    console.log(detectionData)
  }, [])
  

  const [weight, setWeight] = useState("1.2 kg");
  const [material, setMaterial] = useState("Bottle");
  const [productName, setProductName] = useState("New Product Scan");

  const [imageLayout, setImageLayout] = useState({ width: 1, height: 1 });

  const handleAnalyzeAndSave = () => {
    const scanData = {
      title: productName,
      imageUri,
      weight,
      material,
      details: `Dimensions: 14.5 × 8.2 cm | Weight: ${weight}`,
      boundingBox: detectionData,
    };
    addScan(scanData);
    navigation.navigate("Results");
  };

  // Function to calculate bounding box in displayed coordinates
  const getScaledBox = () => {
    if (!detectionData) return { left: 0, top: 0, width: 0, height: 0 };

    const { width: imgW, height: imgH, x1, y1, x2, y2 } = detectionData;
    const scaleX = imageLayout.width / imgW;
    const scaleY = imageLayout.height / imgH;

    return {
      left: x1 * scaleX,
      top: y1 * scaleY,
      width: (x2 - x1) * scaleX,
      height: (y2 - y1) * scaleY,
    };
  };

  const scaledBox = getScaledBox();
  console.log("Scaled box value: ",scaledBox)

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={scale(24)} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VERIFICATION</Text>
        <View style={{ width: scale(24) }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* IMAGE PREVIEW */}
        <View
          style={styles.imageContainer}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setImageLayout({ width, height });
          }}
        >
          {imageUri ? (
            <>
              <Image source={{ uri: imageUri }} style={styles.capturedImage} />
              {/* DYNAMIC BOUNDING BOX */}
              {detectionData && (
                <View
                  style={[
                    styles.boundingBox,
                    {
                      left: scaledBox.left,
                      top: scaledBox.top,
                      width: scaledBox.width,
                      height: scaledBox.height,
                    },
                  ]}
                />
              )}
            </>
          ) : (
            <Text>No image found</Text>
          )}
        </View>

        {/* PRODUCT NAME */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Name (for history)</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* WEIGHT */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        {/* MATERIAL */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Material Type</Text>
          <View style={styles.picker}>
            <Text style={styles.pickerText}>{material}</Text>
          </View>
        </View>

        {/* ANALYZE BUTTON */}
        <TouchableOpacity
          style={styles.analyzeBtn}
          onPress={handleAnalyzeAndSave}
        >
          <Text style={styles.analyzeText}>ANALYZE PACKAGING</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", paddingHorizontal: scale(16) },
  header: { flexDirection: "row", justifyContent: "space-between", paddingVertical: verticalScale(14), alignItems: "center" },
  headerTitle: { fontSize: responsiveFont(16), fontWeight: "700", color: "#333" },
  content: { paddingBottom: verticalScale(60) },
  imageContainer: {
    height: verticalScale(320),
    backgroundColor: "#ddd",
    borderRadius: scale(14),
    overflow: "hidden",
    marginBottom: verticalScale(20),
  },
  capturedImage: { width: "100%", height: "100%" },
  boundingBox: {
    position: "absolute",
    borderWidth: scale(3),
    borderColor: "#e90000ff",
     backgroundColor: "rgba(255,0,0,0.2)",
  },
  formGroup: { marginBottom: verticalScale(16) },
  label: { fontSize: responsiveFont(13), fontWeight: "600", marginBottom: verticalScale(6), color: "#333" },
  input: { backgroundColor: "#fff", padding: verticalScale(12), borderRadius: scale(10), borderWidth: 1, borderColor: "#ccc", fontSize: responsiveFont(14) },
  picker: { backgroundColor: "#fff", padding: verticalScale(12), borderRadius: scale(10), flexDirection: "row", justifyContent: "space-between", borderWidth: 1, borderColor: "#ccc" },
  pickerText: { fontSize: responsiveFont(14), color: "#333" },
  analyzeBtn: { backgroundColor: "#5F8D8B", padding: verticalScale(14), borderRadius: scale(14), alignItems: "center", marginTop: verticalScale(10) },
  analyzeText: { color: "#fff", fontSize: responsiveFont(15), fontWeight: "700" },
});

export default VerificationScreen;
