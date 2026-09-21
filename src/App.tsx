import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { siteConfig, type Language, type Localized, localized } from "./config/siteConfig";
import { ar } from "./i18n/ar";
import { en } from "./i18n/en";
import { clients } from "./data/clients";
import { projects, type Project } from "./data/projects";
import { services } from "./data/services";
import { sourcingSteps, tradingCategories } from "./data/tradingCategories";

const dictionary = { ar, en } as const;
const workTypes = [
  { value: "civil", ar: "مدني", en: "Civil" },
  { value: "mep", ar: "كهروميكانيكي", en: "MEP" },
  { value: "buildings", ar: "مبانٍ", en: "Buildings" },
  { value: "power", ar: "طاقة وهندسة كهربائية", en: "Power & electrical" },
] as const;

function getLanguage(value?: string): Language {
  return value === "en" ? "en" : "ar";
}

function usePageLanguage() {
  const params = useParams<{ lang?: string }>();
  const language = getLanguage(params.lang);
  return { language, t: dictionary[language] };
}

function href(language: Language, path = "") {
  return `/${language}${path === "/" ? "" : path}`;
}

function text(value: Localized, language: Language) {
  return localized(value, language);
}

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function Seo({ title, description, type = "website" }: { title: string; description: string; type?: string }) {
  const { language } = usePageLanguage();
  const location = useLocation();
  const cleanPath = location.pathname.replace(/^\/(ar|en)/, "") || "/";
  const canonical = `${siteConfig.domain}/${language}${cleanPath === "/" ? "" : cleanPath}`;
  const alternateAr = `${siteConfig.domain}/ar${cleanPath === "/" ? "" : cleanPath}`;
  const alternateEn = `${siteConfig.domain}/en${cleanPath === "/" ? "" : cleanPath}`;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.domain,
    email: siteConfig.email,
    telephone: siteConfig.phones[0],
    address: { "@type": "PostalAddress", addressLocality: "Jeddah", addressCountry: "SA" },
  };
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar" href={alternateAr} />
      <link rel="alternate" hrefLang="en" href={alternateEn} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
    </>
  );
}

function Logo() {
  const { language } = usePageLanguage();
  return <Link className="brand" to={href(language)}><img src={asset("/assets/jsea-logo.webp")} alt={language === "ar" ? "شعار JSEA للمقاولات" : "JSEA Contractors logo"} /></Link>;
}

function Header() {
  const { language, t } = usePageLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const navItems = [
    ["/about", t.nav.about],
    ["/services", t.nav.services],
    ["/trading", t.nav.trading],
    ["/projects", t.nav.projects],
    ["/quality-safety", t.nav.quality],
    ["/clients", t.nav.clients],
    ["/contact", t.nav.contact],
  ] as const;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const switchLanguage = () => {
    const next = language === "ar" ? "en" : "ar";
    const current = location.pathname.replace(/^\/(ar|en)/, "") || "";
    localStorage.setItem("jsea-language", next);
    navigate(href(next, current));
  };

  return (
    <header className={`site-header ${open ? "menu-open" : ""}`}>
      <div className="container header-inner">
        <Logo />
        <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([path, label]) => (
            <NavLink key={path} to={href(language, path)} className={({ isActive }) => (isActive ? "active" : "")}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button className="language-switch" onClick={switchLanguage} aria-label={`Switch to ${t.switchLanguage}`}>
            {t.switchLanguage}
          </button>
          <a className="header-whatsapp" href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <Link className="button button-small button-gold" to={href(language, "/contact")}>
            {t.nav.quote}
          </Link>
        </div>
        <div className="mobile-panel">
          {navItems.map(([path, label]) => (
            <NavLink key={path} to={href(language, path)}>{label}</NavLink>
          ))}
          <div className="mobile-actions">
            <button className="language-switch" onClick={switchLanguage}>{t.switchLanguage}</button>
            <Link className="button button-gold" to={href(language, "/contact")}>{t.nav.quote}</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { language, t } = usePageLanguage();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{t.footer.description}</p>
          <div className="footer-socials">
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">in</a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">f</a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer">x</a>
          </div>
        </div>
        <div>
          <h3>{t.footer.sectors}</h3>
          <Link to={href(language, "/services")}>{t.labels.construction}</Link>
          <Link to={href(language, "/trading")}>{t.labels.trading}</Link>
          <Link to={href(language, "/projects")}>{t.labels.projects}</Link>
        </div>
        <div>
          <h3>{t.footer.company}</h3>
          <Link to={href(language, "/about")}>{t.nav.about}</Link>
          <Link to={href(language, "/quality-safety")}>{t.nav.quality}</Link>
          <Link to={href(language, "/privacy")}>{t.footer.privacy}</Link>
        </div>
        <div className="footer-contact">
          <h3>{t.footer.contact}</h3>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          {siteConfig.phones.map((phone) => <a dir="ltr" key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>)}
          <span>{text({ ar: siteConfig.addressAr, en: siteConfig.addressEn }, language)}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}</span>
        <span>{siteConfig.taglineEn}</span>
      </div>
    </footer>
  );
}

function BackToTop() {
  const { t } = usePageLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return <button className="back-to-top" aria-label={t.common.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>;
}

function WhatsAppAction() {
  const { t } = usePageLanguage();
  return <a className="floating-whatsapp" href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label={t.common.whatsapp}>◔ <span>{t.common.whatsapp}</span></a>;
}

function AppLayout() {
  const { language } = usePageLanguage();
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("jsea-language", language);
    window.scrollTo(0, 0);
  }, [language]);
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppAction />
      <BackToTop />
    </>
  );
}

function SectionHeading({ eyebrow, title, description, align = "start" }: { eyebrow?: string; title: string; description?: string; align?: "start" | "center" }) {
  return (
    <div className={`section-heading align-${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Breadcrumbs({ current }: { current: string }) {
  const { language, t } = usePageLanguage();
  return <div className="container breadcrumbs"><Link to={href(language)}>{t.nav.home}</Link><span>/</span><span>{current}</span></div>;
}

function PageIntro({ eyebrow, title, description, image = "/assets/jsea-wireframe.webp" }: { eyebrow: string; title: string; description: string; image?: string }) {
  return (
    <section className="page-intro">
      <div className="container page-intro-inner">
        <div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
        <div className="intro-image"><img src={asset(image)} alt="" /></div>
      </div>
    </section>
  );
}

function CTA({ title, description }: { title: string; description: string }) {
  const { language, t } = usePageLanguage();
  return <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">JSEA CONTRACTORS</span><h2>{title}</h2><p>{description}</p></div><div className="cta-actions"><Link className="button button-gold" to={href(language, "/contact")}>{t.common.startRequest}</Link><a className="button button-outline-light" href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer">{t.common.whatsapp}</a></div></div></section>;
}

function HomePage() {
  const { language, t } = usePageLanguage();
  const featuredProjects = projects.slice(0, 4);
  return (
    <>
      <Seo title={`${siteConfig.name} | ${language === "ar" ? siteConfig.nameAr : siteConfig.descriptorEn}`} description={language === "ar" ? "شركة مقاولات وهندسة في جدة تقدم حلولًا متكاملة في الإنشاءات وإدارة المشاريع والتوريد الدولي." : "A Jeddah-based contracting and engineering company delivering construction, project management and international sourcing solutions."} />
      <section className="hero">
        <img className="hero-image" src={asset("/assets/jsea-hero.webp")} srcSet={`${asset("/assets/jsea-hero-mobile.webp")} 768w, ${asset("/assets/jsea-hero.webp")} 1920w`} sizes="100vw" alt={language === "ar" ? "رافعات وموقع إنشاءات في جدة" : "Tower cranes on an active construction site"} fetchPriority="high" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="hero-kicker">JSEA / 01 — JEDDAH, SAUDI ARABIA</span>
          <h1>{language === "ar" ? "نبني بثقة،\nونورّد باحتراف" : "Building with confidence.\nSourcing with expertise."}</h1>
          <p>{language === "ar" ? "حلول متكاملة في المقاولات والهندسة وإدارة المشاريع، إلى جانب خدمات التجارة والتوريد الدولي من الصين إلى المملكة العربية السعودية." : "Integrated contracting, engineering and project management solutions, backed by international trading and sourcing from China to Saudi Arabia."}</p>
          <div className="hero-actions"><Link className="button button-gold" to={href(language, "/services")}>{language === "ar" ? "استكشف خدماتنا" : "Explore our services"}</Link><Link className="button button-outline-light" to={href(language, "/contact")}>{t.nav.quote}</Link></div>
          <div className="hero-signature">{siteConfig.taglineEn}<span>{siteConfig.taglineAr}</span></div>
        </div>
        <div className="hero-index">01 <span>/</span> 06</div>
      </section>
      <section className="pathways section">
        <div className="container">
          <SectionHeading eyebrow="01 / SECTORS" title={language === "ar" ? "مساران واضحان، خدمة واحدة متكاملة" : "Two clear sectors. One integrated service."} description={language === "ar" ? "نربط خبرة التنفيذ بقرارات هندسية وتوريد أكثر واقعية." : "We connect delivery experience with practical engineering and sourcing decisions."} />
          <div className="sector-grid">
            <Link className="sector-card sector-dark" to={href(language, "/services")}><span className="card-number">01</span><div><h3>{t.labels.construction}</h3><p>{language === "ar" ? "التصميم والتنفيذ، الأعمال المدنية، MEP، إدارة المشاريع، التجهيز الداخلي والاستشارات." : "Design and delivery, civil works, MEP, project management, fit-out and consulting."}</p><span className="text-link">{t.common.explore} ↗</span></div></Link>
            <Link className="sector-card sector-gold" to={href(language, "/trading")}><span className="card-number">02</span><div><h3>{t.labels.trading}</h3><p>{language === "ar" ? "البحث عن الموردين، المقارنة، العينات، الفحص والشحن من الصين إلى السعودية." : "Supplier research, comparison, samples, inspection and shipping from China to Saudi Arabia."}</p><span className="text-link">{t.common.explore} ↗</span></div></Link>
          </div>
        </div>
      </section>
       <section className="about-slice section section-warm">
         <div className="container split-grid"><div className="image-frame"><img src={asset("/assets/jsea-building.webp")} alt={language === "ar" ? "أعمال إنشاءات وهندسة" : "Construction and engineering works"} loading="lazy" /><span>JSEA / 02</span></div><div><span className="eyebrow">02 / {language === "ar" ? "نبذة" : "ABOUT"}</span><h2>{language === "ar" ? "خبرة هندسية تبدأ من فهم المطلوب." : "Engineering experience starts with understanding the requirement."}</h2><p>{language === "ar" ? "JSEA Contractors شركة مقرها جدة تقدم حلولًا متكاملة في الإنشاءات والهندسة وإدارة المشاريع. ترتكز أعمالنا على الجودة والسلامة والنزاهة، ونعمل عن قرب مع عملائنا لتحويل المتطلبات إلى حلول عملية فعالة من حيث التكلفة." : "JSEA Contractors is based in Jeddah and delivers integrated construction, engineering and project management solutions. Our work is grounded in quality, safety and integrity, working closely with clients to turn requirements into practical, cost-aware solutions."}</p><Link className="text-link dark-link" to={href(language, "/about")}>{t.common.readMore} ↗</Link></div></div>
      </section>
      <section className="services-preview section"><div className="container"><SectionHeading eyebrow="03 / CAPABILITIES" title={language === "ar" ? "خدمات مصممة للمشروع" : "Capabilities designed around the project"} description={language === "ar" ? "من الأعمال المدنية إلى الطاقة والتجهيز الداخلي، نُبقي النطاق واضحًا والخطوة التالية عملية." : "From civil works to power and fit-out, we keep the scope clear and the next step practical."} /><div className="service-grid">{services.slice(0, 6).map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}</div><div className="center-action"><Link className="button button-dark" to={href(language, "/services")}>{t.common.learnMore}</Link></div></div></section>
      <section className="why-section section section-black"><div className="container"><div className="why-layout"><div><span className="eyebrow eyebrow-gold">04 / WHY JSEA</span><h2>{language === "ar" ? "وضوح أكبر.\nتنفيذ أفضل." : "More clarity.\nBetter delivery."}</h2></div><div className="why-list">{(language === "ar" ? ["حلول متكاملة من التخطيط إلى التنفيذ والتسليم.", "إدارة مهنية للجودة والسلامة والوقت والتكلفة.", "تواصل شفاف وخدمة تركز على احتياجات العميل.", "ربط الخبرة التنفيذية بقرارات شراء وتوريد أكثر واقعية."] : ["Integrated solutions from planning through delivery.", "Professional control of quality, safety, time and cost.", "Transparent communication focused on client needs.", "Delivery experience connected to better sourcing decisions."]).map((item, index) => <div className="why-item" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div></div></div></section>
      <section className="projects-preview section"><div className="container"><SectionHeading eyebrow="05 / EXPERIENCE" title={language === "ar" ? "خبرات ومشاريع واردة في ملف الشركة" : "Experience listed in the company profile"} description={language === "ar" ? "نعرض السجل كما ورد، دون اختلاق قيم أو تواريخ أو تفاصيل تنفيذية غير منشورة." : "We present the record as provided, without inventing values, dates or unpublished execution details."} /><div className="project-grid">{featuredProjects.map((item, index) => <ProjectCard key={item.slug} project={item} index={index} />)}</div><div className="center-action"><Link className="text-link dark-link" to={href(language, "/projects")}>{t.common.readMore} ↗</Link></div></div></section>
      <ClientsStrip />
      <CTA title={language === "ar" ? "لديك مشروع إنشائي أو طلب توريد؟" : "Have a construction project or sourcing request?"} description={language === "ar" ? "شاركنا متطلباتك، وسيتواصل معك فريق JSEA لمراجعة نطاق العمل والخطوة التالية." : "Share your requirements and the JSEA team will review the scope and next step with you."} />
    </>
  );
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const { language } = usePageLanguage();
  return <Link className="service-card" to={href(language, `/services/${service.slug}`)}><span className="service-index">0{index + 1}</span><h3>{text(service.title, language)}</h3><p>{text(service.summary, language)}</p><span className="arrow">↗</span></Link>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { language, t } = usePageLanguage();
  return <Link className="project-card" to={href(language, `/projects/${project.slug}`)}><div className={`project-thumb thumb-${index % 3}`}><img src={asset(index % 2 ? "/assets/jsea-project.webp" : "/assets/jsea-building.webp")} alt="" loading="lazy" /><span>0{index + 1}</span></div><div className="project-card-body"><span className="project-type">{text(project.type, language)}</span><h3>{text(project.name, language)}</h3><p>⌖ {text(project.city, language)}</p><span className="text-link dark-link">{t.common.readMore} ↗</span></div></Link>;
}

function ClientsStrip() {
  const { language, t } = usePageLanguage();
  return <section className="clients-strip section section-warm"><div className="container"><SectionHeading eyebrow="06 / SELECTED CLIENTS" title={language === "ar" ? "نماذج من عملائنا وخبراتنا" : "Selected clients and experience"} description={t.footer.profileNote} align="center" /><div className="client-grid">{clients.map((client) => <div className="client-name" key={client.en}>{text(client, language)}</div>)}</div><div className="center-action"><Link className="text-link dark-link" to={href(language, "/clients")}>{t.common.learnMore} ↗</Link></div></div></section>;
}

function ServicesPage() {
  const { language, t } = usePageLanguage();
  return <><Seo title={`${t.nav.services} | ${siteConfig.name}`} description={language === "ar" ? "خدمات المقاولات والهندسة وإدارة المشاريع والأعمال الكهروميكانيكية في السعودية." : "Contracting, engineering, project management and MEP services in Saudi Arabia."} /><Breadcrumbs current={t.nav.services} /><PageIntro eyebrow="JSEA / 03" title={t.labels.construction} description={language === "ar" ? "نطاقات عمل هندسية واضحة تمتد من الأعمال المدنية والمباني إلى MEP والطاقة والتجهيز الداخلي والاستشارات." : "Clear engineering scopes spanning civil works, buildings, MEP, power, fit-out and consulting."} image="/assets/jsea-building.jpeg" /><section className="section"><div className="container"><div className="service-grid service-grid-large">{services.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}</div></div></section><CTA title={language === "ar" ? "لنحدد نطاق مشروعك" : "Let’s define your project scope"} description={language === "ar" ? "أرسل المتطلبات الأساسية وسنراجع معك المسار الأنسب." : "Send the essentials and we will review the right path with you."} /></>;
}

function ServiceDetailPage() {
  const { language, t } = usePageLanguage();
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundPage />;
  return <><Seo title={`${text(service.title, language)} | ${siteConfig.name}`} description={text(service.summary, language)} type="article" /><Breadcrumbs current={text(service.title, language)} /><PageIntro eyebrow="JSEA / SERVICE" title={text(service.title, language)} description={text(service.description, language)} image={service.image} /><section className="section"><div className="container detail-grid"><div><SectionHeading eyebrow={language === "ar" ? "النطاق النموذجي" : "TYPICAL SCOPE"} title={language === "ar" ? "ما نقدمه ضمن نطاق المشروع" : "What we cover within project scope"} /><div className="bullet-list">{service.points.map((item) => <div key={item.en}><span>↗</span><p>{text(item, language)}</p></div>)}</div></div><aside className="dark-panel"><span className="eyebrow eyebrow-gold">{language === "ar" ? "القطاعات المخدومة" : "SECTORS SERVED"}</span><ul>{service.sectors.map((item) => <li key={item.en}>{text(item, language)}</li>)}</ul><Link className="button button-gold" to={href(language, "/contact")}>{t.nav.quote}</Link></aside></div></section><CTA title={language === "ar" ? "هل هذا نطاق مشروعك؟" : "Does this match your project scope?"} description={language === "ar" ? "شاركنا التفاصيل الأولية لنقترح الخطوة التالية بوضوح." : "Share the initial details and we will outline the next step clearly."} /></>;
}

function AboutPage() {
  const { language, t } = usePageLanguage();
  const values = language === "ar" ? [
    ["السلامة", "نخطط للعمل الآمن ونراجع المخاطر قبل التنفيذ."],
    ["الجودة", "نستخدم الفحص والتوثيق ومعالجة الملاحظات كجزء من العمل."],
    ["الشفافية", "نوضح النطاق والمتطلبات والخطوة التالية للعميل."],
    ["النزاهة", "نبني علاقات عادلة ومسؤولة في كل تعامل."],
    ["الاحترافية", "نقدّر التدريب والتنسيق والانضباط في التنفيذ."],
    ["رضا العميل", "نقيس نجاحنا بمدى ملاءمة الحل ووضوح التجربة."],
  ] : [
    ["Safety", "We plan safe work and review risks before delivery."],
    ["Quality", "Inspection, documentation and corrective action are part of the work."],
    ["Transparency", "We clarify scope, requirements and the next step."],
    ["Integrity", "We build fair and responsible working relationships."],
    ["Professionalism", "We value training, coordination and disciplined delivery."],
    ["Client satisfaction", "We measure success by fit of solution and clarity of experience."],
  ];
  return <><Seo title={`${t.nav.about} | ${siteConfig.name}`} description={language === "ar" ? "تعرف على JSEA Contractors ونهجها في الإنشاءات والهندسة والتوريد." : "Learn about JSEA Contractors and our approach to construction, engineering and sourcing."} /><Breadcrumbs current={t.nav.about} /><PageIntro eyebrow="JSEA / 02" title={t.nav.about} description={language === "ar" ? "JSEA Contractors منشأة ذات خبرة في مجالات متعددة من الإنشاءات الهندسية والمشتريات، تعمل بمنهج مهني يركز على الجودة والقيمة والتعاون الوثيق مع العميل." : "JSEA Contractors brings experience across engineering construction and procurement, working with a professional focus on quality, value and close client collaboration."} image="/assets/jsea-wireframe.jpeg" /><section className="section"><div className="container split-grid align-center"><div><span className="eyebrow">{language === "ar" ? "الرؤية والرسالة" : "VISION & MISSION"}</span><h2>{language === "ar" ? "أن نصبح من الشركات الرائدة في قطاع الإنشاءات والحلول الهندسية." : "To become a foremost construction and engineering enterprise."}</h2><p>{language === "ar" ? "نفهم توقعات كل عميل ونقدم حلولًا ممتازة ومبتكرة وفعالة من حيث التكلفة، بما يتوافق مع أفضل الممارسات ويحقق قيمة لأصحاب المصلحة." : "We understand each client’s expectations and provide excellent, innovative and cost-aware solutions aligned with best practice and stakeholder value."}</p></div><div className="quote-panel"><span>“</span><p>{language === "ar" ? "النزاهة والعلاقات العادلة والتصميم والتنفيذ المدروس، مع اعتبار الموظفين أهم مواردنا، هي أساس الطريقة التي نعمل بها." : "Integrity, fair relationships and considered design and delivery — with our people as our most important resource — shape how we work."}</p><strong>Ammar Alfiar</strong><small>Chief Executive Officer</small></div></div></section><section className="section section-warm"><div className="container"><SectionHeading eyebrow="VALUES" title={language === "ar" ? "قيم تظهر في طريقة العمل" : "Values visible in the work"} /><div className="values-grid">{values.map(([title, detail], index) => <div className="value-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></div>)}</div></div></section><CTA title={language === "ar" ? "لنعمل على متطلباتك" : "Let’s work through your requirements"} description={language === "ar" ? "كل مشروع يبدأ بسؤال واضح ونطاق مفهوم." : "Every project starts with a clear question and an understood scope."} /></>;
}

function TradingPage() {
  const { language, t } = usePageLanguage();
  return <><Seo title={`${t.nav.trading} | ${siteConfig.name}`} description={language === "ar" ? "خدمات التجارة والتوريد الدولي من الصين إلى السعودية، من البحث حتى الشحن." : "International trading and sourcing from China to Saudi Arabia, from research through shipping."} /><Breadcrumbs current={t.nav.trading} /><PageIntro eyebrow="JSEA / 04" title={t.labels.trading} description={language === "ar" ? "امتداد لخبرة الشركة التنفيذية يساعدك على اختيار وتوريد منتجات مناسبة للمشاريع والأعمال التجارية بوضوح في المواصفات والكمية والجودة والشحن." : "An extension of our delivery experience, helping you source suitable products for projects and commercial use with clarity on specifications, quantity, quality and shipping."} image="/assets/jsea-hero.jpeg" /><section className="section"><div className="container"><SectionHeading eyebrow="WHAT WE DO" title={language === "ar" ? "ننسق رحلة التوريد من الطلب إلى التسليم" : "We coordinate the sourcing journey from request to delivery"} /><div className="trading-services">{(language === "ar" ? ["استقبال وتحليل طلب التوريد والمواصفات", "البحث عن المصانع والموردين المناسبين", "طلب عروض الأسعار ومقارنتها", "التفاوض التجاري وتوضيح شروط التوريد", "تنسيق العينات واعتماد المواصفات قبل الطلب", "متابعة التصنيع والجاهزية", "تنسيق فحص الجودة عند الاتفاق", "تنسيق الشحن البحري أو الجوي ووثائق الشحنة", "دعم التغليف والعلامة الخاصة عند توفرها", "متابعة رحلة التوريد حتى نقطة التسليم المتفق عليها"] : ["Receive and analyse sourcing requests and specifications", "Research suitable factories and suppliers", "Request and compare quotations", "Negotiate and clarify supply terms", "Coordinate samples and specification approval", "Follow up manufacturing readiness", "Coordinate quality inspection when agreed", "Coordinate ocean or air freight and shipment documents", "Support packaging and private label when available", "Follow the order through the agreed delivery point"]).map((item, index) => <div className="trading-service" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div></div></section><section className="section section-warm"><div className="container"><SectionHeading eyebrow="PRODUCT CATEGORIES" title={language === "ar" ? "فئات مقترحة للتوريد" : "Suggested sourcing categories"} description={language === "ar" ? "أمثلة وليست حصرًا؛ يعتمد قبول الطلب على المواصفات والكمية والأنظمة المعمول بها." : "Examples, not an exhaustive list. Acceptance depends on specifications, quantity and applicable regulations."} /><div className="category-grid">{tradingCategories.map((category, index) => <div className="category-card" key={category.title.en}><span>0{index + 1}</span><h3>{text(category.title, language)}</h3><p>{text(category.detail, language)}</p></div>)}</div></div></section><section className="section"><div className="container"><SectionHeading eyebrow="HOW IT WORKS" title={language === "ar" ? "ست خطوات واضحة" : "Six clear steps"} /><div className="process-grid">{sourcingSteps.map((step, index) => <div className="process-step" key={step.en}><span>{String(index + 1).padStart(2, "0")}</span><p>{text(step, language)}</p></div>)}</div><div className="notice-panel"><strong>{language === "ar" ? "شروط التجارة الدولية" : "International trade terms"}</strong><p>{language === "ar" ? "يوضح العرض عند الحاجة العملة، مدة الصلاحية، الحد الأدنى للطلب MOQ، مدة الإنتاج، شروط الدفع، شرط التجارة Incoterm مثل EXW أو FOB أو CIF، وتكاليف الشحن والتأمين والتخليص والضرائب وما إذا كانت مشمولة. هذه معلومات تشغيلية وليست استشارة قانونية أو جمركية." : "When relevant, a quotation clarifies currency, validity, MOQ, production lead time, payment terms, Incoterm such as EXW, FOB or CIF, and whether freight, insurance, clearance and taxes are included. This is operational information, not legal or customs advice."}</p></div></div></section><CTA title={language === "ar" ? "ابدأ طلب التوريد" : "Start a sourcing request"} description={language === "ar" ? "أرسل مواصفات المنتج والكمية والوجهة لنرتب لك الخطوة الأولى." : "Send product specifications, quantity and destination to start the conversation."} /></>;
}

function ProjectsPage() {
  const { language, t } = usePageLanguage();
  const [city, setCity] = useState("all");
  const [sector, setSector] = useState("all");
  const cities = Array.from(new Set(projects.map((item) => text(item.city, language))));
  const filtered = projects.filter((item) => (city === "all" || text(item.city, language) === city) && (sector === "all" || item.sector === sector));
  return <><Seo title={`${t.nav.projects} | ${siteConfig.name}`} description={language === "ar" ? "مشاريع وخبرات JSEA Contractors في قطاعات مدنية وكهروميكانيكية ومبانٍ وطاقة." : "JSEA Contractors projects and experience across civil, MEP, buildings and power sectors."} /><Breadcrumbs current={t.nav.projects} /><PageIntro eyebrow="JSEA / 05" title={t.labels.projects} description={language === "ar" ? "سجل من المشاريع والخبرات الواردة في ملف الشركة، مع الحفاظ على الحقائق دون إضافة قيم أو تواريخ غير منشورة." : "A record of projects and experience listed in the company profile, preserving facts without adding unpublished values or dates."} image="/assets/jsea-project.jpeg" /><section className="section"><div className="container"><div className="filters"><label>{t.common.location}<select value={city} onChange={(event) => setCity(event.target.value)}><option value="all">{t.common.all}</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label><label>{t.common.workType}<select value={sector} onChange={(event) => setSector(event.target.value)}><option value="all">{t.common.all}</option>{workTypes.map((item) => <option key={item.value} value={item.value}>{language === "ar" ? item.ar : item.en}</option>)}</select></label></div><p className="results-note">{filtered.length} / {projects.length}</p><div className="project-grid">{filtered.map((item, index) => <ProjectCard key={item.slug} project={item} index={index} />)}</div>{filtered.length === 0 && <div className="empty-state">{t.common.noResults}</div>}</div></section></>;
}

function ProjectDetailPage() {
  const { language, t } = usePageLanguage();
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFoundPage />;
  return <><Seo title={`${text(project.name, language)} | ${siteConfig.name}`} description={text(project.description, language)} type="article" /><Breadcrumbs current={text(project.name, language)} /><section className="project-detail-hero"><div className="container"><span className="eyebrow">JSEA / EXPERIENCE</span><h1>{text(project.name, language)}</h1><p>{text(project.city, language)} · {text(project.type, language)}</p></div></section><section className="section"><div className="container detail-grid"><div className="large-project-image"><img src={asset("/assets/jsea-project.jpeg")} alt={t.common.illustrative} /><small>{t.common.illustrative}</small></div><div className="detail-copy"><span className="eyebrow">{t.labels.experience}</span><h2>{text(project.name, language)}</h2><p>{text(project.description, language)}</p><p>{language === "ar" ? "تتوفر تفاصيل إضافية بحسب نطاق المشاركة والمعلومات التي يشاركها العميل." : "Additional detail can be discussed according to scope and the information shared by the client."}</p><Link className="button button-dark" to={href(language, "/contact")}>{t.nav.quote}</Link></div></div></section></>;
}

function ClientsPage() {
  const { language, t } = usePageLanguage();
  return <><Seo title={`${t.nav.clients} | ${siteConfig.name}`} description={language === "ar" ? "نماذج من العملاء والجهات الواردة في ملف خبرات JSEA Contractors." : "Selected clients and entities listed in the JSEA Contractors experience profile."} /><Breadcrumbs current={t.nav.clients} /><PageIntro eyebrow="JSEA / 06" title={t.nav.clients} description={t.footer.profileNote} image="/assets/jsea-interior.jpeg" /><section className="section"><div className="container"><div className="client-list-grid">{clients.map((client, index) => <div className="client-list-card" key={client.en}><span>0{index + 1}</span><h3>{text(client, language)}</h3><p>{client.en}</p></div>)}</div></div></section></>;
}

function QualityPage() {
  const { language, t } = usePageLanguage();
  const items = language === "ar" ? ["التخطيط الآمن للعمل وتقييم المخاطر قبل التنفيذ.", "الالتزام بإجراءات الموقع ومعدات الوقاية.", "متابعة المقاولين الفرعيين ضمن نطاق المشروع.", "الفحص وضبط الجودة والتوثيق.", "معالجة الملاحظات والتحسين المستمر.", "التواصل الشفاف مع العميل."] : ["Safe work planning and risk assessment before delivery.", "Following site procedures and protective equipment requirements.", "Monitoring subcontractors within project scope.", "Inspection, quality control and documentation.", "Corrective action and continuous improvement.", "Transparent communication with the client."];
  return <><Seo title={`${t.nav.quality} | ${siteConfig.name}`} description={language === "ar" ? "نهج JSEA في الجودة والسلامة وإدارة المخاطر والتوثيق." : "JSEA’s approach to quality, safety, risk management and documentation."} /><Breadcrumbs current={t.nav.quality} /><PageIntro eyebrow="JSEA / 07" title={t.nav.quality} description={language === "ar" ? "التزام تشغيلي بالجودة والسلامة، وليس ادعاء شهادة أو اعتماد رسمي غير مذكور." : "An operating commitment to quality and safety, without claiming an unlisted certification or formal accreditation."} image="/assets/jsea-wireframe.jpeg" /><section className="section section-warm"><div className="container"><SectionHeading eyebrow="OUR APPROACH" title={language === "ar" ? "السلامة والجودة في كل مرحلة" : "Safety and quality at every stage"} /><div className="quality-grid">{items.map((item, index) => <div className="quality-card" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div></div></section><CTA title={language === "ar" ? "لنتحدث عن متطلبات مشروعك" : "Let’s discuss your project requirements"} description={language === "ar" ? "نراجع النطاق والمخاطر والخطوات القادمة بوضوح." : "We review scope, risks and next steps with clarity."} /></>;
}

type FormMode = "quote" | "sourcing";
type FormValues = Record<string, string>;

function RequestForm({ mode }: { mode: FormMode }) {
  const { language, t } = usePageLanguage();
  const [values, setValues] = useState<FormValues>({ preferred: "whatsapp" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [requestBody, setRequestBody] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const isSourcing = mode === "sourcing";
  const update = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const label = (arLabel: string, enLabel: string) => language === "ar" ? arLabel : enLabel;
  const validate = () => {
    const next: Record<string, string> = {};
    ["name", "email", "phone", ...(isSourcing ? ["product", "specs", "quantity"] : ["service", "message"])].forEach((field) => {
      if (!values[field]?.trim()) next[field] = language === "ar" ? t.labels.required : t.labels.required;
    });
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = t.labels.invalidEmail;
    if (values.privacy !== "yes") next.privacy = t.labels.privacyRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const createBody = () => {
    const lines = isSourcing ? [
      language === "ar" ? "طلب توريد دولي من JSEA" : "International sourcing request for JSEA",
      `${label("الاسم", "Name")}: ${values.name}`,
      `${label("الشركة", "Company")}: ${values.company || "-"}`,
      `${label("المدينة والدولة", "City and country")}: ${values.location || "-"}`,
      `${label("الجوال", "Phone")}: ${values.phone}`,
      `${label("البريد", "Email")}: ${values.email}`,
      `${label("فئة المنتج", "Product category")}: ${values.category || "-"}`,
      `${label("اسم المنتج", "Product")}: ${values.product}`,
      `${label("المواصفات", "Specifications")}: ${values.specs}`,
      `${label("الكمية والوحدة", "Quantity and unit")}: ${values.quantity}`,
      `${label("الميزانية", "Estimated budget")}: ${values.budget || "-"}`,
      `${label("الوجهة أو ميناء الوصول", "Destination or arrival port")}: ${values.destination || "-"}`,
      `${label("الموعد المطلوب", "Required date")}: ${values.requiredDate || "-"}`,
      `${label("روابط مرجعية", "Reference links")}: ${values.links || "-"}`,
      `${label("ملاحظات", "Notes")}: ${values.notes || "-"}`,
    ] : [
      language === "ar" ? "طلب عرض سعر من JSEA" : "JSEA quotation request",
      `${label("الاسم", "Name")}: ${values.name}`,
      `${label("الشركة", "Company")}: ${values.company || "-"}`,
      `${label("الجوال", "Phone")}: ${values.phone}`,
      `${label("البريد", "Email")}: ${values.email}`,
      `${label("المدينة", "City")}: ${values.location || "-"}`,
      `${label("نوع الخدمة", "Service")}: ${values.service}`,
      `${label("الوصف", "Description")}: ${values.message}`,
      `${label("الميزانية", "Estimated budget")}: ${values.budget || "-"}`,
      `${label("الموعد المتوقع", "Expected date")}: ${values.expectedDate || "-"}`,
    ];
    return lines.join("\n");
  };
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    const body = createBody();
    setRequestBody(body);
    setStatus(language === "ar" ? "تم تجهيز الطلب. اختر وسيلة الإرسال." : "Your request is ready. Choose a sending method.");
  };
  const sendWhatsApp = () => window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(requestBody)}`, "_blank", "noopener,noreferrer");
  const sendEmail = () => { window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(isSourcing ? "JSEA sourcing request" : "JSEA quotation request")}&body=${encodeURIComponent(requestBody)}`; };
  const copy = async () => { await navigator.clipboard?.writeText(requestBody); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return <form className="request-form" onSubmit={submit} noValidate>
    <div className="form-section-title"><span>01</span><div><h3>{label("بيانات التواصل", "Contact details")}</h3><p>{label("نستخدمها للرد على طلبك عبر الوسيلة التي تختارها.", "We use these details to respond through your preferred channel.")}</p></div></div>
    <div className="form-grid">
      <Field label={label("الاسم الكامل", "Full name")} name="name" value={values.name} onChange={update} error={errors.name} required />
      <Field label={label("اسم الشركة", "Company name")} name="company" value={values.company} onChange={update} />
      <Field label={label("رقم الجوال مع رمز الدولة", "Mobile with country code")} name="phone" value={values.phone} onChange={update} error={errors.phone} required type="tel" />
      <Field label={label("البريد الإلكتروني", "Email")} name="email" value={values.email} onChange={update} error={errors.email} required type="email" />
      <Field label={label("المدينة والدولة", "City and country")} name="location" value={values.location} onChange={update} />
    </div>
    {isSourcing ? <><div className="form-section-title"><span>02</span><div><h3>{label("تفاصيل طلب التوريد", "Sourcing request details")}</h3><p>{label("كلما كانت المواصفات أوضح، كان البحث والمقارنة أدق.", "Clearer specifications make research and comparison more precise.")}</p></div></div><div className="form-grid"><SelectField label={label("نوع الطلب / فئة المنتج", "Request type / product category")} name="category" value={values.category} onChange={update} options={tradingCategories.map((item) => ({ value: item.title.en, label: text(item.title, language) }))} /><Field label={label("اسم المنتج", "Product name")} name="product" value={values.product} onChange={update} error={errors.product} required /><Field label={label("الكمية والوحدة", "Quantity and unit")} name="quantity" value={values.quantity} onChange={update} error={errors.quantity} required /><Field label={label("الميزانية التقديرية (اختياري)", "Estimated budget (optional)")} name="budget" value={values.budget} onChange={update} /><Field label={label("الوجهة أو ميناء الوصول", "Destination or arrival port")} name="destination" value={values.destination} onChange={update} /><Field label={label("الموعد المطلوب (اختياري)", "Required date (optional)")} name="requiredDate" value={values.requiredDate} onChange={update} type="date" /><TextAreaField label={label("وصف ومواصفات تفصيلية", "Detailed description and specifications")} name="specs" value={values.specs} onChange={update} error={errors.specs} required wide /><Field label={label("روابط مرجعية / رابط ملف مواصفات", "Reference or specification links")} name="links" value={values.links} onChange={update} wide /><TextAreaField label={label("ملاحظات إضافية", "Additional notes")} name="notes" value={values.notes} onChange={update} wide /></div></> : <><div className="form-section-title"><span>02</span><div><h3>{label("تفاصيل الطلب", "Request details")}</h3><p>{label("اختر نوع الخدمة وأرسل النطاق الأولي أو السؤال.", "Choose a service and share the initial scope or question.")}</p></div></div><div className="form-grid"><SelectField label={label("نوع الخدمة", "Service type")} name="service" value={values.service} onChange={update} error={errors.service} required options={["مشروع مقاولات|Construction project", "استشارة هندسية|Engineering consulting", "إدارة مشروع|Project management", "أعمال MEP|MEP works", "تصميم وتجهيز داخلي|Design & fit-out", "طلب توريد من الصين|China sourcing request", "استفسار عام|General inquiry"].map((item) => { const [arLabel, enLabel] = item.split("|"); return { value: enLabel, label: label(arLabel, enLabel) }; })} /><Field label={label("الميزانية الاختيارية", "Estimated budget (optional)")} name="budget" value={values.budget} onChange={update} /><Field label={label("الموعد المتوقع", "Expected date")} name="expectedDate" value={values.expectedDate} onChange={update} type="date" /><TextAreaField label={label("وصف الطلب", "Request description")} name="message" value={values.message} onChange={update} error={errors.message} required wide /></div></>}
    <div className="form-section-title"><span>03</span><div><h3>{label("طريقة التواصل والموافقة", "Contact preference and consent")}</h3></div></div>
    <div className="form-grid form-last"><fieldset><legend>{label("طريقة التواصل المفضلة", "Preferred contact method")}</legend><label className="radio-label"><input type="radio" name="preferred" checked={values.preferred === "whatsapp"} onChange={() => update("preferred", "whatsapp")} /> WhatsApp</label><label className="radio-label"><input type="radio" name="preferred" checked={values.preferred === "email"} onChange={() => update("preferred", "email")} /> Email</label></fieldset><label className="checkbox-label"><input type="checkbox" checked={values.privacy === "yes"} onChange={(event) => update("privacy", event.target.checked ? "yes" : "no")} /> <span>{label("أوافق على ", "I agree to the ")}<Link to={href(language, "/privacy")}>{label("سياسة الخصوصية", "privacy policy")}</Link></span></label>{errors.privacy && <small className="form-error">{errors.privacy}</small>}</div>
    <div className="form-submit"><button className="button button-dark" type="submit">{label("تجهيز الطلب", "Prepare request")} →</button>{status && <p className="form-status">{status}</p>}</div>
    {requestBody && <div className="request-result"><h3>{label("ملخص الطلب جاهز", "Request summary ready")}</h3><pre>{requestBody}</pre><div className="result-actions"><button type="button" className="button button-gold" onClick={sendWhatsApp}>{t.common.whatsapp}</button><button type="button" className="button button-outline-dark" onClick={sendEmail}>{t.common.email}</button><button type="button" className="button button-outline-dark" onClick={copy}>{copied ? t.common.copied : t.common.copy}</button></div><small>{label("لا يتم حفظ الطلب في قاعدة بيانات. اختر وسيلة لإرساله أو انسخه.", "The request is not stored in a database. Choose a method to send it or copy it.")}</small></div>}
  </form>;
}

function Field({ label, name, value = "", onChange, error, required = false, type = "text", wide = false }: { label: string; name: string; value?: string; onChange: (name: string, value: string) => void; error?: string; required?: boolean; type?: string; wide?: boolean }) {
  return <label className={`field ${wide ? "field-wide" : ""}`}><span>{label}{required && <b> *</b>}</span><input type={type} name={name} value={value} onChange={(event) => onChange(name, event.target.value)} aria-invalid={Boolean(error)} />{error && <small className="form-error">{error}</small>}</label>;
}

function TextAreaField({ label, name, value = "", onChange, error, required = false, wide = false }: { label: string; name: string; value?: string; onChange: (name: string, value: string) => void; error?: string; required?: boolean; wide?: boolean }) {
  return <label className={`field ${wide ? "field-wide" : ""}`}><span>{label}{required && <b> *</b>}</span><textarea name={name} value={value} onChange={(event) => onChange(name, event.target.value)} rows={5} aria-invalid={Boolean(error)} />{error && <small className="form-error">{error}</small>}</label>;
}

function SelectField({ label, name, value = "", onChange, error, required = false, options }: { label: string; name: string; value?: string; onChange: (name: string, value: string) => void; error?: string; required?: boolean; options: { value: string; label: string }[] }) {
  return <label className="field"><span>{label}{required && <b> *</b>}</span><select name={name} value={value} onChange={(event) => onChange(name, event.target.value)} aria-invalid={Boolean(error)}><option value="">—</option>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{error && <small className="form-error">{error}</small>}</label>;
}

function ContactPage() {
  const { language, t } = usePageLanguage();
  return <><Seo title={`${t.nav.contact} | ${siteConfig.name}`} description={language === "ar" ? "تواصل مع JSEA Contractors لطلب عرض سعر أو استشارة أو توريد." : "Contact JSEA Contractors for a quote, consultation or sourcing request."} /><Breadcrumbs current={t.nav.contact} /><PageIntro eyebrow="JSEA / 08" title={language === "ar" ? "تواصل معنا / طلب عرض سعر" : "Contact us / Request a quote"} description={language === "ar" ? "أرسل المعلومات الأساسية، ثم اختر واتساب أو البريد أو اتصل مباشرة." : "Share the essentials, then choose WhatsApp, email or a direct call."} image="/assets/jsea-hero.jpeg" /><section className="section"><div className="container contact-layout"><aside className="contact-card"><span className="eyebrow">{language === "ar" ? "بيانات التواصل" : "CONTACT DETAILS"}</span><h2>{language === "ar" ? "نحن في جدة ونخدم المملكة." : "Based in Jeddah. Serving Saudi Arabia."}</h2><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{siteConfig.phones.map((phone) => <a dir="ltr" key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>)}<p>{text({ ar: siteConfig.addressAr, en: siteConfig.addressEn }, language)}</p><p>{language === "ar" ? "يرجى التواصل لتأكيد موعد الزيارة." : "Please contact us to confirm a visit appointment."}</p><a className="text-link" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">{language === "ar" ? "فتح الموقع على Google Maps" : "Open location in Google Maps"} ↗</a></aside><RequestForm mode="quote" /></div></section></>;
}

function SourcingPage() {
  const { language } = usePageLanguage();
  return <><Seo title={`${language === "ar" ? "طلب توريد من الصين" : "China sourcing request"} | ${siteConfig.name}`} description={language === "ar" ? "نموذج طلب توريد من الصين إلى السعودية، مع إرسال واتساب أو بريد دون تخزين." : "China sourcing request form for Saudi Arabia, sent by WhatsApp or email without storage."} /><Breadcrumbs current={language === "ar" ? "طلب توريد من الصين" : "China sourcing request"} /><PageIntro eyebrow="JSEA / SOURCING" title={language === "ar" ? "طلب توريد من الصين" : "China sourcing request"} description={language === "ar" ? "أرسل مواصفاتك وكمّيتك ووجهتك. لا يتم رفع الملفات أو حفظ الطلب؛ أرسل رابط الملف أو شاركه بعد بدء المحادثة." : "Share specifications, quantity and destination. Files are not uploaded or stored; share a file link or send it after starting the conversation."} image="/assets/jsea-hero.jpeg" /><section className="section"><div className="container"><RequestForm mode="sourcing" /></div></section><CTA title={language === "ar" ? "تحتاج إلى توضيح قبل الإرسال؟" : "Need clarification before sending?"} description={language === "ar" ? "تواصل معنا مباشرة عبر واتساب أو البريد." : "Reach us directly on WhatsApp or email."} /></>;
}

function PrivacyPage() {
  const { language, t } = usePageLanguage();
  return <><Seo title={`${t.footer.privacy} | ${siteConfig.name}`} description={language === "ar" ? "سياسة خصوصية JSEA Contractors للموقع الثابت." : "JSEA Contractors privacy policy for this static website."} /><Breadcrumbs current={t.footer.privacy} /><PageIntro eyebrow="JSEA / PRIVACY" title={t.footer.privacy} description={language === "ar" ? "توضح هذه الصفحة ما يحدث عند استخدام الموقع والنماذج." : "This page explains what happens when you use the site and its forms."} image="/assets/jsea-wireframe.jpeg" /><section className="section legal-copy"><div className="container"><h2>{language === "ar" ? "الموقع الثابت والطلبات" : "Static site and requests"}</h2><p>{language === "ar" ? "هذا الموقع ثابت ولا يخزن طلبات النماذج في قاعدة بيانات افتراضيًا. عند تجهيز طلب، ينتقل النص إلى واتساب أو تطبيق البريد وفق الوسيلة التي يختارها المستخدم. لا يتم رفع الملفات إلى الموقع؛ يمكن مشاركة رابط ملف أو إرساله بعد بدء المحادثة." : "This is a static website and does not store form submissions in a database by default. When a request is prepared, its text is passed to WhatsApp or an email application according to the user’s choice. Files are not uploaded to this website; a file link can be shared or sent after the conversation starts."}</p><h2>{language === "ar" ? "البيانات التي تدخلها" : "Information you enter"}</h2><p>{language === "ar" ? "تُستخدم البيانات التي تدخلها لتكوين رسالة التواصل التي تطلبها. راجع محتوى الرسالة قبل إرسالها، ولا تدخل معلومات لا ترغب في مشاركتها." : "Information you enter is used to create the communication message you request. Review the message before sending and do not enter information you do not wish to share."}</p><h2>{language === "ar" ? "الروابط الخارجية" : "External links"}</h2><p>{language === "ar" ? "قد يفتح الموقع واتساب أو البريد أو Google Maps أو الشبكات الاجتماعية. تخضع هذه الخدمات لسياساتها الخاصة عند مغادرة الموقع." : "The site may open WhatsApp, email, Google Maps or social networks. Those services apply their own policies once you leave this site."}</p><h2>{language === "ar" ? "التحليلات وملفات الارتباط" : "Analytics and cookies"}</h2><p>{language === "ar" ? "لا يفعّل الموقع تحليلات أو ملفات ارتباط غير ضرورية افتراضيًا." : "The site does not enable analytics or non-essential cookies by default."}</p></div></section></>;
}

function NotFoundPage() {
  const { language, t } = usePageLanguage();
  return <><Seo title={`404 | ${siteConfig.name}`} description={language === "ar" ? "الصفحة غير موجودة." : "Page not found."} /><section className="not-found"><div className="container"><span className="eyebrow">JSEA / 404</span><strong>404</strong><h1>{language === "ar" ? "هذه الصفحة غير موجودة" : "This page does not exist"}</h1><p>{language === "ar" ? "يمكنك العودة إلى الصفحة الرئيسية أو استكشاف خدماتنا." : "Return home or explore our services."}</p><Link className="button button-gold" to={href(language)}>{t.nav.home}</Link></div></section></>;
}

function RootRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const saved = localStorage.getItem("jsea-language");
    navigate(href(getLanguage(saved || siteConfig.defaultLanguage)), { replace: true });
  }, [navigate]);
  return null;
}

export default function App() {
  return <Routes><Route path="/" element={<RootRedirect />} /><Route path="/:lang/*" element={<AppLayout />}><Route index element={<HomePage />} /><Route path="about" element={<AboutPage />} /><Route path="services" element={<ServicesPage />} /><Route path="services/:slug" element={<ServiceDetailPage />} /><Route path="trading" element={<TradingPage />} /><Route path="sourcing-request" element={<SourcingPage />} /><Route path="projects" element={<ProjectsPage />} /><Route path="projects/:slug" element={<ProjectDetailPage />} /><Route path="clients" element={<ClientsPage />} /><Route path="quality-safety" element={<QualityPage />} /><Route path="contact" element={<ContactPage />} /><Route path="privacy" element={<PrivacyPage />} /><Route path="*" element={<NotFoundPage />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}