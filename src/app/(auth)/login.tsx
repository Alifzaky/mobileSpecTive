import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callsign, setCallsign] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const showNotification = (text: string, isError: boolean = true) => {
    setMessage({ text, isError });
    if (Platform.OS !== "web") {
      Alert.alert(isError ? "Error" : "Sukses", text);
    }
  };

  const handleAuth = async () => {
    setMessage(null);
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      showNotification("Email dan Kata Sandi wajib diisi.", true);
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              callsign: callsign || "SpecTive User",
              role: "user",
            },
          },
        });

        if (error) {
          showNotification(error.message, true);
        } else if (data.user && data.session === null) {
          showNotification("Registrasi berhasil! Matikan 'Confirm email' di Supabase jika ingin langsung masuk.", false);
        } else {
          showNotification("Registrasi berhasil! Akun kamu sudah aktif.", false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) {
          showNotification(error.message, true);
        }
      }
    } catch (err: any) {
      showNotification(err.message || "Terjadi kesalahan jaringan.", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={loginStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View style={loginStyles.container}>
        <View style={loginStyles.card}>
          <View style={loginStyles.brandContainer}>
            <View style={loginStyles.logoBadge}>
              <Text style={loginStyles.logoText}>💻</Text>
            </View>
            <Text style={loginStyles.title}>mobileSpecTive</Text>
            <Text style={loginStyles.subtitle}>
              {isRegistering
                ? "Buat akun untuk rekomendasi & panduan perawatan laptop"
                : "Masuk untuk mengakses dasbor rekomendasi laptop"}
            </Text>
          </View>

          {/* Banner Notifikasi UI */}
          {message && (
            <View
              style={[
                loginStyles.alertBox,
                {
                  backgroundColor: message.isError ? "rgba(239, 68, 68, 0.15)" : "rgba(34, 197, 94, 0.15)",
                  borderColor: message.isError ? "#ef4444" : "#22c55e",
                },
              ]}
            >
              <Text style={loginStyles.alertIcon}>{message.isError ? "⚠️" : "✅"}</Text>
              <Text
                style={[
                  loginStyles.alertText,
                  { color: message.isError ? "#fca5a5" : "#86efac" },
                ]}
              >
                {message.text}
              </Text>
            </View>
          )}

          <View style={loginStyles.formGroup}>
            {isRegistering && (
              <View style={loginStyles.inputWrapper}>
                <Text style={loginStyles.label}>Nama Panggilan / Callsign</Text>
                <TextInput
                  style={loginStyles.input}
                  placeholder="Contoh: Alif Zaky"
                  placeholderTextColor="#64748b"
                  value={callsign}
                  onChangeText={setCallsign}
                />
              </View>
            )}

            <View style={loginStyles.inputWrapper}>
              <Text style={loginStyles.label}>Alamat Email</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="nama@email.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={loginStyles.inputWrapper}>
              <Text style={loginStyles.label}>Kata Sandi</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="••••••••"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              style={loginStyles.submitButton}
              onPress={handleAuth}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={loginStyles.submitButtonText}>
                  {isRegistering ? "Daftar Akun Baru" : "Masuk ke Aplikasi"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={loginStyles.toggleContainer}
            onPress={() => {
              setMessage(null);
              setIsRegistering(!isRegistering);
            }}
          >
            <Text style={loginStyles.toggleText}>
              {isRegistering ? "Sudah punya akun? " : "Belum memiliki akun? "}
              <Text style={loginStyles.toggleHighlight}>
                {isRegistering ? "Masuk di sini" : "Daftar sekarang"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0f172a",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(14, 165, 233, 0.15)",
    borderWidth: 1,
    borderColor: "#0ea5e9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoText: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f8fafc",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 10,
  },
  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  alertIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  alertText: {
    fontSize: 13,
    flex: 1,
  },
  formGroup: {
    gap: 14,
  },
  inputWrapper: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#cbd5e1",
  },
  input: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#f8fafc",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#0ea5e9",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  toggleContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 13,
    color: "#94a3b8",
  },
  toggleHighlight: {
    color: "#38bdf8",
    fontWeight: "600",
  },
});