export const siteConfig = {
  name: "JSEA Contractors",
  nameAr: "جي سي إيه للمقاولات والهندسة والتجارة",
  descriptorEn: "Contracting, Engineering & Trading",
  descriptorAr: "المقاولات والهندسة والتجارة",
  taglineEn: "Quality Construction. Honest Service. Great Value.",
  taglineAr: "إنشاءات بجودة. خدمة بأمانة. قيمة حقيقية.",
  domain: "https://www.jseacontractors.com",
  email: "info@jseacontractors.com",
  phones: ["+966 54 456 6940", "+966 56 099 3436"],
  whatsappNumber: "966560993436",
  addressEn: "6th Floor, Rayhana Al Jazeera, 8601, Al Faisaliah District, Jeddah 23442, Saudi Arabia.",
  addressAr: "الطابق السادس، ريحانة الجزيرة، 8601، حي الفيصلية، جدة 23442، المملكة العربية السعودية.",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rayhana+Al+Jazeera+Al+Faisaliah+Jeddah",
  social: {
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
  },
  defaultLanguage: "ar" as const,
  analyticsEnabled: false,
  formTransport: "client-side" as const,
} as const;

export type Language = "ar" | "en";
export type Localized = { ar: string; en: string };

export function localized(value: Localized, language: Language) {
  return value[language];
}