// ===== KINTAMIEJI =====
const loginScreen = document.getElementById('login-screen');
const educationScreen = document.getElementById('education-screen');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const phishingForm = document.getElementById('phishing-form');
const emailInput = document.getElementById('email');
const passwordGroup = document.getElementById('password-group');
const createAccountBtn = document.getElementById('create-account');
const learnMoreBtn = document.getElementById('learn-more');
const forgotLink = document.getElementById('forgot-link');
const guestLink = document.getElementById('guest-link');

// ===== FUNKCIJOS =====

// Perjungti tarp prisijungimo ir mokymosi ekranų
function switchToEducation() {
    loginScreen.classList.remove('active');
    educationScreen.classList.add('active');
    
    // Papildomas patikrinimo efektas
    document.title = "Sveikiname! Atpažinote phishing simuliaciją";
    
    // Galima pridėti scroll į viršų
    window.scrollTo(0, 0);
}

function switchToLogin() {
    educationScreen.classList.remove('active');
    loginScreen.classList.add('active');
    document.title = "Gmail – Saugumo pratimas";
    
    // Išvalyti formą
    emailInput.value = '';
    if (passwordGroup.classList.contains('hidden')) {
        passwordGroup.classList.add('hidden');
    }
}

// Imituoti "prisijungimo" proceso etapus
function handleNextButton() {
    const email = emailInput.value.trim();
    
    if (email === '') {
        // Jei laukas tuščias, pridėti vizualinę klaidą
        emailInput.style.borderColor = '#d93025';
        emailInput.style.boxShadow = '0 0 0 2px rgba(217, 48, 37, 0.2)';
        
        setTimeout(() => {
            emailInput.style.borderColor = '';
            emailInput.style.boxShadow = '';
        }, 1000);
        return;
    }
    
    // Jei slaptažodžio lauko nematome, parodyti jį
    if (passwordGroup.classList.contains('hidden')) {
        passwordGroup.classList.remove('hidden');
        nextBtn.textContent = 'Prisijungti';
        return;
    }
    
    // Jei matome slaptažodžio lauką - pereiti į mokymą
    switchToEducation();
}

// ===== ĮVYKIŲ TVARKYTOJAI =====

// Pagrindiniai mygtukai
nextBtn.addEventListener('click', handleNextButton);

createAccountBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Netgi "Sukurti paskyrą" nukreipia į mokymą
    switchToEducation();
});

backBtn.addEventListener('click', switchToLogin);

// Mokymosi mygtukas
learnMoreBtn.addEventListener('click', function() {
    window.open('https://safeonnet.lt/patarimai/kaip-issvengti-phishing/', '_blank');
});

// Kiti interaktyvūs elementai
forgotLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('⚠️ Tikrame Gmail puslapyje ši nuoroda nuvestų į slaptažodžio atkūrimo formą. Čia ji yra tik demonstracinė.');
});

guestLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('ℹ️ "Naudoti kaip svečias" dažnai yra phishing puslapių taktika, kad greičiau gautų jūsų duomenis.');
});

// Formos pateikimo sustabdymas
phishingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleNextButton();
});

// Interaktyvus URL - galima spustelėti
document.getElementById('fake-url').addEventListener('click', function() {
    const urlText = this.textContent;
    alert(`🔍 ADRESO PATIKRINIMAS:\n\nJūs dabar esate: "${urlText}"\n\nTikras Google prisijungimo adresas turėtų būti:\n"https://accounts.google.com"\n\nPastebėjote skirtumą?`);
});

// ===== PAPILDOMAS REALISTIŠKUMAS =====

// Pakeisti puslapio pavadinimą į "Gmail", kai vartotojas pradeda rašyti
emailInput.addEventListener('focus', function() {
    document.title = "Gmail";
});

emailInput.addEventListener('blur', function() {
    if (document.title === "Gmail" && !educationScreen.classList.contains('active')) {
        document.title = "Gmail – Saugumo pratimas";
    }
});

// Automatiškai perjungti į mokymą po 90 sekundžių neveikimo
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (loginScreen.classList.contains('active')) {
            alert('⏰ Saugumo pranešimas: Jei šis būtų tikras phishing puslapis, jūsų duomenys jau būtų pavogti.\n\nDabar pereiname prie mokymosi.');
            switchToEducation();
        }
    }, 90000); // 90 sekundžių
}

// Nustatyti veiklos sekimą
['click', 'mousemove', 'keypress'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer);
});

// Paleisti laikmatį
resetInactivityTimer();

// ===== INICIJAVIMAS =====
console.log('🔐 Edukacinis phishing simuliatorius užkrautas. Tikslas: mokyti, o ne apgauti.');
console.log('Šiame puslapyje niekada nėra renkami jokie asmeniniai duomenys.');
