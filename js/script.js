document.addEventListener("DOMContentLoaded", () => {
    // 🌊 Scroll suave en navbar (solo si tienes secciones en la misma página)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ✨ Animación imágenes al hacer scroll
    const imgObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar');
                imgObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.imagenes img').forEach(img => {
        imgObserver.observe(img);
    });

    // 🌙 Modo claro / oscuro
    const toggleBtn = document.getElementById('modo-toggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('claro');
    });

    // 🌊 Mostrar secciones fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => fadeObserver.observe(el));

    // 🖼️ Lightbox para galería
    const images = document.querySelectorAll('.imagenes img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.className = 'lightbox';
            overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            overlay.addEventListener('click', () => document.body.removeChild(overlay));
            document.body.appendChild(overlay);
        });
    });

    // ✅ Validación de formulario en contacto.html
    const form = document.querySelector('.formulario');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const esEmailValid = email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
            if (!esEmailValid) {
                alert('Introdueix un correu electrònic vàlid.');
                return;
            }
            const [nombre, email, mensaje] = form.querySelectorAll('input, textarea');
            if (!nombre.value.trim() || !email.value.trim() || !mensaje.value.trim()) {
                alert('Por favor completa todos los campos.');
            } else {
                alert('¡Mensaje enviado!');
                form.reset();
            }
        });
    }
});

