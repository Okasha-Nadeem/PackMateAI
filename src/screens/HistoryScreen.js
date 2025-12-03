import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions 
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useScans } from "../Context/ScanContext";

const { width } = Dimensions.get('window');

const HistoryScreen = ({ navigation }) => {
  const { historyScans, theme } = useScans();

  const colors = theme === 'dark' ? {
    background: '#121212',
    text: '#fff',
    subText: '#ccc',
    card: '#1e1e1e'
  } : {
    background: '#F8F9FA',
    text: '#1a1a1a',
    subText: '#666',
    card: '#fff'
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>Scan History</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      {historyScans.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="folder-open" size={60} color={colors.subText} />
          <Text style={[styles.emptyText, { color: colors.subText }]}>No history yet</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 15, paddingBottom: 120 }}
          data={historyScans}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]}>
              <Image source={{ uri: item.imageUri }} style={styles.image} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.details, { color: colors.subText }]}>{item.details}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Bottom Nav Fixed */}
      <View style={[styles.bottomNav, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={24} color={colors.text} />
          <Text style={[styles.navText, { color: colors.text, textDecorationLine: 'underline' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="history" size={24} color="#5F8D8B" />
          <Text style={[styles.navText, { color: "#5F8D8B", textDecorationLine: 'underline' }]}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color={colors.subText} />
          <Text style={[styles.navText, { color: colors.subText }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, marginTop: 10 },
  card: { flexDirection: "row", borderRadius: 12, padding: 12, marginBottom: 12, width: width - 30, alignSelf: 'center', elevation: 2 },
  image: { width: 65, height: 65, borderRadius: 8 },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  details: { marginTop: 5, fontSize: 13 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#ddd', position: 'absolute', bottom: 0, left: 0, right: 0 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4, fontWeight: '500' },
});

export default HistoryScreen;
