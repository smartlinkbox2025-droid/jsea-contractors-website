import type { Localized } from "../config/siteConfig";

export const tradingCategories: { title: Localized; detail: Localized }[] = [
  { title: { ar: "مواد البناء والتشطيبات", en: "Building materials & finishes" }, detail: { ar: "مواد ومكونات مناسبة للمشاريع بحسب المواصفات.", en: "Project materials and components aligned with specifications." } },
  { title: { ar: "الأدوات الكهربائية والإنارة", en: "Electrical tools & lighting" }, detail: { ar: "منتجات إنارة وأدوات كهربائية للاستخدامات التجارية والمشاريع.", en: "Lighting and electrical tools for commercial and project use." } },
  { title: { ar: "المعدات والأدوات وقطع الغيار", en: "Equipment, tools & spare parts" }, detail: { ar: "بحث عن خيارات مناسبة للكمية والاستخدام والميزانية.", en: "Sourcing options aligned with quantity, use and budget." } },
  { title: { ar: "الأدوات الصحية وتجهيزات المشاريع", en: "Sanitaryware & project fixtures" }, detail: { ar: "تجهيزات صحية ومكونات للمباني والتجديد.", en: "Sanitaryware and components for buildings and renovation." } },
  { title: { ar: "أنظمة الطاقة والمنتجات الكهربائية", en: "Power systems & electrical products" }, detail: { ar: "منتجات وأنظمة كهربائية بحسب المواصفات والنطاق.", en: "Electrical products and systems according to scope and specifications." } },
  { title: { ar: "الأثاث والتجهيزات الداخلية", en: "Furniture & interior equipment" }, detail: { ar: "أثاث وتجهيزات للمكاتب والضيافة والمساكن.", en: "Furniture and equipment for offices, hospitality and homes." } },
  { title: { ar: "منتجات تجارية مخصصة", en: "Custom commercial products" }, detail: { ar: "طلبات مخصصة بحسب المواصفات والكمية والأنظمة المعمول بها.", en: "Custom requests according to specifications, quantity and applicable regulations." } },
];

export const sourcingSteps: Localized[] = [
  { ar: "إرسال الطلب والمواصفات", en: "Send the request and specifications" },
  { ar: "مراجعة المتطلبات والكمية والوجهة", en: "Review requirements, quantity and destination" },
  { ar: "البحث والمقارنة وتقديم العرض", en: "Research, compare and present options" },
  { ar: "اعتماد المنتج والعينة والشروط", en: "Approve product, sample and terms" },
  { ar: "التصنيع والمتابعة والفحص المتفق عليه", en: "Manufacturing, follow-up and agreed inspection" },
  { ar: "الشحن والتسليم وفق شروط الصفقة", en: "Shipping and delivery under the agreed terms" },
];