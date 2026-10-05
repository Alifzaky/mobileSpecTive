import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mengimpor modul dari masing-masing bagian kelompok
import { dataTips } from "./components/laptopData";
import {
  filterLaptopBerdasarkanKategori,
  formatRupiah,
} from "./components/laptopLogic";
import { styles } from "./components/laptopStyles";

export default function Index() {
  const [kategoriDipilih, setKategoriDipilih] = useState<string>("Semua");
  const laptopTampil = filterLaptopBerdasarkanKategori(kategoriDipilih);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View style={styles.header}>
        <View style={styles.headerIndicator} />
        <View>
          <Text style={styles.headerTitle}>Laptop Care & Specs</Text>
          <Text style={styles.headerSubtitle}>
            Sistem Rekomendasi & Panduan Perawatan
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
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

              {/* Inline Style Kondisional */}
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      laptop.kategori === "Coding"
                        ? "#0284c7"
                        : laptop.kategori === "Gaming"
                          ? "#dc2626"
                          : "#475569",
                  },
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

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Tips & Perawatan Hardware
        </Text>
        {dataTips.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <View style={styles.tipHeaderRow}>
              <Text style={styles.tipTitle}>{tip.judul}</Text>

              {/* Inline Style Kondisional Prioritas */}
              <View
                style={[
                  styles.priorityBadge,
                  {
                    backgroundColor:
                      tip.tingkatPenting === "Tinggi" ? "#fee2e2" : "#fef3c7",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    {
                      color:
                        tip.tingkatPenting === "Tinggi" ? "#991b1b" : "#92400e",
                    },
                  ]}
                >
                  {tip.tingkatPenting}
                </Text>
              </View>
            </View>
            <Text style={styles.tipDesc}>{tip.deskripsi}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
