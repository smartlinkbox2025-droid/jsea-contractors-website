# دليل النشر المستقل

## بناء النسخة النهائية

```bash
npm install
npm run build
```

الناتج في `dist/`. يمكن رفع محتوياته مباشرة إلى `public_html` أو استخدامه كـartifact في GitHub Pages.

## base path

النطاق الرئيسي يستخدم `/`. لمجلد فرعي:

```bash
BASE_PATH=/repository-name/ npm run build
```

يتم تمرير هذا المتغير إلى Vite، وهو متغير عام وليس سرًا.

## GitHub Pages

الملف `.github/workflows/deploy.yml` يثبت Node 22، يثبت الحزم، يبني باستخدام اسم repository، ثم يرفع `dist/` إلى Pages. فعّل GitHub Actions في Settings → Pages. لا يلزم Backend.

## Hostinger

شغّل البناء محليًا ثم ارفع محتويات `dist/` إلى `public_html`. اترك Hash Routing مفعّلًا، فلا يحتاج الموقع إلى rewrites عند تحديث صفحة داخلية. فعّل SSL واضبط DNS من لوحة Hostinger.

## نقل المشروع

يمكن تنزيل المشروع كاملًا كـZIP من بيئة التطوير أو نسخه من Git. لا يشمل التسليم `node_modules`؛ يكفي `npm install` لإعادة تثبيت الحزم من `package-lock.json` أو `pnpm-lock.yaml`.