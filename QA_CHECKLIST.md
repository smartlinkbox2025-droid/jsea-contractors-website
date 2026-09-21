# QA checklist

آخر تحقق: 2026-09-22

## المحتوى والهوية

- [x] هوية أسود / ذهبي / أبيض مع استخدام أصل الشعار محليًا.
- [x] العربية والإنجليزية متاحتان مع اتجاه RTL/LTR.
- [x] قطاع المقاولات وقطاع التجارة والتوريد منفصلان وواضحان.
- [x] بيانات التواصل مصدرها `src/config/siteConfig.ts`.
- [x] لا توجد أرقام أو شهادات أو ادعاءات غير واردة.
- [x] لا يوجد Lorem Ipsum.

## الوظائف

- [x] روابط الصفحات والخدمات والمشاريع تعمل عبر Hash Routing.
- [x] تبديل اللغة يحفظ الاختيار في `localStorage`.
- [x] نموذج عرض السعر يتحقق محليًا ويجهز ملخصًا.
- [x] نموذج التوريد يجهز واتساب وبريدًا ونسخًا.
- [x] فلاتر المشاريع حسب المدينة والقطاع.
- [x] روابط phone / email / WhatsApp / Google Maps موجودة.
- [x] صفحة 404 داخل التطبيق وملف static `404.html`.

## التجاوب والوصول

- [x] تخطيط mobile-first عند 320px وما فوق.
- [x] فحص بصري للصفحة الرئيسية على سطح المكتب والجوال.
- [x] فحص بصري لمسار خدمة ديناميكي وصفحة التواصل.
- [x] قائمة الجوال قابلة للفتح والإغلاق ولوحة المفاتيح وEscape.
- [x] focus واضح وأهداف اللمس مناسبة.
- [x] نصوص بديلة للصور الرئيسية.
- [x] `prefers-reduced-motion`.
- [x] زر واتساب وزر العودة للأعلى.

## الجودة التقنية

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`
- [x] فحص artifact: `pnpm --filter @workspace/jsea-contractors-site run typecheck`
- [x] بناء artifact: `pnpm --filter @workspace/jsea-contractors-site run build`
- [x] Lighthouse على نسخة الإنتاج المحلية: Performance 98، Accessibility 95، Best Practices 100، SEO 100.
- [x] صور WebP و`srcset` للـhero لتقليل تحميل الجوال.

## النشر

- [x] `dist/` نسخة static.
- [x] GitHub Actions workflow مع Node LTS.
- [x] `BASE_PATH` تلقائي لـ GitHub Pages.
- [x] تعليمات Hostinger و`public_html`.
- [x] Hash Routing يمنع 404 عند تحديث مسار داخلي.
