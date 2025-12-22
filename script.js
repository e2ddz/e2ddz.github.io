// Simuliacijos būsenos
let currentVirus = null;
let simulationActive = false;
let logs = [];

// DOM elementai
const screenContent = document.getElementById('screenContent');
const logContainer = document.getElementById('logContainer');
const startBtn = document.getElementById('startSimulation');
const cureBtn = document.getElementById('cureVirus');
const resetBtn = document.getElementById('resetAll');
const activateBtns = document.querySelectorAll('.activate-btn');

// VIRUSŲ APIBRĖŽIMAI
const viruses = {
    trojan: {
        name: "Trojan Arklys",
        color: "#ff6b6b",
        icon: "fas fa-horse-head",
        description: "Pasitikėjimo programa su paslėptu pavojingu kodu",
        effects: [
            { type: "message", text: "❗ TROJAN ARKLYS AKTYVUOTAS!", delay: 0 },
            { type: "message", text: "🔄 Įkeliama apsaugos pažeidimo programa...", delay: 1000 },
            { type: "message", text: "📁 Sukuriami netikri sistemos failai...", delay: 2000 },
            { type: "animation", effect: "glitch", delay: 3000 },
            { type: "message", text: "⚠️ Jūsų slaptažodžiai gali būti pavogti!", delay: 4000 },
            { type: "animation", effect: "files", delay: 5000 }
        ]
    },
    
    ransomware: {
        name: "Išpirkos Virusas",
        color: "#ffd93d",
        icon: "fas fa-lock",
        description: "Užšifruoja failus ir reikalauja išpirkos",
        effects: [
            { type: "message", text: "🔒 IŠPIRKOS VIRUSAS AKTYVUOTAS!", delay: 0 },
            { type: "message", text: "📊 Skenuojami jūsų asmeniniai failai...", delay: 1000 },
            { type: "message", text: "🔐 Šifruojami dokumentai, nuotraukos, failai...", delay: 2000 },
            { type: "animation", effect: "lock", delay: 3000 },
            { type: "message", text: "💸 Reikalaujama išpirkos: 0.5 BTC", delay: 4000 },
            { type: "message", text: "⏳ Liko laiko: 23:59:59", delay: 5000 }
        ]
    },
    
    worm: {
        name: "Kompiuterinis Kirminas",
        color: "#6bcf7f",
        icon: "fas fa-worm",
        description: "Savaime plintantis ir dauginantis virusas",
        effects: [
            { type: "message", text: "🪱 KOMPIUTERINIS KIRMINAS AKTYVUOTAS!", delay: 0 },
            { type: "message", text: "🔄 Kirminas dauginasi...", delay: 1000 },
            { type: "message", text: "📧 Siunčiama infekuotų el. laiškų kopijos...", delay: 2000 },
            { type: "animation", effect: "spread", delay: 3000 },
            { type: "message", text: "🌐 Jungiamasi prie kaimyninių įrenginių...", delay: 4000 },
            { type: "message", text: "📈 Užkrėsta: 127 įrenginių", delay: 5000 }
        ]
    }
};

// FUNKCIJOS
function addLog(message, type = "info") {
    const time = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `
        <span class="log-time">[${time}]</span>
        <span class="log-text">${message}</span>
    `;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
    
    logs.push({ time, message, type });
}

function clearScreen() {
    screenContent.innerHTML = '';
    screenContent.classList.remove('glitch-effect', 'pulse-effect');
}

function showNormalState() {
    clearScreen();
    screenContent.innerHTML = `
        <div class="normal-state">
            <i class="fas fa-desktop"></i>
            <h3>SISTEMA VEIKIA NORMALU</h3>
            <p>Pasirinkite viruso tipą simuliacijai pradėti</p>
        </div>
    `;
    document.querySelector('.screen').style.borderColor = '#333';
}

function activateVirus(virusType) {
    if (simulationActive) return;
    
    const virus = viruses[virusType];
    if (!virus) return;
    
    currentVirus = virusType;
    
    addLog(`Pasirinktas virusas: ${virus.name}`, "warning");
    addLog("Paruošiama simuliacija...", "info");
    
    // Atnaujinti ekraną
    clearScreen();
    screenContent.innerHTML = `
        <div class="normal-state fade-in">
            <i class="${virus.icon}" style="color: ${virus.color}; font-size: 4em;"></i>
            <h3>${virus.name.toUpperCase()}</h3>
            <p>${virus.description}</p>
            <p style="margin-top: 20px; color: ${virus.color};">Simuliacija paruošta. Spauskite "Pradėti Simuliaciją"</p>
        </div>
    `;
    
    document.querySelector('.screen').style.borderColor = virus.color;
    
    addLog(`"${virus.name}" simuliacija paruošta.`, "success");
}

function startSimulation() {
    if (!currentVirus || simulationActive) return;
    
    const virus = viruses[currentVirus];
    simulationActive = true;
    
    addLog(`Pradedama "${virus.name}" simuliacija...`, "danger");
    
    // Atnaujinti ekraną
    clearScreen();
    screenContent.innerHTML = `
        <div class="virus-simulation fade-in">
            <i class="${virus.icon}" style="color: ${virus.color}; font-size: 3em;"></i>
            <h3 style="color: ${virus.color};">${virus.name.toUpperCase()}</h3>
            <div id="simulationMessages"></div>
        </div>
    `;
    
    const messagesDiv = document.getElementById('simulationMessages');
    
    // Vykdyti visus efektus
    virus.effects.forEach((effect, index) => {
        setTimeout(() => {
            switch(effect.type) {
                case 'message':
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'simulation-message fade-in';
                    messageDiv.style.color = virus.color;
                    messageDiv.style.margin = '10px 0';
                    messageDiv.innerHTML = effect.text;
                    messagesDiv.appendChild(messageDiv);
                    
                    addLog(effect.text.replace(/[^\w\s]/g, ''), "warning");
                    break;
                    
                case 'animation':
                    if (effect.effect === 'glitch') {
                        screenContent.classList.add('glitch-effect');
                        setTimeout(() => {
                            screenContent.classList.remove('glitch-effect');
                        }, 1000);
                        addLog("Sistema patiria trikdžius (glitch efektas)", "danger");
                    } else if (effect.effect === 'lock') {
                        screenContent.classList.add('pulse-effect');
                        addLog("Failai užrakinti (pulsavimo efektas)", "danger");
                    } else if (effect.effect === 'spread') {
                        const wormDiv = document.createElement('div');
                        wormDiv.innerHTML = '🪱🪱🪱 Kirminas plinta... 🪱🪱🪱';
                        wormDiv.style.color = virus.color;
                        wormDiv.style.fontSize = '1.2em';
                        wormDiv.style.margin = '20px 0';
                        messagesDiv.appendChild(wormDiv);
                        addLog("Kirminas plinta tinkle", "warning");
                    }
                    break;
            }
        }, effect.delay);
    });
    
    // Baigimo pranešimas
    setTimeout(() => {
        const finishDiv = document.createElement('div');
        finishDiv.className = 'simulation-finish fade-in';
        finishDiv.style.marginTop = '30px';
        finishDiv.style.padding = '20px';
        finishDiv.style.background = 'rgba(255, 0, 0, 0.1)';
        finishDiv.style.borderRadius = '10px';
        finishDiv.style.border = `2px solid ${virus.color}`;
        finishDiv.innerHTML = `
            <h4><i class="fas fa-skull-crossbones"></i> SIMULIACIJA ĮVYKDYTA!</h4>
            <p>Šis efektas būtų pavojingas realiame pasaulyje.</p>
            <p style="font-size: 0.9em; margin-top: 10px;"><i class="fas fa-shield-alt"></i> Spauskite "Išgydyti Sistemą" atstatyti</p>
        `;
        messagesDiv.appendChild(finishDiv);
        
        addLog(`"${virus.name}" simuliacija sėkmingai įvykdyta.`, "danger");
        addLog("Dėmesio: realus toks virusas būtų labai pavojingas!", "warning");
    }, 6000);
}

function cureSystem() {
    if (!simulationActive) return;
    
    addLog("Pradedamas sistemos išgydymas...", "info");
    
    clearScreen();
    screenContent.innerHTML = `
        <div class="cure-process fade-in">
            <i class="fas fa-syringe" style="color: #6bcf7f; font-size: 4em;"></i>
            <h3 style="color: #6bcf7f;">SISTEMOS IŠGYDYMAS</h3>
            <div id="cureProgress"></div>
        </div>
    `;
    
    const progressDiv = document.getElementById('cureProgress');
    
    // Simuliuoti išgydymo procesą
    const steps = [
        { text: "🔍 Ieškoma kenksmingo kodo...", delay: 0 },
        { text: "🧹 Šalinami infekuoti failai...", delay: 1000 },
        { text: "🛡️ Atkuriama apsauga...", delay: 2000 },
        { text: "✅ Sistemos patikra...", delay: 3000 },
        { text: "🎉 SISTEMA IŠGYDYTA!", delay: 4000 }
    ];
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'cure-step fade-in';
            stepDiv.style.margin = '10px 0';
            stepDiv.style.color = '#6bcf7f';
            stepDiv.innerHTML = step.text;
            progressDiv.appendChild(stepDiv);
            
            addLog(step.text.replace(/[^\w\s]/g, ''), "success");
            
            if (index === steps.length - 1) {
                simulationActive = false;
                currentVirus = null;
                
                setTimeout(() => {
                    showNormalState();
                    addLog("Sistema visiškai atstatyta ir saugi.", "success");
                }, 2000);
            }
        }, step.delay);
    });
}

function resetAll() {
    currentVirus = null;
    simulationActive = false;
    
    showNormalState();
    
    // Išvalyti žurnalą, paliekant pirmą įrašą
    logContainer.innerHTML = `
        <div class="log-entry info">
            <span class="log-time">[00:00:00]</span>
            <span class="log-text">Sistema inicijuota. Simuliatorius pasiruošęs.</span>
        </div>
    `;
    
    logs = [{ time: "00:00:00", message: "Sistema inicijuota. Simuliatorius pasiruošęs.", type: "info" }];
    
    document.querySelector('.screen').style.borderColor = '#333';
    
    addLog("Visa simuliacija atstatyta į pradinę būseną.", "info");
}

// ĮVYKIŲ TVARKYTOJAI
activateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const virusType = e.target.closest('.activate-btn').dataset.virus;
        activateVirus(virusType);
    });
});

startBtn.addEventListener('click', () => {
    if (!currentVirus) {
        addLog("Klaida: pirma pasirinkite virusą!", "danger");
        return;
    }
    startSimulation();
});

cureBtn.addEventListener('click', cureSystem);
resetBtn.addEventListener('click', resetAll);

// INICIJAVIMAS
document.addEventListener('DOMContentLoaded', () => {
    addLog("Edukacinis viruso simuliatorius sėkmingai įkeltas.", "info");
    addLog("Projektas sukurtas atsiskaitomajam darbui.", "info");
    addLog("DĖMESIO: tai yra tik simuliacija - visiškai saugu!", "success");
    
    // Pradinė būsena
    showNormalState();
});

// Papildoma: klaviatūros trumpiniai
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        resetAll();
    }
    
    if (e.ctrlKey && e.key === 's' && currentVirus && !simulationActive) {
        e.preventDefault();
        startSimulation();
    }
    
    if (e.ctrlKey && e.key === 'c' && simulationActive) {
        e.preventDefault();
        cureSystem();
    }
});
