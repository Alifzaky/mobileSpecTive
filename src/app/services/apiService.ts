import { LaptopAPIResponse, ExternalLaptop } from "../types/api";
export const fetchExternalLaptops = (): Promise<ExternalLaptop[]> => {
  return new Promise((resolve, reject) => {
    fetch("https://dummyjson.com/products/category/laptops")
      .then((response) => {
        if (!response.ok) {
          reject("Gagal terhubung ke server API.");
        }
        return response.json();
      })
      .then((data: LaptopAPIResponse) => {
        resolve(data.products);
      })
      .catch((error) => {
        reject(error.message || "Terjadi kesalahan pada jaringan.");
      });
  });
};

export const customDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};