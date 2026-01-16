const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Plik z danymi użytkowników
const usersFile = path.join(__dirname, 'users.json');

// Inicjalizuj plik jeśli nie istnieje
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify({}));
}

// Odczytaj użytkowników
function getUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  } catch {
    return {};
  }
}

// Zapisz użytkowników
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Hash hasła
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// REJESTRACJA
app.post('/api/register', (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
  }
  
  if (password !== passwordConfirm) {
    return res.status(400).json({ error: 'Hasła się nie zgadzają' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Hasło musi mieć co najmniej 6 znaków' });
  }
  
  const users = getUsers();
  
  if (users[email]) {
    return res.status(400).json({ error: 'Ten email już istnieje' });
  }
  
  users[email] = {
    username,
    email,
    password: hashPassword(password),
    createdAt: new Date().toISOString()
  };
  
  saveUsers(users);
  
  res.json({
    success: true,
    user: { username, email }
  });
});

// LOGOWANIE
app.post('/api/login', (req, res) => {
  const { input, password } = req.body;
  
  if (!input || !password) {
    return res.status(400).json({ error: 'Email/nazwa i hasło są wymagane' });
  }
  
  const users = getUsers();
  const hashedPassword = hashPassword(password);
  
  let foundUser = null;
  for (let email in users) {
    const user = users[email];
    if ((user.email === input || user.username === input) && user.password === hashedPassword) {
      foundUser = { username: user.username, email: user.email };
      break;
    }
  }
  
  if (foundUser) {
    res.json({
      success: true,
      user: foundUser,
      token: crypto.randomBytes(32).toString('hex')
    });
  } else {
    res.status(401).json({ error: 'Błędny email/nazwa lub hasło' });
  }
});

// Sprawdź dostępne użytkowniki (dla debugowania)
app.get('/api/users-count', (req, res) => {
  const users = getUsers();
  res.json({ count: Object.keys(users).length });
});

app.listen(PORT, () => {
  console.log(`🚀 Serwer uruchomiony na http://localhost:${PORT}`);
});
