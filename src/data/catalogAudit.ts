type Localized = Record<"en" | "de" | "uk", string>;
type Dictionary = Record<string, Localized>;
const l = (en: string, de: string, uk: string): Localized => ({ en, de, uk });

// Package scopes are studio proposals, not evidence of model releases or guaranteed results.
export function applyCatalogAudit(dictionary: Dictionary): void {
  const overrides: Dictionary = {
    "service.ai-forecast.name": l("AI Market Signals & Scenarios", "KI-Marktsignale & Szenarien", "AI-сигнали ринку та сценарії"),
    "service.ai-forecast.tier.0.0": l("<b>1 niche</b> · dated public signals", "<b>1 Nische</b> · datierte öffentliche Signale", "<b>1 ніша</b> · датовані публічні сигнали"),
    "service.ai-forecast.tier.1.0": l("<b>1 niche</b> · scenarios and assumptions", "<b>1 Nische</b> · Szenarien und Annahmen", "<b>1 ніша</b> · сценарії та припущення"),
    "service.ai-forecast.tier.2.0": l("<b>3 niches</b> · monitoring scope agreed", "<b>3 Nischen</b> · Monitoringumfang vereinbart", "<b>3 ніші</b> · погоджений обсяг моніторингу"),
    "service.ai-forecast.tier.0.1": l("Source-linked report · PDF / CSV", "Bericht mit Quellen · PDF / CSV", "Звіт із джерелами · PDF / CSV"),
    "service.ai-forecast.tier.1.1": l("Scenario report · hypotheses to test", "Szenarienbericht · prüfbare Hypothesen", "Сценарний звіт · гіпотези для перевірки"),
    "service.ai-forecast.tier.2.1": l("Dashboard and alerts · access confirmed", "Dashboard und Hinweise · Zugang bestätigt", "Дашборд і сповіщення · доступ погоджується"),
    "service.ai-forecast.info.formats": l("PDF / CSV · dated evidence and scenario assumptions", "PDF / CSV · datierte Belege und Szenarioannahmen", "PDF / CSV · датовані докази та припущення сценаріїв"),
    "service.ai-automation.tier.0.3": l("2 revisions · approved-source retrieval (RAG)", "2 Korrekturen · Abruf freigegebener Quellen (RAG)", "2 правки · пошук у погоджених джерелах (RAG)"),
    "service.ai-automation.tier.1.1": l("n8n · approved channel integrations", "n8n · freigegebene Kanalintegrationen", "n8n · погоджені інтеграції каналів"),
    "service.telegram-twa.tier.1.1": l("Mini App · data · eligible payments", "Mini App · Daten · zulässige Zahlungen", "Mini App · дані · дозволені оплати"),
    "service.prompt-dna.tier.1.0": l("<b>Text + visual</b> · approved brand examples", "<b>Text + Bild</b> · freigegebene Markenbeispiele", "<b>Текст + візуал</b> · погоджені приклади бренду"),
    "service.brandbook.tier.1.1": l("PDF + editable Figma file", "PDF + editierbare Figma-Datei", "PDF + редагований файл Figma"),
    "service.brandbook.tier.2.1": l("PDF + editable Figma file + Notion", "PDF + editierbare Figma-Datei + Notion", "PDF + редагований файл Figma + Notion"),
    "service.email-campaign.tier.2.1": l("MJML + design file + ESP setup", "MJML + Designdatei + ESP-Setup", "MJML + файл дизайну + налаштування ESP"),
    "service.generative-identity.tier.1.1": l("Generative system + editable Figma file", "Generatives System + editierbare Figma-Datei", "Генеративна система + редагований файл Figma"),
    "service.mvp-on-demand.tier.0.3": l("1 revision round · hosting setup", "1 Korrekturrunde · Hosting-Einrichtung", "1 раунд правок · налаштування хостингу"),
    "service.mvp-on-demand.tier.1.1": l("3–5 screens · sign-in · database", "3–5 Bildschirme · Login · Datenbank", "3–5 екранів · вхід · база даних"),
    "service.mvp-on-demand.tier.1.3": l("3 revision rounds · payments · email", "3 Korrekturrunden · Zahlungen · E-Mail", "3 раунди правок · оплата · email"),
    "service.mvp-on-demand.tier.2.1": l("Agreed integrations · AI · payments", "Vereinbarte Integrationen · KI · Zahlungen", "Погоджені інтеграції · AI · оплата"),
    "service.mvp-on-demand.tier.2.3": l("5 revision rounds · 30 days bug fixes", "5 Korrekturrunden · 30 Tage Fehlerbehebung", "5 раундів правок · 30 днів виправлення помилок"),
    "service.mvp-on-demand.tier.0.1": l("1 screen + 1 feature · AI-assisted web app", "1 Bildschirm + 1 Funktion · KI-gestützte Web-App", "1 екран + 1 функція · AI-вебзастосунок"),
    "service.ai-video-catalog.tier.0.1": l("MP4 · 720p export · reviewed product reference", "MP4 · 720p-Export · geprüfte Produktreferenz", "MP4 · експорт 720p · перевірений референс товару"),
    "service.ai-video-catalog.tier.1.1": l("MP4 · edited scenes · reviewed narration", "MP4 · montierte Szenen · geprüfte Vertonung", "MP4 · змонтовані сцени · перевірена озвучка"),
    "service.ai-video-catalog.tier.2.1": l("Batch export · integration scope agreed", "Stapelexport · Integrationsumfang vereinbart", "Пакетний експорт · погоджений обсяг інтеграції"),
    "service.micro-saas.tier.0.0": l("<b>Landing page</b> + billing + onboarding", "<b>Landingpage</b> + Abrechnung + Onboarding", "<b>Лендінг</b> + білінг + онбординг"),
    "service.micro-saas.tier.0.1": l("Lovable · Stripe · email", "Lovable · Stripe · E-Mail", "Lovable · Stripe · email"),
    "service.micro-saas.tier.1.0": l("<b>MVP</b> + dashboard + API", "<b>MVP</b> + Dashboard + API", "<b>MVP</b> + кабінет + API"),
    "service.micro-saas.tier.1.1": l("Lovable · data · Stripe", "Lovable · Daten · Stripe", "Lovable · дані · Stripe"),
    "service.micro-saas.tier.2.1": l("Scoped web app · deployment · analytics", "Abgegrenzte Web-App · Bereitstellung · Analytik", "Вебзастосунок · розгортання · аналітика"),
    "service.micro-saas.tier.0.2": l("<b>Deadline: 10 days</b>", "<b>Frist: 10 Tage</b>", "<b>Термін: 10 днів</b>"),
    "service.micro-saas.tier.1.2": l("<b>Deadline: 7 days</b>", "<b>Frist: 7 Tage</b>", "<b>Термін: 7 днів</b>"),
    "service.micro-saas.tier.2.2": l("<b>Deadline: 5 days</b>", "<b>Frist: 5 Tage</b>", "<b>Термін: 5 днів</b>"),
    "service.micro-saas.tier.0.3": l("1 iteration · launch checklist", "1 Iteration · Launch-Checkliste", "1 ітерація · чекліст запуску"),
    "service.micro-saas.tier.1.3": l("3 iterations · analytics", "3 Iterationen · Analytik", "3 ітерації · аналітика"),
    "service.saas-onboarding.tier.0.0": l("<b>3</b> welcome emails + 1 guide", "<b>3</b> Willkommens-E-Mails + 1 Anleitung", "<b>3</b> вітальні листи + 1 гайд"),
    "service.saas-onboarding.tier.0.1": l("HTML email + PDF or screen-recorded guide", "HTML-E-Mail + PDF oder Bildschirmanleitung", "HTML-листи + PDF або записаний гайд"),
    "service.saas-onboarding.tier.0.3": l("2 revisions · 1 segment", "2 Korrekturen · 1 Segment", "2 правки · 1 сегмент"),
    "service.saas-onboarding.tier.1.0": l("<b>7</b> emails + in-app messages", "<b>7</b> E-Mails + In-App-Nachrichten", "<b>7</b> листів + повідомлення в застосунку"),
    "service.saas-onboarding.tier.1.1": l("HTML + product tours", "HTML + Produktführungen", "HTML + огляди продукту"),
    "service.saas-onboarding.tier.1.3": l("4 revisions · retention analytics", "4 Korrekturen · Bindungsanalyse", "4 правки · аналітика утримання"),
    "service.saas-onboarding.tier.2.0": l("<b>Full onboarding</b> · multi-channel", "<b>Vollständiges Onboarding</b> · mehrere Kanäle", "<b>Повний онбординг</b> · кілька каналів"),
    "service.saas-onboarding.tier.2.1": l("Email + in-app + video + docs", "E-Mail + In-App + Video + Dokumentation", "Email + застосунок + відео + документація"),
    "service.saas-onboarding.tier.2.3": l("Revisions within agreed scope · A/B tests", "Korrekturen im vereinbarten Umfang · A/B-Tests", "Правки в погодженому обсязі · A/B-тести"),
    "service.linkedin-brand.tier.0.0": l("<b>3</b> posts/week · basic strategy", "<b>3</b> Beiträge/Woche · Basisstrategie", "<b>3</b> пости/тиждень · базова стратегія"),
    "service.linkedin-brand.tier.1.0": l("<b>5</b> posts/week · thought leadership", "<b>5</b> Beiträge/Woche · Expertenpositionierung", "<b>5</b> постів/тиждень · експертність"),
    "service.linkedin-brand.tier.2.0": l("<b>Daily</b> content · full management", "<b>Tägliche</b> Inhalte · vollständige Betreuung", "<b>Щоденний</b> контент · повне ведення"),
    "service.linkedin-brand.tier.0.2": l("<b>Prep: 2 days/week</b>", "<b>Vorbereitung: 2 Tage/Woche</b>", "<b>Підготовка: 2 дні/тиждень</b>"),
    "service.linkedin-brand.tier.1.2": l("<b>Prep: 1 day/week</b>", "<b>Vorbereitung: 1 Tag/Woche</b>", "<b>Підготовка: 1 день/тиждень</b>"),
    "service.linkedin-brand.tier.0.3": l("1 revision/post · outreach guide + analytics", "1 Korrektur/Beitrag · Kontaktleitfaden + Analytik", "1 правка/пост · гайд комунікації + аналітика"),
    "service.linkedin-brand.tier.1.3": l("3 revisions · networking strategy", "3 Korrekturen · Netzwerkstrategie", "3 правки · стратегія контактів"),
    "service.linkedin-brand.tier.2.3": l("Revisions within agreed scope · ABM strategy", "Korrekturen im vereinbarten Umfang · ABM-Strategie", "Правки в погодженому обсязі · ABM-стратегія"),
    "service.interactive-content.tier.0.0": l("<b>1</b> tool · up to 10 steps", "<b>1</b> Tool · bis zu 10 Schritte", "<b>1</b> інструмент · до 10 кроків"),
    "service.interactive-content.tier.0.1": l("Typeform or Lovable", "Typeform oder Lovable", "Typeform або Lovable"),
    "block.b8.subtitle": l("Catalog review: September–October 2026; not release dates", "Katalogprüfung: September–Oktober 2026; keine Veröffentlichungsdaten", "Перегляд каталогу: вересень–жовтень 2026; не дати релізів"),
    "cart.partialEstimate": l("Known-price subtotal only; quote-required offers are additional", "Nur Zwischensumme bekannter Preise; Anfrageangebote kommen hinzu", "Лише сума відомих цін; офери за запитом розраховуються окремо"),
  };
  Object.assign(dictionary, overrides);
  for (const [key, value] of Object.entries(dictionary)) {
    if (!key.startsWith("service.")) continue;
    for (const language of ["en", "de", "uk"] as const) {
      const scope = l("Revisions within agreed scope", "Korrekturen im vereinbarten Umfang", "Правки в погодженому обсязі")[language];
      value[language] = value[language]
        .replace(/Unlimited (?:revisions|iterations)|Unbegr(?:enzte|enzten|\.) (?:Korrekturen|Revisionen)|Безлімітні (?:правки|ітерації)|Безлім\. правки/gi, scope);
    }
  }
  dictionary["service.catalog.tier.2.0"] = l("Items and layout scope agreed in quote", "Positionen und Layoutumfang im Angebot vereinbart", "Кількість позицій і верстка погоджуються в розрахунку");
  for (const id of ["video-ad", "product-tour", "testimonials"]) {
    for (let tier = 0; tier < 3; tier++) {
      const key = `service.${id}.tier.${tier}.1`;
      if (dictionary[key]) for (const language of ["en", "de", "uk"] as const) {
        dictionary[key][language] = dictionary[key][language].replace(/4K/g, l("4K export; upscaled if needed", "4K-Export; ggf. hochskaliert", "експорт 4K; за потреби масштабований")[language]);
      }
    }
  }
  const notes: Record<string, Localized> = {
    "ai-forecast": l("Scenarios are hypotheses based on dated public evidence, not confirmed forecasts of future demand.", "Szenarien sind Hypothesen aus datierten öffentlichen Belegen, keine bestätigten Nachfrageprognosen.", "Сценарії є гіпотезами на основі датованих публічних даних, а не підтвердженими прогнозами попиту."),
    "ai-twin": l("Approved knowledge is retrieved using RAG; foundation-model training and guaranteed autonomous answers are not included.", "Freigegebenes Wissen wird per RAG abgerufen; Basismodelltraining und garantierte autonome Antworten sind nicht enthalten.", "Погоджені знання знаходяться через RAG; навчання базової моделі та гарантовані автономні відповіді не включені."),
    "ai-automation": l("Connect approved sources for retrieval (RAG), not foundation-model training; publishing and spending need approval.", "Freigegebene Quellen per RAG anbinden, kein Basismodelltraining; Veröffentlichung und Ausgaben brauchen Freigabe.", "Підключення джерел для пошуку (RAG), не навчання базової моделі; публікації й витрати потребують погодження."),
    "telegram-twa": l("Digital goods inside Telegram require Telegram Stars; other payments depend on product type and provider eligibility.", "Digitale Güter in Telegram benötigen Telegram Stars; andere Zahlungen hängen von Produkttyp und Anbieterzulassung ab.", "Цифрові товари в Telegram потребують Telegram Stars; інші оплати залежать від типу товару та доступності провайдера."),
    "mvp-on-demand": l("Character counts are brief-size guidelines, not a per-character fee or guaranteed feature capacity. Specs over 15,000 characters are assessed individually and the price is confirmed before the order is placed. Every tier includes spec analysis, a clarifying brief, development, deployment and handover documentation. A revision round is one consolidated list of fixes within the agreed scope; new features are quoted separately. Bug fixes cover defects in the delivered scope only.", "Zeichenzahlen dienen als Briefing-Richtwerte, nicht als Zeichengebühr oder Funktionsgarantie. Lastenhefte über 15.000 Zeichen werden individuell bewertet; der Preis wird vor Auftragsbestätigung abgestimmt. Jeder Tarif umfasst Lastenheft-Analyse, klärendes Briefing, Entwicklung, Deployment und Übergabedokumentation. Eine Korrekturrunde ist eine gesammelte Änderungsliste innerhalb des vereinbarten Umfangs; neue Funktionen werden separat angeboten. Fehlerbehebung gilt nur für Mängel im gelieferten Umfang.", "Кількість символів — орієнтир брифу, не тариф за символ або гарантія функцій. ТЗ понад 15 000 символів оцінюється індивідуально, а ціна погоджується до підтвердження замовлення. Кожен тариф включає аналіз ТЗ, уточнюючий бриф, розробку, деплой і документацію для передачі. Раунд правок — один зведений список виправлень у межах погодженого обсягу; нові функції оцінюються окремо. Виправлення помилок стосується лише дефектів у переданому обсязі."),
    "nocode-mvp": l("No-code means no client coding requirement; AI-generated implementation code may be used and reviewed.", "No-Code bedeutet keine Programmierung durch Kunden; KI-generierter Code kann eingesetzt und geprüft werden.", "No-code означає відсутність вимоги програмувати клієнту; AI-згенерований код може використовуватися та перевірятися."),
  };
  for (const [id, note] of Object.entries(notes)) for (const language of ["en", "de", "uk"] as const) {
    dictionary[`service.${id}.info.description`][language] += ` ${note[language]}`;
  }
}