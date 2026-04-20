import { uk } from "./uk";
import { en } from "./en";
import { de } from "./de";

export type Locale = "uk" | "en" | "de";

export const translations: Record<string, Record<Locale, string>> = {
  // Hero
  "hero.badge": { uk: "📋 Маркетинговий арсенал", en: "📋 Marketing Arsenal", de: "📋 Marketing-Arsenal" },
  "hero.title1": { uk: "Готові", en: "Ready-made", de: "Fertige" },
  "hero.title2": { uk: "Концепти", en: "Concepts", de: "Konzepte" },
  "hero.subtitle": {
    uk: "Маркетингові концепти під ключ за 1‑7 днів",
    en: "Marketing concepts delivered turnkey in 1‑7 days",
    de: "Marketingkonzepte schlüsselfertig in 1‑7 Tagen",
  },
  "hero.search": {
    uk: "Пошук концепту, формату, ключового слова...",
    en: "Search concept, format, keyword...",
    de: "Konzept, Format, Stichwort suchen...",
  },
  "hero.found": { uk: "Знайдено", en: "Found", de: "Gefunden" },
  "hero.nothing": { uk: "Нічого не знайдено", en: "Nothing found", de: "Nichts gefunden" },

  // Stats
  "stats.concepts": { uk: "послуг", en: "services", de: "Dienste" },
  "stats.blocks": { uk: "категорій", en: "categories", de: "Kategorien" },
  "stats.trending": { uk: "у тренді", en: "trending", de: "im Trend" },

  // Filter
  "filter.all": { uk: "Всі", en: "All", de: "Alle" },

  // Block
  "block.concepts": { uk: "концептів", en: "concepts", de: "Konzepte" },

  // Card
  "card.details": { uk: "Детальніше", en: "More details", de: "Mehr Details" },
  "card.inCart": { uk: "✓ В кошику", en: "✓ In cart", de: "✓ Im Warenkorb" },
  "card.add": { uk: "Додати", en: "Add", de: "Hinzufügen" },
  "card.goal": { uk: "🎯 Мета", en: "🎯 Goal", de: "🎯 Ziel" },
  "tools.title": { uk: "Інструменти та сервіси 2026", en: "Tools & services 2026", de: "Tools & Services 2026" },
  "tools.subtitle": { uk: "Найсучасніший AI-стек для виконання цього замовлення", en: "Cutting-edge AI stack we use for this offer", de: "Modernster AI-Stack für diesen Auftrag" },
  "tools.premium": { uk: "Premium", en: "Premium", de: "Premium" },
  "tools.premiumHint": { uk: "Платний сервіс — оплата інструментів вже включена у вартість послуги", en: "Paid service — tooling cost already included in the offer price", de: "Kostenpflichtig — Toolkosten bereits im Preis enthalten" },

  // Cart
  "cart.step": { uk: "Крок", en: "Step", de: "Schritt" },
  "cart.estCost": { uk: "Орієнтовна вартість замовлення", en: "Estimated order cost", de: "Geschätzte Bestellkosten" },
  "cart.priceNote": { uk: "ℹ Базова версія · фінальна ціна уточнюється після консультації", en: "ℹ Base version · final price confirmed after consultation", de: "ℹ Basisversion · Endpreis nach Beratung" },
  "cart.priceTbd": { uk: "Ціна уточнюється", en: "Price on request", de: "Preis auf Anfrage" },
  "cart.empty": { uk: "Кошик порожній.", en: "Cart is empty.", de: "Warenkorb ist leer." },
  "cart.emptyHint": { uk: "Оберіть послуги та натисніть", en: "Select services and click", de: "Wählen Sie Dienste und klicken Sie" },
  "cart.addBtn": { uk: "Додати", en: "Add", de: "Hinzufügen" },
  "cart.selected": { uk: "Обрані послуги", en: "Selected services", de: "Ausgewählte Dienste" },
  "cart.clearAll": { uk: "Очистити все", en: "Clear all", de: "Alles löschen" },
  "cart.proceed": { uk: "Перейти до оформлення", en: "Proceed to checkout", de: "Zur Kasse" },
  "cart.noObligation": { uk: "Запит на розрахунок — без зобов'язань", en: "Quote request — no obligation", de: "Angebotsanfrage — unverbindlich" },
  "cart.edit": { uk: "✏ Змінити", en: "✏ Edit", de: "✏ Bearbeiten" },
  "cart.contact": { uk: "Контактні дані", en: "Contact details", de: "Kontaktdaten" },
  "cart.contactSub": { uk: "Відповідаємо у Slack або Telegram — без телефонних дзвінків", en: "We reply via Slack or Telegram — no phone calls", de: "Wir antworten per Slack oder Telegram — keine Anrufe" },
  "cart.name": { uk: "Ім'я", en: "Name", de: "Name" },
  "cart.slackTg": { uk: "Slack або Telegram", en: "Slack or Telegram", de: "Slack oder Telegram" },
  "cart.email": { uk: "E-Mail", en: "E-Mail", de: "E-Mail" },
  "cart.comment": { uk: "Коментар", en: "Comment", de: "Kommentar" },
  "cart.optional": { uk: "необов'язково", en: "optional", de: "optional" },
  "cart.dsgvo": {
    uk: "Я погоджуюся з обробкою моїх даних згідно з політикою конфіденційності.",
    en: "I agree to the processing of my data according to the privacy policy.",
    de: "Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzrichtlinie zu.",
  },
  "cart.submit": { uk: "Надіслати запит →", en: "Send request →", de: "Anfrage senden →" },
  "cart.sent": { uk: "Запит надіслано!", en: "Request sent!", de: "Anfrage gesendet!" },
  "cart.sentMsg": {
    uk: "Ми зв'яжемося у Slack або Telegram протягом 24 годин. Дякуємо!",
    en: "We'll contact you via Slack or Telegram within 24 hours. Thank you!",
    de: "Wir melden uns innerhalb von 24 Stunden per Slack oder Telegram. Danke!",
  },

  // Confirm
  "confirm.title": { uk: "Очистити кошик?", en: "Clear cart?", de: "Warenkorb leeren?" },
  "confirm.msg": { uk: "Ви впевнені, що хочете повністю видалити свій вибір?", en: "Are you sure you want to remove all items?", de: "Möchten Sie wirklich alle Artikel entfernen?" },
  "confirm.no": { uk: "Ні, залишити", en: "No, keep", de: "Nein, behalten" },
  "confirm.yes": { uk: "Так, видалити", en: "Yes, remove", de: "Ja, entfernen" },

  // Alerts
  "alert.name": { uk: "Введіть ім'я", en: "Enter your name", de: "Geben Sie Ihren Namen ein" },
  "alert.contact": { uk: "Вкажіть Slack/Telegram або Email", en: "Enter Slack/Telegram or Email", de: "Geben Sie Slack/Telegram oder E-Mail ein" },
  "alert.dsgvo": { uk: "Погодьтесь з умовами", en: "Accept the terms", de: "Bitte stimmen Sie den Bedingungen zu" },
  "alert.empty": { uk: "Кошик порожній", en: "Cart is empty", de: "Warenkorb ist leer" },

  // Social proof
  "social.from": { uk: "з", en: "from", de: "aus" },
  "social.ordered": { uk: "замовив(-ла)", en: "ordered", de: "hat bestellt" },
  "social.minAgo": { uk: "хв тому", en: "min ago", de: "Min. her" },
  "social.hrAgo": { uk: "год тому", en: "hr ago", de: "Std. her" },

  // Footer
  "footer.copy": { uk: "PROMOVISIONS.COM MARKETING", en: "PROMOVISIONS.COM MARKETING", de: "PROMOVISIONS.COM MARKETING" },

  // Tags
  "tag.print": { uk: "🖨 Друкована", en: "🖨 Print", de: "🖨 Druck" },
  "tag.digital": { uk: "💻 Цифрова", en: "💻 Digital", de: "💻 Digital" },
  "tag.branding": { uk: "🎨 Брендинг", en: "🎨 Branding", de: "🎨 Branding" },
  "tag.content": { uk: "📝 Контент", en: "📝 Content", de: "📝 Inhalt" },
  "tag.email": { uk: "📧 Email", en: "📧 Email", de: "📧 E-Mail" },
  "tag.video": { uk: "🎬 Відео", en: "🎬 Video", de: "🎬 Video" },
  "tag.ads": { uk: "📢 Реклама", en: "📢 Advertising", de: "📢 Werbung" },
  "tag.trend": { uk: "🔥 Тренд", en: "🔥 Trend", de: "🔥 Trend" },

  // Service translations (name, subtitle, goal for all 34 services)
  "service.presentation.name": { uk: "Презентація", en: "Presentation", de: "Präsentation" },
  "service.presentation.subtitle": { uk: "Переконлива слайд-колода для переговорів і пітчів", en: "Compelling slide deck for negotiations and pitches", de: "Überzeugende Folienpräsentation für Verhandlungen und Pitches" },
  "service.presentation.goal": { uk: "Перетворити увагу аудиторії на конкретне рішення: угоду, інвестицію або наступну зустріч", en: "Convert audience attention into a concrete decision: a deal, investment, or next meeting", de: "Aufmerksamkeit des Publikums in eine konkrete Entscheidung umwandeln" },

  "service.brochure.name": { uk: "Брошура", en: "Brochure", de: "Broschüre" },
  "service.brochure.subtitle": { uk: "Друкований або PDF-документ для детального знайомства з послугами", en: "Printed or PDF document for detailed service overview", de: "Gedrucktes oder PDF-Dokument für detaillierte Dienstleistungsübersicht" },
  "service.brochure.goal": { uk: "Дати потенційному клієнту повне уявлення про пропозицію та мотивувати до звернення", en: "Give potential clients a complete picture of your offering", de: "Potenziellen Kunden ein vollständiges Bild Ihres Angebots vermitteln" },

  "service.catalog.name": { uk: "Каталог", en: "Catalog", de: "Katalog" },
  "service.catalog.subtitle": { uk: "Систематизований перелік товарів та послуг з цінами й візуалами", en: "Organized listing of products and services with prices and visuals", de: "Organisiertes Verzeichnis von Produkten und Dienstleistungen" },
  "service.catalog.goal": { uk: "Спростити вибір для клієнта та прискорити процес замовлення", en: "Simplify client choice and accelerate the ordering process", de: "Kundenauswahl vereinfachen und Bestellprozess beschleunigen" },

  "service.flyer.name": { uk: "Рекламна листівка", en: "Promotional Flyer", de: "Werbeflyer" },
  "service.flyer.subtitle": { uk: "Яскравий односторінковий документ із чітким закликом до дії", en: "Bright one-page document with a clear call to action", de: "Auffälliges einseitiges Dokument mit klarem Handlungsaufruf" },
  "service.flyer.goal": { uk: "Миттєво привернути увагу та спонукати до негайної дії", en: "Instantly grab attention and drive immediate action", de: "Sofort Aufmerksamkeit erregen und zu sofortiger Aktion anregen" },

  "service.landing-page.name": { uk: "Landing Page", en: "Landing Page", de: "Landing Page" },
  "service.landing-page.subtitle": { uk: "Конверсійна цільова сторінка для залучення лідів", en: "High-conversion landing page for lead generation", de: "Hochkonvertierende Landingpage zur Lead-Generierung" },
  "service.landing-page.goal": { uk: "Максимізувати конверсію відвідувачів у ліди", en: "Maximize visitor-to-lead conversion through a clear funnel", de: "Besucher-zu-Lead-Konversion durch klaren Funnel maximieren" },

  "service.video-ad.name": { uk: "Відео-реклама", en: "Video Advertising", de: "Videowerbung" },
  "service.video-ad.subtitle": { uk: "Короткий динамічний ролик для онлайн- та офлайн-каналів", en: "Short dynamic video for online and offline channels", de: "Kurzes dynamisches Video für Online- und Offline-Kanäle" },
  "service.video-ad.goal": { uk: "Захопити увагу за перші 3 секунди та донести ключове повідомлення бренду", en: "Capture attention in the first 3 seconds and deliver the key brand message", de: "In den ersten 3 Sekunden Aufmerksamkeit erregen" },

  "service.smm.name": { uk: "SMM — Соцмережі", en: "SMM — Social Media", de: "SMM — Soziale Medien" },
  "service.smm.subtitle": { uk: "Стратегія та контент для Instagram, Facebook, LinkedIn", en: "Strategy and content for Instagram, Facebook, LinkedIn", de: "Strategie und Inhalte für Instagram, Facebook, LinkedIn" },
  "service.smm.goal": { uk: "Побудувати лояльну аудиторію та генерувати ліди через системний контент", en: "Build a loyal audience and generate leads through systematic content", de: "Treues Publikum aufbauen und Leads durch systematischen Content generieren" },

  "service.banners.name": { uk: "Рекламні банери", en: "Ad Banners", de: "Werbebanner" },
  "service.banners.subtitle": { uk: "Графічні оголошення для дисплейної реклами та сайтів", en: "Display ads for advertising campaigns and websites", de: "Display-Anzeigen für Werbekampagnen und Websites" },
  "service.banners.goal": { uk: "Забезпечити високий CTR рекламних кампаній", en: "Ensure high CTR for ad campaigns through professional creatives", de: "Hohe CTR für Werbekampagnen sicherstellen" },

  "service.logo.name": { uk: "Логотип", en: "Logo", de: "Logo" },
  "service.logo.subtitle": { uk: "Унікальний графічний знак та шрифтовий знак бренду", en: "Unique graphic mark and brand wordmark", de: "Einzigartiges Grafikzeichen und Markenwortzeichen" },
  "service.logo.goal": { uk: "Створити впізнаваний візуальний символ бренду", en: "Create a recognizable visual symbol reflecting the brand essence", de: "Ein erkennbares visuelles Symbol der Marke schaffen" },

  "service.business-card.name": { uk: "Візитка", en: "Business Card", de: "Visitenkarte" },
  "service.business-card.subtitle": { uk: "Компактний та стильний носій ділової ідентичності", en: "Compact and stylish carrier of business identity", de: "Kompakter und stilvoller Träger der Geschäftsidentität" },
  "service.business-card.goal": { uk: "Залишити професійне враження при першій зустрічі", en: "Leave a professional impression at the first meeting", de: "Einen professionellen Eindruck beim ersten Treffen hinterlassen" },

  "service.packaging.name": { uk: "Упаковка", en: "Packaging", de: "Verpackung" },
  "service.packaging.subtitle": { uk: "Фірмова упаковка, що продає на полиці", en: "Branded packaging that sells on the shelf", de: "Markenverpackung, die im Regal verkauft" },
  "service.packaging.goal": { uk: "Виділити продукт серед конкурентів на полиці", en: "Stand out from competitors on the shelf", de: "Sich im Regal von der Konkurrenz abheben" },

  "service.brandbook.name": { uk: "Брендбук", en: "Brand Book", de: "Markenbuch" },
  "service.brandbook.subtitle": { uk: "Офіційний стайл-гайд для єдності всіх комунікацій", en: "Official style guide for unified communications", de: "Offizieller Styleguide für einheitliche Kommunikation" },
  "service.brandbook.goal": { uk: "Забезпечити візуальну єдність бренду на всіх точках контакту", en: "Ensure visual brand consistency across all touchpoints", de: "Visuelle Markenkonsistenz an allen Kontaktpunkten sicherstellen" },

  "service.blog-post.name": { uk: "Стаття / Блог-пост", en: "Article / Blog Post", de: "Artikel / Blogbeitrag" },
  "service.blog-post.subtitle": { uk: "SEO-оптимізований текст для органічного трафіку", en: "SEO-optimized text for organic traffic", de: "SEO-optimierter Text für organischen Traffic" },
  "service.blog-post.goal": { uk: "Залучити органічний трафік та побудувати авторитет бренду", en: "Drive organic traffic and build brand authority through expert content", de: "Organischen Traffic generieren und Markenautorität aufbauen" },

  "service.infographic.name": { uk: "Інфографіка", en: "Infographic", de: "Infografik" },
  "service.infographic.subtitle": { uk: "Візуальний матеріал для пояснення складних даних", en: "Visual material for explaining complex data", de: "Visuelles Material zur Erklärung komplexer Daten" },
  "service.infographic.goal": { uk: "Перетворити складні дані у зрозумілу візуалізацію", en: "Transform complex data into clear, shareable visualizations", de: "Komplexe Daten in klare Visualisierungen umwandeln" },

  "service.white-paper.name": { uk: "White Paper", en: "White Paper", de: "White Paper" },
  "service.white-paper.subtitle": { uk: "Авторитетний аналітичний документ для генерації B2B-лідів", en: "Authoritative analytical document for B2B lead generation", de: "Autoritatives Analysedokument zur B2B-Lead-Generierung" },
  "service.white-paper.goal": { uk: "Позиціонувати компанію як лідера думки та генерувати B2B-ліди", en: "Position the company as a thought leader and generate B2B leads", de: "Unternehmen als Vordenker positionieren und B2B-Leads generieren" },

  "service.case-study.name": { uk: "Кейс-стаді", en: "Case Study", de: "Fallstudie" },
  "service.case-study.subtitle": { uk: "Детальна документація успішного проєкту як соціальний доказ", en: "Detailed documentation of a successful project as social proof", de: "Detaillierte Dokumentation eines erfolgreichen Projekts" },
  "service.case-study.goal": { uk: "Показати реальні результати роботи та переконати клієнтів через факти", en: "Show real results and convince clients through facts", de: "Reale Ergebnisse zeigen und Kunden durch Fakten überzeugen" },

  "service.ebook.name": { uk: "E-book / Лід-магніт", en: "E-book / Lead Magnet", de: "E-Book / Lead-Magnet" },
  "service.ebook.subtitle": { uk: "Електронна книга — найкращий обмін на email-адресу", en: "E-book — the best trade for an email address", de: "E-Book — der beste Tausch für eine E-Mail-Adresse" },
  "service.ebook.goal": { uk: "Обміняти цінний контент на email-адресу та запустити nurture-воронку", en: "Exchange valuable content for an email and launch a nurture funnel", de: "Wertvolle Inhalte gegen E-Mail tauschen und Nurture-Funnel starten" },

  "service.email-campaign.name": { uk: "Email-розсилка", en: "Email Campaign", de: "E-Mail-Kampagne" },
  "service.email-campaign.subtitle": { uk: "Персоналізовані листи з конверсією вище середньої", en: "Personalized emails with above-market conversion rates", de: "Personalisierte E-Mails mit überdurchschnittlichen Konversionsraten" },
  "service.email-campaign.goal": { uk: "Доставити персоналізоване повідомлення та конвертувати підписників", en: "Deliver personalized messages and convert subscribers into clients", de: "Personalisierte Nachrichten liefern und Abonnenten konvertieren" },

  "service.drip-campaign.name": { uk: "Drip-кампанія", en: "Drip Campaign", de: "Drip-Kampagne" },
  "service.drip-campaign.subtitle": { uk: "Автоматизована серія листів, що веде до покупки", en: "Automated email series guiding subscribers to purchase", de: "Automatisierte E-Mail-Serie, die zum Kauf führt" },
  "service.drip-campaign.goal": { uk: "Автоматично провести ліда через воронку від знайомства до покупки", en: "Automatically guide a lead from awareness to purchase", de: "Einen Lead automatisch von der Bekanntheit bis zum Kauf führen" },

  "service.newsletter.name": { uk: "Newsletter", en: "Newsletter", de: "Newsletter" },
  "service.newsletter.subtitle": { uk: "Регулярна розсилка для утримання та монетизації аудиторії", en: "Regular newsletter for audience retention and monetization", de: "Regelmäßiger Newsletter zur Publikumsbindung und Monetarisierung" },
  "service.newsletter.goal": { uk: "Утримувати увагу аудиторії та будувати лояльність", en: "Retain audience attention and build loyalty through valuable content", de: "Aufmerksamkeit des Publikums halten und Loyalität aufbauen" },

  "service.webinar.name": { uk: "Вебінар / Онлайн-курс", en: "Webinar / Online Course", de: "Webinar / Online-Kurs" },
  "service.webinar.subtitle": { uk: "Живий або записаний освітній формат для залучення й монетизації", en: "Live or recorded educational format for engagement", de: "Live- oder aufgezeichnetes Bildungsformat für Engagement" },
  "service.webinar.goal": { uk: "Побудувати експертність та конвертувати аудиторію через навчання", en: "Build expertise and convert audience through educational content", de: "Expertise aufbauen und Publikum durch Bildungsinhalte konvertieren" },

  "service.product-tour.name": { uk: "Відео-тур / Продукт-огляд", en: "Video Tour / Product Demo", de: "Video-Tour / Produktdemo" },
  "service.product-tour.subtitle": { uk: "Демонстрація продукту, офісу або команди для підвищення довіри", en: "Product, office, or team demo to boost trust", de: "Produkt-, Büro- oder Teamdemo zur Vertrauensbildung" },
  "service.product-tour.goal": { uk: "Показати продукт у дії та зняти бар'єри до покупки", en: "Show the product in action and remove purchase barriers", de: "Produkt in Aktion zeigen und Kaufbarrieren abbauen" },

  "service.testimonials.name": { uk: "Відгуки / Testimonials", en: "Testimonials", de: "Kundenstimmen" },
  "service.testimonials.subtitle": { uk: "Відеовідгуки задоволених клієнтів як соціальний доказ", en: "Video testimonials from satisfied clients as social proof", de: "Video-Testimonials zufriedener Kunden als sozialer Beweis" },
  "service.testimonials.goal": { uk: "Побудувати довіру через реальні історії клієнтів", en: "Build trust through real stories from satisfied clients", de: "Vertrauen durch echte Geschichten zufriedener Kunden aufbauen" },

  "service.ppc-google.name": { uk: "PPC / Google Ads", en: "PPC / Google Ads", de: "PPC / Google Ads" },
  "service.ppc-google.subtitle": { uk: "Контекстна реклама з оплатою за клік у Google та Bing", en: "Pay-per-click advertising on Google and Bing", de: "Pay-per-Click-Werbung bei Google und Bing" },
  "service.ppc-google.goal": { uk: "Залучити цільовий трафік із максимальним ROI", en: "Drive targeted traffic with maximum ROI", de: "Gezielten Traffic mit maximalem ROI generieren" },

  "service.retargeting.name": { uk: "Ретаргетинг", en: "Retargeting", de: "Retargeting" },
  "service.retargeting.subtitle": { uk: "Повернення відвідувачів сайту без конверсії", en: "Bringing back visitors who left without converting", de: "Rückgewinnung von Besuchern ohne Konversion" },
  "service.retargeting.goal": { uk: "Повернути «загублених» відвідувачів та довести до конверсії", en: "Bring back lost visitors and drive them to conversion", de: "Verlorene Besucher zurückgewinnen und zur Konversion führen" },

  "service.native-ads.name": { uk: "Нативна реклама", en: "Native Advertising", de: "Native Advertising" },
  "service.native-ads.subtitle": { uk: "Рекламний контент, що виглядає як редакційний матеріал", en: "Ad content that looks like editorial material", de: "Werbeinhalte, die wie redaktionelles Material aussehen" },
  "service.native-ads.goal": { uk: "Донести рекламне повідомлення без опору аудиторії", en: "Deliver ad message without audience resistance", de: "Werbebotschaft ohne Publikumswiderstand vermitteln" },

  "service.landing-ad.name": { uk: "Landing Page (рекламний)", en: "Landing Page (Ad)", de: "Landing Page (Werbung)" },
  "service.landing-ad.subtitle": { uk: "Конверсійна цільова сторінка з вимірюваним ROI", en: "Conversion-focused landing page with measurable ROI", de: "Konversionsorientierte Landingpage mit messbarem ROI" },
  "service.landing-ad.goal": { uk: "Створити швидку конверсійну сторінку з чітким вимірюванням ефективності", en: "Create a fast conversion page with clear effectiveness measurement", de: "Schnelle Konversionsseite mit klarer Effektivitätsmessung erstellen" },

  "service.ugc.name": { uk: "UGC-контент", en: "UGC Content", de: "UGC-Inhalte" },
  "service.ugc.subtitle": { uk: "User-Generated Content для автентичного маркетингу", en: "User-Generated Content for authentic marketing", de: "User-Generated Content für authentisches Marketing" },
  "service.ugc.goal": { uk: "Побудувати автентичну довіру через контент від реальних користувачів", en: "Build authentic trust through content from real users", de: "Authentisches Vertrauen durch Inhalte von echten Nutzern aufbauen" },

  "service.ai-content.name": { uk: "AI-контент зі стилем", en: "AI-Powered Content", de: "KI-gestützter Content" },
  "service.ai-content.subtitle": { uk: "Інтеграція AI-інструментів у маркетингові процеси", en: "Integration of AI tools into marketing processes", de: "Integration von KI-Tools in Marketingprozesse" },
  "service.ai-content.goal": { uk: "Масштабувати виробництво контенту через AI без втрати якості", en: "Scale content production through AI without losing quality", de: "Content-Produktion durch KI skalieren ohne Qualitätsverlust" },

  "service.saas-onboarding.name": { uk: "Онбординг для SaaS", en: "SaaS Onboarding", de: "SaaS-Onboarding" },
  "service.saas-onboarding.subtitle": { uk: "Welcome-серія та навчальні матеріали для нових користувачів", en: "Welcome series and training materials for new users", de: "Willkommensserie und Schulungsmaterialien für neue Nutzer" },
  "service.saas-onboarding.goal": { uk: "Знизити churn та прискорити Time-to-Value для нових користувачів", en: "Reduce churn and accelerate Time-to-Value for new users", de: "Churn reduzieren und Time-to-Value für neue Nutzer beschleunigen" },

  "service.linkedin-brand.name": { uk: "LinkedIn Personal Brand", en: "LinkedIn Personal Brand", de: "LinkedIn Personal Brand" },
  "service.linkedin-brand.subtitle": { uk: "Побудова особистого бренду на LinkedIn для B2B", en: "Building a personal brand on LinkedIn for B2B", de: "Aufbau einer persönlichen Marke auf LinkedIn für B2B" },
  "service.linkedin-brand.goal": { uk: "Перетворити LinkedIn-профіль у магніт для B2B-клієнтів", en: "Turn your LinkedIn profile into a magnet for B2B clients", de: "LinkedIn-Profil in einen Magneten für B2B-Kunden verwandeln" },

  "service.micro-saas.name": { uk: "Micro SaaS", en: "Micro SaaS", de: "Micro SaaS" },
  "service.micro-saas.subtitle": { uk: "Мінімальний SaaS-продукт для швидкої монетизації", en: "Minimal SaaS product for fast monetization", de: "Minimales SaaS-Produkt zur schnellen Monetarisierung" },
  "service.micro-saas.goal": { uk: "Швидко запустити та монетизувати SaaS-продукт", en: "Quickly launch and monetize a minimal SaaS product", de: "Ein minimales SaaS-Produkt schnell starten und monetarisieren" },

  "service.interactive-content.name": { uk: "Інтерактивний контент", en: "Interactive Content", de: "Interaktiver Content" },
  "service.interactive-content.subtitle": { uk: "Квізи, калькулятори та інтерактивні елементи для залучення", en: "Quizzes, calculators, and interactive elements for engagement", de: "Quizze, Rechner und interaktive Elemente für Engagement" },
  "service.interactive-content.goal": { uk: "Залучити та кваліфікувати ліди через інтерактивний досвід із конверсією 40%+", en: "Engage and qualify leads through interactive experience with 40%+ conversion", de: "Leads durch interaktives Erlebnis mit 40%+ Konversion qualifizieren" },

  "service.podcast.name": { uk: "Подкаст-продакшн", en: "Podcast Production", de: "Podcast-Produktion" },
  "service.podcast.subtitle": { uk: "Повний запуск подкасту: від концепції до дистрибуції", en: "Full podcast launch: from concept to distribution", de: "Vollständiger Podcast-Launch: vom Konzept bis zur Distribution" },
  "service.podcast.goal": { uk: "Побудувати лояльну аудиторію через регулярний аудіо/відео-контент", en: "Build a loyal audience through regular audio/video content", de: "Treues Publikum durch regelmäßige Audio-/Videoinhalte aufbauen" },

  // Plural concepts
  "plural.concept.one": { uk: "концепт", en: "concept", de: "Konzept" },
  "plural.concept.few": { uk: "концепти", en: "concepts", de: "Konzepte" },
  "plural.concept.many": { uk: "концептів", en: "concepts", de: "Konzepte" },

  // Search result text  
  "search.nothingFor": { uk: "Нічого не знайдено за запитом", en: "Nothing found for", de: "Nichts gefunden für" },

  // Block titles
  "block.b1.title": { uk: "Друкована продукція", en: "Print Materials", de: "Druckmaterialien" },
  "block.b1.subtitle": { uk: "Фізичні та цифрові документи для зустрічей", en: "Physical and digital documents for meetings", de: "Physische und digitale Dokumente für Meetings" },
  "block.b2.title": { uk: "Цифрові медіа", en: "Digital Media", de: "Digitale Medien" },
  "block.b2.subtitle": { uk: "Онлайн-інструменти для залучення та конверсії", en: "Online tools for engagement and conversion", de: "Online-Tools für Engagement und Konversion" },
  "block.b3.title": { uk: "Брендинг", en: "Branding", de: "Branding" },
  "block.b3.subtitle": { uk: "Фірмова ідентичність та візуальна мова", en: "Corporate identity and visual language", de: "Markenidentität und visuelle Sprache" },
  "block.b4.title": { uk: "Контент", en: "Content", de: "Inhalt" },
  "block.b4.subtitle": { uk: "Матеріали для побудови авторитету", en: "Authority-building materials", de: "Materialien zum Aufbau von Autorität" },
  "block.b5.title": { uk: "Email-маркетинг", en: "Email Marketing", de: "E-Mail-Marketing" },
  "block.b5.subtitle": { uk: "Листи та лід-магніти", en: "Emails and lead magnets", de: "E-Mails und Lead-Magnete" },
  "block.b6.title": { uk: "Відеоконтент", en: "Video Content", de: "Videoinhalte" },
  "block.b6.subtitle": { uk: "Навчання, огляди та інтерактив", en: "Training, reviews and interactive", de: "Schulung, Bewertungen und Interaktiv" },
  "block.b7.title": { uk: "Платна реклама", en: "Paid Advertising", de: "Bezahlte Werbung" },
  "block.b7.subtitle": { uk: "PPC, таргетинг і ретаргетинг", en: "PPC, targeting and retargeting", de: "PPC, Targeting und Retargeting" },
  "block.b8.title": { uk: "Трендові 2026", en: "Trending 2026", de: "Trends 2026" },
  "block.b8.subtitle": { uk: "Найбільш затребувані формати", en: "Most in-demand formats", de: "Die gefragtesten Formate" },
};

// Merge per-language files (info sections + tier features)
Object.keys(uk).forEach((key) => {
  if (!translations[key]) {
    translations[key] = { uk: uk[key], en: en[key] || "", de: de[key] || "" };
  }
});
