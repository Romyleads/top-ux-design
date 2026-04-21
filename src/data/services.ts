// Image imports
import imgPresentation from "@/assets/services/presentation.jpg";
import imgBrochure from "@/assets/services/brochure.jpg";
import imgCatalog from "@/assets/services/catalog.jpg";
import imgFlyer from "@/assets/services/flyer.jpg";
import imgLandingPage from "@/assets/services/landing-page.jpg";
import imgVideoAd from "@/assets/services/video-ad.jpg";
import imgSmm from "@/assets/services/smm.jpg";
import imgBanners from "@/assets/services/banners.jpg";
import imgLogo from "@/assets/services/logo.jpg";
import imgBusinessCard from "@/assets/services/business-card.jpg";
import imgPackaging from "@/assets/services/packaging.jpg";
import imgBrandbook from "@/assets/services/brandbook.jpg";
import imgBlogPost from "@/assets/services/blog-post.jpg";
import imgInfographic from "@/assets/services/infographic.jpg";
import imgWhitePaper from "@/assets/services/white-paper.jpg";
import imgCaseStudy from "@/assets/services/case-study.jpg";
import imgEbook from "@/assets/services/ebook.jpg";
import imgEmailCampaign from "@/assets/services/email-campaign.jpg";
import imgDripCampaign from "@/assets/services/drip-campaign.jpg";
import imgNewsletter from "@/assets/services/newsletter.jpg";
import imgWebinar from "@/assets/services/webinar.jpg";
import imgProductTour from "@/assets/services/product-tour.jpg";
import imgTestimonials from "@/assets/services/testimonials.jpg";
import imgPpcGoogle from "@/assets/services/ppc-google.jpg";
import imgRetargeting from "@/assets/services/retargeting.jpg";
import imgNativeAds from "@/assets/services/native-ads.jpg";
import imgLandingAd from "@/assets/services/landing-ad.jpg";
import imgUgc from "@/assets/services/ugc.jpg";
import imgAiContent from "@/assets/services/ai-content.jpg";
import imgSaasOnboarding from "@/assets/services/saas-onboarding.jpg";
import imgLinkedinBrand from "@/assets/services/linkedin-brand.jpg";
import imgMicroSaas from "@/assets/services/micro-saas.jpg";
import imgInteractiveContent from "@/assets/services/interactive-content.jpg";
import imgPodcast from "@/assets/services/podcast.jpg";
import imgSaasBuilder from "@/assets/services/saas-builder.jpg";
import imgTelegramTwa from "@/assets/services/telegram-twa.jpg";
import imgAiAutomation from "@/assets/services/ai-automation.jpg";
import imgNocodeMvp from "@/assets/services/nocode-mvp.jpg";
import imgVibeCodingVisionary from "@/assets/services/vibe-coding-visionary.jpg";
import imgAiTwin from "@/assets/services/ai-twin.jpg";
import imgMvpOnDemand from "@/assets/services/mvp-on-demand.jpg";
import imgAiVideoCatalog from "@/assets/services/ai-video-catalog.jpg";
import imgReverseEngineering from "@/assets/services/reverse-engineering.jpg";
import imgPromptDna from "@/assets/services/prompt-dna.jpg";
import imgTelegramAiAgent from "@/assets/services/telegram-ai-agent.jpg";
import imgGenerativeIdentity from "@/assets/services/generative-identity.jpg";
import imgAiForecast from "@/assets/services/ai-forecast.jpg";

export interface TierFeature {
  icon: "size" | "format" | "clock" | "check";
  text: string;
}

export interface Tier {
  name: string;
  price: string;
}

export interface InfoSection {
  kind: "description" | "content" | "goal" | "formats";
  label: string;
  text?: string;
  items?: string[];
  type: "text" | "list";
}

export interface Tool2026 {
  name: string;
  purpose: string;
  premium?: boolean;
  url?: string;
}

export interface ServiceCard {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  goal: string;
  blockId: string;
  photo: string;
  tag: string;
  hot?: boolean;
  income?: string;
  tiers: Tier[];
  tierFeatures: TierFeature[][];
  info: InfoSection[];
  tools?: Tool2026[];
}

export interface Block {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export const blocks: Block[] = [
  { id: "b1", icon: "🖨", title: "Друкована продукція", subtitle: "Фізичні та цифрові документи для зустрічей" },
  { id: "b2", icon: "💻", title: "Цифрові медіа", subtitle: "Онлайн-інструменти для залучення та конверсії" },
  { id: "b3", icon: "🎨", title: "Брендинг", subtitle: "Фірмова ідентичність та візуальна мова" },
  { id: "b4", icon: "📝", title: "Контент", subtitle: "Матеріали для побудови авторитету" },
  { id: "b5", icon: "📧", title: "Email-маркетинг", subtitle: "Листи та лід-магніти" },
  { id: "b6", icon: "🎬", title: "Відеоконтент", subtitle: "Навчання, огляди та інтерактив" },
  { id: "b7", icon: "📢", title: "Платна реклама", subtitle: "PPC, таргетинг і ретаргетинг" },
  { id: "b8", icon: "🔥", title: "Трендові 2026", subtitle: "Найбільш затребувані формати" },
];

// Helper to create default tier features
const tf = (s: string, f: string, c: string, ch: string): TierFeature[] => [
  { icon: "size", text: s },
  { icon: "format", text: f },
  { icon: "clock", text: c },
  { icon: "check", text: ch },
];

export const services: ServiceCard[] = [
  // ═══════════════════════════════════════
  // b1: Друкована продукція (4)
  // ═══════════════════════════════════════
  {
    id: "presentation",
    name: "Презентація",
    emoji: "📊",
    subtitle: "Переконлива слайд-колода для переговорів і пітчів",
    goal: "Перетворити увагу аудиторії на конкретне рішення: угоду, інвестицію або наступну зустріч",
    blockId: "b1",
    photo: imgPresentation,
    tag: "🖨 Друкована",
    tiers: [{ name: "Lite", price: "49 €" }, { name: "Standard", price: "99 €" }, { name: "Pro", price: "179 €" }],
    tierFeatures: [
      tf("<b>10–15</b> слайдів · Базова верстка", "PDF / PPTX", "<b>Термін: 5 днів</b>", "2 правки включено"),
      tf("<b>15–25</b> слайдів · Анімації + інфографіка", "PDF / PPTX / Keynote", "<b>Термін: 3 дні</b>", "5 правок · Slack-підтримка"),
      tf("<b>до 40</b> слайдів · Кастомна анімація", "Всі формати + Source files", "<b>Термін: 2 дні</b>", "Безлімітні правки · Trello-борд"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Багаторівнева структура з унікальним дизайном кожного слайду. Оптимізована для екрану та друку, з анімаційними переходами й логікою сторітелінгу.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Обкладинка з брендингом і заголовком", "Вступ: завдання клієнта і ринковий контекст", "Блок проблем і рішень з інфографікою", "Цінова пропозиція і кейси", "Соціальні докази: відгуки, лого клієнтів", "Заключний слайд із CTA та контактами"], type: "list" },
      { kind: "goal", label: "Мета", text: "Перетворити увагу аудиторії на конкретне рішення: угоду, інвестицію або наступну зустріч.", type: "text" },
      { kind: "formats", label: "Формати", text: "PDF, PPTX, Keynote, Google Slides", type: "text" },
    ],
    tools: [
      { name: "Gamma 2.0", purpose: "AI-генерація слайдів і брендованих презентацій", premium: true },
      { name: "Midjourney v7", purpose: "Кастомні візуали та обкладинки слайдів", premium: true },
      { name: "Figma Slides", purpose: "Фінальна верстка й анімації переходів" },
    ],
  },
  {
    id: "brochure",
    name: "Брошура",
    emoji: "📖",
    subtitle: "Друкований або PDF-документ для детального знайомства з послугами",
    goal: "Дати потенційному клієнту повне уявлення про пропозицію та мотивувати до звернення",
    blockId: "b1",
    photo: imgBrochure,
    tag: "🖨 Друкована",
    tiers: [{ name: "Lite", price: "39 €" }, { name: "Standard", price: "79 €" }, { name: "Pro", price: "149 €" }],
    tierFeatures: [
      tf("<b>4–8</b> сторінок · стандартний макет", "PDF", "<b>Термін: 4 дні</b>", "2 правки"),
      tf("<b>8–16</b> сторінок · авторський дизайн", "PDF + Print-ready CMYK", "<b>Термін: 3 дні</b>", "4 правки · ілюстрації в комплекті"),
      tf("<b>до 32</b> сторінок · преміум верстка", "PDF + CMYK + INDD Source", "<b>Термін: 2 дні</b>", "Безлімітні правки · макет для друку"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Багатосторінковий матеріал, що розкриває продукт або компанію в деталях.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Обкладинка з фото та слоганом", "Опис компанії та ключових цінностей", "Детальний опис продуктів / послуг", "Конкурентні переваги", "Відгуки та кейси клієнтів", "Контакти, адреса, QR-код"], type: "list" },
      { kind: "goal", label: "Мета", text: "Дати потенційному клієнту повне уявлення про пропозицію.", type: "text" },
      { kind: "formats", label: "Формати", text: "PDF для цифрових каналів + макет для друку (CMYK)", type: "text" },
    ],
    tools: [
      { name: "Adobe InDesign + Firefly", purpose: "Професійна верстка з AI-генерацією візуалів", premium: true },
      { name: "Claude Sonnet 4.6", purpose: "Копірайтинг із tone-of-voice бренду", premium: true },
      { name: "Recraft V3", purpose: "Векторні ілюстрації та іконки під брендинг", premium: true },
    ],
  },
  {
    id: "catalog",
    name: "Каталог",
    emoji: "📦",
    subtitle: "Систематизований перелік товарів та послуг з цінами й візуалами",
    goal: "Спростити вибір для клієнта та прискорити процес замовлення через структуровану подачу",
    blockId: "b1",
    photo: imgCatalog,
    tag: "🖨 Друкована",
    tiers: [{ name: "Lite", price: "79 €" }, { name: "Standard", price: "149 €" }, { name: "Pro", price: "299 €" }],
    tierFeatures: [
      tf("<b>до 40</b> позицій · базові картки", "PDF", "<b>Термін: 7 днів</b>", "1 правка структури"),
      tf("<b>до 120</b> позицій · деталізовані картки", "PDF + Print-ready", "<b>Термін: 5 днів</b>", "3 правки · таблиці та порівняння"),
      tf("<b>необмежено</b> позицій · повна верстка", "PDF + Print + Web-версія", "<b>Термін: 4 дні</b>", "Безлімітні правки · SEO-оптимізація"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Великий структурований документ для B2B-продажів або роздрібних мереж. Кожна позиція супроводжується якісним фото, детальним описом, таблицею характеристик та актуальною ціною.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Систематизований перелік позицій по категоріях", "Якісні фото та описи кожної позиції", "Таблиці характеристик і порівняння моделей", "Умови замовлення, ціни, знижки, MOQ", "Контактна інформація, QR-коди, посилання"], type: "list" },
      { kind: "goal", label: "Мета", text: "Спростити процес вибору та замовлення для B2B-клієнтів.", type: "text" },
      { kind: "formats", label: "Формати", text: "PDF для цифрових каналів, Print-ready (CMYK), Web-версія з пошуком", type: "text" },
    ],
    tools: [
      { name: "Adobe InDesign", purpose: "Професійна верстка багатосторінкових каталогів", premium: true },
      { name: "Sora 2 Pro", purpose: "AI-фото товарів на брендованих сценах", premium: true },
      { name: "Lovable", purpose: "Web-версія каталогу з пошуком і фільтрами", premium: true },
    ],
  },
  {
    id: "flyer",
    name: "Рекламна листівка",
    emoji: "📄",
    subtitle: "Яскравий односторінковий документ із чітким закликом до дії",
    goal: "Миттєво привернути увагу та спонукати до негайної дії: дзвінка, переходу або покупки",
    blockId: "b1",
    photo: imgFlyer,
    tag: "🖨 Друкована",
    tiers: [{ name: "Lite", price: "19 €" }, { name: "Standard", price: "39 €" }, { name: "Pro", price: "69 €" }],
    tierFeatures: [
      tf("<b>А5</b> · одностороння · базовий дизайн", "PDF для цифрових каналів", "<b>Термін: 1 день</b>", "2 правки"),
      tf("<b>А4 / А5</b> · двостороння · 2 варіанти", "Print CMYK + Digital PNG", "<b>Термін: 1 день</b>", "4 правки · анімована версія"),
      tf("<b>А4 / А5 / А6</b> · серія 3 варіантів", "Print + Digital + HTML5 банер", "<b>Термін: 1 день</b>", "Безлімітні правки · A/B версії"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Компактний рекламний матеріал форматів A4/A5/A6 для мережевих магазинів, заходів, поштових розсилок. Яскравий дизайн із фокусом на одне повідомлення та чіткий CTA.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Сильний заголовок з унікальною торговою пропозицією", "Основна пропозиція або акція з дедлайном", "Ключові переваги (3–5 пунктів)", "Заклик до дії з конкретним наступним кроком", "Контакти, сайт, QR-код для переходу"], type: "list" },
      { kind: "goal", label: "Мета", text: "Миттєво привернути увагу та конвертувати у дію.", type: "text" },
      { kind: "formats", label: "Формати", text: "PDF, PNG, Print-ready CMYK, HTML5 банер", type: "text" },
    ],
    tools: [
      { name: "Recraft V3", purpose: "Швидка AI-генерація layout і векторних деталей", premium: true },
      { name: "Midjourney v7", purpose: "Hero-візуал і фонові композиції", premium: true },
      { name: "Figma", purpose: "Фінальна верстка та експорт під формати", premium: true },
    ],
  },

  // ═══════════════════════════════════════
  // b2: Цифрові медіа (4)
  // ═══════════════════════════════════════
  {
    id: "landing-page",
    name: "Landing Page",
    emoji: "🌐",
    subtitle: "Конверсійна цільова сторінка для залучення лідів",
    goal: "Максимізувати конверсію відвідувачів у ліди через чітку воронку та переконливий оффер",
    blockId: "b2",
    photo: imgLandingPage,
    tag: "💻 Цифрова",
    hot: true,
    tiers: [{ name: "Lite", price: "99 €" }, { name: "Standard", price: "199 €" }, { name: "Pro", price: "399 €" }],
    tierFeatures: [
      tf("<b>до 5</b> сторінок · Landing page", "HTML / WordPress", "<b>Термін: 7 днів</b>", "2 правки дизайну"),
      tf("<b>8–12</b> секцій · адаптивний + анімації", "React / Webflow", "<b>Термін: 5 днів</b>", "5 правок · CRM-інтеграція"),
      tf("<b>до 20</b> секцій · кастомний код", "React + Headless CMS", "<b>Термін: 3 дні</b>", "Безлімітні правки · A/B тести"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Сторінка з фокусом на одну пропозицію. Оптимізована для конверсії з чіткою воронкою, адаптивним дизайном та продуманою структурою переконання.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Hero-блок із ціннісною пропозицією та CTA", "Блок переваг та характеристик з іконками", "Соціальні докази: відгуки, лого, кейси", "FAQ секція для зняття заперечень", "Форма захоплення лідів з інтеграцією CRM", "CTA-кнопки по всій сторінці з A/B тестами"], type: "list" },
      { kind: "goal", label: "Мета", text: "Конвертувати трафік у заявки з максимальним ROI.", type: "text" },
      { kind: "formats", label: "Формати", text: "HTML/CSS, React, Webflow, WordPress", type: "text" },
    ],
    tools: [
      { name: "Lovable", purpose: "Full-stack AI builder з backend і CRM-інтеграцією", premium: true },
      { name: "Cursor 3.0", purpose: "Доточування кастомного коду та A/B варіантів", premium: true },
      { name: "Vercel", purpose: "Деплой, edge-функції та аналітика конверсій", premium: true },
    ],
  },
  {
    id: "video-ad",
    name: "Відео-реклама",
    emoji: "🎬",
    subtitle: "Короткий динамічний ролик для онлайн- та офлайн-каналів",
    goal: "Захопити увагу за перші 3 секунди та донести ключове повідомлення бренду",
    blockId: "b2",
    photo: imgVideoAd,
    tag: "💻 Цифрова",
    tiers: [{ name: "Lite", price: "79 €" }, { name: "Standard", price: "149 €" }, { name: "Pro", price: "299 €" }],
    tierFeatures: [
      tf("<b>15–30 сек</b> · моушн-графіка", "MP4 1080p · 1 формат", "<b>Термін: 5 днів</b>", "1 ітерація правок"),
      tf("<b>30–60 сек</b> · кастомна анімація", "MP4 4K + Social cuts", "<b>Термін: 4 дні</b>", "3 правки · субтитри"),
      tf("<b>до 2 хв</b> · повний продакшн", "MP4 4K + Social + GIF", "<b>Термін: 3 дні</b>", "Безлімітні правки · сценарій"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Професійний відеоролик з motion-графікою для соцмереж, YouTube та рекламних кампаній. Включає сценарій, розкадровку, анімацію та фінальний монтаж із звуковим дизайном.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Сценарій та розкадровка", "Motion-графіка та анімація", "Професійна озвучка та музика", "Адаптація під різні платформи", "Субтитри для безшумного перегляду"], type: "list" },
      { kind: "goal", label: "Мета", text: "Збільшити впізнаваність бренду та залучення аудиторії через відеоконтент.", type: "text" },
      { kind: "formats", label: "Формати", text: "MP4 (1080p/4K), GIF, Social cuts (9:16, 1:1, 16:9)", type: "text" },
    ],
    tools: [
      { name: "Sora 2 Pro", purpose: "Фотореалістичне text-to-video до 60 сек", premium: true },
      { name: "Kling 2.5", purpose: "Анімація персонажів і продуктів з ліпсинком", premium: true },
      { name: "ElevenLabs v3", purpose: "Емоційна озвучка 113 мовами", premium: true },
    ],
  },
  {
    id: "smm",
    name: "SMM — Соцмережі",
    emoji: "📱",
    subtitle: "Стратегія та контент для Instagram, Facebook, LinkedIn",
    goal: "Побудувати лояльну аудиторію та генерувати ліди через системний контент у соцмережах",
    blockId: "b2",
    photo: imgSmm,
    tag: "💻 Цифрова",
    tiers: [{ name: "Lite", price: "69 €" }, { name: "Standard", price: "139 €" }, { name: "Pro", price: "249 €" }],
    tierFeatures: [
      tf("<b>8</b> постів/міс · 1 платформа", "JPG/PNG + тексти + хештеги", "<b>Щотижневий звіт</b>", "2 правки на пост · без Stories"),
      tf("<b>16</b> постів/міс · 2 платформи", "JPG/PNG + Stories + Reels", "<b>Щотижневий звіт + аналітика</b>", "4 правки · контент-план"),
      tf("<b>30</b> постів/міс · всі платформи", "Повний пакет + UGC стиль", "<b>Щоденний менеджмент</b>", "Безлімітні правки · growth"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Комплексне ведення соцмереж: від стратегії та контент-плану до щоденного постингу, модерації коментарів та аналітики зростання. Включає візуальний контент, копірайтинг та хештег-стратегію.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Розробка контент-стратегії та tone of voice", "Дизайн постів, Stories, Reels", "Копірайтинг та хештег-стратегія", "Модерація коментарів та DM", "Щомісячна аналітика та звіти"], type: "list" },
      { kind: "goal", label: "Мета", text: "Побудувати активну спільноту та конвертувати підписників у клієнтів.", type: "text" },
    ],
    tools: [
      { name: "ChatGPT Agent", purpose: "Контент-плани, копірайтинг і модерація DM", premium: true },
      { name: "Midjourney v7", purpose: "Візуали для постів, Stories і Reels", premium: true },
      { name: "Buffer AI", purpose: "Постинг, аналітика й оптимізація часу публікацій", premium: true },
    ],
  },
  {
    id: "banners",
    name: "Рекламні банери",
    emoji: "🖼",
    subtitle: "Графічні оголошення для дисплейної реклами та сайтів",
    goal: "Забезпечити високий CTR рекламних кампаній через професійні креативи",
    blockId: "b2",
    photo: imgBanners,
    tag: "💻 Цифрова",
    tiers: [{ name: "Lite", price: "19 €" }, { name: "Standard", price: "39 €" }, { name: "Pro", price: "79 €" }],
    tierFeatures: [
      tf("<b>3</b> розміри · статичні", "JPG/PNG", "<b>Термін: 2 дні</b>", "2 правки · 1 варіант дизайну"),
      tf("<b>6</b> розмірів · статичні + GIF", "PNG + GIF + HTML5", "<b>Термін: 2 дні</b>", "4 правки · A/B варіанти"),
      tf("<b>10+</b> розмірів · анімовані", "HTML5 + GIF + Video", "<b>Термін: 1 день</b>", "Безлімітні правки · ретаргетинг"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Комплект рекламних банерів для Google Ads, Facebook, Instagram, LinkedIn та інших платформ. Всі розміри адаптовані під вимоги кожної рекламної мережі з оптимізацією під CTR.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Дизайн банерів у всіх необхідних розмірах", "Статичні та анімовані версії (GIF/HTML5)", "A/B варіанти для тестування", "Адаптація під ретаргетинг-кампанії", "Оптимізація ваги файлів для швидкого завантаження"], type: "list" },
      { kind: "goal", label: "Мета", text: "Забезпечити високий CTR та конверсію рекламних кампаній.", type: "text" },
    ],
    tools: [
      { name: "Recraft V3", purpose: "Векторні AI-банери у всіх розмірах за хвилини", premium: true },
      { name: "Midjourney v7", purpose: "Hero-візуали і креативні концепти", premium: true },
      { name: "Bannerbear", purpose: "Автоматизація сотень варіацій через API", premium: true },
    ],
  },

  // ═══════════════════════════════════════
  // b3: Брендинг (4)
  // ═══════════════════════════════════════
  {
    id: "logo",
    name: "Логотип",
    emoji: "✏",
    subtitle: "Унікальний графічний знак та шрифтовий знак бренду",
    goal: "Створити впізнаваний візуальний символ, що відображає сутність бренду",
    blockId: "b3",
    photo: imgLogo,
    tag: "🎨 Брендинг",
    tiers: [{ name: "Lite", price: "49 €" }, { name: "Standard", price: "99 €" }, { name: "Pro", price: "199 €" }],
    tierFeatures: [
      tf("<b>2</b> концепти · базовий бриф", "PNG + SVG", "<b>Термін: 4 дні</b>", "2 правки · без кольорових варіантів"),
      tf("<b>5</b> концептів · гайдлайн використання", "AI + SVG + PNG + PDF", "<b>Термін: 3 дні</b>", "5 правок · анімована версія"),
      tf("<b>8</b> концептів · повний брендбук", "Всі формати + Source files", "<b>Термін: 2 дні</b>", "Безлімітні правки · trademark-check"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Створення логотипу з нуля: від брифу та дослідження конкурентів до фінального файлу. Кожний концепт проходить через мудборд, ескізи, векторизацію та деталізацію. Включає перевірку на унікальність.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Дослідження ніші та конкурентів", "Мудборд та 2–8 концептів", "Векторизація обраного варіанту", "Адаптація для різних носіїв", "Гайдлайн використання логотипу"], type: "list" },
      { kind: "goal", label: "Мета", text: "Створити запам'ятовуваний та масштабований знак бренду.", type: "text" },
    ],
  },
  {
    id: "business-card",
    name: "Візитка",
    emoji: "💳",
    subtitle: "Компактний та стильний носій ділової ідентичності",
    goal: "Залишити професійне враження при першій зустрічі та забезпечити зручний спосіб зв'язку",
    blockId: "b3",
    photo: imgBusinessCard,
    tag: "🎨 Брендинг",
    tiers: [{ name: "Lite", price: "15 €" }, { name: "Standard", price: "29 €" }, { name: "Pro", price: "59 €" }],
    tierFeatures: [
      tf("<b>1</b> варіант · стандарт 90×50 мм", "PDF Print-ready", "<b>Термін: 1 день</b>", "2 правки"),
      tf("<b>2</b> варіанти · двостороння", "PDF + AI + Mockup", "<b>Термін: 1 день</b>", "4 правки · NFC варіант"),
      tf("<b>3</b> варіанти · преміум фінішинг", "PDF + AI + 3D Mockup", "<b>Термін: 1 день</b>", "Безлімітні правки · організація друку"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Професійна візитна картка, яка запам'ятовується з першого дотику. Включає дизайн обох сторін, підбір паперу та фінішингу (тиснення, ламінація, soft-touch). Можливість NFC-версії.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Дизайн лицьової та зворотної сторін", "Підбір паперу та фінішингу", "Мокапи для презентації", "QR-код та NFC варіант", "Підготовка файлу для друку"], type: "list" },
      { kind: "goal", label: "Мета", text: "Створити тактильне враження професіоналізму при першому знайомстві.", type: "text" },
    ],
  },
  {
    id: "packaging",
    name: "Упаковка",
    emoji: "📫",
    subtitle: "Фірмова упаковка, що продає на полиці",
    goal: "Виділити продукт серед конкурентів на полиці та посилити бренд-досвід",
    blockId: "b3",
    photo: imgPackaging,
    tag: "🎨 Брендинг",
    tiers: [{ name: "Lite", price: "59 €" }, { name: "Standard", price: "119 €" }, { name: "Pro", price: "229 €" }],
    tierFeatures: [
      tf("<b>1</b> поверхня · коробка або пакет", "AI/PDF розгортка + 1 мокап", "<b>Термін: 5 днів</b>", "2 правки"),
      tf("<b>2</b> поверхні · кастомний дизайн", "AI + PDF + 3D Mockup", "<b>Термін: 4 дні</b>", "3 правки · друкарня-ready"),
      tf("<b>3+</b> поверхні · повна лінійка", "Всі формати + Prototип", "<b>Термін: 3 дні</b>", "Безлімітні правки · продакшн-підтримка"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Дизайн упаковки від концепції до друкарського файлу. Враховує ергономіку, вимоги до матеріалів та специфіку виробництва. Включає 3D-мокапи для презентації та узгодження з виробництвом.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Розробка концепції та стилістики", "Дизайн усіх поверхонь упаковки", "3D-мокапи та візуалізація", "Розгортка для друку (die-cut)", "Супровід на етапі виробництва"], type: "list" },
      { kind: "goal", label: "Мета", text: "Перетворити упаковку на потужний інструмент продажів.", type: "text" },
    ],
  },
  {
    id: "brandbook",
    name: "Брендбук",
    emoji: "📕",
    subtitle: "Офіційний стайл-гайд для єдності всіх комунікацій",
    goal: "Забезпечити візуальну єдність бренду на всіх точках контакту з клієнтом",
    blockId: "b3",
    photo: imgBrandbook,
    tag: "🎨 Брендинг",
    tiers: [{ name: "Lite", price: "149 €" }, { name: "Standard", price: "299 €" }, { name: "Pro", price: "549 €" }],
    tierFeatures: [
      tf("<b>15–20</b> сторінок · логотип + кольори + шрифти", "PDF", "<b>Термін: 10 днів</b>", "2 правки"),
      tf("<b>30–40</b> сторінок · повний гайдлайн", "PDF + Figma", "<b>Термін: 7 днів</b>", "4 правки · шаблони документів"),
      tf("<b>50+</b> сторінок · корпоративний стандарт", "PDF + Figma + Notion", "<b>Термін: 5 днів</b>", "Безлімітні правки · digital guidelines"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Комплексний документ, що фіксує всі правила використання бренду: логотип, кольори, типографіка, фотостиль, тон комунікацій та приклади застосування. Служить «біблією» для всіх підрядників та відділів.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Місія, візія та цінності бренду", "Правила використання логотипу", "Палітра кольорів та типографіка", "Фотостиль та ілюстрації", "Tone of voice та приклади комунікацій", "Шаблони документів та презентацій"], type: "list" },
      { kind: "goal", label: "Мета", text: "Забезпечити консистентність бренду на всіх носіях.", type: "text" },
    ],
  },

  // ═══════════════════════════════════════
  // b4: Контент (4)
  // ═══════════════════════════════════════
  {
    id: "blog-post",
    name: "Стаття / Блог-пост",
    emoji: "📝",
    subtitle: "SEO-оптимізований текст для органічного трафіку",
    goal: "Залучити органічний трафік та побудувати авторитет бренду через експертний контент",
    blockId: "b4",
    photo: imgBlogPost,
    tag: "📝 Контент",
    tiers: [{ name: "Lite", price: "15 €" }, { name: "Standard", price: "29 €" }, { name: "Pro", price: "59 €" }],
    tierFeatures: [
      tf("<b>700–1000</b> слів · базова SEO-оптимізація", "Google Doc або HTML", "<b>Термін: 2 дні</b>", "1 правка · мета-теги включено"),
      tf("<b>1500–2500</b> слів · SEO + конверсія", "Google Doc + CMS", "<b>Термін: 2 дні</b>", "3 правки · keyword research"),
      tf("<b>3000+</b> слів · pillar content", "CMS + Notion + Content Calendar", "<b>Термін: 1 день</b>", "Безлімітні правки · A/B тести"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Професійні SEO-оптимізовані статті, написані з урахуванням пошукових намірів аудиторії. Включають keyword research, структуровану подачу, внутрішню перелінковку та мета-теги для максимального ранжування.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Keyword research та кластеризація", "Структурована стаття з H1–H3", "Внутрішня перелінковка", "Мета-теги та alt-тексти", "CTA для конверсії читачів"], type: "list" },
      { kind: "goal", label: "Мета", text: "Зайняти ТОП-позиції в Google та залучити цільовий трафік.", type: "text" },
    ],
  },
  {
    id: "infographic",
    name: "Інфографіка",
    emoji: "📊",
    subtitle: "Візуальний матеріал для пояснення складних даних",
    goal: "Перетворити складні дані у зрозумілу візуалізацію, що легко шериться",
    blockId: "b4",
    photo: imgInfographic,
    tag: "📝 Контент",
    tiers: [{ name: "Lite", price: "29 €" }, { name: "Standard", price: "59 €" }, { name: "Pro", price: "119 €" }],
    tierFeatures: [
      tf("<b>1</b> інфографіка · статична · до 5 блоків", "PNG + PDF", "<b>Термін: 2 дні</b>", "2 правки"),
      tf("<b>3</b> інфографіки · кастомні ікони", "PNG + PDF + SVG", "<b>Термін: 2 дні</b>", "4 правки · інтерактивна версія"),
      tf("<b>5+</b> інфографік · анімовані", "SVG + Lottie + Video", "<b>Термін: 2 дні</b>", "Безлімітні правки · data-driven"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Перетворення складних даних, статистики та процесів у привабливу візуалізацію. Кожна інфографіка проєктується з урахуванням когнітивних патернів сприйняття для максимального розуміння.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Структурування даних та сторітелінг", "Кастомні ікони та ілюстрації", "Кольорове кодування та ієрархія", "Адаптація під друк та digital", "Інтерактивна версія для web"], type: "list" },
      { kind: "goal", label: "Мета", text: "Зробити складне простим і підвищити залученість аудиторії.", type: "text" },
    ],
  },
  {
    id: "white-paper",
    name: "White Paper",
    emoji: "📄",
    subtitle: "Авторитетний аналітичний документ для генерації B2B-лідів",
    goal: "Позиціонувати компанію як лідера думки та генерувати якісні B2B-ліди",
    blockId: "b4",
    photo: imgWhitePaper,
    tag: "📝 Контент",
    tiers: [{ name: "Lite", price: "59 €" }, { name: "Standard", price: "119 €" }, { name: "Pro", price: "229 €" }],
    tierFeatures: [
      tf("<b>8–12</b> сторінок · базовий аналіз", "PDF", "<b>Термін: 10 днів</b>", "2 правки · без власного дослідження"),
      tf("<b>15–25</b> сторінок · глибокий аналіз", "PDF + Landing page", "<b>Термін: 7 днів</b>", "4 правки · графіки + діаграми"),
      tf("<b>30+</b> сторінок · повне дослідження", "PDF + Web + Lead magnet", "<b>Термін: 5 днів</b>", "Безлімітні правки · промо-план"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Глибокий аналітичний документ із власним дослідженням, експертними інсайтами та практичними рекомендаціями. Ідеальний лід-магніт для B2B: обмін документу на email-адресу з подальшою nurture-кампанією.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Огляд проблеми та контекст ринку", "Методологія дослідження", "Дані, графіки та аналітика", "Практичні рекомендації та висновки", "Промо-план для дистрибуції"], type: "list" },
      { kind: "goal", label: "Мета", text: "Генерувати якісні B2B-ліди через експертний контент.", type: "text" },
    ],
  },
  {
    id: "case-study",
    name: "Кейс-стаді",
    emoji: "🏆",
    subtitle: "Детальна документація успішного проєкту як соціальний доказ",
    goal: "Показати реальні результати роботи та переконати потенційних клієнтів через факти",
    blockId: "b4",
    photo: imgCaseStudy,
    tag: "📝 Контент",
    tiers: [{ name: "Lite", price: "39 €" }, { name: "Standard", price: "79 €" }, { name: "Pro", price: "149 €" }],
    tierFeatures: [
      tf("<b>2–3</b> сторінки · текст + метрики", "PDF", "<b>Термін: 3 дні</b>", "2 правки"),
      tf("<b>5–7</b> сторінок · відео-версія + інфографіка", "PDF + Web + Video", "<b>Термін: 3 дні</b>", "4 правки · landing для кейсу"),
      tf("<b>10+</b> сторінок · повний пакет", "PDF + Web + Video + Social", "<b>Термін: 2 дні</b>", "Безлімітні правки"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Детальна документація успішного проєкту у форматі «Проблема → Рішення → Результат». Включає вимірювані метрики, відгуки клієнта та візуалізацію процесу роботи.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Контекст та завдання клієнта", "Процес роботи та рішення", "Конкретні результати з метриками", "Відгук та цитата клієнта", "Візуалізація: до/після, графіки"], type: "list" },
      { kind: "goal", label: "Мета", text: "Перетворити успішний досвід у потужний інструмент продажів.", type: "text" },
    ],
  },

  // ═══════════════════════════════════════
  // b5: Email-маркетинг (4)
  // ═══════════════════════════════════════
  {
    id: "ebook",
    name: "E-book / Лід-магніт",
    emoji: "📚",
    subtitle: "Електронна книга — найкращий обмін на email-адресу",
    goal: "Обміняти цінний контент на email-адресу та запустити nurture-воронку",
    blockId: "b5",
    photo: imgEbook,
    tag: "📧 Email",
    hot: true,
    tiers: [{ name: "Lite", price: "49 €" }, { name: "Standard", price: "99 €" }, { name: "Pro", price: "199 €" }],
    tierFeatures: [
      tf("<b>15–20</b> сторінок · базовий дизайн", "PDF", "<b>Термін: 7 днів</b>", "2 правки · обкладинка included"),
      tf("<b>25–35</b> сторінок · авторський дизайн", "PDF + Landing page", "<b>Термін: 5 днів</b>", "4 правки · промо-матеріали"),
      tf("<b>40+</b> сторінок · преміум", "PDF + Web + Automation", "<b>Термін: 4 дні</b>", "Безлімітні правки · воронка"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Цінний контент у форматі e-book, який мотивує відвідувача залишити email-адресу. Включає професійний дизайн, структуровану подачу та промо-матеріали для дистрибуції (landing page, банери, email-серія).", type: "text" },
      { kind: "content", label: "Зміст", items: ["Структура та написання контенту", "Професійний дизайн та верстка", "Обкладинка та 3D-мокапи", "Landing page для завантаження", "Промо-матеріали та email-воронка"], type: "list" },
      { kind: "goal", label: "Мета", text: "Побудувати email-базу через цінний контент.", type: "text" },
    ],
  },
  {
    id: "email-campaign",
    name: "Email-розсилка",
    emoji: "💌",
    subtitle: "Персоналізовані листи з конверсією вище середньої по ринку",
    goal: "Доставити персоналізоване повідомлення та конвертувати підписників у клієнтів",
    blockId: "b5",
    photo: imgEmailCampaign,
    tag: "📧 Email",
    tiers: [{ name: "Lite", price: "19 €" }, { name: "Standard", price: "39 €" }, { name: "Pro", price: "79 €" }],
    tierFeatures: [
      tf("<b>1</b> лист · текст + базова верстка", "HTML + plain text", "<b>Термін: 2 дні</b>", "2 правки"),
      tf("<b>3</b> листи · A/B варіанти", "HTML + MJML + dark mode", "<b>Термін: 2 дні</b>", "4 правки · сегментація"),
      tf("<b>5+</b> листів · повна кампанія", "MJML + Figma + ESP setup", "<b>Термін: 1 день</b>", "Безлімітні правки · аналітика"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Кросплатформний email з високою конверсією, що коректно відображається у всіх поштових клієнтах (Gmail, Outlook, Apple Mail). Включає адаптивну верстку, dark mode підтримку та персоналізацію.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Дизайн та верстка листа (MJML/HTML)", "Копірайтинг із персоналізацією", "A/B тестування subject lines", "Dark mode адаптація", "Налаштування в ESP (Mailchimp, Klaviyo)"], type: "list" },
      { kind: "goal", label: "Мета", text: "Досягти open rate вище за ринковий та конвертувати у цільову дію.", type: "text" },
    ],
  },
  {
    id: "drip-campaign",
    name: "Drip-кампанія",
    emoji: "💧",
    subtitle: "Автоматизована серія листів, що веде підписника до покупки",
    goal: "Автоматично провести ліда через воронку від знайомства до покупки",
    blockId: "b5",
    photo: imgDripCampaign,
    tag: "📧 Email",
    hot: true,
    tiers: [{ name: "Lite", price: "49 €" }, { name: "Standard", price: "99 €" }, { name: "Pro", price: "199 €" }],
    tierFeatures: [
      tf("<b>3</b> листи · лінійна welcome-серія", "HTML + налаштування в ESP", "<b>Термін: 5 днів</b>", "2 правки"),
      tf("<b>7</b> листів · розгалужена воронка", "HTML + Automation + Сегментація", "<b>Термін: 4 дні</b>", "4 правки · тригери"),
      tf("<b>12+</b> листів · мультиворонка", "Повний пакет + ESP + Analytics", "<b>Термін: 3 дні</b>", "Безлімітні правки · оптимізація"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Стратегічна серія автоматичних листів, що проводять підписника через всі етапи воронки: від welcome-серії через навчання до продажу. Включає сегментацію, тригери поведінки та аналітику кожного етапу.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Стратегія воронки та карта листів", "Тригери та умови розгалуження", "Копірайтинг та дизайн кожного листа", "Налаштування в ESP з автоматизацією", "Аналітика та оптимізація конверсій"], type: "list" },
      { kind: "goal", label: "Мета", text: "Автоматично конвертувати ліди в клієнтів на автопілоті.", type: "text" },
    ],
  },
  {
    id: "newsletter",
    name: "Newsletter",
    emoji: "📰",
    subtitle: "Регулярна розсилка для утримання та монетизації аудиторії",
    goal: "Утримувати увагу аудиторії та будувати лояльність через регулярний цінний контент",
    blockId: "b5",
    photo: imgNewsletter,
    tag: "📧 Email",
    tiers: [{ name: "Lite", price: "29 €" }, { name: "Standard", price: "59 €" }, { name: "Pro", price: "119 €" }],
    tierFeatures: [
      tf("<b>4</b> листи/міс · 400–600 слів", "HTML шаблон", "<b>Підготовка: 3 дні/лист</b>", "1 правка · базова аналітика"),
      tf("<b>8</b> листів/міс · контент + дизайн", "HTML + Copywriting", "<b>Підготовка: 2 дні/лист</b>", "3 правки · subject line тести"),
      tf("<b>12</b> листів/міс · повне ведення", "HTML + Copy + Analytics", "<b>Підготовка: 1 день/лист</b>", "Безлімітні правки · growth-стратегія"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Регулярні email-розсилки, що тримають бренд у свідомості аудиторії. Включають курирування контенту, оригінальні інсайти, промо-блоки та аналітику залученості для постійної оптимізації.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Розробка формату та рубрик", "Копірайтинг та курирування контенту", "Дизайн та верстка шаблону", "Планування контент-календаря", "Аналітика: open rate, CTR, відписки"], type: "list" },
      { kind: "goal", label: "Мета", text: "Будувати довгострокові відносини з аудиторією та монетизувати базу.", type: "text" },
    ],
  },

  // ═══════════════════════════════════════
  // b6: Відеоконтент (3)
  // ═══════════════════════════════════════
  {
    id: "webinar",
    name: "Вебінар / Онлайн-курс",
    emoji: "🎓",
    subtitle: "Живий або записаний освітній формат для залучення й монетизації",
    goal: "Побудувати експертність та конвертувати аудиторію через навчальний контент",
    blockId: "b6",
    photo: imgWebinar,
    tag: "🎬 Відео",
    tiers: [{ name: "Lite", price: "59 €" }, { name: "Standard", price: "119 €" }, { name: "Pro", price: "249 €" }],
    tierFeatures: [
      tf("<b>1</b> вебінар · до 60 хв", "Слайди + запис MP4", "<b>Підготовка: 5 днів</b>", "Базовий монтаж · 1 правка"),
      tf("<b>3</b> вебінари · серія + Q&A", "MP4 + Landing + Email", "<b>Підготовка: 3 дні/вебінар</b>", "3 правки · промо-пакет"),
      tf("<b>Повний курс</b> · модулі + сертифікат", "Платформа + MP4 + PDF", "<b>Підготовка: 2 дні/модуль</b>", "Безлімітні правки · LMS setup"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Живий або записаний освітній формат для побудови експертності, залучення аудиторії та генерації лідів. Від підготовки контенту та слайдів до технічної організації, промо-кампанії та post-event follow-up.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Розробка програми та контенту", "Дизайн слайдів та матеріалів", "Технічна організація трансляції", "Промо-кампанія для реєстрації", "Запис, монтаж та post-event розсилка"], type: "list" },
      { kind: "goal", label: "Мета", text: "Конвертувати учасників у клієнтів через освітню цінність.", type: "text" },
    ],
  },
  {
    id: "product-tour",
    name: "Відео-тур / Продукт-огляд",
    emoji: "🏠",
    subtitle: "Демонстрація продукту, офісу або команди для підвищення довіри",
    goal: "Показати продукт у дії та зняти бар'єри до покупки через візуальну демонстрацію",
    blockId: "b6",
    photo: imgProductTour,
    tag: "🎬 Відео",
    tiers: [{ name: "Lite", price: "49 €" }, { name: "Standard", price: "99 €" }, { name: "Pro", price: "199 €" }],
    tierFeatures: [
      tf("<b>2–3 хв</b> · screen recording або анімація", "MP4 1080p · 1 формат", "<b>Термін: 5 днів</b>", "1 правка монтажу"),
      tf("<b>5 хв</b> · кастомна анімація + озвучка", "MP4 4K + Social clips", "<b>Термін: 4 дні</b>", "3 правки · субтитри"),
      tf("<b>до 10 хв</b> · повний продакшн", "MP4 4K + Web embed + GIF", "<b>Термін: 3 дні</b>", "Безлімітні правки · сценарій"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Відеодемонстрація продукту, офісу або команди з професійним монтажем та озвучкою. Показує реальний досвід використання, інтерфейс, функціонал та результати роботи.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Сценарій та розкадровка", "Screen recording або зйомка", "Професійна озвучка та музика", "Монтаж та пост-продакшн", "Адаптація під різні платформи"], type: "list" },
      { kind: "goal", label: "Мета", text: "Знизити бар'єри до покупки через наочну демонстрацію.", type: "text" },
    ],
  },
  {
    id: "testimonials",
    name: "Відгуки / Testimonials",
    emoji: "⭐",
    subtitle: "Відеовідгуки задоволених клієнтів як найпотужніший соціальний доказ",
    goal: "Побудувати довіру через реальні історії задоволених клієнтів",
    blockId: "b6",
    photo: imgTestimonials,
    tag: "🎬 Відео",
    tiers: [{ name: "Lite", price: "39 €" }, { name: "Standard", price: "79 €" }, { name: "Pro", price: "149 €" }],
    tierFeatures: [
      tf("<b>1</b> відгук · 1–2 хв", "MP4 1080p · 1 платформа", "<b>Термін: 3 дні</b>", "1 правка · субтитри"),
      tf("<b>3</b> відгуки · різні формати", "MP4 4K + Shorts + Stories", "<b>Термін: 3 дні</b>", "3 правки · монтаж"),
      tf("<b>6+</b> відгуків · серія", "Всі формати + Web embed", "<b>Термін: 2 дні</b>", "Безлімітні правки · кастинг"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Професійні відеовідгуки задоволених клієнтів — найпотужніший соціальний доказ. Включає підбір респондентів, підготовку запитань, зйомку (або remote-інтерв'ю), монтаж та адаптацію під всі платформи.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Підбір респондентів та підготовка", "Зйомка або remote-інтерв'ю", "Монтаж із субтитрами та брендингом", "Короткі clips для соцмереж", "Embed-версія для сайту"], type: "list" },
      { kind: "goal", label: "Мета", text: "Перетворити задоволених клієнтів у найкращих продавців.", type: "text" },
    ],
  },

  // ═══════════════════════════════════════
  // b7: Платна реклама (4)
  // ═══════════════════════════════════════
  {
    id: "ppc-google",
    name: "PPC / Google Ads",
    emoji: "🎯",
    subtitle: "Контекстна реклама з оплатою за клік у Google та Bing",
    goal: "Залучити цільовий трафік із максимальним ROI через оптимізовані рекламні кампанії",
    blockId: "b7",
    photo: imgPpcGoogle,
    tag: "📢 Реклама",
    tiers: [{ name: "Lite", price: "49 €" }, { name: "Standard", price: "99 €" }, { name: "Pro", price: "199 €" }],
    tierFeatures: [
      tf("<b>1</b> кампанія · до 50 ключів", "Google Search", "<b>Запуск: 5 днів</b>", "Щомісячна оптимізація · базовий звіт"),
      tf("<b>3</b> кампанії · Search + Display", "Google Ads + Analytics", "<b>Запуск: 3 дні</b>", "A/B тести · ремаркетинг"),
      tf("<b>5+</b> кампаній · повний Performance", "Google Ads + GA4 + Looker", "<b>Запуск: 2 дні</b>", "Щомісячна оптимізація · детальні звіти"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Повний цикл контекстної реклами: від keyword research та аналізу конкурентів до запуску, A/B тестування та щомісячної оптимізації. Включає налаштування аналітики, конверсій та automated bidding.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Keyword research та негативні ключі", "Створення кампаній та оголошень", "Налаштування конверсій та аналітики", "A/B тестування оголошень", "Щомісячна оптимізація та звіти"], type: "list" },
      { kind: "goal", label: "Мета", text: "Отримати максимум цільових лідів за мінімальну вартість.", type: "text" },
    ],
  },
  {
    id: "retargeting",
    name: "Ретаргетинг",
    emoji: "🔄",
    subtitle: "Повернення відвідувачів сайту, що пішли без конверсії",
    goal: "Повернути «загублених» відвідувачів та довести їх до конверсії",
    blockId: "b7",
    photo: imgRetargeting,
    tag: "📢 Реклама",
    tiers: [{ name: "Lite", price: "39 €" }, { name: "Standard", price: "79 €" }, { name: "Pro", price: "149 €" }],
    tierFeatures: [
      tf("<b>1</b> аудиторія · Facebook або Google", "Pixel setup + 3 креативи", "<b>Запуск: 3 дні</b>", "Базова оптимізація"),
      tf("<b>3</b> аудиторії · мультиплатформа", "Pixel + API + 10 креативів", "<b>Запуск: 2 дні</b>", "A/B тести · сегментація"),
      tf("<b>5+</b> аудиторій · full-funnel", "Повний tech stack", "<b>Запуск: 2 дні</b>", "Щомісячна оптимізація · ROAS-фокус"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Повернення «загублених» відвідувачів через таргетовану рекламу на Facebook, Google, Instagram та LinkedIn. Сегментація за поведінкою на сайті, етапом воронки та часом останнього візиту.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Налаштування пікселів та API конверсій", "Створення аудиторій за поведінкою", "Дизайн персоналізованих креативів", "Налаштування bid-стратегій", "Аналітика ROAS та оптимізація"], type: "list" },
      { kind: "goal", label: "Мета", text: "Конвертувати «теплих» відвідувачів у клієнтів з мінімальними витратами.", type: "text" },
    ],
  },
  {
    id: "native-ads",
    name: "Нативна реклама",
    emoji: "📰",
    subtitle: "Рекламний контент, що виглядає як редакційний матеріал",
    goal: "Донести рекламне повідомлення без опору аудиторії через нативний формат",
    blockId: "b7",
    photo: imgNativeAds,
    tag: "📢 Реклама",
    tiers: [{ name: "Lite", price: "59 €" }, { name: "Standard", price: "119 €" }, { name: "Pro", price: "249 €" }],
    tierFeatures: [
      tf("<b>1</b> стаття · 1 платформа", "Google Doc + Visual", "<b>Термін: 5 днів</b>", "2 правки · базова аналітика"),
      tf("<b>3</b> статті · мультиплатформа", "CMS + Social + Analytics", "<b>Термін: 3 дні</b>", "4 правки · промо-план"),
      tf("<b>6+</b> статей · повна кампанія", "CMS + Paid + Organic", "<b>Термін: 2 дні</b>", "Безлімітні правки · ROI-звіт"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Нативний контент, що органічно вписується у редакційний простір платформи і не виглядає як реклама. Включає написання статей, підбір майданчиків для розміщення та промо-стратегію.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Дослідження цільових майданчиків", "Написання нативних статей", "Узгодження з редакціями", "Промо-план та посилення через paid", "Аналітика: охоплення, конверсії, ROI"], type: "list" },
      { kind: "goal", label: "Мета", text: "Побудувати довіру через авторитетні медіа.", type: "text" },
    ],
  },
  {
    id: "landing-ad",
    name: "Landing Page (рекламний)",
    emoji: "🚀",
    subtitle: "Конверсійна цільова сторінка з вимірюваним ROI",
    goal: "Створити швидку конверсійну сторінку з чітким вимірюванням ефективності кампанії",
    blockId: "b7",
    photo: imgLandingAd,
    tag: "📢 Реклама",
    hot: true,
    tiers: [{ name: "Lite", price: "39 €" }, { name: "Standard", price: "79 €" }, { name: "Pro", price: "149 €" }],
    tierFeatures: [
      tf("<b>1</b> секція оффер + форма", "Webflow або Tilda", "<b>Термін: 3 дні</b>", "2 правки · базова аналітика"),
      tf("<b>3–5</b> секцій · повна воронка", "Webflow + CRM + Analytics", "<b>Термін: 2 дні</b>", "4 правки · A/B тести"),
      tf("<b>7+</b> секцій · кастомний код", "React + CRM + GA4", "<b>Термін: 2 дні</b>", "Безлімітні правки · heatmaps"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Простий та ефективний лендінг для рекламних кампаній з фокусом на одну конверсійну дію. Включає інтеграцію з CRM, аналітикою та heatmaps для постійної оптимізації.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Дизайн та розробка лендінгу", "Інтеграція з CRM та формами", "Налаштування GA4 та конверсій", "A/B тестування елементів", "Heatmaps та аналітика поведінки"], type: "list" },
      { kind: "goal", label: "Мета", text: "Максимізувати конверсію рекламного трафіку.", type: "text" },
    ],
  },

  // ═══════════════════════════════════════
  // b8: Трендові 2024–2025 (7)
  // ═══════════════════════════════════════
  {
    id: "ugc",
    name: "UGC-контент",
    emoji: "🎭",
    subtitle: "User-Generated Content для автентичного маркетингу",
    goal: "Побудувати автентичну довіру через контент від реальних користувачів",
    blockId: "b8",
    photo: imgUgc,
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $50–500 / відео",
    tiers: [{ name: "Lite", price: "59 €" }, { name: "Standard", price: "119 €" }, { name: "Pro", price: "249 €" }],
    tierFeatures: [
      tf("<b>3</b> відео · 15–30 сек · 1 платформа", "MP4 9:16", "<b>Термін: 5 днів</b>", "1 правка · 1 бриф + монтаж"),
      tf("<b>6</b> відео · мульти-платформа", "MP4 + JPG + Stories", "<b>Термін: 4 дні</b>", "3 правки · кастинг криейторів"),
      tf("<b>12</b> відео · повна стратегія", "Всі формати + права", "<b>Термін: 3 дні</b>", "Безлімітні правки · контент-план"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Автентичний контент від реальних користувачів та криейторів для побудови довіри до бренду. Включає кастинг UGC-криейторів, розробку брифів, контроль якості та адаптацію під всі платформи.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Кастинг та підбір криейторів", "Розробка брифів та сценаріїв", "Контроль якості та монтаж", "Адаптація під TikTok, Reels, Shorts", "Передача прав на контент"], type: "list" },
      { kind: "goal", label: "Мета", text: "Збільшити довіру та конверсію через «людський» контент.", type: "text" },
    ],
  },
  {
    id: "ai-content",
    name: "AI-контент зі стилем",
    emoji: "🤖",
    subtitle: "Інтеграція AI-інструментів у маркетингові процеси",
    goal: "Масштабувати виробництво контенту через AI без втрати якості та стилю бренду",
    blockId: "b8",
    photo: imgAiContent,
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $2 000–8 000 / міс",
    tiers: [{ name: "Lite", price: "49 €" }, { name: "Standard", price: "99 €" }, { name: "Pro", price: "199 €" }],
    tierFeatures: [
      tf("<b>10</b> матеріалів/міс · базовий бриф", "Google Doc + PNG", "<b>Партіями по 3 дні</b>", "2 правки · фактчекінг + SEO мета-теги"),
      tf("<b>25</b> матеріалів/міс · стратегія", "Notion + CMS + Social", "<b>Партіями по 2 дні</b>", "4 правки · навчання команди"),
      tf("<b>50+</b> матеріалів/міс · повна автоматизація", "Кастомні GPT + Workflows", "<b>Ongoing</b>", "Безлімітні правки · щомісячна оптимізація"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Впровадження AI-інструментів (ChatGPT, Midjourney, Jasper тощо) у маркетингові процеси компанії. Включає створення кастомних промптів, workflows та навчання команди для 5-10x масштабування контенту.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Аудит поточних процесів контенту", "Підбір та налаштування AI-інструментів", "Створення бібліотеки промптів", "Автоматизація workflows", "Навчання команди та документація"], type: "list" },
      { kind: "goal", label: "Мета", text: "Масштабувати контент у 5–10 разів без збільшення команди.", type: "text" },
    ],
  },
  {
    id: "saas-onboarding",
    name: "Онбординг для SaaS",
    emoji: "🗺",
    subtitle: "Welcome-серія та навчальні матеріали для нових користувачів",
    goal: "Знизити churn та прискорити Time-to-Value для нових користувачів SaaS",
    blockId: "b8",
    photo: imgSaasOnboarding,
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $1 000–5 000 / проєкт",
    tiers: [{ name: "Lite", price: "69 €" }, { name: "Standard", price: "139 €" }, { name: "Pro", price: "279 €" }],
    tierFeatures: [
      tf("<b>3</b> email welcome-серія + 1 гайд", "HTML email + PDF або Loom", "<b>Термін: 5 днів</b>", "2 правки · 1 сегмент"),
      tf("<b>7</b> листів + in-app повідомлення", "HTML + Product tours", "<b>Термін: 4 дні</b>", "4 правки · аналітика retention"),
      tf("<b>Повний онбординг</b> · мульти-канал", "Email + In-app + Video + Docs", "<b>Термін: 3 дні</b>", "Безлімітні правки · A/B тести"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Комплексний онбординг для SaaS-продуктів: від першого welcome-листа до повної активації. Мультиканальний підхід (email, in-app, video) з аналітикою retention та оптимізацією кожного кроку воронки.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Welcome email-серія з поступовим навчанням", "In-app product tours та tooltips", "Відео-гайди та скрінкасти", "Чекліст активації та milestone emails", "Аналітика retention та оптимізація"], type: "list" },
      { kind: "goal", label: "Мета", text: "Довести користувача до «Aha moment» якомога швидше.", type: "text" },
    ],
  },
  {
    id: "linkedin-brand",
    name: "LinkedIn Personal Brand",
    emoji: "💼",
    subtitle: "Побудова особистого бренду на LinkedIn для B2B",
    goal: "Перетворити LinkedIn-профіль у магніт для B2B-клієнтів та партнерів",
    blockId: "b8",
    photo: imgLinkedinBrand,
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $2 000–7 000 / міс",
    tiers: [{ name: "Lite", price: "59 €" }, { name: "Standard", price: "119 €" }, { name: "Pro", price: "249 €" }],
    tierFeatures: [
      tf("<b>3</b> пости/тиж · базова стратегія", "LinkedIn + профіль-оптимізація", "<b>Підготовка: 2 дні/тиж</b>", "1 правка/пост · гайд outreach + аналітика"),
      tf("<b>5</b> постів/тиж · thought leadership", "LinkedIn + Newsletter + Events", "<b>Підготовка: 1 день/тиж</b>", "3 правки · networking стратегія"),
      tf("<b>Щоденний</b> контент · повне ведення", "LinkedIn + Podcast + Speaking", "<b>Ongoing</b>", "Безлімітні правки · ABM стратегія"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Побудова сильного LinkedIn-профілю: від оптимізації та контент-стратегії до нетворкінгу та outreach-кампаній. Системний підхід до thought leadership у B2B-середовищі.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Оптимізація профілю під пошук", "Контент-стратегія та план публікацій", "Thought leadership тексти та статті", "Outreach та нетворкінг стратегія", "LinkedIn Newsletter та Events"], type: "list" },
      { kind: "goal", label: "Мета", text: "Побудувати pipeline B2B-лідів через органічний LinkedIn.", type: "text" },
    ],
  },
  {
    id: "micro-saas",
    name: "Micro SaaS",
    emoji: "⚡",
    subtitle: "Мінімальний SaaS-продукт для швидкої монетизації",
    goal: "Швидко запустити та монетизувати мінімальний SaaS-продукт для перевірки ідеї",
    blockId: "b8",
    photo: imgMicroSaas,
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $5 000–20 000 / проєкт",
    tiers: [{ name: "Lite", price: "149 €" }, { name: "Standard", price: "299 €" }, { name: "Pro", price: "599 €" }],
    tierFeatures: [
      tf("<b>Landing page</b> + Stripe + онбординг", "Webflow + Stripe + email", "<b>Термін: 10 днів</b>", "1 ітерація + Product Hunt чеклист"),
      tf("<b>MVP</b> + dashboard + API", "React + Supabase + Stripe", "<b>Термін: 7 днів</b>", "3 ітерації · аналітика"),
      tf("<b>Повний продукт</b> · масштабування", "Custom stack + CI/CD", "<b>Термін: 5 днів</b>", "Безлімітні ітерації · growth"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Від ідеї до працюючого SaaS-продукту з оплатою підписки. Включає дизайн, розробку MVP, інтеграцію Stripe, онбординг нових користувачів та стратегію запуску на Product Hunt.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Валідація ідеї та конкурентний аналіз", "UI/UX дизайн та прототип", "Розробка MVP (Landing + Dashboard + API)", "Інтеграція Stripe та платіжної системи", "Стратегія запуску та Product Hunt"], type: "list" },
      { kind: "goal", label: "Мета", text: "Запустити MRR-продукт з мінімальними інвестиціями.", type: "text" },
    ],
  },
  {
    id: "interactive-content",
    name: "Інтерактивний контент",
    emoji: "🎮",
    subtitle: "Квізи, калькулятори та інтерактивні елементи для залучення",
    goal: "Залучити та кваліфікувати ліди через інтерактивний досвід із конверсією 40%+",
    blockId: "b8",
    photo: imgInteractiveContent,
    tag: "🔥 Тренд",
    hot: true,
    tiers: [{ name: "Lite", price: "59 €" }, { name: "Standard", price: "119 €" }, { name: "Pro", price: "249 €" }],
    tierFeatures: [
      tf("<b>1</b> інструмент · до 10 кроків", "Typeform або Tally", "<b>Термін: 5 днів</b>", "2 правки · 2 результати + email"),
      tf("<b>3</b> інструменти · lead capture", "Web + Email інтеграція", "<b>Термін: 3 дні</b>", "4 правки · аналітика + CRM"),
      tf("<b>5+</b> інструментів · гейміфікація", "Web + App + API", "<b>Термін: 3 дні</b>", "Безлімітні правки · A/B тести"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Інтерактивні елементи (квізи, калькулятори, опитування, ігри), що залучають аудиторію та кваліфікують ліди з конверсією 40%+. Включає дизайн, розробку, інтеграцію з CRM та аналітику.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Розробка концепції та механіки", "UX/UI дизайн інтерактиву", "Програмування та тестування", "Інтеграція з CRM та email", "Аналітика результатів та A/B тести"], type: "list" },
      { kind: "goal", label: "Мета", text: "Генерувати кваліфіковані ліди через залучення.", type: "text" },
    ],
  },
  {
    id: "podcast",
    name: "Подкаст-продакшн",
    emoji: "🎙",
    subtitle: "Повний запуск подкасту: від концепції до дистрибуції",
    goal: "Побудувати лояльну аудиторію та експертний авторитет через регулярний аудіо/відео-контент",
    blockId: "b8",
    photo: imgPodcast,
    tag: "🔥 Тренд",
    hot: true,
    tiers: [{ name: "Lite", price: "49 €" }, { name: "Standard", price: "99 €" }, { name: "Pro", price: "199 €" }],
    tierFeatures: [
      tf("<b>Концепція</b> + обкладинка + 1 епізод", "MP3 + Cover art", "<b>Термін: 5 днів</b>", "2 правки · RSS-фід"),
      tf("<b>Брендинг</b> + 4 епізоди + дистрибуція", "MP3 + Video + Clips", "<b>Термін: 5 днів</b>", "Монтаж · show notes · Spotify/Apple"),
      tf("<b>Повний</b> продакшн на 3 місяці", "Audio + Video + Social + Newsletter", "<b>Ongoing</b>", "Щотижневий випуск · growth"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Від ідеї до регулярного подкасту з аудиторією. Повний продакшн-цикл: концепція, брендинг, запис, монтаж, дистрибуція на Spotify/Apple Podcasts та просування через соцмережі та newsletter.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Концепція, назва та формат подкасту", "Брендинг: обкладинка, intro/outro", "Запис, монтаж та пост-продакшн", "Дистрибуція (Spotify, Apple, YouTube)", "Промо-стратегія та зростання аудиторії"], type: "list" },
      { kind: "goal", label: "Мета", text: "Створити медіа-актив для довгострокового зростання бренду.", type: "text" },
    ],
  },
  // ═══════════════════════════════════════
  // New trending 2026 services
  // ═══════════════════════════════════════
  {
    id: "saas-builder",
    name: "SaaS-сервіс під ключ",
    emoji: "💰",
    subtitle: "Створення підписного SaaS-продукту з рекурентним доходом",
    goal: "Запустити SaaS-бізнес з щомісячною оплатою: бот, кабінет, платформу або інструмент",
    blockId: "b8",
    photo: imgSaasBuilder,
    tag: "🔥 Тренд",
    hot: true,
    tiers: [{ name: "Lite", price: "149 €" }, { name: "Standard", price: "349 €" }, { name: "Pro", price: "699 €" }],
    tierFeatures: [
      tf("<b>MVP</b> · 1 core-фіча · landing", "Web App (React/Next)", "<b>Термін: 14 днів</b>", "2 правки · Stripe інтеграція"),
      tf("<b>3–5 фіч</b> · dashboard + auth", "Web App + API + DB", "<b>Термін: 10 днів</b>", "5 правок · аналітика · onboarding"),
      tf("<b>Повний</b> продукт · масштабування", "Full-stack + Mobile-ready", "<b>Термін: 7 днів</b>", "Безлімітні правки · CI/CD · підтримка"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Повний цикл створення SaaS-продукту: від валідації ідеї до запуску з підпискою. Користувачі платять щомісяця за ваш бот, кабінет, платформу або інструмент. Включає дизайн, розробку, платіжну систему та стратегію монетизації.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Валідація ідеї та бізнес-модель", "UX/UI дизайн продукту", "Розробка MVP з core-функціоналом", "Інтеграція Stripe/LemonSqueezy підписок", "Landing page + onboarding flow", "Аналітика та метрики (MRR, churn, LTV)"], type: "list" },
      { kind: "goal", label: "Мета", text: "Запустити підписний SaaS з рекурентним доходом.", type: "text" },
    ],
  },
  {
    id: "telegram-twa",
    name: "Telegram Mini App (TWA)",
    emoji: "✈️",
    subtitle: "Міні-додаток всередині Telegram як повноцінний сервіс",
    goal: "Створити міні-апку в Telegram, яка виглядає як повноцінний додаток з оплатою та базою",
    blockId: "b8",
    photo: imgTelegramTwa,
    tag: "🔥 Тренд",
    hot: true,
    tiers: [{ name: "Lite", price: "79 €" }, { name: "Standard", price: "199 €" }, { name: "Pro", price: "449 €" }],
    tierFeatures: [
      tf("<b>1 екран</b> · базовий бот + TWA", "Telegram Web App", "<b>Термін: 7 днів</b>", "2 правки · хостинг"),
      tf("<b>3–5 екранів</b> · auth + БД + оплата", "TWA + Supabase + Stripe", "<b>Термін: 5 днів</b>", "4 правки · push · аналітика"),
      tf("<b>Повний</b> сервіс · адмін-панель", "TWA + API + Dashboard", "<b>Термін: 5 днів</b>", "Безлімітні правки · маркетинг"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Telegram Web App (TWA) — міні-додаток прямо всередині месенджера. Виглядає як повноцінний мобільний додаток, але не потребує завантаження з App Store. Ідеально для сервісів, магазинів, записів, освітніх платформ та будь-яких бізнесів з аудиторією в Telegram.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Дизайн інтерфейсу під Telegram UI", "Розробка TWA (React + Telegram SDK)", "Telegram Bot для взаємодії", "Інтеграція оплати (Telegram Payments / Stripe)", "База даних та авторизація через Telegram", "Деплой та налаштування бота"], type: "list" },
      { kind: "goal", label: "Мета", text: "Отримати повноцінний сервіс всередині Telegram без окремого додатку.", type: "text" },
    ],
  },
  {
    id: "ai-automation",
    name: "AI-автоматизація бізнесу",
    emoji: "🤖",
    subtitle: "Автоматизація процесів через AI-агентів та ботів",
    goal: "Автоматизувати рутинні бізнес-процеси через AI та зменшити витрати на персонал",
    blockId: "b8",
    photo: imgAiAutomation,
    tag: "🔥 Тренд",
    hot: true,
    tiers: [{ name: "Lite", price: "99 €" }, { name: "Standard", price: "249 €" }, { name: "Pro", price: "549 €" }],
    tierFeatures: [
      tf("<b>1 бот</b> · FAQ + lead capture", "Telegram / WhatsApp", "<b>Термін: 5 днів</b>", "2 правки · навчання на даних"),
      tf("<b>AI-агент</b> · CRM + автовідповіді", "Multi-channel + Make/n8n", "<b>Термін: 5 днів</b>", "5 правок · інтеграції · дашборд"),
      tf("<b>Повна</b> екосистема AI-агентів", "Custom AI + API + Analytics", "<b>Термін: 5 днів</b>", "Безлімітні правки · підтримка 3 міс"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Впровадження AI-агентів для автоматизації бізнес-процесів: чат-боти для підтримки, AI-менеджери продажів, автоматична обробка заявок, генерація контенту та аналітика. Використовуємо GPT, Claude та open-source моделі.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Аудит процесів для автоматизації", "Розробка AI-ботів та агентів", "Інтеграція з CRM, email, месенджерами", "Навчання AI на даних компанії", "Дашборд аналітики та моніторинг", "Документація та навчання команди"], type: "list" },
      { kind: "goal", label: "Мета", text: "Зменшити ручну роботу на 70% через AI-автоматизацію.", type: "text" },
    ],
  },
  {
    id: "nocode-mvp",
    name: "No-Code MVP",
    emoji: "⚡",
    subtitle: "Швидкий запуск продукту без програмування",
    goal: "Запустити робочий продукт за тиждень без написання коду для валідації ідеї",
    blockId: "b8",
    photo: imgNocodeMvp,
    tag: "🔥 Тренд",
    hot: true,
    tiers: [{ name: "Lite", price: "69 €" }, { name: "Standard", price: "149 €" }, { name: "Pro", price: "349 €" }],
    tierFeatures: [
      tf("<b>Landing</b> + форма + автоматизація", "Tilda / Framer + Zapier", "<b>Термін: 3 дні</b>", "2 правки · аналітика"),
      tf("<b>MVP</b> · dashboard + auth + DB", "Bubble / Glide + Supabase", "<b>Термін: 5 днів</b>", "4 правки · оплата · email"),
      tf("<b>Повний</b> no-code продукт", "Multi-tool stack + API", "<b>Термін: 5 днів</b>", "Безлімітні правки · масштабування"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Запуск повноцінного цифрового продукту без програмування за допомогою no-code інструментів: Bubble, Framer, Glide, Make, Supabase. Ідеально для стартапів, які хочуть швидко валідувати ідею з мінімальним бюджетом.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Аналіз ідеї та вибір інструментів", "Дизайн та прототипування", "Збірка MVP на no-code платформі", "Інтеграція оплати та email", "Деплой та налаштування домену", "Гайд по самостійному управлінню"], type: "list" },
      { kind: "goal", label: "Мета", text: "Валідувати бізнес-ідею за мінімальний бюджет та час.", type: "text" },
    ],
  },
  // ───── Унікальні AI-офери 2026 (ітерація 1) ─────
  {
    id: "vibe-coding-visionary",
    name: "Vibe-Coding Visionary",
    emoji: "🧙",
    subtitle: "AI-візіонер створює 3-5 робочих прототипів під ваш запит",
    goal: "Знайти найкраще продуктове рішення через мульти-платформну генерацію та порівняння UX",
    blockId: "b8",
    photo: imgVibeCodingVisionary,
    tag: "🔥 Унікально",
    hot: true,
    tiers: [{ name: "Start", price: "299 €" }, { name: "Pro", price: "599 €" }, { name: "Max", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>3 прототипи</b> · 1 платформа", "Lovable / v0 / Bolt", "<b>Термін: 3 дні</b>", "1 раунд правок · Loom-розбір"),
      tf("<b>5 прототипів</b> · 3 платформи", "Lovable + v0 + Replit", "<b>Термін: 5 днів</b>", "2 раунди правок · UX-порівняння"),
      tf("<b>5 прототипів</b> · усі платформи", "Full stack vibe-coding", "<b>Термін: 7 днів</b>", "3 раунди · 1h консультація · код"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Сесія з AI-візіонером: під ваш запит за 3-7 днів генеруємо 3-5 робочих прототипів на різних AI-платформах (Lovable, v0, Bolt, Replit). Порівнюємо UX, архітектуру, швидкість — ви обираєте найкращий і отримуєте код + правки.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Глибинний бриф та аналіз ідеї", "Генерація 3-5 прототипів на різних AI-платформах", "Порівняльний UX-розбір (Loom-відео)", "Раунди правок на обраному прототипі", "Передача коду та інструкцій з масштабування"], type: "list" },
      { kind: "goal", label: "Мета", text: "Не вгадувати на першій ітерації, а отримати кілька реальних варіантів і обрати найкращий.", type: "text" },
    ],
    tools: [
      { name: "Lovable", purpose: "Full-stack AI builder для production-проєктів", premium: true },
      { name: "Cursor 3.0", purpose: "AI IDE з паралельними агентами на репозиторій", premium: true },
      { name: "Google Antigravity", purpose: "IDE з Manager Mode на Gemini 3.1 Pro" },
    ],
  },
  {
    id: "ai-twin",
    name: "AI Twin засновника",
    emoji: "🤖",
    subtitle: "Цифровий двійник: голос + аватар + база знань для клієнтів 24/7",
    goal: "Замінити першу лінію продажів і підтримки цифровим двійником, що працює без вихідних",
    blockId: "b8",
    photo: imgAiTwin,
    tag: "🔥 Унікально",
    hot: true,
    tiers: [{ name: "Start", price: "299 €" }, { name: "Pro", price: "599 €" }, { name: "Max", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>Клон голосу</b> + 50 відповідей", "ElevenLabs + база знань", "<b>Термін: 5 днів</b>", "Telegram-бот · 1 правка"),
      tf("<b>Голос + HD-аватар</b> · 200 відп.", "ElevenLabs + HeyGen + RAG", "<b>Термін: 7 днів</b>", "Telegram + Web · 3 правки"),
      tf("<b>Повний twin</b> · WhatsApp/Web/CRM", "Custom AI + voice + video", "<b>Термін: 10 днів</b>", "Безлім. правки · інтеграція CRM"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Цифровий двійник власника: клонуємо голос (ElevenLabs), створюємо HD-аватар (HeyGen), завантажуємо базу знань (відео, тексти, FAQ). Бот відповідає клієнтам у відео-форматі 24/7 — про продукт, ціни, кейси.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Збір матеріалів: голос, фото, тексти, відео", "Клонування голосу та створення аватара", "Тренування на вашій базі знань (RAG)", "Інтеграція в Telegram / Web / WhatsApp", "Підключення до CRM та автоматизацій", "Тестування та калібрування відповідей"], type: "list" },
      { kind: "goal", label: "Мета", text: "Масштабувати особистий бренд і продажі без фізичної присутності.", type: "text" },
    ],
    tools: [
      { name: "ElevenLabs v3", purpose: "Клонування голосу + емоційний TTS 113 мовами", premium: true },
      { name: "HeyGen Avatar IV", purpose: "Фотореалістичні HD-аватари з ліпсинком", premium: true },
      { name: "Claude Sonnet 4.6", purpose: "RAG і діалог з контекстом 1M токенів", premium: true },
    ],
  },
  {
    id: "mvp-on-demand",
    name: "MVP-on-Demand",
    emoji: "🚀",
    subtitle: "Робочий MVP з оплатою за обсяг ТЗ — чесна модель «за символ ідеї»",
    goal: "Отримати робочий MVP з прозорою ціною, що залежить від глибини вашого технічного завдання",
    blockId: "b8",
    photo: imgMvpOnDemand,
    tag: "🔥 Унікально",
    hot: true,
    tiers: [{ name: "Start", price: "299 €" }, { name: "Pro", price: "599 €" }, { name: "Max", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>ТЗ до 1 500 симв.</b> · мікро-MVP", "1 екран + 1 функція · no-code", "<b>Термін: 3 дні</b>", "1 правка · хостинг"),
      tf("<b>ТЗ до 5 000 симв.</b> · повний MVP", "3-5 екранів + auth + DB", "<b>Термін: 7 днів</b>", "3 правки · оплата · email"),
      tf("<b>ТЗ до 15 000 симв.</b> · складний MVP", "Інтеграції + AI + payments", "<b>Термін: 14 днів</b>", "Безлім. правки · 1 міс. підтримка"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Створення робочого MVP за вашим технічним завданням з прозорою моделлю ціноутворення: чим деталізованіше ТЗ — тим складніший продукт. Понад 15 000 символів — індивідуальний прорахунок (+0.08 €/символ).", type: "text" },
      { kind: "content", label: "Зміст", items: ["Аналіз вашого ТЗ та визначення обсягу", "Уточнюючий бриф та архітектура рішення", "Розробка на оптимальному стеку", "Інтеграція auth, DB, оплати (за потреби)", "Деплой на продакшн з доменом", "Документація та передача проєкту"], type: "list" },
      { kind: "goal", label: "Мета", text: "Прозорість: ви платите рівно за обсяг своєї ідеї, без «оцінки на око».", type: "text" },
    ],
    tools: [
      { name: "Lovable + Cloud", purpose: "Full-stack білд з backend, auth і DB з коробки", premium: true },
      { name: "Claude Code", purpose: "Терміналний агент 80.9% SWE-bench, 1M контекст", premium: true },
      { name: "Stripe", purpose: "Платежі, підписки і виплати", premium: true },
    ],
  },
  {
    id: "ai-video-catalog",
    name: "AI Video Catalog",
    emoji: "🎬",
    subtitle: "AI-промо-відео для всього вашого каталогу — 1 відео на товар",
    goal: "Замінити статичні фото в каталозі на залучаючі AI-відео без зйомок та бюджетів на продакшн",
    blockId: "b8",
    photo: imgAiVideoCatalog,
    tag: "🔥 Унікально",
    hot: true,
    tiers: [{ name: "Start", price: "299 €" }, { name: "Pro", price: "599 €" }, { name: "Max", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>10 відео</b> · 5-8 сек кожне", "Runway / Kling · 720p", "<b>Термін: 5 днів</b>", "1 правка на відео"),
      tf("<b>30 відео</b> · 5-15 сек · озвучка", "Runway + Sora + ElevenLabs", "<b>Термін: 10 днів</b>", "2 правки · музика · сабтайтли"),
      tf("<b>100+ відео</b> · повний каталог", "Multi-tool + автоматизація", "<b>Термін: 21 день</b>", "Безлім. правки · API-інтеграція"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Генерація промо-відео для всіх позицій каталогу через AI (Runway, Sora, Kling). 1 відео на товар: динамічна анімація, голос, музика, субтитри. Заміна студійним зйомкам за частку бюджету.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Аналіз каталогу та концепт відео", "Генерація відео через AI-моделі", "Озвучка (ElevenLabs) та підбір музики", "Субтитри та брендування", "Експорт під різні платформи (TikTok / IG / Web)", "Завантаження та інтеграція в каталог"], type: "list" },
      { kind: "goal", label: "Мета", text: "Збільшити конверсію картки товару на 30-60% за рахунок відео.", type: "text" },
    ],
    tools: [
      { name: "Sora 2 Pro", purpose: "Фотореалістичне text-to-video до 60 сек", premium: true },
      { name: "Kling 2.5", purpose: "Якісна анімація товарів і персонажів", premium: true },
      { name: "ElevenLabs v3", purpose: "Озвучка та фонова музика мультимовно", premium: true },
    ],
  },
  {
    id: "reverse-engineering",
    name: "Reverse-Engineering конкурента",
    emoji: "🛸",
    subtitle: "AI-розбір воронки топ-конкурента + план як обійти за 14 днів",
    goal: "Зрозуміти точно, чому конкурент продає краще, і отримати покроковий план як його обійти",
    blockId: "b8",
    photo: imgReverseEngineering,
    tag: "🔥 Унікально",
    hot: true,
    tiers: [{ name: "Start", price: "299 €" }, { name: "Pro", price: "599 €" }, { name: "Max", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>1 конкурент</b> · лендінг + ціни", "PDF-звіт 20+ стор.", "<b>Термін: 5 днів</b>", "1 zoom-розбір 30 хв"),
      tf("<b>3 конкуренти</b> · вся воронка", "Лендінг + email + ads + UX", "<b>Термін: 7 днів</b>", "1h розбір · 14-денний план"),
      tf("<b>5 конкурентів</b> · повний бенчмарк", "Усі канали + AI-моніторинг", "<b>Термін: 10 днів</b>", "2h стратегсесія · 90-дн. план"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "AI-аналіз воронки топ-конкурента: лендінг, реклама (Facebook Ads Library, Google), email-послідовності, ціноутворення, UX-патерни. Повний звіт + покроковий план дій як обійти за 14-90 днів.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Збір усіх публічних точок дотику конкурента", "AI-розбір лендінгу: структура, тригери, CTA", "Аналіз реклами через Ads Library", "Реверс email-воронки та цінової стратегії", "PDF-звіт з висновками та слабкими місцями", "План дій: що повторити, що покращити, що уникати"], type: "list" },
      { kind: "goal", label: "Мета", text: "Економити роки експериментів через готовий розбір того, що вже працює.", type: "text" },
    ],
    tools: [
      { name: "Perplexity Computer", purpose: "Браузерний AI-агент для глибокого research", premium: true },
      { name: "SimilarWeb", purpose: "Трафік, джерела і поведінка конкурента", premium: true },
      { name: "Meta Ads Library", purpose: "Усі активні рекламні креативи конкурентів" },
    ],
  },
  // ───── Унікальні AI-офери 2026 (ітерація 2) ─────
  {
    id: "prompt-dna",
    name: "Prompt DNA бренду",
    emoji: "🧬",
    subtitle: "Майстер-промпт вашого бренду для всіх AI-інструментів",
    goal: "Щоб ChatGPT, Midjourney, Claude та інші AI завжди говорили й малювали голосом вашого бренду",
    blockId: "b8",
    photo: imgPromptDna,
    tag: "🔥 Унікально",
    hot: true,
    tiers: [{ name: "Start", price: "299 €" }, { name: "Pro", price: "599 €" }, { name: "Max", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>Текстовий DNA</b> · ChatGPT/Claude", "1 master + 5 шаблонів", "<b>Термін: 5 днів</b>", "1 правка · інструкція"),
      tf("<b>Текст + візуал</b> · MJ/DALL·E", "Master + 15 шаблонів + стилі", "<b>Термін: 7 днів</b>", "3 правки · Loom-навчання"),
      tf("<b>Повна DNA</b> · текст + візуал + відео", "30+ шаблонів + автоматизація", "<b>Термін: 10 днів</b>", "Безлім. правки · Notion-база"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Майстер-промпт вашого бренду: тон голосу, лексика, табу-слова, візуальні референси, кольори, композиція. Один документ, який підключається до ChatGPT, Claude, Midjourney, DALL·E, Sora — і весь AI-контент відразу звучить як ваш бренд.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Аудит існуючих матеріалів і tone of voice", "Розробка master prompt для текстових AI", "Візуальні промпт-шаблони для Midjourney/DALL·E", "Бібліотека готових сценаріїв (пости, email, ads)", "Notion-база з усіма промптами", "Навчання команди (Loom-відео)"], type: "list" },
      { kind: "goal", label: "Мета", text: "Усунути різноголосся AI-контенту та зекономити години на «причісування».", type: "text" },
    ],
    tools: [
      { name: "Claude Sonnet 4.6", purpose: "Master-промпти й tone-of-voice, 1M контекст", premium: true },
      { name: "Gemini 3.1 Pro", purpose: "Мультимодальні промпти та екосистема Workspace", premium: true },
      { name: "Midjourney v7", purpose: "Візуальні промпти і стилі бренду", premium: true },
    ],
  },
  {
    id: "telegram-ai-agent",
    name: "Telegram AI-агент продажів",
    emoji: "📡",
    subtitle: "Бот, що кваліфікує ліди голосом засновника та бронює дзвінки",
    goal: "Перетворити Telegram-канал у машину продажів, що кваліфікує ліди та бронює дзвінки 24/7",
    blockId: "b8",
    photo: imgTelegramAiAgent,
    tag: "🔥 Унікально",
    hot: true,
    tiers: [{ name: "Start", price: "299 €" }, { name: "Pro", price: "599 €" }, { name: "Max", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>Кваліфікація + бронювання</b>", "Telegram + Google Calendar", "<b>Термін: 5 днів</b>", "1 правка · сценарій"),
      tf("<b>Голос засновника</b> + CRM", "ElevenLabs + HubSpot/Pipedrive", "<b>Термін: 7 днів</b>", "3 правки · аналітика"),
      tf("<b>Повна екосистема</b> · мультиканал", "TG + WhatsApp + CRM + payments", "<b>Термін: 10 днів</b>", "Безлім. правки · 1 міс. ведення"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "AI-агент у Telegram, що відповідає голосом засновника, кваліфікує лідів за вашим скриптом, бронює дзвінки в Calendar, передає дані в CRM і нагадує про оплату. Працює 24/7 без операторів.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Розробка скрипта кваліфікації лідів", "Створення бота з voice-replies (ElevenLabs)", "Інтеграція з Google Calendar / Cal.com", "Підключення до CRM (HubSpot, Pipedrive, Notion)", "Платіжна інтеграція (Stripe / Wayforpay)", "Дашборд аналітики та A/B-тести"], type: "list" },
      { kind: "goal", label: "Мета", text: "Замінити SDR-менеджера першої лінії й освободити команду для closing.", type: "text" },
    ],
    tools: [
      { name: "GPT-5.4", purpose: "Кваліфікація лідів і розуміння намірів", premium: true },
      { name: "ElevenLabs v3", purpose: "Voice-replies голосом засновника", premium: true },
      { name: "n8n", purpose: "Open-source оркестрація CRM, Calendar і платежів" },
    ],
  },
  {
    id: "generative-identity",
    name: "Generative айдентика",
    emoji: "🎨",
    subtitle: "Логотип і патерни, що мутують під контекст через AI",
    goal: "Жива бренд-система, що автоматично адаптується під канал, кампанію або сезон без дизайнера",
    blockId: "b8",
    photo: imgGenerativeIdentity,
    tag: "🔥 Унікально",
    hot: true,
    tiers: [{ name: "Start", price: "299 €" }, { name: "Pro", price: "599 €" }, { name: "Max", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>Логотип + 5 варіацій</b>", "SVG / PNG · base palette", "<b>Термін: 5 днів</b>", "1 правка · brand-guide PDF"),
      tf("<b>Лого + патерни + ілюстрації</b>", "Generative system + Figma", "<b>Термін: 10 днів</b>", "3 правки · API-генератор"),
      tf("<b>Повна жива система</b> · API", "Custom AI + automations", "<b>Термін: 14 днів</b>", "Безлім. правки · self-host"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "Не статичний логотип, а генеративна бренд-система: логомарк, патерни та ілюстрації, що мутують під контекст (свято, кампанія, аудиторія) через AI. Команда отримує безлім варіацій без дизайнера.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Концепт генеративної системи", "Розробка базового логомарку та правил мутацій", "Бібліотека патернів і ілюстрацій", "Brand-guide PDF з прикладами використання", "Figma-шаблон з компонентами", "API/скрипт для автогенерації варіацій"], type: "list" },
      { kind: "goal", label: "Мета", text: "Бренд, що ніколи не виглядає однаково, але завжди впізнаваний.", type: "text" },
    ],
    tools: [
      { name: "Midjourney v7", purpose: "Генеративні візуальні концепти і патерни", premium: true },
      { name: "Recraft V3", purpose: "Векторна AI-генерація логотипів і SVG", premium: true },
      { name: "Figma + Make AI", purpose: "Компоненти бренду й автоматизація варіацій", premium: true },
    ],
  },
  {
    id: "ai-forecast",
    name: "AI-Forecast ринку",
    emoji: "🔮",
    subtitle: "Прогноз трендів вашої ніші на 6 місяців на основі 1000+ джерел",
    goal: "Бачити завтрашній попит сьогодні: запускати продукти й контент під тренди, що тільки зароджуються",
    blockId: "b8",
    photo: imgAiForecast,
    tag: "🔥 Унікально",
    hot: true,
    tiers: [{ name: "Start", price: "299 €" }, { name: "Pro", price: "599 €" }, { name: "Max", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>1 ніша</b> · 100 джерел · 3 міс", "PDF-звіт 30+ стор.", "<b>Термін: 7 днів</b>", "1 zoom-розбір 1h"),
      tf("<b>1 ніша</b> · 1000 джерел · 6 міс", "Notion + Loom + ідеї продуктів", "<b>Термін: 10 днів</b>", "2 розбори · 5 product-ідей"),
      tf("<b>3 ніші</b> · повний моніторинг", "Live dashboard + щотижневі алерти", "<b>Термін: 14 днів</b>", "3 міс. підтримки · стратегсесія"),
    ],
    info: [
      { kind: "description", label: "Опис", text: "AI-прогноз трендів вашої ніші на 6 місяців: аналіз TikTok, Reddit, Product Hunt, патентів, Google Trends, GitHub. Виявляємо сигнали попиту, що тільки зароджуються, і даємо конкретні product/контент ідеї для запуску раніше за конкурентів.", type: "text" },
      { kind: "content", label: "Зміст", items: ["Налаштування моніторингу 1000+ джерел", "AI-аналіз сигналів та виявлення трендів", "Прогнозна модель попиту на 6 міс", "Notion-звіт з кейсами та інсайтами", "5+ конкретних ідей продуктів/контенту", "Live-дашборд з алертами (Pro/Max)"], type: "list" },
      { kind: "goal", label: "Мета", text: "Перестати реагувати на тренди — почати їх передбачати.", type: "text" },
    ],
    tools: [
      { name: "Manus AI", purpose: "Автономний research-агент: ціль → план → результат" },
      { name: "Grok 4.20", purpose: "Real-time дані з X, веб і соцсигналів", premium: true },
      { name: "Exploding Topics", purpose: "Раннє виявлення трендів на роки вперед", premium: true },
    ],
  },
];
