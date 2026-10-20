import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "SpecTive Home", headerShown: false }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{ title: "Detail Spesifikasi", headerBackTitle: "Kembali" }}
      />
      <Stack.Screen
        name="tips"
        options={{ title: "Tips & Perawatan", headerBackTitle: "Kembali" }}
      />
    </Stack>
  );
}
