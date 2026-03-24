// --- SISTEMA DE ÁUDIO SINTETIZADO ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function tocarSomLaser() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function tocarSomExplosao() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}

// --- ATUALIZAÇÃO NOS CONTROLES E COLISÃO ---

// No evento de atirar (Espaço):
window.addEventListener("keydown", (e) => {
    if (e.key === " " && jogoAtivo) {
        tiros.push({ x: nave.x + nave.w/2 - 2, y: nave.y, w: 4, h: 10, vel: 10 });
        tocarSomLaser(); // <--- Adicionado aqui
    }
});

// Na lógica de colisão (dentro da função atualizar):
if (nave.x < a.x + a.w && nave.x + nave.w > a.x && nave.y < a.y + a.h) {
    vidas--; 
    asteroides.splice(i, 1);
    tocarSomExplosao(); // <--- Adicionado aqui
    if(vidas <= 0) {
        alert("FIM DE JOGO!");
        location.reload();
    }
}