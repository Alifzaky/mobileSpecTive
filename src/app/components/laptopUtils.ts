import { Laptop } from "./laptopData";

export const cariLaptopByKeyword = (
  daftarLaptop: Laptop[],
  keyword: string,
): Laptop[] => {
  if (!keyword.trim()) return daftarLaptop;

  const keywordLower = keyword.toLowerCase();
  const hasilPencarian: Laptop[] = [];

  for (const laptop of daftarLaptop) {
    if (
      laptop.nama.toLowerCase().includes(keywordLower) ||
      laptop.processor.toLowerCase().includes(keywordLower)
    ) {
      hasilPencarian.push(laptop);
    }
  }

  return hasilPencarian;
};

export const getStatistikLaptop = (daftarLaptop: Laptop[]) => {
  let totalHarga = 0;
  for (const laptop of daftarLaptop) {
    totalHarga += laptop.harga;
  }

  const rataRataHarga =
    daftarLaptop.length > 0 ? (totalHarga / daftarLaptop.length).toFixed(1) : 0;

  return {
    jumlahModel: daftarLaptop.length,
    rataRataHarga: `Rp ${rataRataHarga}.000.000`,
  };
};
