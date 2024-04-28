# 1. Temel imajı belirle
FROM node:18-alpine

# 2. İletişim ve açıklamalar için etiketler ekle
LABEL authors="atacan"

# 3. Çalışma dizinini ayarla
WORKDIR /app

# 4. Bağımlılık dosyalarını kopyala (sadece gerekli dosyalar)
COPY package*.json ./

# 5. Bağımlılıkları yükle (RUN komutları arasına `&&` koyarak birleştir)
RUN npm install && npm cache clean --force

# 6. Uygulama dosyalarını kopyala (önbellek kullanımı için sonradan)
COPY . .

# 7. Başlatma komutu (örn., "npm start" veya "node app.js")
CMD ["npm", "start"]
