import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { dataTips } from "./components/laptopData";
import { formatRupiah } from "./components/laptopLogic";
import { styles } from "./components/laptopStyles";
import {
  cariLaptopByKeyword,
  getStatistikLaptop,
} from "./components/laptopUtils";

interface Aksesoris {
  id: string;
  namaBarang: string;
  kategori: string;
  harga: number;
}

const daftarAksesoris: Aksesoris[] = [
  { id: "aks1", namaBarang: "Mouse Wireless Logitech", kategori: "Produktivitas", harga: 250000 },
  { id: "aks2", namaBarang: "Cooling Pad DeepCool", kategori: "Gaming", harga: 300000 },
];

export default function Index() {
  const [kategoriDipilih, setKategoriDipilih] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const laptopBerdasarkanKategori =
    filterLaptopBerdasarkanKategori(kategoriDipilih);
  const laptopTampil = cariLaptopByKeyword(
    laptopBerdasarkanKategori,
    searchQuery,
  );
  const statistik = getStatistikLaptop(laptopBerdasarkanKategori);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"  />

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
        
        {/* Card Penjelasan Aplikasi */}
        <View style={localStyles.introCard}>
          <Text style={localStyles.introTitle}>{pesanSambut}</Text>
          <Text style={localStyles.introDesc}>
            Aplikasi ini dirancang untuk membantu Anda menemukan laptop yang sesuai dengan kebutuhan, serta memberikan panduan lengkap mengenai perawatan hardware dan software agar perangkat Anda tetap awet.
          </Text>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama laptop atau processor..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            📊 Total Model: {statistik.jumlahModel} unit
          </Text>
          <Text style={styles.statsText}>
            💰 Rata-rata: {statistik.rataRataHarga}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Rekomendasi Perangkat</Text>
        {laptopTampil.length === 0 ? (
          <Text style={styles.emptyText}>Laptop tidak ditemukan...</Text>
        ) : (
          laptopTampil.map((laptop) => (
            <View key={laptop.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{laptop.nama}</Text>

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
                <Text style={styles.cardPrice}>
                  {formatRupiah(laptop.harga)}
                </Text>
              </View>
            </View>
          ))
        )}

        <Text style={[styles.sectionTitle, localStyles.spacingTop]}>
          Tips & Perawatan Hardware
        </Text>
        {dataTips.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <View style={styles.tipHeaderRow}>
              <Text style={styles.tipTitle}>{tip.judul}</Text>

              <View
                style={[
                  styles.priorityBadge,
                  tip.tingkatPenting === "Tinggi" ? localStyles.bgPriorityHigh : localStyles.bgPriorityLow
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    tip.tingkatPenting === "Tinggi" ? localStyles.textPriorityHigh : localStyles.textPriorityLow
                  ]}
                >
                  {tip.tingkatPenting}
                </Text>
              </View>
            </View>
            <Text style={styles.tipDesc}>{tip.deskripsi}</Text>
            {/* Tombol "Tips Lainnya" dihapus karena tidak jadi pakai halaman tips baru */}
          </View>
        ))}

        {/* Mengakses dan menampilkan interface list objek baru */}
        <Text style={[styles.sectionTitle, localStyles.spacingTop]}>
          Rekomendasi Aksesoris Tambahan
        </Text>
        {daftarAksesoris.map((item) => (
          <View key={item.id} style={styles.tipCard}>
            <Text style={styles.tipTitle}>{item.namaBarang}</Text>
            <Text style={styles.tipDesc}>Kategori: {item.kategori}</Text>
            <Text style={[styles.cardPrice, { marginTop: 8 }]}>{formatRupiah(item.harga)}</Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

// 3. Kumpulan style inline yang dipindahkan menjadi external/local
const localStyles = StyleSheet.create({
  introCard: { backgroundColor: "#ffffff", padding: 16, borderRadius: 12, marginBottom: 24, elevation: 2 },
  introTitle: { fontSize: 18, fontWeight: "bold", color: "#0f172a", marginBottom: 8 },
  introDesc: { fontSize: 14, color: "#475569", lineHeight: 22 },
  navContainer: { marginBottom: 24, gap: 12 },
  primaryBtn: { backgroundColor: "#0284c7", paddingVertical: 14, borderRadius: 8, alignItems: "center" },
  primaryBtnText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  secondaryBtn: { backgroundColor: "#334155", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  secondaryBtnText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
  bgPriorityHigh: { backgroundColor: "#fee2e2" },
  bgPriorityLow: { backgroundColor: "#fef3c7" },
  textPriorityHigh: { color: "#991b1b" },
  textPriorityLow: { color: "#92400e" },
  spacingTop: { marginTop: 24 },
});