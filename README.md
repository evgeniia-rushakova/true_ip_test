# true_ip_test

<code>Установка: npm install</code><br>
<code>Запуск: node server.js</code><br>
<code>Название БД: rushakova (app/config/config.json), настройки там же</code><br>
<code>Если вы захотите проверить другие CSV, то в app\controllers\uploadFileController.js поменять разделитель в переменной csvSeparator</code><br>       
<h4>Задание:</h4>
<p>Создайте страницу, на которой можно загрузить файл csv, отправить его на сервер и занести в базу данных данные из файла, структура таблицы в базе данных и файла csv по вашему усмотрению. Также чтобы получить доступ к данной странице нужно авторизоваться на странице авторизации введя логин и пароль.
   
   Пишем на Node.js
   Для авторизации используем passport.js
   Для работы с базой данных ORM - Sequalize.js
   База данных по вашему усмотрению.
   Внешний вид страниц  по вашему усмотрению.
   Для парсинга csv файлов можете использовать любой пакет node.js по желанию</p>
   <h4>Использованные инструменты:</h4>
   <ul>
       <li>"bcrypt-nodejs"</li>
       <li>"body-parser"</li>
       <li>"csv-parser"</li>
       <li>"dotenv"</li>
       <li>"express"</li>
       <li>"express-handlebars"</li>
       <li>"express-session"</li>
       <li>"iconv-lite"</li>
       <li>"multer"</li>
       <li>"mysql""</li>
       <li>"mysql2"</li>
       <li>"nodemon"</li>
       <li>"opn"</li>
       <li>"passport"</li>
       <li>"passport-local"</li>
       <li>"sequelize"</li>
   </ul>
Примеры CSV-файлов - <i>TemplateImportEmpl.csv и TemplateImportEmpl2.csv</i>, лежат в корне репозитория.