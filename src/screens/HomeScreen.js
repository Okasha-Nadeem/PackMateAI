import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useScans } from '../Context/ScanContext';  

const { width } = Dimensions.get('window');

// Format date
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// COMPONENT: Single Recent Scan Item
const RecentScanItem = ({ scan }) => (
  <View style={styles.recentItem}>
    <Image 
      source={{ uri: scan.imageUri || 'https://placehold.co/60x60/cccccc/888888?text=No+Image' }}
      style={styles.recentImage}
    />
    <View style={styles.recentInfo}>
      <Text style={styles.recentTitle}>{scan.title || "Unnamed Scan"}</Text>
      <Text style={styles.recentDesc} numberOfLines={2}>
        {scan.details || `Scan completed on ${formatDate(scan.date)}`}
      </Text>
    </View>
    <Text style={styles.recentDate}>{formatDate(scan.date)}</Text>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const { recentScans, theme } = useScans();  

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
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>HOME</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Brand Title */}
        <View style={styles.brandingContainer}>
          <Text style={[styles.brandText, { color: colors.text }]}>
            PackMate <Text style={styles.brandAccent}>AI</Text>
          </Text>
          <Text style={[styles.greeting, { color: colors.subText }]}>
            Welcome, Alex. Ready to ship?
          </Text>
        </View>

        {/* MAIN CARD */}
        <TouchableOpacity 
          style={[styles.scanCard, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('SmartCamera')}
        >
          <View style={styles.cameraIconCircle}>
            <Ionicons name="camera" size={40} color="#5F8D8B" />
          </View>
          <Text style={[styles.scanTitle, { color: colors.text }]}>Scan New Product</Text>
          <Text style={[styles.scanSubtitle, { color: colors.subText }]}>
            (Requires Grid Mat)
          </Text>
        </TouchableOpacity>

        {/* RECENT SCANS */}
        <Text style={[styles.sectionTitle, { color: colors.subText }]}>
          RECENT SCANS ({recentScans.length})
        </Text>

        {recentScans.length > 0 ? (
          recentScans.map((scan) => <RecentScanItem key={scan.id} scan={scan} />)
        ) : (
          <Text style={[styles.noScansText, { color: colors.subText }]}>
            No recent scans yet. Start by scanning a new product!
          </Text>
        )}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={[styles.bottomNav, { backgroundColor: colors.card }]}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#5F8D8B" />
          <Text style={[styles.navText, { color: "#5F8D8B", textDecorationLine: 'underline' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('History')}
        >
          <MaterialCommunityIcons name="history" size={24} color={colors.subText} />
          <Text style={[styles.navText, { color: colors.subText }]}>History</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  headerTitle: { fontSize: 16, fontWeight: '600', letterSpacing: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },
  brandingContainer: { marginTop: 20, marginBottom: 30 },
  brandText: { fontSize: 32, fontWeight: 'bold' },
  brandAccent: { color: '#5F8D8B' },
  greeting: { fontSize: 16, marginTop: 5 },
  scanCard: { borderRadius: 20, padding: 30, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginBottom: 30 },
  cameraIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  scanTitle: { fontSize: 20, fontWeight: 'bold' },
  scanSubtitle: { fontSize: 14, marginTop: 5 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 15, letterSpacing: 0.5 },
  recentItem: { flexDirection: 'row', borderRadius: 15, padding: 15, marginBottom: 15, alignItems: 'center', elevation: 2 },
  recentImage: { width: 60, height: 60, borderRadius: 10 },
  recentInfo: { marginLeft: 15, flex: 1 },
  recentTitle: { fontSize: 16, fontWeight: 'bold' },
  recentDesc: { fontSize: 13, marginTop: 3 },
  recentDate: { fontSize: 10, fontWeight: '500' },
  noScansText: { textAlign: 'center', marginTop: 20, fontSize: 14 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#ddd', position: 'absolute', bottom: 0, left: 0, right: 0 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4, fontWeight: '500' },
});

export default HomeScreen;
