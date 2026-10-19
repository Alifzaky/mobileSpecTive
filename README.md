 # 💻 mobileSpecTive

Aplikasi mobile untuk membantu pengguna memilih laptop yang sesuai kebutuhan, sekaligus memberikan panduan perawatan perangkat agar tetap optimal. Project ini masih dalam tahap pengembangan awal, jadi struktur dan fitur bisa berubah seiring progressnya.

## Status Proyek

Draft / belum final

## Deskripsi

mobileSpecTive adalah aplikasi berbasis React Native dengan Expo yang menampilkan:

- rekomendasi laptop berdasarkan kebutuhan utama seperti Coding, Gaming, dan Office
- fitur pencarian laptop berdasarkan nama atau processor
- informasi harga dan spesifikasi dasar
- halaman detail laptop
- panduan perawatan hardware seperti menjaga baterai dan membersihkan debu

Aplikasi ini dibuat dengan pendekatan mobile-first untuk memudahkan pengguna melihat rekomendasi dengan cepat dan nyaman di perangkat mobile.

## Fitur Utama

- Filter kategori laptop: Semua, Coding, Gaming, Office
- Search berdasarkan kata kunci
- Statistik total model dan rata-rata harga
- Halaman detail tiap laptop
- Panduan tips perawatan hardware
- UI yang sederhana, bersih, dan responsif untuk mobile

## Teknologi yang Digunakan

- React Native
- Expo
- Expo Router
- TypeScript
- React Native Safe Area Context

## Struktur Project

```text
mobileSpecTive/
├── app.json
├── package.json
├── tsconfig.json
├── assets/
├── components/
│   ├── laptopData.ts
│   ├── laptopLogic.ts
│   ├── laptopStyles.ts
│   └── laptopUtils.ts
├── src/
│   └── app/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── recomendations.tsx
│       ├── tips.tsx
│       └── detail/
│           └── [id].tsx
└── README.md
```

## Persiapan Awal

Pastikan perangkat Anda sudah memiliki Node.js dan Expo CLI siap digunakan.

```bash
npm install
```

## Menjalankan Aplikasi

Untuk menjalankan aplikasi di mode development:

```bash
npx expo start
```

Jika ingin langsung membuka di emulator/device:

```bash
npx expo start --android
npx expo start --ios
```

Untuk membuka versi web:

```bash
npm run web
```

## Catatan

- Project ini masih bersifat draft dan bisa mengalami perubahan layout, struktur, maupun fitur.
- Beberapa bagian masih mungkin dikembangkan lebih lanjut sesuai kebutuhan proyek.
- README ini dibuat sebagai dokumentasi awal agar proyek lebih mudah dipahami saat dikerjakan.

## Roadmap Sementara

Berikut beberapa hal yang kemungkinan akan dikembangkan ke depan:

- menambahkan fitur filter yang lebih detail
- memperbaiki navigasi antar halaman
- menambah data laptop yang lebih lengkap
- menambahkan nilai rekomendasi berdasarkan kebutuhan pengguna
- meningkatkan desain UI/UX agar lebih modern dan konsisten

## Kontribusi

Project ini masih dalam tahap pengembangan. Jika Anda ingin melanjutkan pengembangan, silakan fork atau clone repositori ini lalu bantu lanjutkan fitur-fitur yang masih belum final.

## Lisensi

Proyek ini menggunakan lisensi yang tersedia di file LICENSE.
