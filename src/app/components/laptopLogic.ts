import { Laptop, dataLaptop } from "./laptopData";

// Custom Function dengan Loop (for...of)
export const filterLaptopBerdasarkanKategori = (kategori: string): Laptop[] => {
  if (kategori === "Semua") return dataLaptop;

  const hasilFilter: Laptop[] = [];
  for (const laptop of dataLaptop) {
    if (laptop.kategori === kategori) {
      hasilFilter.push(laptop);
    }
  }
  return hasilFilter;
};

// Custom Function Format Rupiah
export const formatRupiah = (angka: number): string => {
  return `Rp ${angka}.000.000`;
};
