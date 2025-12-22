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
// ===== EL. PAŠTO SIMULIATORIAUS KODAS =====

// DOM elementai
const emailScreen = document.getElementById('email-simulator-screen');
const checkAnswersBtn = document.getElementById('check-answers');
const emailResults = document.getElementById('email-results');
const scoreElement = document.getElementById('score');
const resultMessage = document.getElementById('result-message');
const backFromEmailBtn = document.getElementById('back-from-email');
const nextFromEmailBtn = document.getElementById('next-from-email');
const emailPhishingButton = document.getElementById('email-phishing-button');
const checklistItems = document.querySelectorAll('.checklist-item');

// Teisingi atsakymai (pagal data-correct atributą)
const correctAnswers = [true, true, true, false, true]; // Atitinka 5 klausimus

// Funkcija perjungti į el. pašto simuliatorių
function switchToEmailSimulator() {
    // Paslepti visus ekranus
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Rodyti el. pašto ekraną
    emailScreen.classList.add('active');
    
    // Atstatyti būseną
    resetEmailSimulator();
    
    // Pakeisti puslapio pavadinimą
    document.title = "Phishing el. laiško analizė | Saugumo mokymas";
    
    window.scrollTo(0, 0);
}

// Funkcija atstatyti el. pašto simuliatorių
function resetEmailSimulator() {
    // Išvalyti visus pažymėjimus
    checklistItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox.checked = false;
        item.classList.remove('correct', 'incorrect');
    });
    
    // Paslėpti rezultatus
    emailResults.classList.add('hidden');
    
    // Atstatyti mygtuką
    checkAnswersBtn.innerHTML = '<i class="fas fa-check-circle"></i> Patikrinti atsakymus';
    checkAnswersBtn.disabled = false;
}

// Funkcija patikrinti atsakymus
function checkEmailAnswers() {
    let score = 0;
    const userAnswers = [];
    
    // Surinkti vartotojo atsakymus
    checklistItems.forEach((item, index) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const userAnswer = checkbox.checked;
        const isCorrect = correctAnswers[index];
        
        userAnswers.push({
            userAnswer,
            isCorrect,
            element: item
        });
        
        // Tikrinti ar atsakymas teisingas
        if (userAnswer === isCorrect) {
            score++;
            item.classList.add('correct');
            item.classList.remove('incorrect');
        } else {
            item.classList.add('incorrect');
            item.classList.remove('correct');
        }
    });
    
    // Rodyti rezultatus
    scoreElement.textContent = score;
    
    // Parinkti atitinkamą žinutę
    let message = "";
    if (score === 5) {
        message = "🎉 Puikiai! Jūs puikiai atpažįstate phishing el. laiškus. Jūsų saugumo sąmoningumas yra aukšto lygio!";
    } else if (score >= 3) {
        message = "✅ Gerai! Jūs atpažįstate daugumą phishing ženklų, bet dar yra ką tobulinti. Peržiūrėkite klaidas ir išmoksite daugiau.";
    } else {
        message = "📚 Reikia daugiau praktikos! Dauguma phishing atakų prasideda nuo el. laiškų. Atidžiai perskaitykite paaiškinimus ir bandykite dar kartą.";
    }
    
    resultMessage.textContent = message;
    emailResults.classList.remove('hidden');
    
    // Atnaujinti mygtuką
    checkAnswersBtn.innerHTML = '<i class="fas fa-redo"></i> Bandyti dar kartą';
    checkAnswersBtn.disabled = true;
    
    // Leisti bandyti dar kartą po 3 sekundžių
    setTimeout(() => {
        checkAnswersBtn.disabled = false;
        checkAnswersBtn.onclick = function() {
            resetEmailSimulator();
        };
    }, 3000);
    
    // Scrollinti į rezultatus
    emailResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Mygtuko "Gauti prizą" elgsena
emailPhishingButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Rodyti įspėjimą
    alert('⚠️ REALIOJE SITUACIJOJE: Spustelėję šį mygtuką būtumėte nukreipti į phishing puslapį, kur būtų pavogti jūsų prisijungimo duomenys.\n\nŠioje simuliacijoje mygtukas nieko neveikia - tai tik demonstracija.');
    
    // Paryškinti šį elementą kaip įtartiną
    this.style.background = 'linear-gradient(135deg, #d93025, #ea4335)';
    this.style.boxShadow = '0 4px 12px rgba(217, 48, 37, 0.4)';
    
    setTimeout(() => {
        this.style.background = '';
        this.style.boxShadow = '';
    }, 2000);
});

// Įvykių tvarkytuvai
checkAnswersBtn.addEventListener('click', checkEmailAnswers);

backFromEmailBtn.addEventListener('click', function() {
    // Grįžti į pagrindinį simuliatorių
    switchToLogin(); // Naudojame jau esančią funkciją
});

nextFromEmailBtn.addEventListener('click', function() {
    // Čia galite pridėti perėjimą prie kito pratimo (pvz., interaktyvaus testo)
    alert('Ši funkcija bus įgyvendinta ateityje! Dabar grįžtame į pagrindinį simuliatorių.');
    switchToLogin();
});

// Patikrinti ar visi reikalingi elementai egzistuoja
if (emailScreen && checkAnswersBtn) {
    console.log('✅ El. pašto simuliatoriaus komponentas užkrautas sėkmingai.');
    
    // Eksportuoti funkciją, kad galėtume ją iškviesti iš kitų dalių
    window.switchToEmailSimulator = switchToEmailSimulator;
}

// ===== INICIJAVIMAS =====
console.log('🔐 Edukacinis phishing simuliatorius užkrautas. Tikslas: mokyti, o ne apgauti.');
console.log('Šiame puslapyje niekada nėra renkami jokie asmeniniai duomenys.');
