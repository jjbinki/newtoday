const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generateBtn');
const exportPNGBtn = document.getElementById('exportPNG');
const exportSVGBtn = document.getElementById('exportSVG');
const patternSizeInput = document.getElementById('patternSize');
const backgroundColorInput = document.getElementById('backgroundColor');
const patternColorInput = document.getElementById('patternColor');

canvas.width = 500;
canvas.height = 500;

function generatePattern() {
    const size = parseInt(patternSizeInput.value);
    const backgroundColor = backgroundColorInput.value;
    const patternColor = patternColorInput.value;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = patternColor;
    const tileSize = canvas.width / size;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (Math.random() > 0.5) {
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}

function exportPNG() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'pattern.png';
    link.href = dataURL;
    link.click();
}

function exportSVG() {
    const size = parseInt(patternSizeInput.value);
    const backgroundColor = backgroundColorInput.value;
    const patternColor = patternColorInput.value;
    const tileSize = canvas.width / size;

    let svgContent = `<svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">`;
    svgContent += `<rect width="100%" height="100%" fill="${backgroundColor}"/>`;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (ctx.getImageData(x * tileSize, y * tileSize, 1, 1).data[3] !== 0) {
                svgContent += `<rect x="${x * tileSize}" y="${y * tileSize}" width="${tileSize}" height="${tileSize}" fill="${patternColor}"/>`;
            }
        }
    }

    svgContent += '</svg>';

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'pattern.svg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

generateBtn.addEventListener('click', generatePattern);
exportPNGBtn.addEventListener('click', exportPNG);
exportSVGBtn.addEventListener('click', exportSVG);

generatePattern();