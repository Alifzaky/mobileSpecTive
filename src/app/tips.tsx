// File: app/tips.tsx
// Dikerjakan oleh Anggota 3

import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
// Pastikan path import sesuai dengan folder kalian
import { dataTips } from "../../components/laptopData";
import { styles } from "../../components/laptopStyles";

export default function TipsPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { flex: 1, backgroundColor: '#0f172a' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Panduan Perawatan Hardware</Text>
        
        {dataTips.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <View style={styles.tipHeaderRow}>
              <Text style={styles.tipTitle}>{tip.judul}</Text>

              <View
                style={[
                  styles.priorityBadge,
                  {
                    backgroundColor: tip.tingkatPenting === "Tinggi" ? "#fee2e2" : "#fef3c7",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    { color: tip.tingkatPenting === "Tinggi" ? "#991b1b" : "#92400e" },
                  ]}
                >
                  {tip.tingkatPenting}
                </Text>
              </View>
            </View>
            <Text style={styles.tipDesc}>{tip.deskripsi}</Text>
          </View>
        ))}

        {/* Menggunakan replace() sebagai syarat 1 fungsi expo-router tambahan */}
        <TouchableOpacity 
          style={[styles.filterButtonActive, { marginTop: 30, alignSelf: 'center', paddingHorizontal: 20 }]} 
          onPress={() => router.replace("/")}
        >
          <Text style={styles.filterTextActive}>Kembali ke Menu Utama</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}