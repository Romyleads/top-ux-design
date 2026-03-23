export type Locale = "uk" | "en" | "de";

export const translations: Record<string, Record<Locale, string>> = {
  // Hero
  "hero.badge": { uk: "📋 Маркетинговий арсенал", en: "📋 Marketing Arsenal", de: "📋 Marketing-Arsenal" },
  "hero.title1": { uk: "Офер", en: "Offer", de: "Angebot" },
  "hero.title2": { uk: "Концепти", en: "Concepts", de: "Konzepte" },
  "hero.subtitle": {
    uk: "Повна бібліотека маркетингових матеріалів — від друкованої продукції до трендових цифрових форматів 2024–2025",
    en: "Complete library of marketing materials — from print to trending digital formats 2024–2025",
    de: "Komplette Bibliothek von Marketingmaterialien — von Print bis zu digitalen Trendformaten 2024–2025",
  },
  "hero.search": {
    uk: "Пошук концепту, формату, ключового слова...",
    en: "Search concept, format, keyword...",
    de: "Konzept, Format, Stichwort suchen...",
  },
  "hero.found": { uk: "Знайдено", en: "Found", de: "Gefunden" },
  "hero.nothing": { uk: "Нічого не знайдено", en: "Nothing found", de: "Nichts gefunden" },

  // Stats
  "stats.concepts": { uk: "концептів", en: "concepts", de: "Konzepte" },
  "stats.blocks": { uk: "блоків", en: "blocks", de: "Blöcke" },
  "stats.trending": { uk: "трендових", en: "trending", de: "im Trend" },

  // Filter
  "filter.all": { uk: "Всі", en: "All", de: "Alle" },

  // Block
  "block.concepts": { uk: "концептів", en: "concepts", de: "Konzepte" },

  // Card
  "card.details": { uk: "Детальніше", en: "More details", de: "Mehr Details" },
  "card.inCart": { uk: "✓ В кошику", en: "✓ In cart", de: "✓ Im Warenkorb" },
  "card.add": { uk: "Додати", en: "Add", de: "Hinzufügen" },
  "card.goal": { uk: "🎯 Мета", en: "🎯 Goal", de: "🎯 Ziel" },

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
  "block.b8.title": { uk: "Трендові 2024–2025", en: "Trending 2024–2025", de: "Trends 2024–2025" },
  "block.b8.subtitle": { uk: "Найбільш затребувані формати", en: "Most in-demand formats", de: "Die gefragtesten Formate" },
};
