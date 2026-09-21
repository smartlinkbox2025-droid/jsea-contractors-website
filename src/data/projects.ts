import type { Localized } from "../config/siteConfig";

export type Project = {
  slug: string;
  name: Localized;
  city: Localized;
  type: Localized;
  sector: "civil" | "mep" | "buildings" | "power";
  description: Localized;
};

const project = (slug: string, ar: string, en: string, cityAr: string, cityEn: string, typeAr: string, typeEn: string, sector: Project["sector"], descriptionAr = "خبرة واردة في ملف الشركة دون تفاصيل تنفيذية إضافية منشورة.", descriptionEn = "Experience listed in the company profile without additional published execution details."): Project => ({
  slug,
  name: { ar, en },
  city: { ar: cityAr, en: cityEn },
  type: { ar: typeAr, en: typeEn },
  sector,
  description: { ar: descriptionAr, en: descriptionEn },
});

export const projects: Project[] = [
  project("king-saud-female-housing", "سكن الطالبات بجامعة الملك سعود بن عبدالعزيز", "King Saud bin Abdulaziz University — Female Housing", "الرياض", "Riyadh", "أعمال ميكانيكية", "Mechanical works", "mep"),
  project("princess-fahda-villa", "مشروع فيلا الأميرة فهدة", "Villa project for Princess Fahda", "الرياض", "Riyadh", "أعمال كهروميكانيكية", "MEP works", "mep"),
  project("abdul-latif-jameel", "مشروع عبداللطيف جميل", "Abdul Latif Jameel Project", "الرياض", "Riyadh", "أعمال كهروميكانيكية", "MEP works", "mep"),
  project("khurmah-villa", "مشروع فيلا الخرمة", "Khurmah Villa Project", "الخرمة", "Khurmah", "أعمال مدنية وكهروميكانيكية", "Civil and MEP works", "civil"),
  project("ahsa-villas", "فلل الأحساء", "Ahsa Villas", "الأحساء", "Al Ahsa", "أعمال مدنية وكهروميكانيكية", "Civil and MEP works", "buildings"),
  project("military-industries-villas", "تأهيل وتجهيز فلل ومبانٍ للمؤسسة العامة للصناعات العسكرية", "Rehabilitation and Equipping of Villas and Buildings for Military Industries Corporation", "الخرج", "Al Kharj", "تأهيل وتجهيز", "Rehabilitation and fit-out", "buildings"),
  project("military-hospital-admin", "المبنى الإداري للمستشفى العسكري", "Military Hospital Administrative Building", "الرياض", "Riyadh", "أعمال مبانٍ", "Building works", "buildings"),
  project("itcc", "مشروع ITCC", "ITCC", "الرياض", "Riyadh", "أعمال ميكانيكية", "Mechanical works", "mep"),
  project("college-dentistry", "كلية طب الأسنان", "College of Dentistry", "القصيم", "Qassim", "أعمال مبانٍ", "Building works", "buildings"),
  project("college-business", "كلية إدارة الأعمال", "College of Business", "القصيم", "Qassim", "أعمال مبانٍ", "Building works", "buildings"),
  project("college-sharia", "كلية الشريعة", "College of Sharia", "القصيم", "Qassim", "أعمال مبانٍ", "Building works", "buildings"),
  project("college-education", "كلية التربية", "College of Education", "القصيم", "Qassim", "أعمال مبانٍ", "Building works", "buildings"),
  project("college-science", "كلية العلوم", "College of Science", "القصيم", "Qassim", "أعمال مبانٍ", "Building works", "buildings"),
  project("king-khaled-airport", "حظائر أغذية مطار الملك خالد", "King Khaled Airport Food Hangars", "الرياض", "Riyadh", "أعمال كهروميكانيكية", "MEP works", "mep"),
  project("palace-project", "مشروع قصر", "Palace Project", "تبوك", "Tabuk", "أعمال مبانٍ", "Building works", "buildings"),
  project("ammaria-medical", "المشروع الطبي بالعمارية", "Ammaria Medical Project", "العمارية", "Al Ammariah", "أعمال كهروميكانيكية", "MEP works", "mep"),
  project("arac-hotel", "فندق ARAC", "ARAC Hotel", "الخبر", "Al Khobar", "أعمال مبانٍ", "Building works", "buildings"),
  project("housing-taif", "مشروع إسكان", "Housing Project", "الطائف", "Taif", "أعمال مبانٍ", "Building works", "buildings"),
  project("road-drainage", "نظام تصريف الطرق", "Drainage System of Roads", "الرياض", "Riyadh", "أعمال مدنية", "Civil works", "civil"),
  project("residential-buildings", "مبانٍ سكنية", "Residential Buildings", "الرياض وجدة وأبها", "Riyadh, Jeddah and Abha", "أعمال مبانٍ", "Building works", "buildings"),
  project("alnoor-hotel", "مشروع فندق النور", "Alnoor Hotel Project", "جدة", "Jeddah", "أعمال مبانٍ", "Building works", "buildings"),
  project("olaya-tower-a", "برج العليا A", "Olaya Tower A", "الرياض", "Riyadh", "أعمال كهروميكانيكية", "MEP works", "mep"),
  project("rain-water-pipe", "أنابيب مياه الأمطار للطرق", "Rain Water Pipe of Roads", "الدمام", "Dammam", "أعمال مدنية", "Civil works", "civil"),
  project("mould-factory", "مصنع القوالب", "Mould Factory", "الرياض", "Riyadh", "أعمال صناعية", "Industrial works", "power"),
  project("ncb-main-building", "المبنى الرئيسي للبنك الأهلي التجاري", "National Commercial Bank Main Building", "جدة", "Jeddah", "أعمال مبانٍ", "Building works", "buildings"),
  project("jeddah-residential-towers", "أبراج سكنية بجدة", "Jeddah Residential Towers", "جدة", "Jeddah", "أعمال مبانٍ", "Building works", "buildings"),
];