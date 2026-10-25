// All site content lives here.
// Profile images: put them in the "profiles" folder using the file names below
// (or change the paths). JPG, PNG or WEBP all work.
// Contact fields are optional — leave "" to hide that button.

const COMPANIES = [
  {
    id: "sadaf",
    logo: "images/sadaf.webp",
    accent: "#9a7b4f",
    name: { en: "Sadaf Group", ar: "مجموعة صدف", tr: "Sadaf Grubu" },
    sector: { en: "Luxury furniture & interiors", ar: "أثاث فاخر وديكور داخلي", tr: "Lüks mobilya ve iç mekân" },
    profile: { en: "profiles/sadaf-en.jpg", ar: "profiles/sadaf-ar.jpg", tr: "profiles/sadaf-tr.jpg" },
    phone: "", whatsapp: "", email: "", website: "", // whatsapp: digits only, e.g. "9647700000000"
  },
  {
    id: "taj-alnajaar",
    logo: "images/taj-alnajaar.webp",
    accent: "#3f8a3c",
    name: { en: "Taj Al Najaar", ar: "تاج النجار", tr: "Taj Al Najaar" },
    sector: { en: "Quality agricultural products", ar: "منتجات زراعية عالية الجودة", tr: "Kaliteli tarım ürünleri" },
    profile: { en: "profiles/taj-alnajaar-en.jpg", ar: "profiles/taj-alnajaar-ar.jpg", tr: "profiles/taj-alnajaar-tr.jpg" },
    phone: "", whatsapp: "", email: "", website: "",
  },
  {
    id: "taj-asphalt",
    logo: "images/taj-asphalt-logo.webp",
    accent: "#d19a1e",
    name: { en: "Taj Asphalt", ar: "تاج الأسفلت", tr: "Taj Asfalt" },
    sector: { en: "Bitumen & asphalt products", ar: "البيتومين ومنتجات الأسفلت", tr: "Bitüm ve asfalt ürünleri" },
    profile: { en: "profiles/taj-asphalt-en.jpg", ar: "profiles/taj-asphalt-ar.jpg", tr: "profiles/taj-asphalt-tr.jpg" },
    phone: "", whatsapp: "", email: "", website: "",
  },
];

// Interface text. The first language is the default.
const UI = {
  en: {
    label: "English", dir: "ltr",
    title: "Our Companies", headline: "Three companies, one standard of quality",
    subtitle: "Furniture, agriculture and bitumen. Choose a company to view its profile.",
    view: "View profile", others: "Our other companies", profileLang: "Profile language",
    back: "All companies", call: "Call", whatsapp: "WhatsApp", email: "Email", website: "Website",
    download: "Download profile", open: "Open full size",
    notFound: "Company not found.", missing: "This profile is not available yet.",
  },
  ar: {
    label: "العربية", dir: "rtl",
    title: "شركاتنا", headline: "ثلاث شركات، معيار واحد للجودة",
    subtitle: "الأثاث والزراعة والبيتومين. اختر شركة لعرض ملفها التعريفي.",
    view: "عرض الملف التعريفي", others: "شركاتنا الأخرى", profileLang: "لغة الملف التعريفي",
    back: "جميع الشركات", call: "اتصال", whatsapp: "واتساب", email: "البريد الإلكتروني", website: "الموقع الإلكتروني",
    download: "تحميل الملف التعريفي", open: "عرض بالحجم الكامل",
    notFound: "الشركة غير موجودة.", missing: "هذا الملف التعريفي غير متوفر بعد.",
  },
  tr: {
    label: "Türkçe", dir: "ltr",
    title: "Şirketlerimiz", headline: "Üç şirket, tek kalite standardı",
    subtitle: "Mobilya, tarım ve bitüm. Profilini görmek için bir şirket seçin.",
    view: "Profili görüntüle", others: "Diğer şirketlerimiz", profileLang: "Profil dili",
    back: "Tüm şirketler", call: "Ara", whatsapp: "WhatsApp", email: "E-posta", website: "Web sitesi",
    download: "Profili indir", open: "Tam boyutta aç",
    notFound: "Şirket bulunamadı.", missing: "Bu profil henüz mevcut değil.",
  },
};
