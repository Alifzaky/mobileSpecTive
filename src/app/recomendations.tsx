import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { filterLaptopBerdasarkanKategori, formatRupiah } from "./components/laptopLogic";
import { styles } from "./components/laptopStyles";

export default function Recommendations() {
  const router = useRouter();
  const [kategoriDipilih, setKategoriDipilih] = useState<string>("Semua");
  const laptopTampil = filterLaptopBerdasarkanKategori(kategoriDipilih);

  useEffect(() => {
    console.log(`Menampilkan rekomendasi untuk kategori: ${kategoriDipilih}`);
  }, [kategoriDipilih]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Menerapkan router.back() */}
        <TouchableOpacity style={localStyles.backBtn} onPress={() => router.back()}>
          <Text style={localStyles.backBtnText}>⬅ Kembali </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Pilih Kebutuhan Utama</Text>
        <View style={styles.filterContainer}>
          {["Semua", "Coding", "Gaming", "Office"].map((kat) => (
            <TouchableOpacity
              key={kat}
              style={[
                styles.filterButton,
                kategoriDipilih === kat && styles.filterButtonActive,
              ]}
              onPress={() => setKategoriDipilih(kat)}
            >
              <Text
                style={[
                  styles.filterText,
                  kategoriDipilih === kat && styles.filterTextActive,
                ]}
              >
                {kat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Rekomendasi Perangkat</Text>
        {laptopTampil.map((laptop) => (
          <View key={laptop.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{laptop.nama}</Text>

              {/* Pemindahan Inline Style ke External/Local Style */}
              <View
                style={[
                  styles.badge,
                  laptop.kategori === "Coding" ? localStyles.bgCoding : 
                  laptop.kategori === "Gaming" ? localStyles.bgGaming : 
                  localStyles.bgDefault
                ]}
              >
                <Text style={styles.badgeText}>{laptop.kategori}</Text>
              </View>
            </View>

            <View style={styles.specContainer}>
              <Text style={styles.cardDetail}>⚡ {laptop.processor}</Text>
              <Text style={styles.cardDetail}>💾 RAM {laptop.ram}</Text>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.cardPriceLabel}>Estimasi Harga</Text>
              <Text style={styles.cardPrice}>{formatRupiah(laptop.harga)}</Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  backBtn: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  backBtnText: { color: "#0f172a", fontWeight: "bold", fontSize: 14 },
  bgCoding: { backgroundColor: "#0284c7" },
  bgGaming: { backgroundColor: "#dc2626" },
  bgDefault: { backgroundColor: "#475569" },
});