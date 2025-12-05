import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useScans } from "../Context/ScanContext";
import { scale, verticalScale, responsiveFont } from "../utils/responsive";

const VerificationScreen = ({ navigation, route }) => {
  const { addScan } = useScans();
  const imageUri = route.params?.imageUri;

  const [weight, setWeight] = useState("1.2 kg");
  const [material, setMaterial] = useState("Fragile Glass");
  const [productName, setProductName] = useState("New Product Scan");

  const handleAnalyzeAndSave = () => {
    const scanData = {
      title: productName,
      imageUri,
      weight,
      material,
      details: `Dimensions: 14.5 × 8.2 cm | Weight: ${weight}`,
    };

    addScan(scanData);
    navigation.navigate("Results");
  };

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
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.capturedImage} />
          ) : (
            <Text>No image found</Text>
          )}

          <View style={styles.boundingBox} />
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
            <Ionicons name="chevron-down" size={scale(18)} color="#555" />
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
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: scale(16),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(14),
    alignItems: "center",
  },

  headerTitle: {
    fontSize: responsiveFont(16),
    fontWeight: "700",
    color: "#333",
  },

  content: {
    paddingBottom: verticalScale(60),
  },

  imageContainer: {
    height: verticalScale(320),
    backgroundColor: "#ddd",
    borderRadius: scale(14),
    overflow: "hidden",
    marginBottom: verticalScale(20),
  },

  capturedImage: {
    width: "100%",
    height: "100%",
  },

  boundingBox: {
    position: "absolute",
    top: "18%",
    left: "18%",
    width: "65%",
    height: "65%",
    borderWidth: scale(3),
    borderColor: "#4285F4",
  },

  formGroup: {
    marginBottom: verticalScale(16),
  },

  label: {
    fontSize: responsiveFont(13),
    fontWeight: "600",
    marginBottom: verticalScale(6),
    color: "#333",
  },

  input: {
    backgroundColor: "#fff",
    padding: verticalScale(12),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: responsiveFont(14),
  },

  picker: {
    backgroundColor: "#fff",
    padding: verticalScale(12),
    borderRadius: scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  pickerText: {
    fontSize: responsiveFont(14),
    color: "#333",
  },

  analyzeBtn: {
    backgroundColor: "#5F8D8B",
    padding: verticalScale(14),
    borderRadius: scale(14),
    alignItems: "center",
    marginTop: verticalScale(10),
  },

  analyzeText: {
    color: "#fff",
    fontSize: responsiveFont(15),
    fontWeight: "700",
  },
});

export default VerificationScreen;
