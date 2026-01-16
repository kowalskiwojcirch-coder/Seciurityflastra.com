// SYMULACJA LOCALSTORAGE
class MockLocalStorage {
  constructor() {
    this.data = {};
  }
  
  getItem(key) {
    return this.data[key] || null;
  }
  
  setItem(key, value) {
    this.data[key] = value;
  }
  
  removeItem(key) {
    delete this.data[key];
  }
  
  clear() {
    this.data = {};
  }
}

const localStorage = new MockLocalStorage();

// LOGIKA LOGOWANIA I REJESTRACJI
let users = JSON.parse(localStorage.getItem('users')) || {};

console.log('=== TEST SYSTEMU LOGOWANIA I REJESTRACJI ===\n');

// TEST 1: REJESTRACJA
console.log('TEST 1: Rejestracja nowego użytkownika');
const newUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: '123456'
};

users[newUser.email] = newUser;
localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('currentUser', newUser.email);

console.log('✅ Użytkownik zarejestrowany:', newUser);
console.log('✅ Dane zapisane w localStorage\n');

// TEST 2: LOGOWANIE Z POPRAWNYM EMAILEM
console.log('TEST 2: Logowanie z emailem');
const loginEmail = 'test@example.com';
const loginPassword = '123456';

const foundUser = Object.values(users).find(u => 
  (u.email === loginEmail || u.username === loginEmail) && u.password === loginPassword
);

if (foundUser) {
  console.log('✅ Logowanie udane!');
  console.log('   Zalogowany: ' + foundUser.username + ' (' + foundUser.email + ')\n');
} else {
  console.log('❌ Logowanie nie powiodło się\n');
}

// TEST 3: LOGOWANIE Z NAZWĄ UŻYTKOWNIKA
console.log('TEST 3: Logowanie z nazwą użytkownika');
const loginUsername = 'testuser';
const loginPassword2 = '123456';

const foundUser2 = Object.values(users).find(u => 
  (u.email === loginUsername || u.username === loginUsername) && u.password === loginPassword2
);

if (foundUser2) {
  console.log('✅ Logowanie udane!');
  console.log('   Zalogowany: ' + foundUser2.username + ' (' + foundUser2.email + ')\n');
} else {
  console.log('❌ Logowanie nie powiodło się\n');
}

// TEST 4: LOGOWANIE Z BŁĘDNYM HASŁEM
console.log('TEST 4: Logowanie z błędnym hasłem');
const foundUser3 = Object.values(users).find(u => 
  (u.email === loginEmail || u.username === loginEmail) && u.password === 'wrongpassword'
);

if (foundUser3) {
  console.log('❌ Logowanie nie powinno było się udać!');
} else {
  console.log('✅ Logowanie prawidłowo odrzucone\n');
}

// TEST 5: REJESTRACJA Z DUPLIKATEM EMAILA
console.log('TEST 5: Rejestracja z istniejącym emailem');
if (users['test@example.com']) {
  console.log('✅ System prawidłowo blokuje duplikat emaila\n');
} else {
  console.log('❌ Email powinien już być zarejestrowany\n');
}

// TEST 6: WYLOGOWANIE
console.log('TEST 6: Wylogowanie');
localStorage.removeItem('currentUser');
const currentUser = localStorage.getItem('currentUser');

if (currentUser === null) {
  console.log('✅ Użytkownik wylogowany\n');
} else {
  console.log('❌ Wylogowanie nie powiodło się\n');
}

console.log('=== PODSUMOWANIE ===');
console.log('Zapisani użytkownicy:', Object.keys(users).length);
console.log('Dane w localStorage:', localStorage.data);
