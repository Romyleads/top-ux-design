export interface TierFeature {
  icon: "size" | "format" | "clock" | "check";
  text: string;
}

export interface Tier {
  name: string;
  price: string;
}

export interface InfoSection {
  label: string;
  text?: string;
  items?: string[];
  type: "text" | "list";
}

export interface ServiceCard {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  blockId: string;
  photo: string;
  tag: string;
  hot?: boolean;
  income?: string;
  tiers: Tier[];
  tierFeatures: TierFeature[][];
  info: InfoSection[];
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
  { id: "b8", icon: "🔥", title: "Трендові 2024–2025", subtitle: "Найбільш затребувані формати" },
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
    blockId: "b1",
    photo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    tag: "🖨 Друкована",
    tiers: [{ name: "Lite", price: "149 €" }, { name: "Standard", price: "279 €" }, { name: "Pro", price: "449 €" }],
    tierFeatures: [
      tf("<b>10–15</b> слайдів · Базова верстка", "PDF / PPTX", "<b>Термін: 5 днів</b>", "2 правки включено"),
      tf("<b>15–25</b> слайдів · Анімації + інфографіка", "PDF / PPTX / Keynote", "<b>Термін: 3 дні</b>", "5 правок · Slack-підтримка"),
      tf("<b>до 40</b> слайдів · Кастомна анімація", "Всі формати + Source files", "<b>Термін: 2 дні</b>", "Безлімітні правки · Trello-борд"),
    ],
    info: [
      { label: "Опис", text: "Багаторівнева структура з унікальним дизайном кожного слайду. Оптимізована для екрану та друку, з анімаційними переходами й логікою сторітелінгу.", type: "text" },
      { label: "Зміст", items: ["Обкладинка з брендингом і заголовком", "Вступ: завдання клієнта і ринковий контекст", "Блок проблем і рішень з інфографікою", "Цінова пропозиція і кейси", "Соціальні докази: відгуки, лого клієнтів", "Заключний слайд із CTA та контактами"], type: "list" },
      { label: "Мета", text: "Перетворити увагу аудиторії на конкретне рішення: угоду, інвестицію або наступну зустріч.", type: "text" },
      { label: "Формати", text: "PDF, PPTX, Keynote, Google Slides", type: "text" },
    ],
  },
  {
    id: "brochure",
    name: "Брошура",
    emoji: "📖",
    subtitle: "Друкований або PDF-документ для детального знайомства з послугами",
    blockId: "b1",
    photo: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
    tag: "🖨 Друкована",
    tiers: [{ name: "Lite", price: "119 €" }, { name: "Standard", price: "229 €" }, { name: "Pro", price: "379 €" }],
    tierFeatures: [
      tf("<b>4–8</b> сторінок · стандартний макет", "PDF", "<b>Термін: 4 дні</b>", "2 правки"),
      tf("<b>8–16</b> сторінок · авторський дизайн", "PDF + Print-ready CMYK", "<b>Термін: 3 дні</b>", "4 правки · ілюстрації в комплекті"),
      tf("<b>до 32</b> сторінок · преміум верстка", "PDF + CMYK + INDD Source", "<b>Термін: 2 дні</b>", "Безлімітні правки · макет для друку"),
    ],
    info: [
      { label: "Опис", text: "Багатосторінковий матеріал, що розкриває продукт або компанію в деталях.", type: "text" },
      { label: "Зміст", items: ["Обкладинка з фото та слоганом", "Опис компанії та ключових цінностей", "Детальний опис продуктів / послуг", "Конкурентні переваги", "Відгуки та кейси клієнтів", "Контакти, адреса, QR-код"], type: "list" },
      { label: "Мета", text: "Дати потенційному клієнту повне уявлення про пропозицію.", type: "text" },
      { label: "Формати", text: "PDF для цифрових каналів + макет для друку (CMYK)", type: "text" },
    ],
  },
  {
    id: "catalog",
    name: "Каталог",
    emoji: "📦",
    subtitle: "Систематизований перелік товарів та послуг з цінами й візуалами",
    blockId: "b1",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    tag: "🖨 Друкована",
    tiers: [{ name: "Lite", price: "299 €" }, { name: "Standard", price: "649 €" }, { name: "Pro", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>до 40</b> позицій · базові картки", "PDF", "<b>Термін: 7 днів</b>", "1 правка структури"),
      tf("<b>до 120</b> позицій · деталізовані картки", "PDF + Print-ready", "<b>Термін: 5 днів</b>", "3 правки · таблиці та порівняння"),
      tf("<b>необмежено</b> позицій · повна верстка", "PDF + Print + Web-версія", "<b>Термін: 4 дні</b>", "Безлімітні правки · SEO-оптимізація"),
    ],
    info: [
      { label: "Опис", text: "Великий структурований документ для B2B-продажів або роздрібних мереж.", type: "text" },
      { label: "Зміст", items: ["Систематизований перелік позицій по категоріях", "Якісні фото та описи", "Таблиці характеристик і порівняння", "Умови замовлення, ціни, знижки", "Контактна інформація та QR-коди"], type: "list" },
    ],
  },
  {
    id: "flyer",
    name: "Рекламна листівка",
    emoji: "📄",
    subtitle: "Яскравий односторінковий документ із чітким закликом до дії",
    blockId: "b1",
    photo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80",
    tag: "🖨 Друкована",
    tiers: [{ name: "Lite", price: "69 €" }, { name: "Standard", price: "129 €" }, { name: "Pro", price: "199 €" }],
    tierFeatures: [
      tf("<b>А5</b> · одностороння · базовий дизайн", "PDF для цифрових каналів", "<b>Термін: 1 день</b>", "2 правки"),
      tf("<b>А4 / А5</b> · двостороння · 2 варіанти", "Print CMYK + Digital PNG", "<b>Термін: 1 день</b>", "4 правки · анімована версія"),
      tf("<b>А4 / А5 / А6</b> · серія 3 варіантів", "Print + Digital + HTML5 банер", "<b>Термін: 1 день</b>", "Безлімітні правки · A/B версії"),
    ],
    info: [
      { label: "Опис", text: "Компактний рекламний матеріал форматів A4/A5/A6 для мережевих магазинів, заходів, поштових розсилок.", type: "text" },
      { label: "Зміст", items: ["Сильний заголовок з УТП", "Основна пропозиція або акція", "Ключові переваги (3–5 пунктів)", "Заклик до дії з дедлайном", "Контакти, сайт, QR-код"], type: "list" },
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
    blockId: "b2",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    tag: "💻 Цифрова",
    hot: true,
    tiers: [{ name: "Lite", price: "799 €" }, { name: "Standard", price: "1 699 €" }, { name: "Pro", price: "2 999 €" }],
    tierFeatures: [
      tf("<b>до 5</b> сторінок · Landing page", "HTML / WordPress", "<b>Термін: 7 днів</b>", "2 правки дизайну"),
      tf("<b>8–12</b> секцій · адаптивний + анімації", "React / Webflow", "<b>Термін: 5 днів</b>", "5 правок · CRM-інтеграція"),
      tf("<b>до 20</b> секцій · кастомний код", "React + Headless CMS", "<b>Термін: 3 дні</b>", "Безлімітні правки · A/B тести"),
    ],
    info: [
      { label: "Опис", text: "Сторінка з фокусом на одну пропозицію. Оптимізована для конверсії з чіткою воронкою.", type: "text" },
      { label: "Зміст", items: ["Hero-блок із ціннісною пропозицією", "Блок переваг та характеристик", "Соціальні докази і кейси", "FAQ секція", "Форма захоплення лідів", "CTA-кнопки по всій сторінці"], type: "list" },
    ],
  },
  {
    id: "video-ad",
    name: "Відео-реклама",
    emoji: "🎬",
    subtitle: "Короткий динамічний ролик для онлайн- та офлайн-каналів",
    blockId: "b2",
    photo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
    tag: "💻 Цифрова",
    tiers: [{ name: "Lite", price: "349 €" }, { name: "Standard", price: "699 €" }, { name: "Pro", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>15–30 сек</b> · моушн-графіка", "MP4 1080p · 1 формат", "<b>Термін: 5 днів</b>", "1 ітерація правок"),
      tf("<b>30–60 сек</b> · кастомна анімація", "MP4 4K + Social cuts", "<b>Термін: 4 дні</b>", "3 правки · субтитри"),
      tf("<b>до 2 хв</b> · повний продакшн", "MP4 4K + Social + GIF", "<b>Термін: 3 дні</b>", "Безлімітні правки · сценарій"),
    ],
    info: [
      { label: "Опис", text: "Професійний відеоролик з motion-графікою для соцмереж, YouTube та рекламних кампаній.", type: "text" },
    ],
  },
  {
    id: "smm",
    name: "SMM — Соцмережі",
    emoji: "📱",
    subtitle: "Стратегія та контент для Instagram, Facebook, LinkedIn",
    blockId: "b2",
    photo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    tag: "💻 Цифрова",
    tiers: [{ name: "Lite", price: "299 €" }, { name: "Standard", price: "549 €" }, { name: "Pro", price: "899 €" }],
    tierFeatures: [
      tf("<b>8</b> постів/міс · 1 платформа", "JPG/PNG + тексти + хештеги", "<b>Щотижневий звіт</b>", "2 правки на пост · без Stories"),
      tf("<b>16</b> постів/міс · 2 платформи", "JPG/PNG + Stories + Reels", "<b>Щотижневий звіт + аналітика</b>", "4 правки · контент-план"),
      tf("<b>30</b> постів/міс · всі платформи", "Повний пакет + UGC стиль", "<b>Щоденний менеджмент</b>", "Безлімітні правки · growth"),
    ],
    info: [
      { label: "Опис", text: "Комплексне ведення соцмереж: від стратегії до щоденного контенту та аналітики.", type: "text" },
    ],
  },
  {
    id: "banners",
    name: "Рекламні банери",
    emoji: "🖼",
    subtitle: "Графічні оголошення для дисплейної реклами та сайтів",
    blockId: "b2",
    photo: "https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=600&q=80",
    tag: "💻 Цифрова",
    tiers: [{ name: "Lite", price: "89 €" }, { name: "Standard", price: "169 €" }, { name: "Pro", price: "279 €" }],
    tierFeatures: [
      tf("<b>3</b> розміри · статичні", "JPG/PNG", "<b>Термін: 2 дні</b>", "2 правки · 1 варіант дизайну"),
      tf("<b>6</b> розмірів · статичні + GIF", "PNG + GIF + HTML5", "<b>Термін: 2 дні</b>", "4 правки · A/B варіанти"),
      tf("<b>10+</b> розмірів · анімовані", "HTML5 + GIF + Video", "<b>Термін: 1 день</b>", "Безлімітні правки · ретаргетинг"),
    ],
    info: [
      { label: "Опис", text: "Комплект рекламних банерів для Google Ads, Facebook, Instagram та інших платформ.", type: "text" },
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
    blockId: "b3",
    photo: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
    tag: "🎨 Брендинг",
    tiers: [{ name: "Lite", price: "229 €" }, { name: "Standard", price: "429 €" }, { name: "Pro", price: "699 €" }],
    tierFeatures: [
      tf("<b>2</b> концепти · базовий бриф", "PNG + SVG", "<b>Термін: 4 дні</b>", "2 правки · без кольорових варіантів"),
      tf("<b>5</b> концептів · гайдлайн використання", "AI + SVG + PNG + PDF", "<b>Термін: 3 дні</b>", "5 правок · анімована версія"),
      tf("<b>8</b> концептів · повний брендбук", "Всі формати + Source files", "<b>Термін: 2 дні</b>", "Безлімітні правки · trademark-check"),
    ],
    info: [
      { label: "Опис", text: "Створення логотипу з нуля: від брифу до фінального файлу. Включає дослідження конкурентів.", type: "text" },
    ],
  },
  {
    id: "business-card",
    name: "Візитка",
    emoji: "💳",
    subtitle: "Компактний та стильний носій ділової ідентичності",
    blockId: "b3",
    photo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80",
    tag: "🎨 Брендинг",
    tiers: [{ name: "Lite", price: "49 €" }, { name: "Standard", price: "89 €" }, { name: "Pro", price: "149 €" }],
    tierFeatures: [
      tf("<b>1</b> варіант · стандарт 90×50 мм", "PDF Print-ready", "<b>Термін: 1 день</b>", "2 правки"),
      tf("<b>2</b> варіанти · двостороння", "PDF + AI + Mockup", "<b>Термін: 1 день</b>", "4 правки · NFC варіант"),
      tf("<b>3</b> варіанти · преміум фінішинг", "PDF + AI + 3D Mockup", "<b>Термін: 1 день</b>", "Безлімітні правки · організація друку"),
    ],
    info: [
      { label: "Опис", text: "Професійна візитна картка, яка запам'ятовується.", type: "text" },
    ],
  },
  {
    id: "packaging",
    name: "Упаковка",
    emoji: "📫",
    subtitle: "Фірмова упаковка, що продає на полиці",
    blockId: "b3",
    photo: "https://images.unsplash.com/photo-1605732562742-aec16ae68bda?auto=format&fit=crop&w=600&q=80",
    tag: "🎨 Брендинг",
    tiers: [{ name: "Lite", price: "179 €" }, { name: "Standard", price: "349 €" }, { name: "Pro", price: "599 €" }],
    tierFeatures: [
      tf("<b>1</b> поверхня · коробка або пакет", "AI/PDF розгортка + 1 мокап", "<b>Термін: 5 днів</b>", "2 правки"),
      tf("<b>2</b> поверхні · кастомний дизайн", "AI + PDF + 3D Mockup", "<b>Термін: 4 дні</b>", "3 правки · друкарня-ready"),
      tf("<b>3+</b> поверхні · повна лінійка", "Всі формати + Prototип", "<b>Термін: 3 дні</b>", "Безлімітні правки · продакшн-підтримка"),
    ],
    info: [
      { label: "Опис", text: "Дизайн упаковки, що виділяє продукт серед конкурентів на полиці.", type: "text" },
    ],
  },
  {
    id: "brandbook",
    name: "Брендбук",
    emoji: "📕",
    subtitle: "Офіційний стайл-гайд для єдності всіх комунікацій",
    blockId: "b3",
    photo: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80",
    tag: "🎨 Брендинг",
    tiers: [{ name: "Lite", price: "599 €" }, { name: "Standard", price: "1 199 €" }, { name: "Pro", price: "1 999 €" }],
    tierFeatures: [
      tf("<b>15–20</b> сторінок · логотип + кольори + шрифти", "PDF", "<b>Термін: 10 днів</b>", "2 правки"),
      tf("<b>30–40</b> сторінок · повний гайдлайн", "PDF + Figma", "<b>Термін: 7 днів</b>", "4 правки · шаблони документів"),
      tf("<b>50+</b> сторінок · корпоративний стандарт", "PDF + Figma + Notion", "<b>Термін: 5 днів</b>", "Безлімітні правки · digital guidelines"),
    ],
    info: [
      { label: "Опис", text: "Документ, що фіксує всі правила використання бренду: логотип, кольори, типографіка, тон комунікацій.", type: "text" },
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
    blockId: "b4",
    photo: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
    tag: "📝 Контент",
    tiers: [{ name: "Lite", price: "79 €" }, { name: "Standard", price: "149 €" }, { name: "Pro", price: "249 €" }],
    tierFeatures: [
      tf("<b>700–1000</b> слів · базова SEO-оптимізація", "Google Doc або HTML", "<b>Термін: 2 дні</b>", "1 правка · мета-теги включено"),
      tf("<b>1500–2500</b> слів · SEO + конверсія", "Google Doc + CMS", "<b>Термін: 2 дні</b>", "3 правки · keyword research"),
      tf("<b>3000+</b> слів · pillar content", "CMS + Notion + Content Calendar", "<b>Термін: 1 день</b>", "Безлімітні правки · A/B тести"),
    ],
    info: [
      { label: "Опис", text: "Професійні SEO-оптимізовані статті для залучення органічного трафіку.", type: "text" },
    ],
  },
  {
    id: "infographic",
    name: "Інфографіка",
    emoji: "📊",
    subtitle: "Візуальний матеріал для пояснення складних даних",
    blockId: "b4",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    tag: "📝 Контент",
    tiers: [{ name: "Lite", price: "119 €" }, { name: "Standard", price: "229 €" }, { name: "Pro", price: "379 €" }],
    tierFeatures: [
      tf("<b>1</b> інфографіка · статична · до 5 блоків", "PNG + PDF", "<b>Термін: 2 дні</b>", "2 правки"),
      tf("<b>3</b> інфографіки · кастомні ікони", "PNG + PDF + SVG", "<b>Термін: 2 дні</b>", "4 правки · інтерактивна версія"),
      tf("<b>5+</b> інфографік · анімовані", "SVG + Lottie + Video", "<b>Термін: 2 дні</b>", "Безлімітні правки · data-driven"),
    ],
    info: [
      { label: "Опис", text: "Перетворення складних даних у зрозумілу та привабливу візуалізацію.", type: "text" },
    ],
  },
  {
    id: "white-paper",
    name: "White Paper",
    emoji: "📄",
    subtitle: "Авторитетний аналітичний документ для генерації B2B-лідів",
    blockId: "b4",
    photo: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=600&q=80",
    tag: "📝 Контент",
    tiers: [{ name: "Lite", price: "349 €" }, { name: "Standard", price: "699 €" }, { name: "Pro", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>8–12</b> сторінок · базовий аналіз", "PDF", "<b>Термін: 10 днів</b>", "2 правки · без власного дослідження"),
      tf("<b>15–25</b> сторінок · глибокий аналіз", "PDF + Landing page", "<b>Термін: 7 днів</b>", "4 правки · графіки + діаграми"),
      tf("<b>30+</b> сторінок · повне дослідження", "PDF + Web + Lead magnet", "<b>Термін: 5 днів</b>", "Безлімітні правки · промо-план"),
    ],
    info: [
      { label: "Опис", text: "Експертний документ, що позиціонує компанію як лідера думки у галузі.", type: "text" },
    ],
  },
  {
    id: "case-study",
    name: "Кейс-стаді",
    emoji: "🏆",
    subtitle: "Детальна документація успішного проєкту як соціальний доказ",
    blockId: "b4",
    photo: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80",
    tag: "📝 Контент",
    tiers: [{ name: "Lite", price: "179 €" }, { name: "Standard", price: "349 €" }, { name: "Pro", price: "599 €" }],
    tierFeatures: [
      tf("<b>2–3</b> сторінки · текст + метрики", "PDF", "<b>Термін: 3 дні</b>", "2 правки"),
      tf("<b>5–7</b> сторінок · відео-версія + інфографіка", "PDF + Web + Video", "<b>Термін: 3 дні</b>", "4 правки · landing для кейсу"),
      tf("<b>10+</b> сторінок · повний пакет", "PDF + Web + Video + Social", "<b>Термін: 2 дні</b>", "Безлімітні правки"),
    ],
    info: [
      { label: "Опис", text: "Демонстрація результатів роботи через реальні проекти з вимірюваними метриками.", type: "text" },
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
    blockId: "b5",
    photo: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=600&q=80",
    tag: "📧 Email",
    hot: true,
    tiers: [{ name: "Lite", price: "249 €" }, { name: "Standard", price: "499 €" }, { name: "Pro", price: "849 €" }],
    tierFeatures: [
      tf("<b>15–20</b> сторінок · базовий дизайн", "PDF", "<b>Термін: 7 днів</b>", "2 правки · обкладинка included"),
      tf("<b>25–35</b> сторінок · авторський дизайн", "PDF + Landing page", "<b>Термін: 5 днів</b>", "4 правки · промо-матеріали"),
      tf("<b>40+</b> сторінок · преміум", "PDF + Web + Automation", "<b>Термін: 4 дні</b>", "Безлімітні правки · воронка"),
    ],
    info: [
      { label: "Опис", text: "Цінний контент у форматі e-book, який мотивує відвідувача залишити email-адресу.", type: "text" },
    ],
  },
  {
    id: "email-campaign",
    name: "Email-розсилка",
    emoji: "💌",
    subtitle: "Персоналізовані листи з конверсією вище середньої по ринку",
    blockId: "b5",
    photo: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&q=80",
    tag: "📧 Email",
    tiers: [{ name: "Lite", price: "89 €" }, { name: "Standard", price: "169 €" }, { name: "Pro", price: "299 €" }],
    tierFeatures: [
      tf("<b>1</b> лист · текст + базова верстка", "HTML + plain text", "<b>Термін: 2 дні</b>", "2 правки"),
      tf("<b>3</b> листи · A/B варіанти", "HTML + MJML + dark mode", "<b>Термін: 2 дні</b>", "4 правки · сегментація"),
      tf("<b>5+</b> листів · повна кампанія", "MJML + Figma + ESP setup", "<b>Термін: 1 день</b>", "Безлімітні правки · аналітика"),
    ],
    info: [
      { label: "Опис", text: "Кросплатформний email з високою конверсією, що коректно відображається у всіх клієнтах.", type: "text" },
    ],
  },
  {
    id: "drip-campaign",
    name: "Drip-кампанія",
    emoji: "💧",
    subtitle: "Автоматизована серія листів, що веде підписника до покупки",
    blockId: "b5",
    photo: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=600&q=80",
    tag: "📧 Email",
    hot: true,
    tiers: [{ name: "Lite", price: "229 €" }, { name: "Standard", price: "429 €" }, { name: "Pro", price: "699 €" }],
    tierFeatures: [
      tf("<b>3</b> листи · лінійна welcome-серія", "HTML + налаштування в ESP", "<b>Термін: 5 днів</b>", "2 правки"),
      tf("<b>7</b> листів · розгалужена воронка", "HTML + Automation + Сегментація", "<b>Термін: 4 дні</b>", "4 правки · тригери"),
      tf("<b>12+</b> листів · мультиворонка", "Повний пакет + ESP + Analytics", "<b>Термін: 3 дні</b>", "Безлімітні правки · оптимізація"),
    ],
    info: [
      { label: "Опис", text: "Стратегічна серія автоматичних листів для конвертації лідів у клієнтів.", type: "text" },
    ],
  },
  {
    id: "newsletter",
    name: "Newsletter",
    emoji: "📰",
    subtitle: "Регулярна розсилка для утримання та монетизації аудиторії",
    blockId: "b5",
    photo: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?auto=format&fit=crop&w=600&q=80",
    tag: "📧 Email",
    tiers: [{ name: "Lite", price: "149 €" }, { name: "Standard", price: "279 €" }, { name: "Pro", price: "449 €" }],
    tierFeatures: [
      tf("<b>4</b> листи/міс · 400–600 слів", "HTML шаблон", "<b>Підготовка: 3 дні/лист</b>", "1 правка · базова аналітика"),
      tf("<b>8</b> листів/міс · контент + дизайн", "HTML + Copywriting", "<b>Підготовка: 2 дні/лист</b>", "3 правки · subject line тести"),
      tf("<b>12</b> листів/міс · повне ведення", "HTML + Copy + Analytics", "<b>Підготовка: 1 день/лист</b>", "Безлімітні правки · growth-стратегія"),
    ],
    info: [
      { label: "Опис", text: "Регулярні email-розсилки для підтримки зв'язку з аудиторією та збільшення лояльності.", type: "text" },
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
    blockId: "b6",
    photo: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80",
    tag: "🎬 Відео",
    tiers: [{ name: "Lite", price: "299 €" }, { name: "Standard", price: "599 €" }, { name: "Pro", price: "999 €" }],
    tierFeatures: [
      tf("<b>1</b> вебінар · до 60 хв", "Слайди + запис MP4", "<b>Підготовка: 5 днів</b>", "Базовий монтаж · 1 правка"),
      tf("<b>3</b> вебінари · серія + Q&A", "MP4 + Landing + Email", "<b>Підготовка: 3 дні/вебінар</b>", "3 правки · промо-пакет"),
      tf("<b>Повний курс</b> · модулі + сертифікат", "Платформа + MP4 + PDF", "<b>Підготовка: 2 дні/модуль</b>", "Безлімітні правки · LMS setup"),
    ],
    info: [
      { label: "Опис", text: "Освітній формат для побудови експертності та генерації лідів.", type: "text" },
    ],
  },
  {
    id: "product-tour",
    name: "Відео-тур / Продукт-огляд",
    emoji: "🏠",
    subtitle: "Демонстрація продукту, офісу або команди для підвищення довіри",
    blockId: "b6",
    photo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
    tag: "🎬 Відео",
    tiers: [{ name: "Lite", price: "249 €" }, { name: "Standard", price: "499 €" }, { name: "Pro", price: "849 €" }],
    tierFeatures: [
      tf("<b>2–3 хв</b> · screen recording або анімація", "MP4 1080p · 1 формат", "<b>Термін: 5 днів</b>", "1 правка монтажу"),
      tf("<b>5 хв</b> · кастомна анімація + озвучка", "MP4 4K + Social clips", "<b>Термін: 4 дні</b>", "3 правки · субтитри"),
      tf("<b>до 10 хв</b> · повний продакшн", "MP4 4K + Web embed + GIF", "<b>Термін: 3 дні</b>", "Безлімітні правки · сценарій"),
    ],
    info: [
      { label: "Опис", text: "Відеодемонстрація продукту або послуги для підвищення довіри та конверсії.", type: "text" },
    ],
  },
  {
    id: "testimonials",
    name: "Відгуки / Testimonials",
    emoji: "⭐",
    subtitle: "Відеовідгуки задоволених клієнтів як найпотужніший соціальний доказ",
    blockId: "b6",
    photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    tag: "🎬 Відео",
    tiers: [{ name: "Lite", price: "179 €" }, { name: "Standard", price: "349 €" }, { name: "Pro", price: "599 €" }],
    tierFeatures: [
      tf("<b>1</b> відгук · 1–2 хв", "MP4 1080p · 1 платформа", "<b>Термін: 3 дні</b>", "1 правка · субтитри"),
      tf("<b>3</b> відгуки · різні формати", "MP4 4K + Shorts + Stories", "<b>Термін: 3 дні</b>", "3 правки · монтаж"),
      tf("<b>6+</b> відгуків · серія", "Всі формати + Web embed", "<b>Термін: 2 дні</b>", "Безлімітні правки · кастинг"),
    ],
    info: [
      { label: "Опис", text: "Відеовідгуки клієнтів, що підвищують довіру та конверсію.", type: "text" },
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
    blockId: "b7",
    photo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
    tag: "📢 Реклама",
    tiers: [{ name: "Lite", price: "249 €" }, { name: "Standard", price: "499 €" }, { name: "Pro", price: "849 €" }],
    tierFeatures: [
      tf("<b>1</b> кампанія · до 50 ключів", "Google Search", "<b>Запуск: 5 днів</b>", "Щомісячна оптимізація · базовий звіт"),
      tf("<b>3</b> кампанії · Search + Display", "Google Ads + Analytics", "<b>Запуск: 3 дні</b>", "A/B тести · ремаркетинг"),
      tf("<b>5+</b> кампаній · повний Performance", "Google Ads + GA4 + Looker", "<b>Запуск: 2 дні</b>", "Щомісячна оптимізація · детальні звіти"),
    ],
    info: [
      { label: "Опис", text: "Повний цикл: від keyword research до запуску та оптимізації рекламних кампаній.", type: "text" },
    ],
  },
  {
    id: "retargeting",
    name: "Ретаргетинг",
    emoji: "🔄",
    subtitle: "Повернення відвідувачів сайту, що пішли без конверсії",
    blockId: "b7",
    photo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=600&q=80",
    tag: "📢 Реклама",
    tiers: [{ name: "Lite", price: "229 €" }, { name: "Standard", price: "429 €" }, { name: "Pro", price: "699 €" }],
    tierFeatures: [
      tf("<b>1</b> аудиторія · Facebook або Google", "Pixel setup + 3 креативи", "<b>Запуск: 3 дні</b>", "Базова оптимізація"),
      tf("<b>3</b> аудиторії · мультиплатформа", "Pixel + API + 10 креативів", "<b>Запуск: 2 дні</b>", "A/B тести · сегментація"),
      tf("<b>5+</b> аудиторій · full-funnel", "Повний tech stack", "<b>Запуск: 2 дні</b>", "Щомісячна оптимізація · ROAS-фокус"),
    ],
    info: [
      { label: "Опис", text: "Повернення «загублених» відвідувачів через таргетовану рекламу на всіх платформах.", type: "text" },
    ],
  },
  {
    id: "native-ads",
    name: "Нативна реклама",
    emoji: "📰",
    subtitle: "Рекламний контент, що виглядає як редакційний матеріал",
    blockId: "b7",
    photo: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?auto=format&fit=crop&w=600&q=80",
    tag: "📢 Реклама",
    tiers: [{ name: "Lite", price: "299 €" }, { name: "Standard", price: "599 €" }, { name: "Pro", price: "999 €" }],
    tierFeatures: [
      tf("<b>1</b> стаття · 1 платформа", "Google Doc + Visual", "<b>Термін: 5 днів</b>", "2 правки · базова аналітика"),
      tf("<b>3</b> статті · мультиплатформа", "CMS + Social + Analytics", "<b>Термін: 3 дні</b>", "4 правки · промо-план"),
      tf("<b>6+</b> статей · повна кампанія", "CMS + Paid + Organic", "<b>Термін: 2 дні</b>", "Безлімітні правки · ROI-звіт"),
    ],
    info: [
      { label: "Опис", text: "Нативний контент, що органічно вписується у редакційний простір і не виглядає як реклама.", type: "text" },
    ],
  },
  {
    id: "landing-ad",
    name: "Landing Page (рекламний)",
    emoji: "🚀",
    subtitle: "Конверсійна цільова сторінка з вимірюваним ROI",
    blockId: "b7",
    photo: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
    tag: "📢 Реклама",
    hot: true,
    tiers: [{ name: "Lite", price: "179 €" }, { name: "Standard", price: "349 €" }, { name: "Pro", price: "599 €" }],
    tierFeatures: [
      tf("<b>1</b> секція оффер + форма", "Webflow або Tilda", "<b>Термін: 3 дні</b>", "2 правки · базова аналітика"),
      tf("<b>3–5</b> секцій · повна воронка", "Webflow + CRM + Analytics", "<b>Термін: 2 дні</b>", "4 правки · A/B тести"),
      tf("<b>7+</b> секцій · кастомний код", "React + CRM + GA4", "<b>Термін: 2 дні</b>", "Безлімітні правки · heatmaps"),
    ],
    info: [
      { label: "Опис", text: "Простий лендінг для рекламних кампаній з фокусом на конверсію та вимірюваний ROI.", type: "text" },
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
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $50–500 / відео",
    tiers: [{ name: "Lite", price: "349 €" }, { name: "Standard", price: "749 €" }, { name: "Pro", price: "1 299 €" }],
    tierFeatures: [
      tf("<b>3</b> відео · 15–30 сек · 1 платформа", "MP4 9:16", "<b>Термін: 5 днів</b>", "1 правка · 1 бриф + монтаж"),
      tf("<b>6</b> відео · мульти-платформа", "MP4 + JPG + Stories", "<b>Термін: 4 дні</b>", "3 правки · кастинг криейторів"),
      tf("<b>12</b> відео · повна стратегія", "Всі формати + права", "<b>Термін: 3 дні</b>", "Безлімітні правки · контент-план"),
    ],
    info: [
      { label: "Опис", text: "Автентичний контент від реальних користувачів для побудови довіри.", type: "text" },
    ],
  },
  {
    id: "ai-content",
    name: "AI-контент зі стилем",
    emoji: "🤖",
    subtitle: "Інтеграція AI-інструментів у маркетингові процеси",
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $2 000–8 000 / міс",
    tiers: [{ name: "Lite", price: "299 €" }, { name: "Standard", price: "599 €" }, { name: "Pro", price: "1 099 €" }],
    tierFeatures: [
      tf("<b>10</b> матеріалів/міс · базовий бриф", "Google Doc + PNG", "<b>Партіями по 3 дні</b>", "2 правки · фактчекінг + SEO мета-теги"),
      tf("<b>25</b> матеріалів/міс · стратегія", "Notion + CMS + Social", "<b>Партіями по 2 дні</b>", "4 правки · навчання команди"),
      tf("<b>50+</b> матеріалів/міс · повна автоматизація", "Кастомні GPT + Workflows", "<b>Ongoing</b>", "Безлімітні правки · щомісячна оптимізація"),
    ],
    info: [
      { label: "Опис", text: "Впровадження AI у маркетинг для масштабування контенту та автоматизації.", type: "text" },
    ],
  },
  {
    id: "saas-onboarding",
    name: "Онбординг для SaaS",
    emoji: "🗺",
    subtitle: "Welcome-серія та навчальні матеріали для нових користувачів",
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $1 000–5 000 / проєкт",
    tiers: [{ name: "Lite", price: "349 €" }, { name: "Standard", price: "749 €" }, { name: "Pro", price: "1 299 €" }],
    tierFeatures: [
      tf("<b>3</b> email welcome-серія + 1 гайд", "HTML email + PDF або Loom", "<b>Термін: 5 днів</b>", "2 правки · 1 сегмент"),
      tf("<b>7</b> листів + in-app повідомлення", "HTML + Product tours", "<b>Термін: 4 дні</b>", "4 правки · аналітика retention"),
      tf("<b>Повний онбординг</b> · мульти-канал", "Email + In-app + Video + Docs", "<b>Термін: 3 дні</b>", "Безлімітні правки · A/B тести"),
    ],
    info: [
      { label: "Опис", text: "Комплексний онбординг для SaaS-продуктів: від першого листа до активації користувача.", type: "text" },
    ],
  },
  {
    id: "linkedin-brand",
    name: "LinkedIn Personal Brand",
    emoji: "💼",
    subtitle: "Побудова особистого бренду на LinkedIn для B2B",
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1616469829581-73886eb0ecab?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $2 000–7 000 / міс",
    tiers: [{ name: "Lite", price: "349 €" }, { name: "Standard", price: "699 €" }, { name: "Pro", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>3</b> пости/тиж · базова стратегія", "LinkedIn + профіль-оптимізація", "<b>Підготовка: 2 дні/тиж</b>", "1 правка/пост · гайд outreach + аналітика"),
      tf("<b>5</b> постів/тиж · thought leadership", "LinkedIn + Newsletter + Events", "<b>Підготовка: 1 день/тиж</b>", "3 правки · networking стратегія"),
      tf("<b>Щоденний</b> контент · повне ведення", "LinkedIn + Podcast + Speaking", "<b>Ongoing</b>", "Безлімітні правки · ABM стратегія"),
    ],
    info: [
      { label: "Опис", text: "Професійна побудова LinkedIn-бренду для залучення B2B-клієнтів та партнерів.", type: "text" },
    ],
  },
  {
    id: "micro-saas",
    name: "Micro SaaS",
    emoji: "⚡",
    subtitle: "Мінімальний SaaS-продукт для швидкої монетизації",
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    hot: true,
    income: "💰 $5 000–20 000 / проєкт",
    tiers: [{ name: "Lite", price: "799 €" }, { name: "Standard", price: "1 799 €" }, { name: "Pro", price: "3 499 €" }],
    tierFeatures: [
      tf("<b>Landing page</b> + Stripe + онбординг", "Webflow + Stripe + email", "<b>Термін: 10 днів</b>", "1 ітерація + Product Hunt чеклист"),
      tf("<b>MVP</b> + dashboard + API", "React + Supabase + Stripe", "<b>Термін: 7 днів</b>", "3 ітерації · аналітика"),
      tf("<b>Повний продукт</b> · масштабування", "Custom stack + CI/CD", "<b>Термін: 5 днів</b>", "Безлімітні ітерації · growth"),
    ],
    info: [
      { label: "Опис", text: "Швидкий запуск мінімального SaaS-продукту для перевірки гіпотези та монетизації.", type: "text" },
    ],
  },
  {
    id: "interactive-content",
    name: "Інтерактивний контент",
    emoji: "🎮",
    subtitle: "Квізи, калькулятори та інтерактивні елементи для залучення",
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    hot: true,
    tiers: [{ name: "Lite", price: "349 €" }, { name: "Standard", price: "699 €" }, { name: "Pro", price: "1 199 €" }],
    tierFeatures: [
      tf("<b>1</b> інструмент · до 10 кроків", "Typeform або Tally", "<b>Термін: 5 днів</b>", "2 правки · 2 результати + email"),
      tf("<b>3</b> інструменти · lead capture", "Web + Email інтеграція", "<b>Термін: 3 дні</b>", "4 правки · аналітика + CRM"),
      tf("<b>5+</b> інструментів · гейміфікація", "Web + App + API", "<b>Термін: 3 дні</b>", "Безлімітні правки · A/B тести"),
    ],
    info: [
      { label: "Опис", text: "Інтерактивні елементи, що залучають аудиторію та генерують ліди з конверсією 40%+.", type: "text" },
    ],
  },
  {
    id: "podcast",
    name: "Подкаст-продакшн",
    emoji: "🎙",
    subtitle: "Повний запуск подкасту: від концепції до дистрибуції",
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    hot: true,
    tiers: [{ name: "Lite", price: "349 €" }, { name: "Standard", price: "699 €" }, { name: "Pro", price: "1 299 €" }],
    tierFeatures: [
      tf("<b>Концепція</b> + обкладинка + 1 епізод", "MP3 + Cover art", "<b>Термін: 5 днів</b>", "2 правки · RSS-фід"),
      tf("<b>Брендинг</b> + 4 епізоди + дистрибуція", "MP3 + Video + Clips", "<b>Термін: 5 днів</b>", "Монтаж · show notes · Spotify/Apple"),
      tf("<b>Повний</b> продакшн на 3 місяці", "Audio + Video + Social + Newsletter", "<b>Ongoing</b>", "Щотижневий випуск · growth"),
    ],
    info: [
      { label: "Опис", text: "Від ідеї до регулярного подкасту з аудиторією.", type: "text" },
    ],
  },
];
