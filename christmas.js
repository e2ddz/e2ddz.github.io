// ===== KINTAMIEJIAI =====
let snowScore = 0;
let cookieCount = 0;
let lightsOn = true;
let currentTheme = 'blue';
let isPlaying = false;
let currentGreeting = 0;

// Kalėdų linkėjimai
const greetings = [
    "Sveikinu su Kalėdomis! Tegul šios šventės atneša tau daug džiaugsmo, šilumos ir laimės! 🎅",
    "Linkiu stalo kupino, namuose šilumos, širdyje - meilės! Linksmų Kalėdų! 🎄",
    "Tegul Kalėdos būna kupinos stebuklų, o Kūčios - šeimos ir draugų! 🦌",
    "Šviesių, linksmų ir ramių švenčių! Tegul šiais Kalėdomis išsipildo jūsų svajonės! ⭐",
    "Sveikiname su Kūčių vakaru ir Kalėdomis! Tegul šventės atneša daug laimės! 🎁"
];

// Dainos
const songs = [
    { 
        title: "Kalėdų Eglutė", 
        artist: "Tradicinė Kalėdų daina",
        lyrics: "Kalėdų eglutė, kaip tu graži, su savo žiburiais ir žvaigždėm..."
    },
    { 
        title: "Linksmų Kalėdų", 
        artist: "Kalėdinė daina",
        lyrics: "Linksmų Kalėdų ir Laimingų Naujųjų Metų visiems šeimos nariams!"
    },
    { 
        title: "Šalta Žiemelė", 
        artist: "Žiemos daina",
        lyrics: "Šalta žiemelė, sniegas baltas, eglutė šventėms jau paruošta..."
    }
];

// ===== PAGRINDINĖS FUNKCIJOS =====

// Inicializuoti puslapį
function initChristmasPage() {
    createSnowflakes();
    updateCountdown();
    setupEventListeners();
    setInterval(updateCountdown, 1000);
}

// Sukurti sniego efektą
function createSnowflakes() {
    const snowContainer = document.querySelector('.snowflakes');
    if (!snowContainer) return;
    
    // Išvalyti senus snaigius
    snowContainer.innerHTML = '';
    
    // Sukurti 50 snaigiu
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Atsitiktiniai parametrai
        const size = Math.random() * 10 + 5;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${startX}vw`;
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        
        snowContainer.appendChild(snowflake);
    }
}

// Atnaujinti atgalinio skaičiavimą
function updateCountdown() {
    const now = new Date();
    const christmas = new Date(now.getFullYear(), 11, 25); // Gruodžio 25
    
    // Jei Kalėdos jau praėjo, skaičiuoti kitų metų
    if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
    }
    
    const diff = christmas - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Atnaujinti DOM
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Nustatyti įvykių klausytojus
function setupEventListeners() {
    // Keisti linkėjimą
    document.getElementById('change-greeting')?.addEventListener('click', changeGreeting);
    
    // Asmeninis linkėjimas
    document.getElementById('personalize-btn')
