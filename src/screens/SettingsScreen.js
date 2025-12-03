import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Switch, 
  Dimensions 
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useScans } from "../Context/ScanContext";

const { width } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useScans();

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

        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* THEME TOGGLE */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Dark Theme</Text>
        <Switch 
          value={theme === 'dark'} 
          onValueChange={toggleTheme} 
        />
      </View>

      {/* Example App Version */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>App Version</Text>
        <Text style={{ color: colors.subText }}>1.0.0</Text>
      </View>

      {/* Bottom Nav Fixed */}
      <View style={[styles.bottomNav, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={24} color={colors.text} />
          <Text style={[styles.navText, { color: colors.text, textDecorationLine: 'underline' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('History')}
        >
          <MaterialCommunityIcons name="history" size={24} color={colors.subText} />
          <Text style={[styles.navText, { color: colors.subText }]}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="#5F8D8B" />
          <Text style={[styles.navText, { color: "#5F8D8B", textDecorationLine: 'underline' }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderRadius: 12, marginHorizontal: 15, marginTop: 15 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#ddd', position: 'absolute', bottom: 0, left: 0, right: 0 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4, fontWeight: '500' },
});

export default SettingsScreen;
