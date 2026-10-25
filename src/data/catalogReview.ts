import profiles from "./catalogReviewProfiles.json";
import type { ServiceCard, TierFeature } from "./services";

type Language = "en" | "de" | "uk";
type Localized = Record<Language, string>;
type Dictionary = Record<string, Localized>;

export const catalogReview = {
  period: "September–October 2026",
  checkedOn: "2026-10-25",
  newOfferIds: ["creative-testing", "avatar-localization", "ai-search-visibility", "voice-agent", "content-repurpose"],
} as const;

const copy = {
  approach: { en: "AI-assisted production is reviewed by a specialist. Scope, inputs, delivery dates and third-party usage costs are confirmed before work begins.", de: "KI-gestützte Produktion wird fachlich geprüft. Umfang, Materialien, Liefertermine und externe Nutzungskosten werden vor Beginn vereinbart.", uk: "AI-виробництво перевіряє фахівець. Обсяг, матеріали, строки та витрати сторонніх сервісів погоджуються до початку роботи." },
  quality: { en: "Factual, brand and rights review", de: "Fakten-, Marken- und Rechteprüfung", uk: "Перевірка фактів, бренду та прав" },
  acceptance: { en: "Approved inputs and acceptance checklist", de: "Freigegebene Materialien und Abnahmecheckliste", uk: "Погоджені матеріали та приймальний чекліст" },
  handover: { en: "Human-reviewed exports and practical handover", de: "Fachlich geprüfte Exporte und praktische Übergabe", uk: "Перевірений експорт і практична передача" },
  consent: { en: "Voice and likeness use requires documented permission; synthetic presenters are not genuine customer testimonials.", de: "Stimme und Abbild benötigen dokumentierte Zustimmung; synthetische Sprecher sind keine echten Kundenreferenzen.", uk: "Використання голосу та зовнішності потребує документованої згоди; синтетичні ведучі не є справжніми відгуками клієнтів." },
  measurement: { en: "Results depend on inputs, audience and execution; no revenue, ranking or realism guarantee.", de: "Ergebnisse hängen von Materialien, Zielgruppe und Umsetzung ab; keine Umsatz-, Ranking- oder Realismusgarantie.", uk: "Результати залежать від матеріалів, аудиторії та реалізації; без гарантій доходу, позицій чи абсолютного реалізму." },
};

const toolPurposes: Record<string, Localized> = {
  "Veo 3.1": { en: "Reference-led scenes and generated audio", de: "Referenzbasierte Szenen und generierter Ton", uk: "Сцени за референсами та генерація звуку" },
  "Kling VIDEO 3.0": { en: "Controlled multi-shot video and character references", de: "Kontrolliertes Multi-Shot-Video und Figurenreferenzen", uk: "Кероване багатокадрове відео та референси персонажів" },
  "Runway Gen-4.5": { en: "Image-to-video shots for human-edited productions", de: "Image-to-Video-Szenen für manuell montierte Produktionen", uk: "Image-to-video сцени для ручного монтажу" },
  "Seedance 2.5": { en: "Reference-controlled video; access checked per project", de: "Referenzgesteuertes Video; Zugang je Projekt geprüft", uk: "Відео за референсами; доступ перевіряється для проєкту" },
  "HeyGen": { en: "Authorized presenters and localized video", de: "Autorisierte Sprecher und lokalisierte Videos", uk: "Авторизовані ведучі та локалізоване відео" },
  "ElevenLabs": { en: "Authorized narration, voice workflows and dubbing", de: "Autorisierte Vertonung, Sprachabläufe und Synchronisation", uk: "Авторизована озвучка, голосові процеси та дубляж" },
  "Claude": { en: "Source-grounded writing, analysis and tool workflows", de: "Quellenbasiertes Schreiben, Analyse und Werkzeugabläufe", uk: "Тексти з джерелами, аналіз і робота з інструментами" },
  "ChatGPT": { en: "Brief analysis and reviewed content drafts", de: "Briefing-Analyse und geprüfte Content-Entwürfe", uk: "Аналіз брифу та перевірені чернетки контенту" },
  "OpenAI API": { en: "Tool-connected assistants with explicit action controls", de: "Werkzeugbasierte Assistenten mit klaren Aktionskontrollen", uk: "Помічники з інструментами та явним контролем дій" },
  "OpenAI Realtime API": { en: "Real-time voice conversations with controlled actions", de: "Echtzeit-Sprachdialoge mit kontrollierten Aktionen", uk: "Голосові діалоги в реальному часі з контролем дій" },
  "GPT Image": { en: "Reference-led image generation and editing", de: "Referenzbasierte Bilderzeugung und Bearbeitung", uk: "Генерація та редагування зображень за референсами" },
  "Gemini image generation": { en: "Product-scene concepts and image editing", de: "Produktszenen-Konzepte und Bildbearbeitung", uk: "Концепції товарних сцен і редагування зображень" },
  "Adobe Firefly": { en: "Visual concepts and controlled asset adaptations", de: "Bildkonzepte und kontrollierte Materialanpassungen", uk: "Візуальні концепції та контрольовані адаптації" },
  "Recraft": { en: "SVG vector drafts, refined and checked before handover", de: "SVG-Vektorentwürfe, vor Übergabe überarbeitet und geprüft", uk: "SVG-чернетки векторів, доопрацьовані й перевірені перед передачею" },
  "Lovable": { en: "Web interfaces and scoped connected app workflows", de: "Weboberflächen und abgegrenzte App-Abläufe", uk: "Вебінтерфейси та визначені сценарії застосунків" },
  "n8n": { en: "Integrations with configured logs, approval gates and handoffs", de: "Integrationen mit eingerichteten Protokollen, Freigaben und Übergaben", uk: "Інтеграції з налаштованими журналами, погодженнями та передачею" },
  "Telegram Stars": { en: "Platform-compliant digital-goods payments", de: "Plattformkonforme Zahlungen für digitale Güter", uk: "Оплата цифрових товарів за правилами платформи" },
  "Perplexity": { en: "Source discovery with independent fact checking", de: "Quellenrecherche mit unabhängiger Faktenprüfung", uk: "Пошук джерел із незалежним фактчекінгом" },
};

const toolRoles: Record<string, Localized> = {
  "Google Search Console": { en: "Indexing checks and search performance evidence", de: "Indexierungsprüfung und Suchleistungsdaten", uk: "Перевірка індексації та дані ефективності пошуку" },
  "Google Trends": { en: "Dated demand signals and regional comparisons", de: "Datierte Nachfragesignale und regionale Vergleiche", uk: "Датовані сигнали попиту та порівняння регіонів" },
  "Google Analytics": { en: "Consent-aware campaign and conversion measurement", de: "Einwilligungsbasierte Kampagnen- und Conversion-Messung", uk: "Вимірювання кампаній і конверсій за згодою" },
  "Semrush": { en: "Search topics and competitive content analysis", de: "Suchthemen und Wettbewerbs-Content-Analyse", uk: "Пошукові теми та аналіз контенту конкурентів" },
  "Similarweb": { en: "Estimated competitive audience and channel benchmarks", de: "Geschätzte Zielgruppen- und Kanalbenchmarks", uk: "Оціночні показники аудиторії та каналів конкурентів" },
  "Exploding Topics": { en: "Emerging-topic discovery for hypothesis testing", de: "Neue Themen für die Hypothesenprüfung entdecken", uk: "Пошук нових тем для перевірки гіпотез" },
  "Meta Ads Library": { en: "Public advertising examples and creative comparisons", de: "Öffentliche Werbebeispiele und Kreativvergleiche", uk: "Публічні рекламні приклади та порівняння креативів" },
  "Google Ads": { en: "Search campaign setup and conversion optimization", de: "Suchkampagnen und Conversion-Optimierung", uk: "Пошукові кампанії та оптимізація конверсій" },
  "Meta Ads": { en: "Audience exclusions and controlled creative tests", de: "Zielgruppenausschlüsse und kontrollierte Kreativtests", uk: "Виключення аудиторій і контрольовані тести креативів" },
  "Optmyzr": { en: "Budget monitoring and search campaign rules", de: "Budgetüberwachung und Suchkampagnenregeln", uk: "Моніторинг бюджету та правила пошукових кампаній" },
  "Looker Studio": { en: "Campaign reporting and metric dashboards", de: "Kampagnenberichte und Kennzahl-Dashboards", uk: "Звіти кампаній та дашборди метрик" },
  "Microsoft Clarity": { en: "Session insights and usability diagnostics", de: "Sitzungsanalyse und Nutzbarkeitsdiagnose", uk: "Аналіз сесій та діагностика зручності" },
  "PostHog": { en: "Product events, funnels and usage measurement", de: "Produktergebnisse, Funnels und Nutzungsmessung", uk: "Події продукту, воронки та вимірювання використання" },
  "Notion": { en: "Brand knowledge and team handover documentation", de: "Markenwissen und Übergabedokumentation", uk: "Знання бренду та документація для команди" },
  "Flourish": { en: "Data charts with validated scales and labels", de: "Datencharts mit geprüften Skalen und Labels", uk: "Діаграми з перевіреними шкалами й підписами" },
  "Buffer": { en: "Approved social publishing and editorial scheduling", de: "Freigegebene Social-Veröffentlichung und Redaktionsplanung", uk: "Погоджені соціальні публікації та розклад" },
  "Bannerbear": { en: "Template-based multi-format creative exports", de: "Vorlagenbasierte Kreativexporte in mehreren Formaten", uk: "Шаблонний експорт креативів у різних форматах" },
  "Billo": { en: "Real creator sourcing and product-video briefs", de: "Echte Creator und Produktvideo-Briefings", uk: "Пошук реальних креаторів і брифи товарних відео" },
  "CapCut": { en: "Social video editing and platform-specific exports", de: "Social-Video-Schnitt und Plattformexporte", uk: "Монтаж соціальних відео та платформний експорт" },
  "VideoAsk": { en: "Customer video responses with approved permissions", de: "Kunden-Videoantworten mit freigegebenen Rechten", uk: "Клієнтські відеовідповіді з погодженими правами" },
  "Tella": { en: "Actual product screen recordings and walkthroughs", de: "Echte Bildschirmaufnahmen und Produktführungen", uk: "Записи реального екрана та огляди продукту" },
  "Taplio": { en: "LinkedIn editorial planning and post scheduling", de: "LinkedIn-Redaktionsplanung und Beitragsplanung", uk: "Редакційне планування та розклад LinkedIn" },
  "Klaviyo": { en: "Consent-based audience segmentation and email journeys", de: "Einwilligungsbasierte Segmentierung und E-Mail-Strecken", uk: "Сегментація за згодою та email-сценарії" },
  "Customer.io": { en: "Event-triggered lifecycle messaging and exclusions", de: "Ereignisbasierte Lifecycle-Nachrichten und Ausschlüsse", uk: "Подієві повідомлення життєвого циклу та виключення" },
  "beehiiv": { en: "Newsletter templates and subscriber management", de: "Newsletter-Vorlagen und Abonnentenverwaltung", uk: "Шаблони розсилок і керування підписниками" },
  "Resend": { en: "Transactional email delivery and sending diagnostics", de: "Transaktions-E-Mails und Versanddiagnose", uk: "Транзакційна пошта та діагностика відправлення" },
  "Maizzle": { en: "Email markup and rendering-compatible templates", de: "E-Mail-Markup und kompatible Vorlagen", uk: "Email-розмітка та сумісні шаблони" },
  "Typeform": { en: "Accessible questionnaire and lead qualification flows", de: "Zugängliche Fragebögen und Lead-Qualifizierung", uk: "Доступні анкети та кваліфікація заявок" },
  "Outgrow": { en: "Interactive calculator and quiz logic", de: "Interaktive Rechner- und Quizlogik", uk: "Логіка інтерактивних калькуляторів і квізів" },
  "Userflow": { en: "In-product onboarding and task guidance", de: "Onboarding und Aufgabenhilfe im Produkt", uk: "Онбординг і підказки завдань у продукті" },
  "Taboola": { en: "Disclosed native-ad distribution and campaign setup", de: "Gekennzeichnete Native-Ads und Kampagnenaufbau", uk: "Позначена нативна реклама та налаштування кампаній" },
  "Stripe": { en: "Payment flows and checkout testing", de: "Zahlungsabläufe und Checkout-Tests", uk: "Платіжні сценарії та перевірка оформлення" },
  "Stripe Billing": { en: "Subscription billing and customer portal", de: "Abo-Abrechnung und Kundenportal", uk: "Підписний білінг та кабінет клієнта" },
  "grammY": { en: "Telegram bot interactions and validated updates", de: "Telegram-Bot-Interaktionen und geprüfte Updates", uk: "Взаємодія Telegram-бота та перевірені події" },
  "Cursor": { en: "Code refinement and acceptance-test implementation", de: "Code-Verfeinerung und Abnahmetests", uk: "Доопрацювання коду та приймальні тести" },
  "Claude Code": { en: "Implementation assistance and code review", de: "Implementierungshilfe und Code-Prüfung", uk: "Допомога розробці та перевірка коду" },
  "Replit": { en: "Comparable working prototypes and pilot deployment", de: "Vergleichbare Prototypen und Pilotbereitstellung", uk: "Порівнювані прототипи та розгортання пілота" },
  "Framer": { en: "Marketing-page layout and publication", de: "Marketingseiten-Layout und Veröffentlichung", uk: "Макети маркетингових сторінок і публікація" },
  "Make": { en: "Visual integrations with controlled handoffs", de: "Visuelle Integrationen mit kontrollierten Übergaben", uk: "Візуальні інтеграції з контрольованою передачею" },
  "Gamma": { en: "Slide drafting and presentation structure", de: "Folienentwürfe und Präsentationsstruktur", uk: "Чернетки слайдів і структура презентації" },
  "Figma": { en: "Editable layouts and reusable design components", de: "Editierbare Layouts und wiederverwendbare Gestaltungselemente", uk: "Редаговані макети та повторні дизайн-елементи" },
  "Figma Slides": { en: "Editable presentation layouts", de: "Editierbare Präsentationslayouts", uk: "Редаговані макети презентацій" },
  "Adobe InDesign": { en: "Publication layout and print-ready export", de: "Publikationslayout und druckfertiger Export", uk: "Верстка видань та друкарський експорт" },
  "Adobe Illustrator": { en: "Precise vectors and production artwork", de: "Präzise Vektoren und Produktionsgrafiken", uk: "Точні вектори та виробничі макети" },
  "Adobe Substance 3D": { en: "Product and packaging mockups", de: "Produkt- und Verpackungsmockups", uk: "Мокапи товарів та упаковки" },
  "Figma Make": { en: "AI layout drafts; delivered as editable Figma files", de: "KI-Layoutentwürfe; Übergabe als editierbare Figma-Dateien", uk: "AI-чернетки макетів; передаються як редаговані файли Figma" },
  "Google Stitch": { en: "AI interface drafts with Figma and HTML export", de: "KI-Interface-Entwürfe mit Figma- und HTML-Export", uk: "AI-чернетки інтерфейсів з експортом у Figma та HTML" },
  "Beautiful.ai": { en: "AI slide layouts that keep brand rules automatically", de: "KI-Folienlayouts mit automatischen Markenregeln", uk: "AI-макети слайдів з автоматичними правилами бренду" },
  "Canva Magic Studio": { en: "AI-assisted layout, resizing and PDF export; print specs confirmed with your printer", de: "KI-gestütztes Layout, Formatanpassung und PDF-Export; Druckvorgaben mit Ihrer Druckerei abgestimmt", uk: "AI-верстка, адаптація форматів і PDF-експорт; вимоги друку погоджуються з друкарнею" },
  "Ideogram": { en: "AI typography-accurate graphics and concepts", de: "KI-Grafiken mit präziser Typografie", uk: "AI-графіка з точною типографікою" },
  "Meshy": { en: "AI 3D previews for packaging and product mockups", de: "KI-3D-Vorschauen für Verpackungs- und Produktmockups", uk: "AI-3D-превʼю для мокапів упаковки й товарів" },
  "Captions": { en: "AI video editing, captions and social exports", de: "KI-Videoschnitt, Untertitel und Social-Exporte", uk: "AI-монтаж, субтитри та експорт для соцмереж" },
  "Descript": { en: "Transcript-based editing and captions", de: "Transkriptbasierter Schnitt und Untertitel", uk: "Монтаж за транскриптом і субтитри" },
  "Riverside": { en: "Interview and podcast recording", de: "Interview- und Podcastaufnahmen", uk: "Запис інтерв’ю та подкастів" },
  "OpusClip": { en: "Short-clip candidates for editorial review", de: "Kurzclip-Vorschläge zur redaktionellen Prüfung", uk: "Чернетки коротких кліпів для редактури" },
};

function purpose(name: string): Localized {
  return toolPurposes[name] ?? toolRoles[name] ?? {
    en: `${name}: production, integration and delivery checks`,
    de: `${name}: Produktion, Integration und Lieferprüfung`,
    uk: `${name}: виробництво, інтеграція та перевірка результату`,
  };
}

// Public copy uses verified product families, not speculative model versions or benchmark claims.
export function refreshLegacyText(text: string): string {
  return text
    .replace(/Claude Sonnet 4\.6|Claude Opus 4\.[\d]+/g, "Claude")
    .replace(/GPT-5\.[\d]+/g, "OpenAI GPT")
    .replace(/GPT Image 2|DALL[·-]E(?: 3)?/g, "GPT Image")
    .replace(/Nano Banana Pro/g, "Gemini image generation")
    .replace(/Midjourney v7/g, "Midjourney")
    .replace(/Seedance 2\.0/g, "Seedance")
    .replace(/\bKling(?: VIDEO)?(?: 2\.5| 3\.0)?\b/g, "Kling VIDEO 3.0")
    .replace(/Recraft V3/g, "Recraft")
    .replace(/Cursor 3\.0/g, "Cursor")
    .replace(/Gamma 2\.0/g, "Gamma")
    .replace(/HeyGen Avatar IV/g, "HeyGen")
    .replace(/ElevenLabs v3/g, "ElevenLabs")
    .replace(/Gemini 3\.1 Pro/g, "Gemini")
    .replace(/HTML \/ WordPress/g, "AI build · Lovable")
    .replace(/Webflow, WordPress/g, "Lovable, Framer")
    .replace(/Webflow (?:or|oder|або) Tilda/g, "Lovable / Framer")
    .replace(/Tilda \/ Framer \+ Zapier/g, "Lovable / Framer + n8n")
    .replace(/\b1M\b/g, "")
    .replace(/80\.9% SWE-bench,?\s*/g, "");
}

interface NewOffer {
  id: string;
  name: Localized;
  summary: Localized;
  outcome: Localized;
  scopes: Localized[];
  formats: string;
  tools: string[];
  days: number[];
}

export const newOffers: NewOffer[] = [
  {
    id: "creative-testing",
    name: { en: "Performance Creative Sprint", de: "Performance-Kreativ-Sprint", uk: "Спринт рекламних креативів" },
    summary: { en: "Test messaging angles with coordinated AI-assisted ads, hooks and product-accurate visuals", de: "Botschaftswinkel mit abgestimmten KI-Ads, Hooks und produktgetreuen Bildern testen", uk: "Тестування рекламних підходів з AI-креативами, хуками та точними зображеннями товару" },
    outcome: { en: "Find promising creative hypotheses through a structured test, not guaranteed ROAS", de: "Vielversprechende Kreativhypothesen strukturiert testen, ohne ROAS-Garantie", uk: "Перевірити перспективні креативні гіпотези структурованим тестом без гарантії ROAS" },
    scopes: [{ en: "3 ads · 1 angle", de: "3 Ads · 1 Ansatz", uk: "3 ролики · 1 підхід" }, { en: "6 ads · 2 angles", de: "6 Ads · 2 Ansätze", uk: "6 роликів · 2 підходи" }, { en: "12 ads · 3 angles", de: "12 Ads · 3 Ansätze", uk: "12 роликів · 3 підходи" }],
    formats: "MP4 · 9:16 · 15–30 s · SRT",
    tools: ["HeyGen", "Veo 3.1", "GPT Image", "Descript"], days: [5, 7, 10],
  },
  {
    id: "avatar-localization",
    name: { en: "Avatar & Video Localization", de: "Avatar- & Videolokalisierung", uk: "Аватар і локалізація відео" },
    summary: { en: "Turn an approved master into reviewed multilingual presenter videos with dubbing and captions", de: "Ein freigegebenes Mastervideo in geprüfte mehrsprachige Sprechervideos mit Ton und Untertiteln übertragen", uk: "Погоджений майстер у перевірені мультимовні відео з ведучим, дубляжем і субтитрами" },
    outcome: { en: "Reuse authorized expert content across languages while preserving approved meaning", de: "Autorisierte Experteninhalte mehrsprachig nutzen und die freigegebene Aussage bewahren", uk: "Повторно використовувати авторизований експертний контент різними мовами зі збереженням сенсу" },
    scopes: [{ en: "1 video · 1 target language", de: "1 Video · 1 Zielsprache", uk: "1 відео · 1 цільова мова" }, { en: "1 video · 3 target languages", de: "1 Video · 3 Zielsprachen", uk: "1 відео · 3 цільові мови" }, { en: "3 videos · 3 target languages", de: "3 Videos · 3 Zielsprachen", uk: "3 відео · 3 цільові мови" }],
    formats: "MP4 · WAV · SRT / VTT · ≤ 3 min / master",
    tools: ["HeyGen", "ElevenLabs", "Descript"], days: [5, 7, 10],
  },
  {
    id: "ai-search-visibility",
    name: { en: "AI Search Visibility · GEO", de: "KI-Suchsichtbarkeit · GEO", uk: "Видимість в AI-пошуку · GEO" },
    summary: { en: "Audit brand answers and improve citation-ready content for AI search discovery", de: "Markenantworten prüfen und zitierfähige Inhalte für KI-Suchen verbessern", uk: "Аудит відповідей про бренд та покращення контенту для цитування в AI-пошуку" },
    outcome: { en: "Measure sampled visibility and brand accuracy without promising rankings or citations", de: "Stichproben-Sichtbarkeit und Markenrichtigkeit messen, ohne Ranking- oder Zitatversprechen", uk: "Виміряти вибіркову видимість і точність бренду без обіцянок позицій або цитувань" },
    scopes: [{ en: "15 prompts · 1 market", de: "15 Prompts · 1 Markt", uk: "15 запитів · 1 ринок" }, { en: "30 prompts · 3 content updates", de: "30 Prompts · 3 Inhaltsupdates", uk: "30 запитів · 3 оновлення контенту" }, { en: "60 prompts · 6 updates · retest", de: "60 Prompts · 6 Updates · Nachtest", uk: "60 запитів · 6 оновлень · повторний тест" }],
    formats: "PDF · CSV · HTML / JSON-LD",
    tools: ["ChatGPT", "Perplexity", "Google Search Console"], days: [5, 10, 14],
  },
  {
    id: "voice-agent",
    name: { en: "Conversational Voice Agent", de: "Dialogorientierter Sprachagent", uk: "Розмовний голосовий агент" },
    summary: { en: "A voice assistant grounded in approved knowledge, with booking and human escalation", de: "Ein Sprachassistent auf freigegebener Wissensbasis mit Terminbuchung und menschlicher Übergabe", uk: "Голосовий помічник на погодженій базі знань з бронюванням і передачею людині" },
    outcome: { en: "Handle routine conversations safely and route sensitive requests to your team", de: "Routinedialoge sicher bearbeiten und sensible Anliegen an Ihr Team übergeben", uk: "Безпечно обробляти типові діалоги й передавати чутливі звернення команді" },
    scopes: [{ en: "1 web voice flow · FAQ", de: "1 Web-Sprachablauf · FAQ", uk: "1 вебголосовий сценарій · FAQ" }, { en: "2 flows · booking integration", de: "2 Abläufe · Terminbuchung", uk: "2 сценарії · бронювання" }, { en: "3 flows · CRM · evaluation set", de: "3 Abläufe · CRM · Testset", uk: "3 сценарії · CRM · набір тестів" }],
    formats: "Web · JSON · CSV",
    tools: ["OpenAI Realtime API", "ElevenLabs", "n8n"], days: [7, 10, 14],
  },
  {
    id: "content-repurpose",
    name: { en: "Source-to-Campaign Engine", de: "Quelle-zu-Kampagne-Paket", uk: "Контент-двигун із одного джерела" },
    summary: { en: "Turn an interview, webinar or report into reviewed clips, posts and campaign copy", de: "Interviews, Webinare oder Berichte in geprüfte Clips, Beiträge und Kampagnentexte verwandeln", uk: "Інтерв’ю, вебінар або звіт у перевірені кліпи, пости та тексти кампанії" },
    outcome: { en: "Get more approved assets from existing expertise with traceable source references", de: "Mehr freigegebene Materialien aus vorhandener Expertise mit nachvollziehbaren Quellen gewinnen", uk: "Отримати більше погоджених матеріалів із наявної експертизи з посиланнями на джерело" },
    scopes: [{ en: "1 source · 5 assets", de: "1 Quelle · 5 Materialien", uk: "1 джерело · 5 матеріалів" }, { en: "1 source · 10 assets", de: "1 Quelle · 10 Materialien", uk: "1 джерело · 10 матеріалів" }, { en: "2 sources · 20 assets", de: "2 Quellen · 20 Materialien", uk: "2 джерела · 20 матеріалів" }],
    formats: "MP4 · SRT · DOCX · PNG · ≤ 60 min / source",
    tools: ["Claude", "Descript", "OpusClip", "Figma Make"], days: [5, 7, 10],
  },
];

function localize(factory: (language: Language) => string): Localized {
  return { en: factory("en"), de: factory("de"), uk: factory("uk") };
}
function deadline(days: number): Localized {
  return { en: `<b>Delivery: ${days} business days</b>`, de: `<b>Lieferung: ${days} Werktage</b>`, uk: `<b>Виконання: ${days} робочих днів</b>` };
}

export function buildNewOffers(photos: Record<string, string>): ServiceCard[] {
  return newOffers.map((offer) => ({
    id: offer.id, name: offer.name.uk, subtitle: offer.summary.uk, goal: offer.outcome.uk,
    emoji: "", blockId: "b8", photo: photos[offer.id], tag: "September–October 2026", hot: true,
    tiers: ["Start", "Pro", "Max"].map((name) => ({ name, price: "—" })),
    tierFeatures: offer.scopes.map((scope, index): TierFeature[] => [
      { icon: "size", text: scope.uk }, { icon: "format", text: offer.formats },
      { icon: "clock", text: deadline(offer.days[index]).uk }, { icon: "check", text: copy.quality.uk },
    ]),
    info: [
      { kind: "description", label: "Опис", type: "text", text: `${offer.summary.uk}. ${copy.approach.uk}` },
      { kind: "content", label: "Зміст", type: "list", items: [offer.summary.uk, copy.acceptance.uk, copy.quality.uk, copy.handover.uk] },
      { kind: "goal", label: "Мета", type: "text", text: offer.outcome.uk },
      { kind: "formats", label: "Формати", type: "text", text: offer.formats },
    ],
    tools: offer.tools.map((name) => ({ name, purpose: purpose(name).uk, premium: true })),
  }));
}

export function reviewExistingServices(existing: ServiceCard[]): ServiceCard[] {
  return existing.map((service) => {
    const profile = profiles[service.id as keyof typeof profiles];
    if (!profile) throw new Error(`Missing catalog review: ${service.id}`);
    const summary = profile.summary.uk;
    return {
      ...service, hot: false, income: undefined, subtitle: summary, goal: summary,
      tools: profile.tools.map((name) => ({ name, purpose: purpose(name).uk, premium: true })),
      tierFeatures: service.tierFeatures.map((tier) => tier.map((feature) => ({ ...feature, text: refreshLegacyText(feature.text) }))),
      info: [
        { kind: "description", label: "Опис", type: "text", text: `${summary}. ${copy.approach.uk}` },
        { kind: "content", label: "Зміст", type: "list", items: [summary, copy.acceptance.uk, copy.quality.uk, copy.handover.uk] },
        { kind: "goal", label: "Мета", type: "text", text: summary },
        { kind: "formats", label: "Формати", type: "text", text: refreshLegacyText(service.info.find((s) => s.kind === "formats")?.text ?? service.tierFeatures[0]?.[1]?.text ?? "") },
      ],
    };
  });
}

export function applyCatalogTranslations(dictionary: Dictionary): void {
  // Remove legacy list tails so no old claims leak through variable-length lists.
  for (const key of Object.keys(dictionary)) {
    if (/^service\..*\.info\.content\.\d+$/.test(key) || /^tool\./.test(key)) delete dictionary[key];
    else if (key.startsWith("service.")) dictionary[key] = localize((language) => refreshLegacyText(dictionary[key][language]));
  }
  const add = (id: string, summary: Localized, goal: Localized, tools: string[], formats?: string) => {
    dictionary[`service.${id}.subtitle`] = summary;
    dictionary[`service.${id}.goal`] = goal;
    dictionary[`service.${id}.info.goal`] = goal;
    dictionary[`service.${id}.info.description`] = localize((l) => `${summary[l]}. ${copy.approach[l]} ${["ai-twin", "avatar-localization", "voice-agent", "creative-testing", "telegram-ai-agent"].includes(id) ? copy.consent[l] : copy.measurement[l]}`);
    const production = localize((l) => `${l === "en" ? "Production workflow" : l === "de" ? "Produktionsablauf" : "Виробничий процес"}: ${tools.join(" · ")}`);
    [summary, copy.acceptance, production, copy.handover].forEach((item, index) => { dictionary[`service.${id}.info.content.${index}`] = item; });
    dictionary[`service.${id}.info.formats`] = formats
      ? localize(() => formats)
      : dictionary[`service.${id}.info.formats`] ?? dictionary[`service.${id}.tier.0.1`] ?? localize(() => "PDF / CSV");
    tools.forEach((name, index) => { dictionary[`tool.${id}.${index}.purpose`] = purpose(name); });
  };
  for (const [id, profile] of Object.entries(profiles)) {
    add(id, profile.summary, profile.summary, profile.tools);
    // Old model-heavy feature rows use reviewed tool families instead.
    for (let tier = 0; tier < 3; tier++) {
      const key = `service.${id}.tier.${tier}.1`;
      if (dictionary[key] && /Sora|DALL|GPT|Claude|Midjourney|Antigravity|Grok|Manus|Tilda|Bubble|Runway|Lovable|Full.stack|AI \+|Custom AI/i.test(dictionary[key].en)) {
        dictionary[key] = localize(() => profile.tools.slice(0, 3).join(" · "));
      }
    }
  }
  for (const offer of newOffers) {
    dictionary[`service.${offer.id}.name`] = offer.name;
    add(offer.id, offer.summary, offer.outcome, offer.tools, offer.formats);
    offer.scopes.forEach((scope, tier) => {
      dictionary[`service.${offer.id}.tier.${tier}.0`] = scope;
      dictionary[`service.${offer.id}.tier.${tier}.1`] = localize(() => offer.formats);
      dictionary[`service.${offer.id}.tier.${tier}.2`] = deadline(offer.days[tier]);
      dictionary[`service.${offer.id}.tier.${tier}.3`] = copy.quality;
    });
  }
  dictionary["block.b8.title"] = { en: "AI & Growth · Autumn 2026", de: "KI & Wachstum · Herbst 2026", uk: "AI та зростання · Осінь 2026" };
  dictionary["block.b8.subtitle"] = { en: "Reviewed September–October 2026", de: "Überarbeitet September–Oktober 2026", uk: "Оновлено у вересні–жовтні 2026" };
  dictionary["hero.subtitle"] = { en: "Turnkey marketing, AI video and growth solutions", de: "Marketing, KI-Video und Wachstumslösungen aus einer Hand", uk: "Маркетинг, AI-відео та рішення для зростання під ключ" };
  // New scopes require a brief: no invented price is presented as a factual offer.
  dictionary["catalog.quote"] = { en: "Quote", de: "Anfrage", uk: "Запит" };
  dictionary["tools.premiumHint"] = { en: "Paid tool; usage costs confirmed in your quote", de: "Kostenpflichtiges Tool; Nutzungskosten im Angebot bestätigt", uk: "Платний інструмент; витрати погоджуються в розрахунку" };
}