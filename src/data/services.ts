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
  { id: "b2", icon: "💻", title: "Цифрова продукція", subtitle: "Веб та діджитал-матеріали для онлайн-присутності" },
  { id: "b3", icon: "🎨", title: "Брендинг", subtitle: "Візуальна ідентичність та фірмовий стиль" },
  { id: "b4", icon: "📝", title: "Контент", subtitle: "Тексти, копірайтинг та контент-стратегія" },
  { id: "b5", icon: "📧", title: "Email маркетинг", subtitle: "Розсилки, автоматизація та email-дизайн" },
  { id: "b6", icon: "🎬", title: "Відео продукція", subtitle: "Відеоконтент для соцмереж та реклами" },
  { id: "b7", icon: "📢", title: "Реклама", subtitle: "Рекламні кампанії та креативи" },
  { id: "b8", icon: "🔥", title: "Тренди 2024–2025", subtitle: "Найактуальніші формати та канали" },
];

export const services: ServiceCard[] = [
  // ═══ b1: Друкована продукція ═══
  {
    id: "presentation",
    name: "Презентація",
    emoji: "📊",
    subtitle: "Переконлива слайд-колода для переговорів і пітчів",
    blockId: "b1",
    photo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    tag: "🖨 Друкована",
    tiers: [
      { name: "Lite", price: "149 €" },
      { name: "Standard", price: "279 €" },
      { name: "Pro", price: "449 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>10–15</b> слайдів · Базова верстка" },
        { icon: "format", text: "PDF / PPTX" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "2 правки включено" },
      ],
      [
        { icon: "size", text: "<b>15–25</b> слайдів · Анімації + інфографіка" },
        { icon: "format", text: "PDF / PPTX / Keynote" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "5 правок · Slack-підтримка" },
      ],
      [
        { icon: "size", text: "<b>до 40</b> слайдів · Кастомна анімація" },
        { icon: "format", text: "Всі формати + Source files" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Безлімітні правки · Trello-борд" },
      ],
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
    tiers: [
      { name: "Lite", price: "119 €" },
      { name: "Standard", price: "229 €" },
      { name: "Pro", price: "379 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>4–8</b> сторінок · стандартний макет" },
        { icon: "format", text: "PDF" },
        { icon: "clock", text: "<b>Термін: 4 дні</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>8–16</b> сторінок · авторський дизайн" },
        { icon: "format", text: "PDF + Print-ready CMYK" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "4 правки · ілюстрації в комплекті" },
      ],
      [
        { icon: "size", text: "<b>до 32</b> сторінок · преміум верстка" },
        { icon: "format", text: "PDF + CMYK + INDD Source" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Безлімітні правки · макет для друку" },
      ],
    ],
    info: [
      { label: "Опис", text: "Багатосторінковий матеріал, що розкриває продукт або компанію в деталях.", type: "text" },
      { label: "Зміст", items: ["Обкладинка з фото та слоганом", "Опис компанії та ключових цінностей", "Детальний опис продуктів / послуг", "Конкурентні переваги", "Відгуки та кейси клієнтів", "Контакти, адреса, QR-код"], type: "list" },
      { label: "Мета", text: "Дати потенційному клієнту повне уявлення про пропозицію.", type: "text" },
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
    tiers: [
      { name: "Lite", price: "299 €" },
      { name: "Standard", price: "649 €" },
      { name: "Pro", price: "1 199 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>до 40</b> позицій · базові картки" },
        { icon: "format", text: "PDF" },
        { icon: "clock", text: "<b>Термін: 7 днів</b>" },
        { icon: "check", text: "1 правка структури" },
      ],
      [
        { icon: "size", text: "<b>до 120</b> позицій · деталізовані картки" },
        { icon: "format", text: "PDF + Print-ready" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "3 правки · таблиці та порівняння" },
      ],
      [
        { icon: "size", text: "<b>необмежено</b> позицій · повна верстка" },
        { icon: "format", text: "PDF + Print + Web-версія" },
        { icon: "clock", text: "<b>Термін: 4 дні</b>" },
        { icon: "check", text: "Безлімітні правки · SEO-оптимізація" },
      ],
    ],
    info: [
      { label: "Опис", text: "Великий структурований документ для B2B-продажів або роздрібних мереж.", type: "text" },
      { label: "Зміст", items: ["Систематизований перелік позицій по категоріях", "Якісні фото та описи", "Таблиці характеристик і порівняння", "Умови замовлення, ціни, знижки"], type: "list" },
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
    tiers: [
      { name: "Lite", price: "79 €" },
      { name: "Standard", price: "149 €" },
      { name: "Pro", price: "249 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>А5</b> · одностороння · базовий дизайн" },
        { icon: "format", text: "PDF для цифрових каналів" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>А4 / А5</b> · двостороння · 2 варіанти" },
        { icon: "format", text: "Print CMYK + Digital PNG" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "4 правки · анімована версія" },
      ],
      [
        { icon: "size", text: "<b>А4 / А5 / А6</b> · серія 3 варіантів" },
        { icon: "format", text: "Print + Digital + HTML5 банер" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "Безлімітні правки · A/B версії" },
      ],
    ],
    info: [
      { label: "Опис", text: "Компактний рекламний матеріал для мережевих магазинів, заходів, поштових розсилок.", type: "text" },
      { label: "Зміст", items: ["Сильний заголовок з УТП", "Основна пропозиція або акція", "Ключові переваги (3–5 пунктів)", "Заклик до дії з дедлайном", "Контакти, сайт, QR-код"], type: "list" },
    ],
  },

  // ═══ b2: Цифрова продукція ═══
  {
    id: "landing",
    name: "Лендінг",
    emoji: "🌐",
    subtitle: "Продаюча односторінкова web-сторінка з високою конверсією",
    blockId: "b2",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    tag: "💻 Цифрова",
    hot: true,
    tiers: [
      { name: "Lite", price: "349 €" },
      { name: "Standard", price: "699 €" },
      { name: "Pro", price: "1 299 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>5–7</b> секцій · адаптивний дизайн" },
        { icon: "format", text: "HTML / WordPress" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "2 правки · базова SEO" },
      ],
      [
        { icon: "size", text: "<b>8–12</b> секцій · анімації + інтеграції" },
        { icon: "format", text: "React / WordPress / Webflow" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "5 правок · CRM-інтеграція" },
      ],
      [
        { icon: "size", text: "<b>до 20</b> секцій · кастомний код" },
        { icon: "format", text: "React + Headless CMS" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Безлімітні правки · A/B тести" },
      ],
    ],
    info: [
      { label: "Опис", text: "Сторінка з фокусом на одну пропозицію. Оптимізована для конверсії з чіткою воронкою.", type: "text" },
      { label: "Зміст", items: ["Hero-блок із ціннісною пропозицією", "Блок переваг та характеристик", "Соціальні докази і кейси", "FAQ секція", "Форма захоплення лідів", "CTA-кнопки по всій сторінці"], type: "list" },
    ],
  },
  {
    id: "social-media-kit",
    name: "Social Media Kit",
    emoji: "📱",
    subtitle: "Комплект шаблонів для соціальних мереж",
    blockId: "b2",
    photo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    tag: "💻 Цифрова",
    tiers: [
      { name: "Lite", price: "99 €" },
      { name: "Standard", price: "199 €" },
      { name: "Pro", price: "349 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>10</b> шаблонів · 1 платформа" },
        { icon: "format", text: "PNG / Canva" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>25</b> шаблонів · 3 платформи" },
        { icon: "format", text: "PNG + Figma + Canva" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "5 правок · Stories + Reels шаблони" },
      ],
      [
        { icon: "size", text: "<b>50+</b> шаблонів · всі платформи" },
        { icon: "format", text: "Figma + Canva + PSD" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Безлімітні правки · контент-план" },
      ],
    ],
    info: [
      { label: "Опис", text: "Готовий набір візуальних шаблонів для постійної присутності в соцмережах.", type: "text" },
    ],
  },
  {
    id: "banner-set",
    name: "Банерний комплект",
    emoji: "🖼",
    subtitle: "Набір адаптивних банерів для рекламних кампаній",
    blockId: "b2",
    photo: "https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=600&q=80",
    tag: "💻 Цифрова",
    tiers: [
      { name: "Lite", price: "89 €" },
      { name: "Standard", price: "179 €" },
      { name: "Pro", price: "299 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>5</b> розмірів · статичні" },
        { icon: "format", text: "PNG / JPG" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>10</b> розмірів · статичні + GIF" },
        { icon: "format", text: "PNG + GIF + HTML5" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "4 правки · A/B варіанти" },
      ],
      [
        { icon: "size", text: "<b>15+</b> розмірів · анімовані" },
        { icon: "format", text: "HTML5 + GIF + Video" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "Безлімітні правки · ретаргетинг-банери" },
      ],
    ],
    info: [
      { label: "Опис", text: "Комплект рекламних банерів для Google Ads, Facebook, Instagram та інших платформ.", type: "text" },
    ],
  },
  {
    id: "infographic",
    name: "Інфографіка",
    emoji: "📈",
    subtitle: "Візуалізація даних та процесів у привабливій формі",
    blockId: "b2",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    tag: "💻 Цифрова",
    tiers: [
      { name: "Lite", price: "129 €" },
      { name: "Standard", price: "249 €" },
      { name: "Pro", price: "449 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1</b> інфографіка · базовий стиль" },
        { icon: "format", text: "PNG / PDF" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>3</b> інфографіки · кастомні ікони" },
        { icon: "format", text: "PNG + PDF + SVG" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "4 правки · інтерактивна версія" },
      ],
      [
        { icon: "size", text: "<b>5+</b> інфографік · анімовані" },
        { icon: "format", text: "SVG + Lottie + Video" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Безлімітні правки · data-driven" },
      ],
    ],
    info: [
      { label: "Опис", text: "Перетворення складних даних у зрозумілу та привабливу візуалізацію.", type: "text" },
    ],
  },

  // ═══ b3: Брендинг ═══
  {
    id: "logo",
    name: "Логотип",
    emoji: "✨",
    subtitle: "Унікальний знак, що відображає суть бренду",
    blockId: "b3",
    photo: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
    tag: "🎨 Брендинг",
    tiers: [
      { name: "Lite", price: "199 €" },
      { name: "Standard", price: "399 €" },
      { name: "Pro", price: "799 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>3</b> концепти · базова палітра" },
        { icon: "format", text: "PNG + SVG" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "3 правки" },
      ],
      [
        { icon: "size", text: "<b>5</b> концептів · гайдлайн використання" },
        { icon: "format", text: "AI + SVG + PNG + PDF" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "5 правок · анімована версія" },
      ],
      [
        { icon: "size", text: "<b>8</b> концептів · повний брендбук" },
        { icon: "format", text: "Всі формати + Source files" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Безлімітні правки · trademark-check" },
      ],
    ],
    info: [
      { label: "Опис", text: "Створення логотипу з нуля: від брифу до фінального файлу. Включає дослідження конкурентів.", type: "text" },
    ],
  },
  {
    id: "brandbook",
    name: "Брендбук",
    emoji: "📕",
    subtitle: "Повний гід з використання бренду для команди та партнерів",
    blockId: "b3",
    photo: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80",
    tag: "🎨 Брендинг",
    tiers: [
      { name: "Lite", price: "349 €" },
      { name: "Standard", price: "699 €" },
      { name: "Pro", price: "1 499 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>8–12</b> сторінок · базові правила" },
        { icon: "format", text: "PDF" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>20–30</b> сторінок · повний гайдлайн" },
        { icon: "format", text: "PDF + Figma" },
        { icon: "clock", text: "<b>Термін: 4 дні</b>" },
        { icon: "check", text: "4 правки · шаблони документів" },
      ],
      [
        { icon: "size", text: "<b>40+</b> сторінок · корпоративний стандарт" },
        { icon: "format", text: "PDF + Figma + Notion" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "Безлімітні правки · digital guidelines" },
      ],
    ],
    info: [
      { label: "Опис", text: "Документ, що фіксує всі правила використання бренду.", type: "text" },
    ],
  },
  {
    id: "business-card",
    name: "Візитівка",
    emoji: "💳",
    subtitle: "Стильна візитна картка з унікальним дизайном",
    blockId: "b3",
    photo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80",
    tag: "🎨 Брендинг",
    tiers: [
      { name: "Lite", price: "49 €" },
      { name: "Standard", price: "99 €" },
      { name: "Pro", price: "179 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1</b> варіант · стандартний формат" },
        { icon: "format", text: "PDF Print-ready" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>2</b> варіанти · двостороння" },
        { icon: "format", text: "PDF + AI + Mockup" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "4 правки · NFC варіант" },
      ],
      [
        { icon: "size", text: "<b>3</b> варіанти · преміум фінішинг" },
        { icon: "format", text: "PDF + AI + 3D Mockup" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "Безлімітні правки · організація друку" },
      ],
    ],
    info: [
      { label: "Опис", text: "Професійна візитна картка, яка запам'ятовується.", type: "text" },
    ],
  },

  // ═══ b4: Контент ═══
  {
    id: "copywriting",
    name: "Копірайтинг",
    emoji: "✍️",
    subtitle: "Продаючі та інформаційні тексти для будь-яких каналів",
    blockId: "b4",
    photo: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
    tag: "📝 Контент",
    tiers: [
      { name: "Lite", price: "99 €" },
      { name: "Standard", price: "199 €" },
      { name: "Pro", price: "349 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1 000</b> слів · базова SEO" },
        { icon: "format", text: "Google Docs" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "1 правка" },
      ],
      [
        { icon: "size", text: "<b>3 000</b> слів · SEO + конверсія" },
        { icon: "format", text: "Google Docs + CMS" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "3 правки · keyword research" },
      ],
      [
        { icon: "size", text: "<b>5 000+</b> слів · контент-стратегія" },
        { icon: "format", text: "CMS + Notion + Content Calendar" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "Безлімітні правки · A/B тести" },
      ],
    ],
    info: [
      { label: "Опис", text: "Професійні тексти для сайтів, блогів, соцмереж та рекламних кампаній.", type: "text" },
    ],
  },
  {
    id: "content-plan",
    name: "Контент-план",
    emoji: "📅",
    subtitle: "Стратегічний план публікацій на місяць або квартал",
    blockId: "b4",
    photo: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80",
    tag: "📝 Контент",
    tiers: [
      { name: "Lite", price: "149 €" },
      { name: "Standard", price: "299 €" },
      { name: "Pro", price: "499 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1 місяць</b> · 12 постів" },
        { icon: "format", text: "Google Sheets" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "1 правка" },
      ],
      [
        { icon: "size", text: "<b>3 місяці</b> · 36 постів + Stories" },
        { icon: "format", text: "Notion + Sheets" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "3 правки · хештег-стратегія" },
      ],
      [
        { icon: "size", text: "<b>6 місяців</b> · повна стратегія" },
        { icon: "format", text: "Notion + CMS + Analytics" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Безлімітні правки · щомісячний аудит" },
      ],
    ],
    info: [
      { label: "Опис", text: "Структурований план контенту для послідовного росту аудиторії.", type: "text" },
    ],
  },
  {
    id: "case-study",
    name: "Кейс-стаді",
    emoji: "🏆",
    subtitle: "Детальний розбір успішного проекту для залучення клієнтів",
    blockId: "b4",
    photo: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=600&q=80",
    tag: "📝 Контент",
    tiers: [
      { name: "Lite", price: "179 €" },
      { name: "Standard", price: "349 €" },
      { name: "Pro", price: "599 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1</b> кейс · текст + графіки" },
        { icon: "format", text: "PDF / Google Docs" },
        { icon: "clock", text: "<b>Термін: 4 дні</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>1</b> кейс · відео-версія + інфографіка" },
        { icon: "format", text: "PDF + Web + Video" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "4 правки · landing для кейсу" },
      ],
      [
        { icon: "size", text: "<b>3</b> кейси · повний пакет" },
        { icon: "format", text: "PDF + Web + Video + Social" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Безлімітні правки" },
      ],
    ],
    info: [
      { label: "Опис", text: "Демонстрація результатів роботи через реальні проекти.", type: "text" },
    ],
  },

  // ═══ b5: Email ═══
  {
    id: "email-template",
    name: "Email шаблон",
    emoji: "📩",
    subtitle: "Адаптивний HTML-шаблон для розсилок",
    blockId: "b5",
    photo: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=600&q=80",
    tag: "📧 Email",
    tiers: [
      { name: "Lite", price: "79 €" },
      { name: "Standard", price: "149 €" },
      { name: "Pro", price: "249 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1</b> шаблон · базова структура" },
        { icon: "format", text: "HTML Email" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>3</b> шаблони · адаптивні + dark mode" },
        { icon: "format", text: "HTML + MJML" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "4 правки · A/B варіанти" },
      ],
      [
        { icon: "size", text: "<b>6</b> шаблонів · система компонентів" },
        { icon: "format", text: "MJML + Figma + Інтеграція" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "Безлімітні правки · ESP налаштування" },
      ],
    ],
    info: [
      { label: "Опис", text: "Кросплатформний email-шаблон, що коректно відображається у всіх поштових клієнтах.", type: "text" },
    ],
  },
  {
    id: "email-sequence",
    name: "Email-послідовність",
    emoji: "🔄",
    subtitle: "Автоматизована серія листів для воронки продажів",
    blockId: "b5",
    photo: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&q=80",
    tag: "📧 Email",
    hot: true,
    tiers: [
      { name: "Lite", price: "199 €" },
      { name: "Standard", price: "399 €" },
      { name: "Pro", price: "699 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>3</b> листи · welcome-серія" },
        { icon: "format", text: "Тексти + HTML" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>7</b> листів · повна воронка" },
        { icon: "format", text: "Тексти + HTML + Автоматизація" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "4 правки · сегментація" },
      ],
      [
        { icon: "size", text: "<b>12+</b> листів · мультиворонка" },
        { icon: "format", text: "Повний пакет + ESP налаштування" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Безлімітні правки · аналітика" },
      ],
    ],
    info: [
      { label: "Опис", text: "Стратегічна серія автоматичних листів для конвертації лідів у клієнтів.", type: "text" },
    ],
  },
  {
    id: "newsletter",
    name: "Newsletter",
    emoji: "📰",
    subtitle: "Регулярна інформаційна розсилка для утримання аудиторії",
    blockId: "b5",
    photo: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=600&q=80",
    tag: "📧 Email",
    tiers: [
      { name: "Lite", price: "69 €" },
      { name: "Standard", price: "139 €" },
      { name: "Pro", price: "249 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1</b> випуск · базовий шаблон" },
        { icon: "format", text: "HTML Email" },
        { icon: "clock", text: "<b>Термін: 1 день</b>" },
        { icon: "check", text: "1 правка" },
      ],
      [
        { icon: "size", text: "<b>4</b> випуски · контент + дизайн" },
        { icon: "format", text: "HTML + Copywriting" },
        { icon: "clock", text: "<b>Термін: 1 день/випуск</b>" },
        { icon: "check", text: "3 правки · subject line тести" },
      ],
      [
        { icon: "size", text: "<b>12</b> випусків · повне ведення" },
        { icon: "format", text: "HTML + Copy + Analytics" },
        { icon: "clock", text: "<b>Термін: 1 день/випуск</b>" },
        { icon: "check", text: "Безлімітні правки · growth-стратегія" },
      ],
    ],
    info: [
      { label: "Опис", text: "Регулярні email-розсилки для підтримки зв'язку з аудиторією та збільшення лояльності.", type: "text" },
    ],
  },

  // ═══ b6: Відео ═══
  {
    id: "promo-video",
    name: "Промо-ролик",
    emoji: "🎥",
    subtitle: "Короткий відеоролик для презентації продукту або послуги",
    blockId: "b6",
    photo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
    tag: "🎬 Відео",
    tiers: [
      { name: "Lite", price: "299 €" },
      { name: "Standard", price: "599 €" },
      { name: "Pro", price: "1 199 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>30 сек</b> · stock footage + motion" },
        { icon: "format", text: "MP4 1080p" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>60 сек</b> · кастомна анімація" },
        { icon: "format", text: "MP4 4K + Social cuts" },
        { icon: "clock", text: "<b>Термін: 4 дні</b>" },
        { icon: "check", text: "4 правки · субтитри" },
      ],
      [
        { icon: "size", text: "<b>до 3 хв</b> · повний продакшн" },
        { icon: "format", text: "MP4 4K + Social + GIF" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "Безлімітні правки · сценарій" },
      ],
    ],
    info: [
      { label: "Опис", text: "Професійний відеоролик з motion-графікою для соцмереж та сайту.", type: "text" },
    ],
  },
  {
    id: "explainer",
    name: "Explainer Video",
    emoji: "💡",
    subtitle: "Анімоване відео-пояснення складного продукту простою мовою",
    blockId: "b6",
    photo: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80",
    tag: "🎬 Відео",
    hot: true,
    tiers: [
      { name: "Lite", price: "399 €" },
      { name: "Standard", price: "799 €" },
      { name: "Pro", price: "1 499 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>60 сек</b> · 2D анімація" },
        { icon: "format", text: "MP4 1080p" },
        { icon: "clock", text: "<b>Термін: 7 днів</b>" },
        { icon: "check", text: "2 правки · сценарій" },
      ],
      [
        { icon: "size", text: "<b>90 сек</b> · кастомні персонажі" },
        { icon: "format", text: "MP4 4K + Lottie" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "4 правки · озвучка 2 мови" },
      ],
      [
        { icon: "size", text: "<b>до 3 хв</b> · 3D + інтерактив" },
        { icon: "format", text: "MP4 4K + Web embed" },
        { icon: "clock", text: "<b>Термін: 4 дні</b>" },
        { icon: "check", text: "Безлімітні правки · сторітелінг" },
      ],
    ],
    info: [
      { label: "Опис", text: "Анімоване відео, яке пояснює складну ідею простою та привабливою мовою.", type: "text" },
    ],
  },
  {
    id: "social-reels",
    name: "Social Reels",
    emoji: "📲",
    subtitle: "Короткі вертикальні відео для Instagram, TikTok, Shorts",
    blockId: "b6",
    photo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80",
    tag: "🎬 Відео",
    tiers: [
      { name: "Lite", price: "99 €" },
      { name: "Standard", price: "199 €" },
      { name: "Pro", price: "349 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>3</b> Reels · базовий монтаж" },
        { icon: "format", text: "MP4 9:16" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "1 правка" },
      ],
      [
        { icon: "size", text: "<b>6</b> Reels · ефекти + субтитри" },
        { icon: "format", text: "MP4 9:16 + 1:1" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "3 правки · тренд-аналіз" },
      ],
      [
        { icon: "size", text: "<b>12</b> Reels · повна стратегія" },
        { icon: "format", text: "MP4 всі формати" },
        { icon: "clock", text: "<b>Термін: 1 день/порція</b>" },
        { icon: "check", text: "Безлімітні правки · UGC стиль" },
      ],
    ],
    info: [
      { label: "Опис", text: "Вертикальні відео для максимального охоплення в соціальних мережах.", type: "text" },
    ],
  },

  // ═══ b7: Реклама ═══
  {
    id: "google-ads",
    name: "Google Ads кампанія",
    emoji: "🎯",
    subtitle: "Налаштування та запуск рекламних кампаній у Google",
    blockId: "b7",
    photo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
    tag: "📢 Реклама",
    tiers: [
      { name: "Lite", price: "249 €" },
      { name: "Standard", price: "499 €" },
      { name: "Pro", price: "899 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1</b> кампанія · Search Ads" },
        { icon: "format", text: "Google Ads Dashboard" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "Базове налаштування" },
      ],
      [
        { icon: "size", text: "<b>3</b> кампанії · Search + Display" },
        { icon: "format", text: "Google Ads + Analytics" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "A/B тести · ремаркетинг" },
      ],
      [
        { icon: "size", text: "<b>5+</b> кампаній · повний Performance" },
        { icon: "format", text: "Google Ads + GA4 + Looker" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Щомісячна оптимізація · звіти" },
      ],
    ],
    info: [
      { label: "Опис", text: "Повний цикл: від keyword research до запуску та оптимізації рекламних кампаній.", type: "text" },
    ],
  },
  {
    id: "meta-ads",
    name: "Meta Ads кампанія",
    emoji: "📣",
    subtitle: "Таргетована реклама в Facebook та Instagram",
    blockId: "b7",
    photo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=600&q=80",
    tag: "📢 Реклама",
    tiers: [
      { name: "Lite", price: "199 €" },
      { name: "Standard", price: "399 €" },
      { name: "Pro", price: "799 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1</b> кампанія · 3 креативи" },
        { icon: "format", text: "Meta Business Suite" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Базове налаштування" },
      ],
      [
        { icon: "size", text: "<b>3</b> кампанії · 10 креативів" },
        { icon: "format", text: "Meta + Pixel + Lookalike" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "A/B тести · ретаргетинг" },
      ],
      [
        { icon: "size", text: "<b>5+</b> кампаній · full-funnel" },
        { icon: "format", text: "Meta + API + Dashboard" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Щомісячна оптимізація · ROAS-фокус" },
      ],
    ],
    info: [
      { label: "Опис", text: "Таргетована реклама з точним аудиторним таргетингом.", type: "text" },
    ],
  },
  {
    id: "linkedin-ads",
    name: "LinkedIn Ads",
    emoji: "💼",
    subtitle: "B2B реклама для залучення корпоративних клієнтів",
    blockId: "b7",
    photo: "https://images.unsplash.com/photo-1616469829581-73886eb0ecab?auto=format&fit=crop&w=600&q=80",
    tag: "📢 Реклама",
    tiers: [
      { name: "Lite", price: "299 €" },
      { name: "Standard", price: "599 €" },
      { name: "Pro", price: "999 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1</b> кампанія · Sponsored Content" },
        { icon: "format", text: "LinkedIn Campaign Manager" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "Базовий таргетинг" },
      ],
      [
        { icon: "size", text: "<b>3</b> кампанії · InMail + Content" },
        { icon: "format", text: "LinkedIn + CRM інтеграція" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "ABM стратегія · lead nurturing" },
      ],
      [
        { icon: "size", text: "<b>5+</b> кампаній · full ABM" },
        { icon: "format", text: "LinkedIn + CRM + Outreach" },
        { icon: "clock", text: "<b>Термін: 2 дні</b>" },
        { icon: "check", text: "Щомісячна оптимізація · CPL-фокус" },
      ],
    ],
    info: [
      { label: "Опис", text: "Професійна B2B реклама з точним таргетингом по компаніях та посадах.", type: "text" },
    ],
  },

  // ═══ b8: Тренди 2024–2025 ═══
  {
    id: "ai-content",
    name: "AI-контент стратегія",
    emoji: "🤖",
    subtitle: "Інтеграція AI-інструментів у маркетингові процеси",
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    hot: true,
    tiers: [
      { name: "Lite", price: "199 €" },
      { name: "Standard", price: "449 €" },
      { name: "Pro", price: "899 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>Аудит</b> AI-інструментів для бізнесу" },
        { icon: "format", text: "PDF-звіт + рекомендації" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "1 консультація" },
      ],
      [
        { icon: "size", text: "<b>Стратегія</b> + впровадження 3 інструментів" },
        { icon: "format", text: "Notion + Промпти + Workflows" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "3 консультації · навчання команди" },
      ],
      [
        { icon: "size", text: "<b>Повна</b> AI-трансформація маркетингу" },
        { icon: "format", text: "Кастомні GPT + Автоматизація" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "Щомісячна підтримка · оптимізація" },
      ],
    ],
    info: [
      { label: "Опис", text: "Впровадження AI у маркетинг для масштабування контенту та автоматизації.", type: "text" },
    ],
  },
  {
    id: "ugc-campaign",
    name: "UGC кампанія",
    emoji: "🎤",
    subtitle: "User-Generated Content для автентичного маркетингу",
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    hot: true,
    tiers: [
      { name: "Lite", price: "249 €" },
      { name: "Standard", price: "499 €" },
      { name: "Pro", price: "999 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>3</b> UGC-ролики від криейторів" },
        { icon: "format", text: "MP4 9:16" },
        { icon: "clock", text: "<b>Термін: 7 днів</b>" },
        { icon: "check", text: "Бриф + модерація" },
      ],
      [
        { icon: "size", text: "<b>6</b> UGC-роликів + фото-контент" },
        { icon: "format", text: "MP4 + JPG + Stories" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "Кастинг криейторів · сценарії" },
      ],
      [
        { icon: "size", text: "<b>12</b> роликів + повна стратегія" },
        { icon: "format", text: "Всі формати + права" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "Щомісячний контент-план" },
      ],
    ],
    info: [
      { label: "Опис", text: "Автентичний контент від реальних користувачів для побудови довіри.", type: "text" },
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
    tiers: [
      { name: "Lite", price: "199 €" },
      { name: "Standard", price: "399 €" },
      { name: "Pro", price: "799 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>1</b> інтерактив · квіз або калькулятор" },
        { icon: "format", text: "Web embed" },
        { icon: "clock", text: "<b>Термін: 4 дні</b>" },
        { icon: "check", text: "2 правки" },
      ],
      [
        { icon: "size", text: "<b>3</b> інтерактиви · lead capture" },
        { icon: "format", text: "Web + Email інтеграція" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "4 правки · аналітика" },
      ],
      [
        { icon: "size", text: "<b>5+</b> інтерактивів · гейміфікація" },
        { icon: "format", text: "Web + App + API" },
        { icon: "clock", text: "<b>Термін: 3 дні</b>" },
        { icon: "check", text: "Безлімітні правки · A/B тести" },
      ],
    ],
    info: [
      { label: "Опис", text: "Інтерактивні елементи, що залучають аудиторію та генерують ліди.", type: "text" },
    ],
  },
  {
    id: "podcast-launch",
    name: "Подкаст запуск",
    emoji: "🎙",
    subtitle: "Повний запуск подкасту: від концепції до дистрибуції",
    blockId: "b8",
    photo: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    tag: "🔥 Тренд",
    tiers: [
      { name: "Lite", price: "349 €" },
      { name: "Standard", price: "699 €" },
      { name: "Pro", price: "1 299 €" },
    ],
    tierFeatures: [
      [
        { icon: "size", text: "<b>Концепція</b> + обкладинка + 1 епізод" },
        { icon: "format", text: "MP3 + Cover art" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "2 правки · RSS-фід" },
      ],
      [
        { icon: "size", text: "<b>Брендинг</b> + 4 епізоди + дистрибуція" },
        { icon: "format", text: "MP3 + Video + Clips" },
        { icon: "clock", text: "<b>Термін: 5 днів</b>" },
        { icon: "check", text: "Монтаж · show notes · Spotify/Apple" },
      ],
      [
        { icon: "size", text: "<b>Повний</b> продакшн на 3 місяці" },
        { icon: "format", text: "Audio + Video + Social + Newsletter" },
        { icon: "clock", text: "<b>Термін: ongoing</b>" },
        { icon: "check", text: "Щотижневий випуск · growth" },
      ],
    ],
    info: [
      { label: "Опис", text: "Від ідеї до регулярного подкасту з аудиторією.", type: "text" },
    ],
  },
];
