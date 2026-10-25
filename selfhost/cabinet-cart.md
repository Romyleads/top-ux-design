# Передача корзины во внешний кабинет (Node.js)

Этот сайт только перенаправляет клиента на `CABINET_URL`, заданный через `VITE_CABINET_URL` (по умолчанию `http://localhost:3000/account`). Платёжного сервера, ключей, webhooks и вызовов Stripe в этом проекте нет. Интеграция ниже реализуется владельцем в отдельном кабинете.

## Формат версии 1

После шагов «Услуги → Контакты → Оплата» ссылка содержит:

- `cartVersion=1` — версия формата.
- `cart` — JSON-массив, закодированный стандартным `URLSearchParams`.
- Для единственной позиции дополнительно передаются прежние `plan` и `quantity`, для совместимости. Если присутствует `cart`, кабинет должен использовать именно его, не добавляя legacy-позицию повторно.

Декодированное значение `cart`:

```json
[
  { "serviceId": "presentation", "tierId": "lite", "plan": "presentation_lite", "quantity": 2 },
  { "serviceId": "brochure", "tierId": "pro", "plan": "brochure_pro", "quantity": 1 }
]
```

`serviceId` — точный ID каталога, включая дефисы. `tierId` — техническое имя тарифа в нижнем регистре (например `lite`, `standard`, `pro`, `start`, `max`), одинаковое на EN/DE/UA; это не индекс тарифа и не перевод его названия. `plan` — прежний объединённый slug для совместимости, не источник цены. Новые отображаемые названия тарифов должны сохранять прежние технические ID в контракте кабинета. Один сервис с разными тарифами передаётся отдельными позициями. `quantity` — положительное целое число.

Полная корзина передаётся даже при одной позиции. Цена, итог, контактные данные, комментарий, подтверждение оплаты и секреты не передаются. Контакты из формы сайта этот контракт не сохраняет в кабинете: кабинет должен отдельно получить их через свою авторизованную форму или отдельный согласованный защищённый механизм, не через URL.

## Чтение в Node.js

Пример ниже — только инструкция для существующего сервера кабинета, не работающий сервер в этом проекте. `requestUrl` — URL входящего запроса; `serverCatalog` и `quantityLimitFor` — собственный актуальный каталог и ограничения кабинета.

```js
function readCart(requestUrl, serverCatalog, quantityLimitFor) {
  const url = new URL(requestUrl, "https://cabinet.example");
  if (url.searchParams.getAll("cartVersion").length !== 1 ||
      url.searchParams.get("cartVersion") !== "1" ||
      url.searchParams.getAll("cart").length !== 1) {
    throw new Error("Unsupported or ambiguous cart format");
  }
  // URLSearchParams уже декодировал значение: decodeURIComponent не нужен.
  const selections = JSON.parse(url.searchParams.get("cart"));
  if (!Array.isArray(selections) || selections.length === 0) {
    throw new Error("Empty cart");
  }
  const seen = new Set();
  return selections.map((item) => {
    if (!item || typeof item !== "object" ||
        typeof item.serviceId !== "string" || typeof item.tierId !== "string" ||
        !Number.isSafeInteger(item.quantity) || item.quantity < 1) {
      throw new Error("Invalid selection");
    }
    const key = `${item.serviceId}:${item.tierId}`;
    if (seen.has(key)) throw new Error("Duplicate selection");
    seen.add(key);
    const offer = serverCatalog.get(key); // Map, не доверенный объект из запроса
    if (!offer || !offer.active || !Number.isSafeInteger(offer.unitAmountCents) ||
        offer.unitAmountCents < 0 || offer.requiresQuote ||
        offer.currency !== "EUR" || item.quantity > quantityLimitFor(offer)) {
      throw new Error("Unavailable offer, quote required or invalid quantity");
    }
    const lineTotalCents = offer.unitAmountCents * item.quantity;
    if (!Number.isSafeInteger(lineTotalCents)) throw new Error("Amount overflow");
    return {
      serviceId: item.serviceId,
      tierId: item.tierId,
      quantity: item.quantity,
      unitAmountCents: offer.unitAmountCents,
      lineTotalCents,
      currency: offer.currency,
    };
  });
}
```

Ошибки JSON/валидации кабинет обрабатывает как некорректную корзину, а не как успешную оплату. Дополнительно задайте собственные ограничения длины запроса, числа позиций и общей суммы. Объединяйте или отклоняйте дубликаты с проверкой суммарного количества; пример отклоняет их. Для старых ссылок только с `plan` используйте явную серверную таблицу соответствий, не разбивайте slug по `_`, поскольку ID сервиса тоже может содержать несколько слов.

## Обязательный пересчёт на сервере

Любой URL можно изменить вручную. Проверки браузера — только удобство интерфейса, не защита платежа. Кабинет обязан заново проверить сервис, тариф, доступность, количество, необходимость индивидуальной оценки и валюту; получить актуальную цену из собственного каталога; вычислить итог в целых евроцентах с проверкой переполнения, скидками, налогами и комиссиями по своим правилам. Не доверяйте присланным `price`, `total`, `plan` или заявленному статусу оплаты. При изменении цены покажите новый итог и запросите согласие клиента до платежа. Любая позиция с индивидуальной оценкой блокирует автоматическую оплату всей корзины, пока стоимость не согласована.

Сохраняйте заказ и проверенный состав в кабинете перед запуском его существующей оплаты. Только кабинет и подтверждение платёжного провайдера определяют факт оплаты; `?payment=success|cancelled` на этом сайте — лишь экран результата, не доказательство списания.

В production используйте HTTPS и домен кабинета: `localhost:3000` в браузере клиента означает компьютер самого клиента. Поскольку корзина находится в URL, она может попадать в историю/логи; не добавляйте туда персональные данные. Для очень больших корзин нужен отдельно согласованный защищённый способ передачи — сайт сейчас использует только URL, не новый API.

## Проверка интеграции

Проверьте одну позицию с количеством 2; несколько сервисов; разные тарифы одного сервиса; изменённые/неизвестные ID; дробное, нулевое и чрезмерное количество; дубликаты; индивидуальную оценку; изменение серверной цены; возврат после оплаты/отмены. Реальный кабинет и платежи в этой среде не проверены: локально проверяется только сформированная ссылка и переход к ней.