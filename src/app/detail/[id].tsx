import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "../../../components/laptopStyles"; 

export default function DetailLaptop() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={[styles.container, { padding: 20, flex: 1, backgroundColor: '#0f172a', justifyContent: 'center' }]}>
      <Text style={[styles.headerTitle, { marginBottom: 20, textAlign: 'center' }]}>
        Informasi Detail Laptop
      </Text>
      <Text style={[styles.statsText, { marginBottom: 40, textAlign: 'center' }]}>
        Menampilkan data untuk ID perangkat: {id}
      </Text>
 
      <TouchableOpacity 
        style={[styles.filterButtonActive, { alignSelf: 'center', paddingHorizontal: 30 }]} 
        onPress={() => router.back()}
      >
        <Text style={styles.filterTextActive}>Kembali ke Beranda</Text>
      </TouchableOpacity>
    </View>
  );
}