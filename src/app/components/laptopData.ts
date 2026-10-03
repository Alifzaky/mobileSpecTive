export type Laptop = {
  id: string;
  nama: string;
  processor: string;
  ram: string;
  harga: number;
  kategori: 'Gaming' | 'Coding' | 'Office';
  skorPerforma: number;
};

export type TipPerawatan = {
  id: string;
  judul: string;
  deskripsi: string;
  tingkatPenting: 'Tinggi' | 'Sedang';
};

export const dataLaptop: Laptop[] = [
  { id: '1', nama: 'Acer Swift Go 14 AI', processor: 'Intel Core Ultra 7', ram: '32GB', harga: 14, kategori: 'Coding', skorPerforma: 90 },
  { id: '2', nama: 'ASUS ROG Zephyrus', processor: 'AMD Ryzen 9', ram: '16GB', harga: 22, kategori: 'Gaming', skorPerforma: 95 },
  { id: '3', nama: 'Lenovo IdeaPad Slim 3', processor: 'Intel Core i3', ram: '8GB', harga: 6, kategori: 'Office', skorPerforma: 60 },
  { id: '4', nama: 'MacBook Pro M3', processor: 'Apple M3 Pro', ram: '18GB', harga: 28, kategori: 'Coding', skorPerforma: 98 },
];

export const dataTips: TipPerawatan[] = [
  { id: 't1', judul: 'Batasi Pengisian Baterai 80%', deskripsi: 'Menjaga kesehatan sel baterai agar tidak cepat drop saat sering dicolok charger.', tingkatPenting: 'Tinggi' },
  { id: 't2', judul: 'Pembersihan Debu Berkala', deskripsi: 'Bersihkan kipas dan heatsink setiap 6 bulan sekali agar suhu laptop tetap stabil.', tingkatPenting: 'Sedang' },
];