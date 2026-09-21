import type { Localized } from "../config/siteConfig";

export type Service = {
  slug: string;
  title: Localized;
  summary: Localized;
  description: Localized;
  points: Localized[];
  sectors: Localized[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "infrastructure-civil-works",
    title: { ar: "تطوير البنية التحتية والأعمال المدنية", en: "Infrastructure & Civil Works" },
    summary: { ar: "من تخطيط الموقع إلى الأعمال المدنية وشبكات الطرق والتصريف.", en: "From site planning to civil works, roads and drainage networks." },
    description: { ar: "حلول عملية للأعمال المدنية وتطوير المواقع ضمن نطاق المشروع ومتطلباته، مع تنسيق واضح بين التصميم والتنفيذ.", en: "Practical civil and site development solutions within the project scope, with clear coordination between design and delivery." },
    points: [
      { ar: "تخطيط وهندسة المواقع", en: "Site planning and engineering" },
      { ar: "التصميم والتنسيق والتصاريح ضمن نطاق المشروع", en: "Design, coordination and permits within project scope" },
      { ar: "الأعمال المدنية والإنشائية", en: "Civil and structural works" },
      { ar: "شبكات التصريف وأعمال الطرق", en: "Drainage networks and road works" },
      { ar: "التجديد والتعديل والتطوير العقاري", en: "Renovation, modification and related development works" },
    ],
    sectors: [
      { ar: "التطوير العقاري", en: "Real estate development" },
      { ar: "المباني السكنية والتجارية", en: "Residential and commercial buildings" },
      { ar: "البنية التحتية", en: "Infrastructure" },
    ],
    image: "/assets/jsea-building.webp",
  },
  {
    slug: "building-construction",
    title: { ar: "إنشاء المباني", en: "Building Construction" },
    summary: { ar: "تنفيذ المباني السكنية والتجارية مع تنسيق معماري وإنشائي متكامل.", en: "Residential and commercial buildings with coordinated architectural and structural delivery." },
    description: { ar: "ندير أعمال المباني من الأعمال الهيكلية والمعمارية إلى التجديد والتسليم والاختبارات النهائية ضمن نطاق العقد.", en: "We coordinate building works from structure and architecture through renovation, handover and final testing within the contract scope." },
    points: [
      { ar: "المباني السكنية والتجارية", en: "Residential and commercial buildings" },
      { ar: "الأعمال الهيكلية والمعمارية", en: "Structural and architectural works" },
      { ar: "التجديد وإعادة التأهيل", en: "Renovation and rehabilitation" },
      { ar: "التنسيق بين التخصصات", en: "Multi-discipline coordination" },
      { ar: "التسليم والاختبارات النهائية ضمن نطاق العقد", en: "Handover and final testing within contract scope" },
    ],
    sectors: [
      { ar: "الضيافة", en: "Hospitality" },
      { ar: "المباني الإدارية", en: "Administrative buildings" },
      { ar: "الفلل والمساكن", en: "Villas and housing" },
    ],
    image: "/assets/jsea-project.webp",
  },
  {
    slug: "project-management",
    title: { ar: "إدارة المشاريع والإشراف", en: "Project Management & Supervision" },
    summary: { ar: "تخطيط ومتابعة وضبط للجودة والتكلفة والمخاطر حتى التسليم.", en: "Planning and control for quality, cost and risk through handover." },
    description: { ar: "منهج منظم للتخطيط والجدولة والإشراف والتفتيش والتنسيق والاختبارات والتشغيل والتسليم.", en: "A structured approach to planning, scheduling, inspection, coordination, testing, commissioning and handover." },
    points: [
      { ar: "التخطيط والجدولة", en: "Planning and scheduling" },
      { ar: "الإشراف والتفتيش وضبط الجودة", en: "Supervision, inspection and quality control" },
      { ar: "متابعة التكاليف والميزانية", en: "Cost and budget monitoring" },
      { ar: "إدارة المخاطر الفنية وتقليل أخطاء التنفيذ", en: "Technical risk management and error reduction" },
      { ar: "التنسيق والتشغيل والتسليم", en: "Coordination, commissioning and handover" },
    ],
    sectors: [
      { ar: "المشاريع متعددة التخصصات", en: "Multi-discipline projects" },
      { ar: "المباني والبنية التحتية", en: "Buildings and infrastructure" },
    ],
    image: "/assets/jsea-wireframe.webp",
  },
  {
    slug: "mep",
    title: { ar: "الأعمال الكهروميكانيكية MEP", en: "Mechanical, Electrical & Plumbing (MEP)" },
    summary: { ar: "تنسيق وتنفيذ واختبار الأنظمة الكهربائية والميكانيكية والصحية.", en: "Coordination, delivery and testing for electrical, mechanical and plumbing systems." },
    description: { ar: "خدمات MEP متكاملة بحسب نطاق المشروع، مع تنسيق الأنظمة واختبارها وبصياغة تحترم المتطلبات النظامية.", en: "Integrated MEP services according to project scope, with coordinated systems and testing aligned with applicable requirements." },
    points: [
      { ar: "الأنظمة الكهربائية", en: "Electrical systems" },
      { ar: "الأنظمة الميكانيكية والتكييف والتهوية HVAC", en: "Mechanical systems, HVAC" },
      { ar: "أنظمة السباكة والصرف", en: "Plumbing and drainage systems" },
      { ar: "أنظمة مكافحة الحريق بحسب نطاق وتصميم المشروع", en: "Fire protection according to project scope and design" },
      { ar: "التنسيق والتنفيذ والاختبار", en: "Coordination, delivery and testing" },
    ],
    sectors: [
      { ar: "المرافق التعليمية والصحية", en: "Education and healthcare facilities" },
      { ar: "المباني التجارية", en: "Commercial buildings" },
      { ar: "المشاريع السكنية", en: "Residential projects" },
    ],
    image: "/assets/jsea-interior.webp",
  },
  {
    slug: "power-engineering",
    title: { ar: "خدمات الطاقة والهندسة الكهربائية", en: "Power & Electrical Engineering" },
    summary: { ar: "دراسة الأنظمة الكهربائية وتقييم الأحمال والتنسيق الفني ضمن العقود.", en: "Electrical studies, load assessment and technical coordination within contract scope." },
    description: { ar: "ندعم أعمال الطاقة والهندسة الكهربائية من الدراسة والتقييم إلى الإنشاء والتشغيل والصيانة بحسب نطاق المشروع.", en: "We support power and electrical engineering from studies and assessment through construction, commissioning and maintenance as scoped." },
    points: [
      { ar: "تصميم ودراسة الأنظمة الكهربائية", en: "Electrical system design and studies" },
      { ar: "تقييم الأحمال والتنسيق الفني", en: "Load assessment and technical coordination" },
      { ar: "أعمال الإنشاء والتشغيل والصيانة ضمن العقود", en: "Construction, commissioning and maintenance within contracts" },
      { ar: "محطات وخدمات الطاقة بحسب نطاق المشروع", en: "Power stations and services according to project scope" },
    ],
    sectors: [
      { ar: "الطاقة والمرافق", en: "Power and utilities" },
      { ar: "المباني والبنية التحتية", en: "Buildings and infrastructure" },
    ],
    image: "/assets/jsea-hero.webp",
  },
  {
    slug: "design-fit-out",
    title: { ar: "التصميم والتجهيز الداخلي", en: "Design & Fit-Out" },
    summary: { ar: "تحويل المساحات إلى بيئات عملية متناسقة مع التنسيق الفني والمشتريات.", en: "Turning spaces into coordinated, practical environments with technical coordination and procurement." },
    description: { ar: "ننسق تخطيط المساحات والتشطيبات والأنظمة والأثاث المصمم حسب الطلب ضمن نطاق واضح قبل التنفيذ.", en: "We coordinate space planning, finishes, systems and bespoke furniture within a defined pre-construction scope." },
    points: [
      { ar: "تخطيط المساحات والأرضيات والقواطع والأسقف", en: "Space planning, floors, partitions and ceilings" },
      { ar: "تنسيق HVAC والكهرباء والشبكات والأنظمة الأمنية", en: "HVAC, electrical, network and security coordination" },
      { ar: "التصميم الداخلي والخارجي", en: "Interior and exterior design" },
      { ar: "الأثاث المصمم حسب الطلب والمشتريات", en: "Bespoke furniture and procurement" },
      { ar: "التصور ثلاثي الأبعاد عند توفره ضمن النطاق", en: "3D visualization when included in scope" },
    ],
    sectors: [
      { ar: "المكاتب والضيافة", en: "Offices and hospitality" },
      { ar: "المباني التجارية", en: "Commercial buildings" },
      { ar: "المساكن", en: "Residential spaces" },
    ],
    image: "/assets/jsea-interior.webp",
  },
  {
    slug: "engineering-consulting",
    title: { ar: "الاستشارات الهندسية", en: "Engineering Consulting" },
    summary: { ar: "دعم معماري ومدني وميكانيكي وكهربائي لمتطلبات المشروع.", en: "Architectural, civil, mechanical and electrical support for project requirements." },
    description: { ar: "نوفر دعمًا فنيًا وتنسيقًا هندسيًا ومراجعات ضمن نطاق الاستشارة، مع التنسيق مع الجهات المعتمدة عند الحاجة.", en: "We provide technical support, engineering coordination and reviews within the consultancy scope, coordinating with approved entities when needed." },
    points: [
      { ar: "الاستشارات المعمارية والمدنية والإنشائية", en: "Architectural, civil and structural consulting" },
      { ar: "التصميم الميكانيكي والكهربائي", en: "Mechanical and electrical design" },
      { ar: "مراجعة تقارير فحص التربة", en: "Soil investigation report review" },
      { ar: "مراجعة المتطلبات البيئية ضمن نطاق الاستشارة", en: "Environmental requirement review within scope" },
      { ar: "الدعم الفني والتنسيق الهندسي", en: "Technical support and engineering coordination" },
    ],
    sectors: [
      { ar: "المطورون وأصحاب المشاريع", en: "Developers and owners" },
      { ar: "المقاولون", en: "Contractors" },
      { ar: "المشاريع متعددة التخصصات", en: "Multi-discipline projects" },
    ],
    image: "/assets/jsea-wireframe.webp",
  },
];