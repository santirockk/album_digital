// modal.js
export function initModal() {
    const modal    = document.getElementById('modal');
    const modalImg = modal.querySelector('.modal-img');
    const btnClose = modal.querySelector('.modal-close');
    const btnPrev  = modal.querySelector('.modal-prev');
    const btnNext  = modal.querySelector('.modal-next');

    // Lista de imágenes de la galería (se llena al abrir)
    let imagenes = [];
    let indiceActual = 0;

    // ---------- Abrir modal ----------
    function abrir(index) {
        indiceActual = index;
        modalImg.src = imagenes[indiceActual].src;
        modalImg.alt = imagenes[indiceActual].alt;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // bloquea scroll del fondo
    }

    // ---------- Cerrar modal ----------
    function cerrar() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
        document.body.style.overflow = '';
    }

    // ---------- Navegación ----------
    function mostrarSiguiente() {
        indiceActual = (indiceActual + 1) % imagenes.length;
        modalImg.src = imagenes[indiceActual].src;
        modalImg.alt = imagenes[indiceActual].alt;
    }

    function mostrarAnterior() {
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        modalImg.src = imagenes[indiceActual].src;
        modalImg.alt = imagenes[indiceActual].alt;
    }

    // ---------- Listeners ----------
    btnClose.addEventListener('click', cerrar);
    btnNext.addEventListener('click', mostrarSiguiente);
    btnPrev.addEventListener('click', mostrarAnterior);

    // Cerrar al hacer clic en el fondo (fuera de la imagen)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrar();
    });

    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;
        if (e.key === 'Escape')     cerrar();
        if (e.key === 'ArrowRight') mostrarSiguiente();
        if (e.key === 'ArrowLeft')  mostrarAnterior();
    });

    // Swipe táctil (bonus móvil)
    let touchStartX = 0;
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(dx) < 50) return; // ignora toques cortos
        if (dx < 0) mostrarSiguiente();
        else        mostrarAnterior();
    }, { passive: true });

    // ---------- API pública ----------
    // Se llama desde index.js después de crear las imágenes
    return function conectarGaleria(imgs) {
        imagenes = imgs;
        imgs.forEach((img, i) => {
            img.addEventListener('click', () => abrir(i));
        });
    };
}


