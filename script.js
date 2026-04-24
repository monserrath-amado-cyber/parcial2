/**
 * Universidad Militar Nueva Granada - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Monserrath Amado Torres
 */

const canvas = document.getElementById('graficosCanvas');
const ctx = canvas.getContext('2d');

/**
 * Aqui se tiene un papel lleno de cuadritos muy chiquitos, que casi no se ven. y esto actua como una crayola.
 * En esta parte se le dice al programa "Pinta el cuadrito que está en la columna X y en la fila Y",
 * y la crayola va y rellena ese único cuadrito con el color que se escogio.
 */
function drawPixel(x, y, color = "#000000") {
    ctx.fillStyle = color;
    // Math.floor sirve para que la crayola no se confunda y pinte siempre 
    // dentro de un cuadrito completo, sin salirse de la línea.
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Algoritmo de Bresenham para Líneas. 
 * Aqui el codigo va a ir en "diagonal" pero para avanzar todo el tiempo se pregunta
 *"¿Estoy más cerca del cuadrito de arriba o del cuadro de la derecha?"
 * El "err" (error) es como un sensor que ayuda a decidir para que la 
 * línea se vea lo más derecha posible y se vea muy bien visualmente.
 */
 function bresenhamLine(x0, y0, x1, y1, color) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1; // Dice si caminamos a la derecha o izquierda
    let sy = (y0 < y1) ? 1 : -1; // Dice si caminamos hacia arriba o abajo
    let err = dx - dy;

    while (true) {
        drawPixel(x0, y0, color); // Pintamos el cuadro actual

        // Si ya llegamos al punto final, nos detenemos
        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;
        /**
         * 
         * En este punto es donde el sensor decide. 
         * Si el error es positivo, significa que se mueve en el eje X, es decir horizontalmente
         *  Si es negativo, se mueve en el eje Y, es decir, verticalmente. Así equilibramos el camino.
         */
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}
/**
 * Algoritmo de Punto Medio para Circunferencias.
 * Aqui es codigo dibuja el circulo pero solo calcula una pequeña "rebanada" para que automáticamente la copie en otros 7 lugares.
 * Para que el circulo se vea completo y no se vea como una "media luna" y cumpla con la simetría de los 8 octantes.
 */
function midPointCircle(centerX, centerY, radius, color) {
    let x = radius;
    let y = 0;
    let p = 1 - radius; // Parámetro de decisión inicial

    while (x >= y) {
        /**
         * OPTIMIZACIÓN (SIMETRÍA DE 8 OCTANTES):
         * En lugar de calcular cada punto del círculo, calculamos uno 
         * y pintamos sus "reflejos" en los otros 7 lados del círculo.
         */
        drawPixel(centerX + x, centerY + y, color);
        drawPixel(centerX + y, centerY + x, color);
        drawPixel(centerX - y, centerY + x, color);
        drawPixel(centerX - x, centerY + y, color);
        drawPixel(centerX - x, centerY - y, color);
        drawPixel(centerX - y, centerY - x, color);
        drawPixel(centerX + y, centerY - x, color);
        drawPixel(centerX + x, centerY - y, color);

        y++;

        // El valor "p" nos dice si el siguiente punto que vamos a pintar 
        // debe quedarse en la misma fila o si debemos bajar un poquito 
        // para que el círculo no se vea cuadrado.
        if (p <= 0) {
            p = p + 2 * y + 1;
        } else {
            x--;
            p = p + 2 * (y - x) + 1;
        }
    }
}
/**
 * Calcula los vértices de un polígono regular.
 * Aqui el codigo busca calcular las distancias exactas iguales en donde se colocaran las marcas y asi establecer
 * los vertices para las figuras 
 */

function getPolygonVertices(centerX, centerY, sides, radius) {
    let vertices = [];
    for (let i = 0; i < sides; i++) {
        // Usamos seno y coseno para saber exactamente dónde poner cada punto en el espacio.
        let angle = (i * 2 * Math.PI) / sides;
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);
        
        // Guardamos la posición X y Y de cada esquina en una lista.
        vertices.push({ x, y });
    }
    return vertices;
}
// --- LÓGICA DE CARGA AUTOMÁTICA ---
window.onload = () => {
    // Se define el centro del dibujo (la mitad de nuestro lienzo)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // El radio del polígono y cuántos lados tendrá (un número al azar entre 5 y 10)
    const R = 150; 
    const n = Math.floor(Math.random() * (10 - 5 + 1)) + 5; 
    
    
    // Aquí el  computador de empezar a dibujar.
    // Primero calculamos dónde van los puntos (vértices).
    const vertices = getPolygonVertices(centerX, centerY, n, R);

    // 1. Dibujamos las paredes del polígono uniendo los puntos
    for (let i = 0; i < n; i++) {
        let puntoA = vertices[i];
        let puntoB = vertices[(i + 1) % n]; // Aqui el último punto se una con el primero
        
        // Usamos nuestra función de Bresenham (la de las líneas)
        bresenhamLine(puntoA.x, puntoA.y, puntoB.x, puntoB.y, "#2c3e50");
    }

    // 2. Dibujamos un punto en cada esquina
    vertices.forEach(v => {
        // El radio de cada círculo pequeño es R dividido en 4
        midPointCircle(v.x, v.y, R / 4, "#e74c3c");
    });
};

