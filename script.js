const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Ajusta el tamaño del canvas para que ocupe toda la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = [];
const fontSize = 15; // Tamaño de la fuente para la lluvia
const columns = canvas.width / fontSize; // Número de columnas basado en el ancho del canvas

// Inicializa la posición Y de cada columna de "Te Amo"
for (let i = 0; i < columns; i++) {
    letters[i] = 1; // Comienza desde la parte superior
}

// Array para partículas de explosión
let particles = [];

// Función para mostrar un mensaje personalizado (si deseas usarlo)
function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const messageButton = document.getElementById('messageButton');

    messageText.textContent = message;
    messageBox.style.display = 'block';

    messageButton.onclick = () => {
        messageBox.style.display = 'none';
    };
}

// Función principal para dibujar la lluvia de "Te Amo"
function drawRain() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff0000";
    ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;

    for (let i = 0; i < letters.length; i++) {
        const text = "Te Amo";
        ctx.fillText(text, i * fontSize, letters[i] * fontSize);

        letters[i]++;

        if (letters[i] * fontSize > canvas.height && Math.random() > 0.989) {
            letters[i] = 0;
        }
    }
}

// Dibujar partículas con explosión realista
function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${p.alpha})`;
        ctx.fill();

        // Movimiento
        p.x += p.vx;
        p.y += p.vy;
        // Atenuación
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }
}

        // Variable para controlar la velocidad de la animación
        let animationInterval;
        const initialSpeed = 30; // Velocidad lenta inicial (ms)
        const normalSpeed = 37; // Velocidad normal (ms)

        // Función para iniciar el bucle de animación
        function startAnimation(speed) {
            // Limpia cualquier intervalo existente para evitar múltiples bucles
            if (animationInterval) {
                clearInterval(animationInterval);
            }
            animationInterval = setInterval(() => {
                drawRain();
                drawParticles();
            }, speed);
        }

        // Inicia la animación con la velocidad lenta inicial
        startAnimation(initialSpeed);

        // Después de 2 segundos, cambia a la velocidad normal
        setTimeout(() => {
            startAnimation(normalSpeed);
        }, 2000); // 2000 ms = 2 segundos

// Evento de clic para explosión
canvas.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // *** Efecto de brillo LED para "Te Amo" ***
    ctx.shadowColor = 'rgba(255, 0, 0, 1)'; // Color del brillo rojo
    ctx.shadowBlur = 10; // Intensidad del brillo
    ctx.shadowBlur = 40;
    ctx.shadowBlur = 70;

    // "Te Amo" grande en el centro
    ctx.fillStyle = "red";
    ctx.font = "bold 40px 'Inter', sans-serif";
    ctx.fillText("miamor ❤", x - 40, y);

    // Restablece los valores de sombra para no afectar otros dibujos
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'transparent';

    // Crear partículas para explosión
    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * 3 * Math.PI;
        const speed = Math.random() * 2 + 2.5;
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 2 + 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1
        });
    }
});

// Redimensionamiento de ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
