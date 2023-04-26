<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

Parsisiuntus projektą, būtina pasidaryti .env.example kopiją,
ir ją pervadinti į .env (taip suaktyvinamas laravel config failiukas).
**Šis žingsnis atliekamas tik vieną kart kai projektas yra šviežiai parsisiūstas.**

.env faile prijungti mongodb duomenų bazę vietoj mysql:
"
DB_CONNECTION=mongodb
DB_MONGO_PORT=27017
DB_MONGO_DATABASE=<nurodomas duomenų bazės pavadinimas>
DB_MONGO_DSN=mongodb://localhost:27017/
"
database.php faile prie connections prirašyti :
'mongodb' => [
'driver' => 'mongodb',
'dsn' => env('DB_MONGO_DSN'),
'database' => env('DB_MONGO_DATABASE'),
],
'database.php' failas randasi config kataloge po bootstrap

Kad mongodb veiktų, reikia turėti mongodb.dll papildinį.
Jį galima parsisiūsti iš https://github.com/mongodb/mongo-php-driver/releases/tag/1.15.0
Šiame projekte naudojama **8.1** php versija.
Parsisiuntus zip failą, iš jo iškelti php_mongodb.dll į **C:\xampp\php\ext** folderį
Po to suaktyvinti šį .dll failą **php.ini** tekstiniame faile įrašant **extension=php_mongodb.dll**
Eilutė įrašoma prie .dll papildinių (extensions) skilties

Kad atnaujinti ar atsisiūsti esamus komponentus naudojame **composer update**

**Sanctum api naudojimas**
PersonalAccessToken.php faile vietoj default Eloquent reikia naudoti mongodb modelį.

Įrašome npm package komponentą į projektą su komanda **npm install**

Paleidžiame kompiliatorių su **npm run dev**

Sukuriame duomenų bazių lenteles paleidžiant migraciją: **php artisan migrate**

Paruoštas projektas paleidžiamas lokaliam serveryje naudojant **php artisan serve**






