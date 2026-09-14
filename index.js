import { initModal } from './modal.js';

const container = document.getElementById('container');

const numeros = Array.from({ length: 16 }, (_, i) => i + 1);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const numerosMezclados = shuffle(numeros);

// Guardamos las imágenes creadas para pasárselas al modal
const imgsCreadas = [];

numerosMezclados.forEach(n => {
    const img = document.createElement('img');
    img.src = `./imgs/img_${n}.jpg`;
    img.alt = `Imagen ${n}`;
    img.loading = 'lazy';
    container.appendChild(img);
    imgsCreadas.push(img);
});

// Inicializa el modal y le pasa las imágenes
const conectarGaleria = initModal();
conectarGaleria(imgsCreadas);

