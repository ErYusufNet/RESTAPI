// Gerekli modülleri içe aktarıyoruz.
import express from 'express';  // Express framework'ü, REST API oluşturmak için kullanılır.
import http from 'http';  // Node.js'in HTTP modülü, sunucuyu başlatmak için kullanılır.
import bodyParser from 'body-parser';  // JSON formatındaki HTTP istek gövdelerini (body) okumaya yarar.
import cookieParser from 'cookie-parser';  // Kullanıcının tarayıcısından gelen çerezleri işler.
import compression from 'compression';  // Sunucu yanıtlarını sıkıştırarak performansı artırır.
import cors from 'cors';  // Farklı kaynaklardan (domain) gelen isteklerin kabul edilmesini sağlar.
import mongoose from 'mongoose';

const app = express();  // Yeni bir Express uygulaması oluşturuyoruz.

// CORS Middleware
app.use(cors({
    credentials: true,  // Tarayıcıdan gelen kimlik bilgileri (çerezler, oturumlar) kabul edilir.
}));

// Gzip Sıkıştırma Middleware
app.use(compression());  // Yanıtları sıkıştırarak daha hızlı veri iletimi sağlar.

// Çerez Yönetimi Middleware
app.use(cookieParser());  // Kullanıcının gönderdiği çerezleri `req.cookies` içinde erişilebilir hale getirir.

// JSON Gövde İşleme Middleware
app.use(bodyParser.json());  // Gelen isteklerdeki JSON verileri işleyecek şekilde ayarlar.

// HTTP Sunucusunu Başlatma
const server = http.createServer(app);  // Express uygulamasını bir HTTP sunucusuna bağlıyoruz.

// Sunucuyu belirtilen portta dinlemeye başlatıyoruz.
server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});

// MongoDB bağlantı URL'si (!!! Gerçek bağlantı bilgilerini paylaşmak güvenli değildir, .env dosyasında saklayın !!!)
const MONGO_URL = 'mongodb+srv://yusufernet:Aleyna.01@cluster0.7colf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Mongoose'un Promise altyapısını JavaScript'in native (yerel) Promise yapısı ile kullanmasını sağlıyoruz.
mongoose.Promise = Promise;  
/*
 * 📌 Promise Nedir?
 * - JavaScript'te "Promise", asenkron işlemleri yönetmek için kullanılan bir yapıdır.
 * - Bir işlemin tamamlanmasını beklemek için kullanılır.
 * - Üç durumu vardır: 
 *   1️⃣ Pending (Beklemede)
 *   2️⃣ Resolved (Başarılı)
 *   3️⃣ Rejected (Hata)
 * - `then()` ile başarılı sonucu yakalarız, `catch()` ile hataları yakalarız.
 */

// MongoDB'ye bağlanıyoruz.
mongoose.connect(MONGO_URL)
    .then(() => console.log('✅ MongoDB bağlantısı başarılı!'))  // Bağlantı başarılı olursa mesaj yazdır.
    .catch((error) => console.log('❌ MongoDB bağlantı hatası:', error));  // Hata olursa hata mesajını göster.

// Bağlantı sırasında oluşan hataları dinliyoruz.
mongoose.connection.on('error', (error: Error) => console.log('❌ MongoDB Hatası:', error));

