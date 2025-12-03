import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResultsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>RESULTS</Text>

        <TouchableOpacity>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Box Visualization */}
        <Image
          source={{ uri: "https://via.placeholder.com/200x150?text=Box+Visualization" }}
          style={styles.boxImage}
        />

        {/* Dimensions */}
        <Text style={styles.dimHeader}>EXACT INTERNAL DIMENSIONS NEEDED:</Text>
        <View style={styles.dimRow}>
          <Text style={styles.dimValue}>L: 16.5cm</Text>
          <Text style={styles.dimValue}>W: 10cm</Text>
          <Text style={styles.dimValue}>H: 8cm</Text>
        </View>

        {/* Box Matches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CLOSEST STANDARD BOX MATCHES</Text>
          <View style={styles.card}>
            <Text>
              <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>[Best Fit] </Text>
              Uline S-1234
            </Text>
            <Text>2. USPS Medium Flat Rate Box</Text>
          </View>
        </View>

        {/* Void Fill */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECOMMENDED VOID FILL</Text>
          <View style={styles.cardRow}>
            <Ionicons name="cube" size={32} color="#777" />
            <Text style={styles.voidText}>
              Heavy duty, 2 inch wrap layer needed for "Fragile Glass".
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.outlineBtn}>
            <Text style={styles.outlineText}>Find Supplier</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filledBtn}>
            <Text style={styles.filledText}>Share Report</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 15 },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 5 },
  headerTitle: { fontWeight: "700" },
  saveText: { color: "#5F8D8B", fontWeight: "600" },
  content: { padding: 20 },
  boxImage: { width: "100%", height: 150, marginBottom: 20, borderRadius: 10 },
  dimHeader: { textAlign: "center", fontSize: 12, marginBottom: 10, fontWeight: "700" },
  dimRow: { flexDirection: "row", justifyContent: "space-evenly", marginBottom: 20 },
  dimValue: { fontWeight: "700" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 12, marginBottom: 10, fontWeight: "700" },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10 },
  cardRow: { backgroundColor: "#fff", padding: 15, borderRadius: 10, flexDirection: "row", alignItems: "center" },
  voidText: { marginLeft: 10, flex: 1 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  outlineBtn: {
    borderWidth: 1, borderColor: "#333", padding: 15, borderRadius: 30, flex: 1, alignItems: "center", marginRight: 10,
  },
  outlineText: { color: "#333" },
  filledBtn: {
    backgroundColor: "#333", padding: 15, borderRadius: 30, flex: 1, alignItems: "center", marginLeft: 10,
  },
  filledText: { color: "#fff" },
});

export default ResultsScreen;
