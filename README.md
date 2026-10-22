# Важное Решение: сайт каркасных домов

React + Vite + Tailwind CSS. Публикуется на GitHub Pages автоматически при каждом пуше в ветку `main`.

## Структура
- `src/App.jsx`: все блоки страницы (шапка, главный экран, каталог, квиз, калькулятор, комплектации, разрез стены, подвал и т. д.)
- `src/data.js`: данные: проекты, цены, фильтры, вопросы квиза, текст политики, этапы эскроу
- `src/images.js` и `public/images/`: фотографии и планировки. Чтобы заменить фото, положите новый файл с тем же именем
- `public/logo.svg`: логотип
- `src/submit.js`: отправка заявок и Яндекс Метрика
- `.github/workflows/deploy.yml`: автоматическая публикация

## Запуск у себя
```bash
npm install
npm run dev       # разработка: http://localhost:5173
npm run build     # продакшен-сборка в папку dist
```
После первого `npm install` закоммитьте появившийся `package-lock.json`.

## Публикация на GitHub Pages
1. Создайте репозиторий на GitHub и загрузите в него эти файлы (ветка `main`).
2. Settings -> Pages -> Build and deployment -> Source: **GitHub Actions**.
3. Любой `git push` в `main` запускает сборку. Адрес сайта появится на вкладке Actions и в Settings -> Pages.

## Свой домен
Для адреса вида `house.creditvr.ru`: добавьте у DNS-провайдера запись CNAME на `<ваш-логин>.github.io`, создайте файл `public/CNAME` с одной строкой `house.creditvr.ru` и укажите домен в Settings -> Pages. Адрес с путём `creditvr.ru/house` на GitHub Pages не настроить: для него нужен ваш сервер или проксирование.

## Заявки
GitHub Pages только отдаёт файлы и сам заявки принять не может. Формы вызывают `window.VR_SUBMIT(payload)` (см. `src/submit.js`), который отправляет JSON на адрес из переменной `VITE_LEAD_ENDPOINT`. Адрес должен вести на ваш сервер, облачную функцию или вебхук CRM (Битрикс24, amoCRM) или Telegram-бота. Токены и пароли в код страницы не кладите: он виден всем.

Переменные задаются в Settings -> Secrets and variables -> Actions -> Variables: `VITE_LEAD_ENDPOINT`, `VITE_METRIKA_ID` (ID счётчика Яндекс Метрики; при заявках отправляются цели `lead_quiz` и `lead_modal`).

## Работа с Claude Code
Откройте папку проекта в Claude Code и ставьте задачи словами («замени фото проекта 69», «добавь блок отзывов»). Он правит файлы, проверяет сборку командой `npm run build` и делает `git commit` и `git push`, после чего сайт обновляется сам.
