/**
 * Universidad Militar Nueva Granada - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Monserrath Amado Torres
 */

// 1. FUNCIONES BASE (Deben estar arriba para que el navegador las conozca)
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

function bresenhamLine(ctx, x0, y0, x1, y1, color) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        drawPixel(ctx, x0, y0, color);
        if (Math.round(x0) === Math.round(x1) && Math.round(y0) === Math.round(y1)) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
}

function midPointCircle(ctx, centerX, centerY, radius, color) {
    let x = radius;
    let y = 0;
    let p = 1 - radius;
    while (x >= y) {
        drawPixel(ctx, centerX + x, centerY + y, color);
        drawPixel(ctx, centerX + y, centerY + x, color);
        drawPixel(ctx, centerX - y, centerY + x, color);
        drawPixel(ctx, centerX - x, centerY + y, color);
        drawPixel(ctx, centerX - x, centerY - y, color);
        drawPixel(ctx, centerX - y, centerY - x, color);
        drawPixel(ctx, centerX + y, centerY - x, color);
        drawPixel(ctx, centerX + x, centerY - y, color);
        y++;
        if (p <= 0) { p = p + 2 * y + 1; } 
        else { x--; p = p + 2 * (y - x) + 1; }
    }
}

function getPolygonVertices(centerX, centerY, sides, radius) {
    let vertices = [];
    for (let i = 0; i < sides; i++) {
        let angle = (i * 2 * Math.PI) / sides;
        vertices.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        });
    }
    return vertices;
}

// 2. EJECUCIÓN (Solo cuando la página esté totalmente lista)
window.onload = () => {
    const canvas = document.getElementById('graficosCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Limpieza inicial
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const R = 150; 
    const n = Math.floor(Math.random() * 6) + 5; 

    const vertices = getPolygonVertices(centerX, centerY, n, R);

    // Dibujar polígono
    for (let i = 0; i < n; i++) {
        let pA = vertices[i];
        let pB = vertices[(i + 1) % n];
        bresenhamLine(ctx, pA.x, pA.y, pB.x, pB.y, "#00e5ff");
    }

    // Dibujar círculos
    vertices.forEach(v => {
        midPointCircle(ctx, v.x, v.y, R / 4, "#ff4081");
    });
};
