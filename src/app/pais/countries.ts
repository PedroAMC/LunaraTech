export interface Country {
  name: string;
  language: string;
  code: string;
  comingSoon?: boolean; // 👈 opcional
}

export interface Region {
  name: string;
  countries: Country[];
}

export const regions: Region[] = [
  {
    name: "The Americas",
    countries: [
      { name: "Argentina", language: "Español", code: "AR" },
      { name: "Brasil", language: "Portugués", code: "BR" },
      { name: "Canadá", language: "English / Français", code: "CA" },
      { name: "Chile", language: "Español", code: "CL" },
      { name: "Colombia", language: "Español", code: "CO" },
      { name: "México", language: "Español", code: "MX" },
      { name: "Perú", language: "Español", code: "PE" },
      { name: "United States", language: "English", code: "US" },
    ],
  },
  {
    name: "Asia Pacific",
    countries: [
      { name: "Australia", language: "English", code: "AU", comingSoon: true },
      { name: "Japón", language: "日本語", code: "JP", comingSoon: true },
      { name: "Corea del Sur", language: "한국어", code: "KR", comingSoon: true },
      { name: "China", language: "中文", code: "CN", comingSoon: true },
      { name: "Hong Kong", language: "繁體中文 / 简体中文", code: "HK", comingSoon: true },
      { name: "Malasia", language: "English", code: "MY", comingSoon: true },
      { name: "Singapur", language: "English", code: "SG", comingSoon: true },
      { name: "Tailandia", language: "ไทย", code: "TH", comingSoon: true },
    ],
  },
  {
    name: "Europe, Middle East, and Africa",
    countries: [
      { name: "Alemania", language: "Deutsch", code: "DE", comingSoon: true },
      { name: "España", language: "Español", code: "ES", comingSoon: true },
      { name: "Francia", language: "Français", code: "FR", comingSoon: true },
      { name: "Italia", language: "Italiano", code: "IT", comingSoon: true },
      { name: "Países Bajos", language: "Nederlands", code: "NL", comingSoon: true },
      { name: "Portugal", language: "Português", code: "PT", comingSoon: true },
      { name: "Reino Unido", language: "English", code: "GB", comingSoon: true },
      { name: "Sudáfrica", language: "English", code: "ZA", comingSoon: true },
    ],
  },
];
