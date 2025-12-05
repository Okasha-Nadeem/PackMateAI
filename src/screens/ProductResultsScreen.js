import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { scale, verticalScale, responsiveFont } from "../utils/responsive";
import BottleBox from "../../assets/bottle-box.jpg"

const ProductResultsScreen = ({ route, navigation }) => {
  // You can pass these via route.params if needed
  const { objectName = "Bottle", quantity = 1 } = route.params || {};

  const [selectedFilter, setSelectedFilter] = useState("physical");

  // Example product data
  const products = [
  { id: "1", shop: "SuperMart", price: "$2.50", description: "Standard glass bottle", type: "physical" },
  { id: "2", shop: "OnlineShop", price: "$2.30", description: "Eco-friendly plastic bottle", type: "online" },
  { id: "3", shop: "Local Store", price: "$2.80", description: "Reusable bottle", type: "physical" },
  { id: "4", shop: "E-Shop", price: "$2.20", description: "Compact bottle pack", type: "online" },
  { id: "5", shop: "MegaMart", price: "$3.00", description: "Premium glass bottle", type: "physical" },
  { id: "6", shop: "BottleWorld", price: "$2.70", description: "Sports water bottle", type: "online" },
  { id: "7", shop: "GreenStore", price: "$2.60", description: "Biodegradable plastic bottle", type: "physical" },
  { id: "8", shop: "QuickShop", price: "$2.40", description: "Travel-size bottle pack", type: "online" },
  { id: "9", shop: "LocalMart", price: "$3.10", description: "Glass bottle with cork lid", type: "physical" },
  { id: "10", shop: "EcoShop", price: "$2.90", description: "Reusable plastic bottle", type: "online" },
  { id: "11", shop: "SuperBottle", price: "$3.20", description: "Premium insulated bottle", type: "physical" },
  { id: "12", shop: "WebShop", price: "$2.80", description: "Collapsible water bottle", type: "online" },
  { id: "13", shop: "BottleDepot", price: "$2.50", description: "Classic glass bottle", type: "physical" },
  { id: "14", shop: "ShopOnline", price: "$2.35", description: "Plastic sports bottle", type: "online" },
  { id: "15", shop: "CornerStore", price: "$3.00", description: "Reusable eco-friendly bottle", type: "physical" },
];


  // Filter products based on selected filter
  const filteredProducts = products.filter(
    (p) =>
      selectedFilter === "all" ||
      (selectedFilter === "physical" && p.type === "physical") ||
      (selectedFilter === "online" && p.type === "online")
  );

 const renderProduct = ({ item }) => (
  <View style={styles.productCard}>
    <Image source={BottleBox} style={styles.productImage} resizeMode="cover" />

    <View style={styles.productInfo}>
      {/* Badge for type */}
      <View style={[styles.typeBadge, item.type === "physical" ? styles.physicalBadge : styles.onlineBadge]}>
        <Text style={styles.typeBadgeText}>{item.type === "physical" ? "Physical" : "Online"}</Text>
      </View>

      <Text style={styles.shopName}>{item.shop}</Text>
      <Text style={styles.productDesc}>{item.description}</Text>
      <Text style={styles.productDesc}>Width: 180 , Height: 540</Text>
      <Text style={styles.price}>{item.price}</Text>

      <TouchableOpacity
        style={styles.buyBtn}
        onPress={() => console.log(`Buying ${item.description} from ${item.shop}`)}
      >
        <Text style={styles.buyBtnText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  </View>
);
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Info */}
      <View style={styles.topInfoCard}>
        <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")} style={{paddingBottom:10}}><Text>Home</Text></TouchableOpacity>
  <Text style={styles.topInfoLabel}>Known Object</Text>
  <Text style={styles.topInfoObject}>{objectName}</Text>
  <View style={styles.quantityContainer}>
    <Text style={styles.quantityLabel}>Quantity:</Text>
    <Text style={styles.quantityValue}>{quantity}</Text>
  </View>
</View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedFilter === "physical" && styles.filterBtnActive,
          ]}
          onPress={() => setSelectedFilter("physical")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "physical" && styles.filterTextActive,
            ]}
          >
            Physical Stores
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedFilter === "online" && styles.filterBtnActive,
          ]}
          onPress={() => setSelectedFilter("online")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "online" && styles.filterTextActive,
            ]}
          >
            Online Stores
          </Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingBottom: verticalScale(20) }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4F8", paddingHorizontal: scale(16), paddingTop: 40 },
  topInfo: { paddingVertical: verticalScale(16) },
  infoText: { fontSize: responsiveFont(16), color: "#333" },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: verticalScale(16),
  },
  filterBtn: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(20),
    borderRadius: scale(20),
    backgroundColor: "#e0e0e0",
    marginHorizontal: scale(8),
  },
  filterBtnActive: {
    backgroundColor: "#5F8D8B",
  },
  filterText: { color: "#333", fontSize: responsiveFont(14), fontWeight: "500" },
  filterTextActive: { color: "#fff" },

  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: scale(16),
    padding: verticalScale(12),
    marginBottom: verticalScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  productImage: {
    width: scale(120),
    height: verticalScale(120),
    borderRadius: scale(12),
    marginRight: scale(16),
  },
  productInfo: { flex: 1 },
  typeBadge: {
    alignSelf: "flex-start",
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(8),
    borderRadius: scale(12),
    marginBottom: verticalScale(6),
  },
  physicalBadge: { backgroundColor: "#5F8D8B" },
  onlineBadge: { backgroundColor: "#FFA500" },
  typeBadgeText: { color: "#fff", fontSize: responsiveFont(12), fontWeight: "700" },

  shopName: { fontSize: responsiveFont(16), fontWeight: "700", color: "#333" },
  productDesc: { fontSize: responsiveFont(14), color: "#666", marginVertical: verticalScale(4) },
  price: { fontSize: responsiveFont(16), fontWeight: "700", color: "#5F8D8B" },

  buyBtn: {
    marginTop: verticalScale(8),
    backgroundColor: "#5F8D8B",
    paddingVertical: verticalScale(10),
    borderRadius: scale(12),
    alignItems: "center",
  },
  buyBtnText: { color: "#fff", fontSize: responsiveFont(14), fontWeight: "700" },
  topInfoCard: {
  backgroundColor: "#fff",
  borderRadius: scale(16),
  padding: verticalScale(16),
  paddingHorizontal: scale(20),
  marginBottom: verticalScale(20),
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 3,
},
topInfoLabel: {
  fontSize: responsiveFont(14),
  color: "#666",
  marginBottom: verticalScale(4),
},
topInfoObject: {
  fontSize: responsiveFont(20),
  fontWeight: "700",
  color: "#5F8D8B",
  marginBottom: verticalScale(8),
},
quantityContainer: {
  flexDirection: "row",
  alignItems: "center",
},
quantityLabel: {
  fontSize: responsiveFont(14),
  color: "#666",
  marginRight: scale(8),
},
quantityValue: {
  fontSize: responsiveFont(16),
  fontWeight: "700",
  color: "#333",
},
});
export default ProductResultsScreen;
