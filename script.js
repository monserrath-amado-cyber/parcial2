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
         * Si el error es positivo, significa que movernos en el eje X, es decir horizontalmente
         *  Si es negativo, nos movemos en el eje Y. Así equilibramos el camino.
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