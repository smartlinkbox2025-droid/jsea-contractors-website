# JSEA Contractors Website

موقع ثنائي اللغة لشركة **JSEA Contractors — جي سي إيه للمقاولات والهندسة والتجارة**. الموقع ثابت بالكامل وقابل للتنزيل والنشر على GitHub Pages أو Hostinger أو أي استضافة static.

## التشغيل المحلي

المتطلبات: Node.js LTS وnpm أو pnpm.

```bash
npm install
npm run dev
```

للبناء والمعاينة:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

يفتح خادم المعاينة على المنفذ 5000. لا يحتاج الموقع إلى قاعدة بيانات أو Backend أو مفاتيح API.

## أين تعدل البيانات؟

- `src/config/siteConfig.ts`: اسم الشركة، الشعار التسويقي، الدومين، البريد، الهواتف، واتساب، العنوان، الخرائط والشبكات.
- `src/data/services.ts`: الخدمات وصفحاتها التفصيلية.
- `src/data/projects.ts`: سجل المشاريع والخبرات.
- `src/data/clients.ts`: الأسماء الواردة في سجل العملاء والخبرات.
- `src/data/tradingCategories.ts`: فئات التوريد وخطواتها.
- `src/i18n/ar.ts` و`src/i18n/en.ts`: عناصر الواجهة الثابتة.

## الصور والشعار

الأصول المحلية في `public/assets/` مستخرجة من ملف بروفايل الشركة المرفق. يمكن استبدال الصورة مع الحفاظ على أسماء الملفات أو تحديث المسارات في ملفات البيانات. لا يُعاد رسم الشعار داخل الكود؛ العلامة المستخدمة هي الأصل المستخرج.

## اللغات والمسارات

العربية هي الافتراضية. يتم حفظ اللغة في `localStorage`، وتظهر الروابط داخل Hash Routing بصيغة `/#/ar/...` أو `/#/en/...`. تم اختيار هذا الأسلوب حتى يعمل التحديث المباشر على GitHub Pages وHostinger دون إعدادات خادم أو rewrites. عنصر `html` يتغير إلى `dir="rtl"` أو `dir="ltr"` مع اللغة.

## النشر على GitHub Pages

1. ارفع المشروع إلى GitHub بدون `node_modules`.
2. اترك Workflow `/.github/workflows/deploy.yml` في الفرع الرئيسي.
3. من Settings → Pages اختر **GitHub Actions** كمصدر النشر.
4. عند النشر على `username.github.io/repository-name/` يتولى الـWorkflow ضبط `BASE_PATH` تلقائيًا.
5. لربط دومين مخصص، انسخ `CNAME.example` إلى `CNAME` بعد استبدال القيمة، أو استخدم إعدادات Pages، ثم اضبط DNS.

## النشر على Hostinger

راجع `deployment/hostinger/README.md`. ارفع محتويات `dist/` إلى `public_html` بعد تشغيل `npm run build`. لا ترفع الملفات المصدرية إذا كنت تريد نشر النسخة النهائية فقط.

## ربط نموذج التواصل مستقبلًا

النماذج حاليًا تتحقق محليًا وتجهز رسالة واتساب أو `mailto:` وتوفر نسخ الملخص. لا تدّعي حفظ الطلبات. لتحويلها إلى Backend أو خدمة نماذج مستقبلًا، استبدل وظائف الإرسال في `RequestForm` بطبقة transport جديدة دون تغيير حقول الواجهة، وأضف إشعار خصوصية مناسبًا قبل تفعيل أي analytics أو cookies.

## معلومات تحتاج تأكيدًا لاحقًا

- روابط الشبكات الاجتماعية الحالية، إن رغبت الشركة بروابط صفحاتها الرسمية بدل الروابط العامة.
- أي صور مشروع محددة يراد ربطها بمشروع بعينه.
- تفاصيل ساعات العمل، إن أريد عرضها لاحقًا.
- أي بيانات تجارية أو قانونية إضافية؛ لا تظهر حاليًا لعدم ورودها في المصدر.

## English summary

This is a bilingual, static Vite/React website for JSEA Contractors. Run `npm install`, `npm run dev`, `npm run build`, and `npm run preview`. Edit company settings in `src/config/siteConfig.ts`, and deploy the `dist/` folder to GitHub Pages or Hostinger.