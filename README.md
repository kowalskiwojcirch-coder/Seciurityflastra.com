# Security Flastra - Multi-Device Login System

## 🎯 Funkcjonalność

System logowania i rejestracji, który pozwala na dostęp do tego samego konta z różnych urządzeń.

### Cechy:
- ✅ Rejestracja użytkowników
- ✅ Logowanie z emailem lub nazwą użytkownika
- ✅ Dostęp z telefonu, tabletu i komputera
- ✅ Bezpieczne przechowywanie haseł (SHA256)
- ✅ Walidacja danych
- ✅ Responsywny interfejs

## 🚀 Jak uruchomić

### 1. Instalacja zależności
```bash
npm install
```

### 2. Uruchomienie serwera
```bash
npm start
```

Serwer będzie dostępny na: **http://localhost:3000**

### 3. Otwórz aplikację
- Wejdź na stronę: http://localhost:3000/login.html
- Lub: http://localhost:3000/projekt/login.html

## 📱 Logowanie na innych urządzeniach

1. Upewnij się że serwer jest uruchomiony na komputerze
2. Sprawdź IP komputera: `ipconfig` (Windows) lub `ifconfig` (Linux/Mac)
3. Na telefonie zmień w login.html URL serwera z `localhost` na IP komputera:
   ```javascript
   const API_URL = 'http://192.168.1.100:3000';  // zamień IP
   ```

## 📊 Struktury plików

```
/workspaces/Seciurityflastra.com/
├── login.html           # Formularz logowania
├── secretary.html       # Strona sekretariatu
├── style.css           # Style CSS
├── server.js           # Backend Node.js
├── package.json        # Zależności
├── users.json          # Baza użytkowników (automatycznie tworzona)
└── projekt/            # Kopia projektu
    ├── login.html
    ├── secretary.html
    └── style.css
```

## 🔐 API Endpoints

### Rejestracja
```
POST /api/register
Body: { username, email, password, passwordConfirm }
Response: { success: true, user: { username, email } }
```

### Logowanie
```
POST /api/login
Body: { input, password }
Response: { success: true, user: { username, email }, token }
```

### Sprawdzenie liczby użytkowników
```
GET /api/users-count
Response: { count: 5 }
```

## 💾 Dane użytkowników

Dane są przechowywane w pliku `users.json` w formacie:
```json
{
  "email@example.com": {
    "username": "john",
    "email": "email@example.com",
    "password": "sha256_hash",
    "createdAt": "2025-01-16T..."
  }
}
```

## ⚙️ Wymagania

- Node.js (v14+)
- npm

## 📝 Licencja

© 2024-2026 Security Flastra. Wszystkie prawa zastrzeżone.
