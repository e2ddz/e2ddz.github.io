// ===== PAGRINDINIAI KINTAMIEJIAI =====
let currentScreen = 'login';
let quizAnswers = {};
let currentQuestion = 1;
const totalQuestions = 5;

// DOM elementai
const screens = {
    login: document.getElementById('login-screen'),
    education: document.getElementById('education-screen'),
    email: document.getElementById('email-simulator-screen'),
    quiz: document.getElementById('quiz-screen')
};

// ===== BENDROS FUNKCIJOS =====

// Perjungti ekranus
function switchScreen(screenName) {
    // Paslėpti visus ekranus
    Object.values(screens).forEach(screen => {
        if (screen) screen.classList.remove('active');
    });
    
    // Rodyti pasirinktą ekraną
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
        currentScreen = screenName;
        
        // Atnaujinti puslapio pavadinimą
        updatePageTitle(screenName);
        
        // Scrollinti į viršų
        window.scrollTo(0, 0);
    }
}

// Atnaujinti puslapio pavadinimą
function updatePageTitle(screenName) {
    const titles = {
        login: 'Gmail – Saugumo pratimas',
        education: 'Phishing simuliacija – Mokymasis',
        email: 'Phishing el. laiško analizė',
        quiz: 'Testas "Ar atpažintum phishing?"'
    };
    
    if (titles[screenName]) {
        document.title = titles[screenName];
    }
}

// ===== PRISIJUNGIMO EKRANAS =====

// Inicializuoti prisijungimo ekraną
function initLoginScreen() {
    const nextBtn = document.getElementById('next-btn');
    const createAccountBtn = document.getElementById('create-account');
    const skipBtn = document.getElementById('skip-to-education');
    const fakeUrlBar = document.getElementById('fakeUrlBar');
    const forgotLink = document.getElementById('forgot-link');
    const guestLink = document.getElementById('guest-link');
    const emailInput = document.getElementById('email');
    const passwordGroup = document.getElementById('password-group');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', handleNextButton);
    }
    
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchScreen('education');
        });
    }
    
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            switchScreen('education');
        });
    }
    
    if (fakeUrlBar) {
        fakeUrlBar.addEventListener('click', () => {
            alert('🔍 ADRESO PATIKRINIMAS:\n\nJūsų adresas: "acc0unt-google.com"\nTikras adresas: "accounts.google.com"\n\nPastebėjote skirtumą? Sukčiai naudoja panašius adresus!');
        });
    }
    
    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('⚠️ Tikrame Gmail puslapyje ši nuoroda vestų į slaptažodžio atkūrimo formą. Čia ji demonstruoja, kaip phishing puslapiai imituoja realius elementus.');
        });
    }
    
    if (guestLink) {
        guestLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('ℹ️ "Naudoti kaip svečias" dažnai yra phishing taktika, skirta greičiau gauti jūsų duomenis.');
        });
    }
    
    // Formos apdorojimas
    if (emailInput) {
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNextButton();
            }
        });
    }
    
    // Automatinis perėjimas po 60s neveikimo
    let inactivityTimer;
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if (currentScreen === 'login') {
                alert('⏰ Saugumo pranešimas: Realioje situacijoje, ilgai neužpildžius formos, phishing puslapis galėtų nukreipti jus į tikrą svetainę arba parodyti klaidą.\n\nDabar pereiname prie mokymosi.');
                switchScreen('education');
            }
        }, 60000);
    }
    
    // Sekti veiklą
    ['click', 'mousemove', 'keypress'].forEach(event => {
        document.addEventListener(event, resetInactivityTimer);
    });
    resetInactivityTimer();
}

// Kito mygtuko apdorojimas
function handleNextButton() {
    const emailInput = document.getElementById('email');
    const passwordGroup = document.getElementById('password-group');
    const nextBtn = document.getElementById('next-btn');
    
    if (!emailInput || !passwordGroup || !nextBtn) return;
    
    const email = emailInput.value.trim();
    
    if (email === '') {
        // Rodyti klaidą
        emailInput.style.borderColor = '#d93025';
        emailInput.style.boxShadow = '0 0 0 3px rgba(217, 48, 37, 0.2)';
        
        setTimeout(() => {
            emailInput.style.borderColor = '';
            emailInput.style.boxShadow = '';
        }, 1000);
        return;
    }
    
    // Rodyti slaptažodžio lauką
    if (passwordGroup.classList.contains('hidden')) {
        passwordGroup.classList.remove('hidden');
        nextBtn.textContent = 'Prisijungti';
        
        // Scrollinti į slaptažodžio lauką
        setTimeout(() => {
            document.getElementById('password').focus();
        }, 100);
        return;
    }
    
    // Perėjimas į mokymąsi
    switchScreen('education');
}

// ===== EDUKACINIS EKRANAS =====

function initEducationScreen() {
    const backBtn = document.getElementById('back-btn');
    const toEmailBtn = document.getElementById('to-email-simulator');
    const toQuizBtn = document.getElementById('to-quiz');
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            switchScreen('login');
        });
    }
    
    if (toEmailBtn) {
        toEmailBtn.addEventListener('click', () => {
            switchScreen('email');
        });
    }
    
    if (toQuizBtn) {
        toQuizBtn.addEventListener('click', () => {
            switchScreen('quiz');
        });
    }
}

// ===== EL. PAŠTO SIMULIATORIUS =====

function initEmailSimulator() {
    const checkAnswersBtn = document.getElementById('check-answers');
    const backFromEmailBtn = document.getElementById('back-from-email');
    const toQuizFromEmailBtn = document.getElementById('to-quiz-from-email');
    const phishingButton = document.getElementById('email-phishing-button');
    const checklistItems = document.querySelectorAll('.checklist-item');
    
    // Teisingi atsakymai
    const correctAnswers = [true, true, true, false, true];
    
    if (checkAnswersBtn) {
        checkAnswersBtn.addEventListener('click', checkEmailAnswers);
    }
    
    if (backFromEmailBtn) {
        backFromEmailBtn.addEventListener('click', () => {
            switchScreen('education');
        });
    }
    
    if (toQuizFromEmailBtn) {
        toQuizFromEmailBtn.addEventListener('click', () => {
            switchScreen('quiz');
        });
    }
    
    if (phishingButton) {
        phishingButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            alert('⚠️ REALIOJE SITUACIJOJE: Spustelėję šį mygtuką būtumėte nukreipti į phishing puslapį, kur būtų pavogti jūsų prisijungimo duomenys.\n\nDėmesio: "Nemokami prizai" be jokios priežasties yra tipiškas sukčių taktika!');
            
            // Efektas
            phishingButton.style.background = 'linear-gradient(135deg, #d93025, #ea4335)';
            phishingButton.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                phishingButton.style.background = '';
                phishingButton.style.transform = '';
            }, 500);
        });
    }
    
    // Checklist funkcionalumas
    if (checklistItems.length > 0) {
        checklistItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    // Pašalinti senas klasės
                    item.classList.remove('correct', 'incorrect');
                    
                    // Paslėpti hint'ą
                    const hint = item.querySelector('.hint');
                    if (hint) hint.style.display = 'none';
                });
            }
        });
    }
    
    // Atstatyti simuliatorių
    function resetEmailSimulator() {
        checklistItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox) checkbox.checked = false;
            item.classList.remove('correct', 'incorrect');
        });
        
        const results = document.getElementById('email-results');
        if (results) results.classList.add('hidden');
        
        if (checkAnswersBtn) {
            checkAnswersBtn.innerHTML = '<i class="fas fa-check-circle"></i> Patikrinti atsakymus';
            checkAnswersBtn.disabled = false;
            checkAnswersBtn.onclick = checkEmailAnswers;
        }
    }
    
    window.resetEmailSimulator = resetEmailSimulator;
}

// Tikrinti el. pašto atsakymus
function checkEmailAnswers() {
    const checklistItems = document.querySelectorAll('.checklist-item');
    const results = document.getElementById('email-results');
    const scoreElement = document.getElementById('score');
    const resultMessage = document.getElementById('result-message');
    const checkAnswersBtn = document.getElementById('check-answers');
    
    if (!checklistItems.length || !results || !scoreElement || !resultMessage || !checkAnswersBtn) return;
    
    let score = 0;
    const correctAnswers = [true, true, true, false, true];
    
    checklistItems.forEach((item, index) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const userAnswer = checkbox ? checkbox.checked : false;
        const isCorrect = correctAnswers[index];
        
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
    
    // Pasirinkti žinutę
    let message = '';
    if (score === 5) {
        message = '🎉 Puikiai! Jūs puikiai atpažįstate phishing el. laiškus. Jūsų saugumo sąmoningumas yra aukšto lygio!';
    } else
