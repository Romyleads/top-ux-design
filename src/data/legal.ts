// Legal page templates. Values in [SQUARE BRACKETS] must be filled in by the owner.
// German text is the legally binding version; EN/UK are courtesy translations.
export type LegalDoc = "imprint" | "privacy" | "terms" | "cookies";
type Section = { h: string; p: string[] };
type Doc = { title: string; sections: Section[] };
type Locale = "en" | "de" | "uk";

export const OWNER = {
  name: "[VORNAME NACHNAME]",
  brand: "PromoVisions",
  street: "[STRASSE HAUSNUMMER]",
  city: "[PLZ ORT]",
  country: "Deutschland",
  email: "hello@promovisions.com",
  phone: "[TELEFONNUMMER]",
  taxNo: "[STEUERNUMMER]",
  finanzamt: "[FINANZAMT]",
};

const addr = `${OWNER.name}, ${OWNER.brand}, ${OWNER.street}, ${OWNER.city}, ${OWNER.country}`;

export const bindingNote: Record<Locale, string> = {
  de: "",
  en: "Courtesy translation. In case of doubt, the German version is legally binding.",
  uk: "Переклад для зручності. У разі розбіжностей юридично обов'язковою є німецька версія.",
};

export const legal: Record<LegalDoc, Record<Locale, Doc>> = {
  imprint: {
    de: {
      title: "Impressum",
      sections: [
        { h: "Angaben gemäß § 5 DDG", p: [OWNER.name, `Einzelunternehmen, handelnd unter „${OWNER.brand}“`, OWNER.street, `${OWNER.city}, ${OWNER.country}`] },
        { h: "Kontakt", p: [`E-Mail: ${OWNER.email}`, `Telefon: ${OWNER.phone}`] },
        { h: "Steuern", p: [`Steuernummer: ${OWNER.taxNo} (${OWNER.finanzamt})`, "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung). Eine USt-IdNr. ist nicht vorhanden."] },
        { h: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV", p: [`${OWNER.name}, Anschrift wie oben`] },
        { h: "EU-Streitschlichtung", p: ["Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."] },
        { h: "Haftung für Inhalte und Links", p: ["Wir sind für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Für Inhalte externer Links übernehmen wir keine Gewähr; verantwortlich ist stets der jeweilige Anbieter. Bei Bekanntwerden von Rechtsverletzungen entfernen wir solche Links umgehend."] },
      ],
    },
    en: {
      title: "Legal Notice (Impressum)",
      sections: [
        { h: "Information pursuant to § 5 DDG", p: [OWNER.name, `Sole proprietorship trading as "${OWNER.brand}"`, OWNER.street, `${OWNER.city}, Germany`] },
        { h: "Contact", p: [`Email: ${OWNER.email}`, `Phone: ${OWNER.phone}`] },
        { h: "Tax", p: [`Tax number: ${OWNER.taxNo} (${OWNER.finanzamt})`, "No VAT is charged under § 19 UStG (small business regulation). No VAT ID is held."] },
        { h: "Responsible for content (§ 18 (2) MStV)", p: [`${OWNER.name}, address as above`] },
        { h: "Dispute resolution", p: ["We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board."] },
        { h: "Liability for content and links", p: ["We are responsible for our own content under general law. We accept no liability for external links; their operators are solely responsible. Infringing links are removed promptly once known."] },
      ],
    },
    uk: {
      title: "Impressum (вихідні дані)",
      sections: [
        { h: "Відомості згідно § 5 DDG", p: [OWNER.name, `Приватний підприємець, торгова назва «${OWNER.brand}»`, OWNER.street, `${OWNER.city}, Німеччина`] },
        { h: "Контакти", p: [`Email: ${OWNER.email}`, `Телефон: ${OWNER.phone}`] },
        { h: "Податки", p: [`Податковий номер: ${OWNER.taxNo} (${OWNER.finanzamt})`, "ПДВ не нараховується згідно § 19 UStG (Kleinunternehmer). VAT ID відсутній."] },
        { h: "Відповідальний за зміст (§ 18 абз. 2 MStV)", p: [`${OWNER.name}, адреса вище`] },
        { h: "Вирішення спорів", p: ["Ми не беремо участі в процедурах вирішення спорів перед споживчою арбітражною комісією і не зобов'язані до цього."] },
        { h: "Відповідальність за зміст і посилання", p: ["Ми відповідаємо за власний зміст. За зовнішні посилання відповідають їхні власники; порушення прибираємо одразу після виявлення."] },
      ],
    },
  },
  privacy: {
    de: {
      title: "Datenschutzerklärung",
      sections: [
        { h: "1. Verantwortlicher", p: [addr, `E-Mail: ${OWNER.email}`] },
        { h: "2. Hosting und Server-Logfiles", p: ["Beim Aufruf der Website werden technisch notwendige Daten (IP-Adresse, Datum/Uhrzeit, Browser, aufgerufene Seite) verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (sicherer Betrieb). Hosting-Anbieter: [HOSTING-ANBIETER, SITZ]."] },
        { h: "3. Anfragen und Bestellungen", p: ["Für Anfragen über den Warenkorb verarbeiten wir Name, E-Mail, optional Slack/Telegram sowie Angaben zum Projekt zur Vertragsanbahnung und -erfüllung (Art. 6 Abs. 1 lit. b DSGVO). Steuerrelevante Unterlagen bewahren wir gesetzlich 6–10 Jahre auf (Art. 6 Abs. 1 lit. c DSGVO)."] },
        { h: "4. Auftragsverarbeiter / Freelancer", p: ["Zur Umsetzung von Aufträgen setzen wir sorgfältig ausgewählte freie Mitarbeiter ein, auch außerhalb der EU. Wir geben nur die für das Projekt notwendigen Daten weiter, auf Grundlage von Auftragsverarbeitungsverträgen und, wo erforderlich, EU-Standardvertragsklauseln (Art. 44 ff. DSGVO)."] },
        { h: "5. Zahlungen", p: ["Zahlungen werden über [ZAHLUNGSANBIETER] abgewickelt. Dabei werden Zahlungsdaten direkt an den Anbieter übermittelt; wir speichern keine Kartendaten."] },
        { h: "6. Newsletter", p: ["Der Newsletter wird nur mit Ihrer ausdrücklichen Einwilligung versendet (Art. 6 Abs. 1 lit. a DSGVO). Sie können sie jederzeit widerrufen."] },
        { h: "7. Lokale Speicherung", p: ["Wir speichern im Browser (localStorage) nur technisch notwendige Einstellungen: Sprache, Warenkorb und Ihre Newsletter-Einwilligung. Tracking-Cookies werden nicht eingesetzt."] },
        { h: "8. Ihre Rechte", p: ["Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie auf Beschwerde bei einer Aufsichtsbehörde, z. B. [ZUSTÄNDIGE LANDESDATENSCHUTZBEHÖRDE]."] },
      ],
    },
    en: {
      title: "Privacy Policy",
      sections: [
        { h: "1. Controller", p: [addr, `Email: ${OWNER.email}`] },
        { h: "2. Hosting and server logs", p: ["When you visit the site, technically necessary data (IP address, date/time, browser, page) is processed. Legal basis: Art. 6(1)(f) GDPR. Hosting provider: [HOSTING PROVIDER, SEAT]."] },
        { h: "3. Requests and orders", p: ["For cart requests we process name, email, optional Slack/Telegram and project details to prepare and perform the contract (Art. 6(1)(b) GDPR). Tax records are retained for 6–10 years as required by law (Art. 6(1)(c) GDPR)."] },
        { h: "4. Processors / freelancers", p: ["We engage carefully selected freelancers, including outside the EU, to deliver orders. Only data required for the project is shared, under data processing agreements and, where required, EU Standard Contractual Clauses (Art. 44 et seq. GDPR)."] },
        { h: "5. Payments", p: ["Payments are processed by [PAYMENT PROVIDER]. Payment data goes directly to the provider; we do not store card data."] },
        { h: "6. Newsletter", p: ["The newsletter is sent only with your explicit consent (Art. 6(1)(a) GDPR), which you can withdraw at any time."] },
        { h: "7. Local storage", p: ["We only store technically necessary settings in your browser (localStorage): language, cart and newsletter consent. No tracking cookies are used."] },
        { h: "8. Your rights", p: ["You have the right to access, rectification, erasure, restriction, portability and objection (Art. 15–21 GDPR), and to lodge a complaint with a supervisory authority, e.g. [COMPETENT STATE DATA PROTECTION AUTHORITY]."] },
      ],
    },
    uk: {
      title: "Політика конфіденційності",
      sections: [
        { h: "1. Відповідальна особа", p: [addr, `Email: ${OWNER.email}`] },
        { h: "2. Хостинг і серверні логи", p: ["Під час відвідування обробляються технічно необхідні дані (IP, дата/час, браузер, сторінка). Підстава: ст. 6(1)(f) GDPR. Хостинг: [ХОСТИНГ-ПРОВАЙДЕР]."] },
        { h: "3. Запити та замовлення", p: ["Для запитів з кошика обробляємо ім'я, email, за бажанням Slack/Telegram та деталі проєкту для укладення і виконання договору (ст. 6(1)(b) GDPR). Податкові документи зберігаються 6–10 років за законом."] },
        { h: "4. Виконавці / фрилансери", p: ["Для виконання замовлень ми залучаємо ретельно відібраних фрилансерів, зокрема поза ЄС. Передаються лише необхідні дані на підставі договорів обробки та стандартних договірних положень ЄС."] },
        { h: "5. Оплата", p: ["Платежі обробляє [ПЛАТІЖНИЙ ПРОВАЙДЕР]. Дані картки йдуть напряму провайдеру; ми їх не зберігаємо."] },
        { h: "6. Розсилка", p: ["Розсилка надсилається лише за вашою явною згодою (ст. 6(1)(a) GDPR), яку можна відкликати будь-коли."] },
        { h: "7. Локальне зберігання", p: ["У браузері зберігаються лише необхідні налаштування: мова, кошик і згода на розсилку. Трекінгові cookies не використовуються."] },
        { h: "8. Ваші права", p: ["Ви маєте право на доступ, виправлення, видалення, обмеження, перенесення даних і заперечення (ст. 15–21 GDPR) та на скаргу до наглядового органу, напр. [ЗЕМЕЛЬНИЙ ОРГАН ЗАХИСТУ ДАНИХ]."] },
      ],
    },
  },
  terms: {
    de: {
      title: "Allgemeine Geschäftsbedingungen (AGB)",
      sections: [
        { h: "§ 1 Geltungsbereich", p: [`Diese AGB gelten für alle Verträge zwischen ${OWNER.name} („${OWNER.brand}“) und Kunden weltweit über die auf dieser Website angebotenen digitalen Dienstleistungen. Das Angebot richtet sich vorrangig an Unternehmer (§ 14 BGB).`] },
        { h: "§ 2 Leistung und Erfüllungsgehilfen", p: [`${OWNER.brand} ist alleiniger Vertragspartner und verantwortlich für Ergebnis und Qualitätskontrolle. Zur Umsetzung dürfen sorgfältig ausgewählte Subunternehmer/Freelancer eingesetzt werden. Ergebnisse können KI-gestützt erstellt werden; ein bestimmter wirtschaftlicher Erfolg wird nicht geschuldet.`] },
        { h: "§ 3 Vertragsschluss", p: ["Die Darstellung der Pakete ist kein bindendes Angebot. Mit dem Absenden einer Anfrage gibt der Kunde ein Angebot ab; der Vertrag kommt durch unsere Bestätigung per E-Mail oder Rechnung zustande."] },
        { h: "§ 4 Preise und Zahlung", p: ["Alle Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen. Die Arbeit beginnt nach Zahlungseingang, sofern nicht anders vereinbart. Pakete „auf Anfrage“ werden individuell angeboten."] },
        { h: "§ 5 Mitwirkung und Korrekturen", p: ["Der Kunde stellt die benötigten Inhalte rechtzeitig bereit. Der Umfang an Korrekturschleifen ergibt sich aus dem gewählten Paket. Lieferfristen verlängern sich bei fehlender Mitwirkung."] },
        { h: "§ 6 Nutzungsrechte", p: ["Mit vollständiger Zahlung erhält der Kunde die für den vereinbarten Zweck erforderlichen, zeitlich und räumlich unbeschränkten Nutzungsrechte an den Ergebnissen. Rechte Dritter (z. B. Stock-Material, Schriften) richten sich nach deren Lizenzen."] },
        { h: "§ 7 Widerrufsrecht für Verbraucher", p: ["Verbraucher haben ein 14-tägiges Widerrufsrecht. Es erlischt bei Dienstleistungen, wenn die Leistung vollständig erbracht wurde und der Verbraucher ausdrücklich zugestimmt hat, dass vor Ablauf der Frist begonnen wird. Widerruf an: " + OWNER.email] },
        { h: "§ 8 Haftung", p: ["Wir haften unbeschränkt bei Vorsatz, grober Fahrlässigkeit und Verletzung von Leben, Körper oder Gesundheit. Bei leichter Fahrlässigkeit nur für wesentliche Vertragspflichten und begrenzt auf den vorhersehbaren, vertragstypischen Schaden."] },
        { h: "§ 9 Schlussbestimmungen", p: ["Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts; zwingende Verbraucherschutzvorschriften des Aufenthaltsstaats bleiben unberührt. Gerichtsstand für Kaufleute ist [ORT]."] },
      ],
    },
    en: {
      title: "Terms and Conditions",
      sections: [
        { h: "1. Scope", p: [`These terms apply to all contracts between ${OWNER.name} ("${OWNER.brand}") and customers worldwide for the digital services offered on this website. The offer is primarily aimed at businesses.`] },
        { h: "2. Services and subcontractors", p: [`${OWNER.brand} is the sole contracting party and responsible for the result and quality control. Carefully selected subcontractors/freelancers may be engaged. Results may be AI-assisted; no specific commercial outcome is guaranteed.`] },
        { h: "3. Conclusion of contract", p: ["Packages shown are not a binding offer. Submitting a request is the customer's offer; the contract is concluded by our confirmation by email or invoice."] },
        { h: "4. Prices and payment", p: ["All prices are final prices. No VAT is shown under § 19 UStG. Work begins after payment unless agreed otherwise. Quote-only packages are offered individually."] },
        { h: "5. Cooperation and revisions", p: ["The customer provides required materials on time. The number of revision rounds depends on the chosen package. Deadlines are extended if cooperation is missing."] },
        { h: "6. Usage rights", p: ["Upon full payment the customer receives the usage rights required for the agreed purpose, unlimited in time and territory. Third-party assets (stock, fonts) follow their licences."] },
        { h: "7. Right of withdrawal (consumers)", p: ["Consumers have a 14-day right of withdrawal. For services it expires once fully performed, if the consumer expressly agreed to performance starting before the period ends. Send withdrawals to: " + OWNER.email] },
        { h: "8. Liability", p: ["We are fully liable for intent, gross negligence and injury to life, body or health. For slight negligence only for essential contractual obligations, limited to foreseeable, typical damage."] },
        { h: "9. Final provisions", p: ["German law applies, excluding the UN CISG; mandatory consumer protection laws of the customer's country remain unaffected. Place of jurisdiction for merchants: [CITY]."] },
      ],
    },
    uk: {
      title: "Умови надання послуг (AGB)",
      sections: [
        { h: "1. Сфера дії", p: [`Ці умови діють для всіх договорів між ${OWNER.name} («${OWNER.brand}») та клієнтами по всьому світу щодо цифрових послуг на сайті. Пропозиція орієнтована передусім на бізнес.`] },
        { h: "2. Послуги та виконавці", p: [`${OWNER.brand} — єдина сторона договору та відповідає за результат і контроль якості. Можуть залучатися ретельно відібрані фрилансери. Результати можуть створюватися з AI; конкретний комерційний ефект не гарантується.`] },
        { h: "3. Укладення договору", p: ["Пакети на сайті не є обов'язковою офертою. Запит клієнта — це пропозиція; договір укладається нашим підтвердженням email або рахунком."] },
        { h: "4. Ціни та оплата", p: ["Усі ціни кінцеві. ПДВ не нараховується (§ 19 UStG). Робота починається після оплати, якщо не погоджено інше. Пакети «за запитом» розраховуються індивідуально."] },
        { h: "5. Співпраця та правки", p: ["Клієнт вчасно надає матеріали. Кількість правок залежить від пакета. Терміни продовжуються, якщо матеріали затримуються."] },
        { h: "6. Права використання", p: ["Після повної оплати клієнт отримує права використання для погодженої мети без обмежень за часом і територією. Сторонні матеріали — за їхніми ліцензіями."] },
        { h: "7. Право відмови (споживачі)", p: ["Споживачі мають 14 днів на відмову. Для послуг воно зникає після повного виконання, якщо споживач погодився на старт до кінця строку. Відмову надсилати: " + OWNER.email] },
        { h: "8. Відповідальність", p: ["Повна відповідальність за умисел, грубу недбалість і шкоду життю/здоров'ю. За легку недбалість — лише щодо суттєвих обов'язків у межах передбачуваної шкоди."] },
        { h: "9. Прикінцеві положення", p: ["Діє право Німеччини без Конвенції ООН (CISG); обов'язкові норми захисту споживачів країни клієнта зберігаються. Підсудність для підприємців: [МІСТО]."] },
      ],
    },
  },
  cookies: {
    de: { title: "Cookie-Hinweis", sections: [{ h: "Keine Tracking-Cookies", p: ["Diese Website verwendet keine Analyse- oder Marketing-Cookies. Im Browser werden nur technisch notwendige Daten gespeichert (Sprache, Warenkorb, Newsletter-Einwilligung) gemäß § 25 Abs. 2 TDDDG. Sie können diese jederzeit über Ihre Browsereinstellungen löschen."] }] },
    en: { title: "Cookie Notice", sections: [{ h: "No tracking cookies", p: ["This website uses no analytics or marketing cookies. Only technically necessary data is stored in your browser (language, cart, newsletter consent) under § 25(2) TDDDG. You can delete it at any time in your browser settings."] }] },
    uk: { title: "Про cookies", sections: [{ h: "Без трекінгових cookies", p: ["Сайт не використовує аналітичні чи маркетингові cookies. У браузері зберігаються лише необхідні дані (мова, кошик, згода на розсилку) згідно § 25 абз. 2 TDDDG. Їх можна видалити в налаштуваннях браузера."] }] },
  },
};
