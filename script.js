// Contador de "Te quiero"
let loveCount = 0;
const loveButton = document.getElementById('love-button');
const messageCounter = document.getElementById('message-counter');

loveButton.addEventListener('click', function() {
    loveCount++;
    messageCounter.textContent = `Has recibido ${loveCount} "Te quiero" hoy`;
    
    // Vibración en dispositivos móviles (si es compatible)
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
    
    // Animación de corazones
    createHearts();
});

function createHearts() {
    for(let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.position = 'fixed';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        heart.style.color = '#e84393';
        heart.style.zIndex = '999';
        heart.style.animation = `floatHeart ${Math.random() * 2 + 1.5}s ease-out forwards`;
        heart.innerHTML = '❤️';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 3500);
    }
}

// Estilos para la animación de corazones
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Modal para los mensajes
const modal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');

function showMessage(message) {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
    
    // Vibración en dispositivos móviles (si es compatible)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function closeModal() {
    modal.style.display = 'none';
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Fecha actual para el mensaje inicial
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.querySelector('.header p').innerHTML += `<br>${today.toLocaleDateString('es-ES', options)}`;

// Prevenir zoom en doble tap (para iOS)
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// Prevenir zoom en doble tap (usando un helper)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);