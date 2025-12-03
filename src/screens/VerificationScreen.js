import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useScans } from '../Context/ScanContext';

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
      details: `Dimensions: 14.5 × 8.2 cm | Weight: ${weight}`
    };

    addScan(scanData); // SAVE to history
    navigation.navigate("Results");
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VERIFICATION</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Image preview */}
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.capturedImage} />
          ) : (
            <Text>No image found</Text>
          )}

          {/* AI Box */}
          <View style={styles.boundingBox} />
        </View>

        {/* Product name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Name (for history)</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* Weight */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        {/* Material */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Material Type</Text>
          <View style={styles.picker}>
            <Text style={styles.pickerText}>{material}</Text>
            <Ionicons name="chevron-down" size={20} color="#555" />
          </View>
        </View>

        {/* Analyze button */}
        <TouchableOpacity style={styles.analyzeBtn} onPress={handleAnalyzeAndSave}>
          <Text style={styles.analyzeText}>ANALYZE PACKAGING</Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 20 },
  headerTitle: { fontSize: 16, fontWeight: "700" },
  content: { padding: 20 },
  imageContainer: {
    height: 350,
    backgroundColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  capturedImage: { width: "100%", height: "100%" },
  boundingBox: {
    position: "absolute",
    top: "20%",
    left: "20%",
    width: "60%",
    height: "60%",
    borderWidth: 3,
    borderColor: "#4285F4",
  },
  formGroup: { marginBottom: 15 },
  label: { fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  picker: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  pickerText: { fontSize: 16 },
  analyzeBtn: {
    backgroundColor: "#5F8D8B",
    padding: 16,
    marginTop: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  analyzeText: { color: "#fff", fontWeight: "700" },
});

export default VerificationScreen;
