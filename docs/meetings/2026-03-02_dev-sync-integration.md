# Sprint 4 - Development Sync: Frontend Integration Strategy

**Date**: 2026-03-02
**Participants**: AI Architect (Antigravity), Lead Developer (User)

## 📋 Agenda
- Frontend ile Mikroservisler arası iletişim yöntemi.
- Kimlik doğrulama (Cognito) durum yönetimi.
- Docker-Compose ağ yapılandırması.

## 📝 Discussion Points

### 1. API Communication
- Karar: Frontend, backend servislerine `proxy` üzerinden değil, doğrudan ALB DNS (veya local dev'de docker-compose içindeki servis adları) üzerinden erişecek.
- Teknik Detay: `NEXT_PUBLIC_API_URL` ortam değişkeni kullanılacak. Local'de `http://localhost:3001` (Search), `http://localhost:3002` (Product) vb. üzerinden erişim sağlanacak.

### 2. State Management
- Karar: Sepet ve ürün verileri için şimdilik React Context API ve `aws-amplify` kullanılacak. Karmaşıklık arttığında Redux Toolkit'e geçilebilir.

### 3. Container Network
- Karar: Tüm servisler `ecommerce-network` altında izole edilecek. Frontend sadece ALB (veya local'de localhost portları) üzerinden trafik alacak.

## ✅ Decisions
- [DEC-401] Frontend'de ürün listeleme için Search mikroservisi kullanılacak.
- [DEC-402] Sepet işlemleri Cart mikroservisine asenkron olarak gönderilecek.
- [DEC-403] Login işlemi sonrası User ID, tüm backend çağrılarında `Authorization` header olarak eklenecek.

## 🚀 Next Steps
- Search mikroservisine `/search` endpoint'i üzerinden veri çekme mantığının eklenmesi.
- Frontend'de `ProductCard` ve `Catalog` bileşenlerinin oluşturulması.
