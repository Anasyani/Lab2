# Лабораторная работа №2: Nginx + PHP-FPM, HTML-формы и JavaScript

## 👩‍💻 Автор

ФИО: Янина Анастасия Алексеевна  
Группа: 2
Вариант: 1 
---

## 📌 Описание задания

Расширить проект из лабораторной №1: добавить контейнер PHP-FPM, настроить Nginx для обработки PHP, проверить работу через `phpinfo()`, создать HTML-форму и обработать её на JavaScript без перезагрузки страницы.

---

## ⚙️ Как запустить проект

```
git clone <ссылка на репозиторий>
cd lab2
docker compose up -d --build
```

- `http://localhost:8080` — страница `phpinfo()`
- `http://localhost:8080/form.html` — форма

Перезагрузка конфига Nginx после правок:

```
docker compose exec nginx nginx -s reload
```

Остановка: `docker compose down`

---

## 📂 Содержимое проекта

- `docker-compose.yml` — сервисы `nginx` и `php` (php:8.2-fpm, порт 9000 внутри сети)
- `nginx/default.conf` — конфиг Nginx с секцией `location ~ \.php$` и `fastcgi_pass php:9000`
- `www/index.php` — `phpinfo()`
- `www/form.html` — форма «Регистрация студента»
- `www/form.js` — обработка формы на JavaScript

---

## 🧪 Ход работы

1. **PHP-FPM.** В `docker-compose.yml` добавлен сервис `php` (`php:8.2-fpm`, том `./www:/var/www/html`, `expose: 9000`), в `nginx` добавлено `depends_on: php`.
2. **Настройка Nginx.** В `nginx/default.conf` добавлена секция `location ~ \.php$`: запросы на `.php` передаются в PHP-FPM по FastCGI (`fastcgi_pass php:9000`). Конфиг применён командой `nginx -s reload`.
3. **Проверка PHP.** `www/index.php` с `phpinfo()` открывается на `http://localhost:8080` и показывает информацию о PHP.
4. **Форма.** В `www/form.html` созданы поля: имя (text), возраст (number), факультет (select), «Согласен с правилами» (checkbox), форма обучения (radio: очная/заочная), кнопка отправки.
5. **JavaScript.** В `form.js` на событие `submit` вызывается `preventDefault()`, данные собираются через `FormData` и выводятся в `div#result`, дополнительно показывается `alert`.

---

## ✅ Результат

Nginx работает вместе с PHP-FPM, `phpinfo()` отображается, форма обрабатывается на JS без перезагрузки страницы.
