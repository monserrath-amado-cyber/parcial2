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
    // Math.floor sirve para que el crayón no se confunda y pinte siempre 
    // dentro de un cuadrito completo, sin salirse de la línea.
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}