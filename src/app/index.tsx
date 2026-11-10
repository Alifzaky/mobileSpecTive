import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { styles } from "../../components/laptopStyles";
import { customDelay, fetchExternalLaptops } from "./services/apiService";
import { ExternalLaptop } from "./types/api";

export default function Index() {
  const router = useRouter();
  const [kategoriDipilih, setKategoriDipilih] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [externalLaptops, setExternalLaptops] = useState<ExternalLaptop[]>([]);
  const [apiError, setApiError] = useState<string>("");

  useEffect(() => {
    const loadAppData = async () => {
      try {
        setIsLoading(true);
        await customDelay(1000);
        const dataAPI = await fetchExternalLaptops();
        setExternalLaptops(dataAPI);
      } catch (error) {
        setApiError(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    loadAppData();
  }, []);

  const laptopTampil = externalLaptops.filter((laptop) => {
    const matchKategori = 
      kategoriDipilih === "Semua" ? true : 
      kategoriDipilih === "Gaming" ? laptop.price >= 1200 :
      kategoriDipilih === "Coding" ? laptop.brand === "Apple" || laptop.price >= 800 :
      laptop.price < 800;

    const matchSearch = 
      laptop.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      laptop.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchKategori && matchSearch;
  });

  const totalModel = laptopTampil.length;
  const rataRataHargaUSD = totalModel > 0 
    ? (laptopTampil.reduce((sum, laptop) => sum + laptop.price, 0) / totalModel).toFixed(2)
    : "0.00";

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={{ color: "white", marginTop: 15 }}>
          Mengambil Data dari Server API...
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
          <Text style={styles.headerSubtitle}>Sistem Rekomendasi & Panduan Perawatan</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Pilih Kebutuhan Utama</Text>
        <View style={styles.filterContainer}>
          {["Semua", "Coding", "Gaming", "Office"].map((kat) => (
            <TouchableOpacity
              key={kat}
              style={[styles.filterButton, kategoriDipilih === kat && styles.filterButtonActive]}
              onPress={() => setKategoriDipilih(kat)}
            >
              <Text style={[styles.filterText, kategoriDipilih === kat && styles.filterTextActive]}>
                {kat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama laptop atau brand..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>💻 Total Model: {totalModel} unit</Text>
          <Text style={styles.statsText}>🏷️ Rata-rata: USD ${rataRataHargaUSD}</Text>
        </View>

        <Text style={styles.sectionTitle}>Rekomendasi Perangkat</Text>
        
        {apiError !== "" ? (
          <Text style={styles.emptyText}>Gagal memuat data: {apiError}</Text>
        ) : laptopTampil.length === 0 ? (
          <Text style={styles.emptyText}>Laptop tidak ditemukan...</Text>
        ) : (
          laptopTampil.map((laptop) => (
            <TouchableOpacity
              key={laptop.id}
              style={[styles.card, { overflow: 'hidden' }]}
              onPress={() => router.push(`./detail/${laptop.id}`)}
            >
              <Image 
                source={{ uri: laptop.thumbnail }} 
                resizeMode="contain"
                style={{ 
                  width: '100%', 
                  height: 200, 
                  backgroundColor: '#1e293b',
                  borderRadius: 8,
                  marginBottom: 12
                }} 
              />
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{laptop.title}</Text>
                <View style={[styles.badge, { backgroundColor: "#8b5cf6" }]}>
                  <Text style={styles.badgeText}>{laptop.brand}</Text>
                </View>
              </View>
              <View style={styles.specContainer}>
                <Text style={styles.cardDetail}>📝 {laptop.description}</Text>
                <Text style={styles.cardDetail}>⚙️ Kategori: {laptop.category}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPriceLabel}>Harga Internasional</Text>
                <Text style={styles.cardPrice}>USD ${laptop.price}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Tips & Perawatan Hardware</Text>
        <TouchableOpacity
          style={[styles.filterButtonActive, { alignSelf: "center", marginTop: 10, paddingHorizontal: 20 }]}
          onPress={() => router.push("./tips")}
        >
          <Text style={styles.filterTextActive}>📖 Buka Panduan Perawatan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}