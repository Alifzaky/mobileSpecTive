import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { styles } from "../..//components/laptopStyles";
import {
  filterLaptopBerdasarkanKategori,
  formatRupiah,
} from "../../components/laptopLogic";
import {
  cariLaptopByKeyword,
  getStatistikLaptop,
} from "../../components/laptopUtils";

export default function Index() {
  const router = useRouter();
  const [kategoriDipilih, setKategoriDipilih] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const laptopBerdasarkanKategori =
    filterLaptopBerdasarkanKategori(kategoriDipilih);
  const laptopTampil = cariLaptopByKeyword(
    laptopBerdasarkanKategori,
    searchQuery,
  );
  const statistik = getStatistikLaptop(laptopBerdasarkanKategori);

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={{ color: "white", marginTop: 15 }}>
          Memuat Database Laptop...
        </Text>
      </SafeAreaView>
    );
  }

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
            <TouchableOpacity
              key={laptop.id}
              style={styles.card}
              onPress={() => router.push(`./detail/${laptop.id}`)}
            >
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
                <Text style={styles.cardDetail}>💻 {laptop.processor}</Text>
                <Text style={styles.cardDetail}>🧠 RAM {laptop.ram}</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.cardPriceLabel}>Estimasi Harga</Text>
                <Text style={styles.cardPrice}>
                  {formatRupiah(laptop.harga)}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Tips & Perawatan Hardware
        </Text>
        <TouchableOpacity
          style={[
            styles.filterButtonActive,
            { alignSelf: "center", marginTop: 10, paddingHorizontal: 20 },
          ]}
          onPress={() => router.push("./tips")}
        >
          <Text style={styles.filterTextActive}>📖 Buka Panduan Perawatan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
