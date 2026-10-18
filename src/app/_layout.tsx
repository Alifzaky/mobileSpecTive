import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Beranda", headerShown: false }} />
      <Stack.Screen name="recommendations" options={{ title: "Rekomendasi Laptop" }} />
    </Stack>
  );
}