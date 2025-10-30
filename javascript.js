const links = document.querySelectorAll('.navbar a');
const marker = document.querySelector('.navbar-marker');
const sections = document.querySelectorAll('section');

// Función para mover el marcador
function moveMarker(el) {
  marker.style.left = el.offsetLeft + 'px';
  marker.style.width = el.offsetWidth + 'px';
}

// Inicialmente, colocar el marcador en el primer enlace
moveMarker(links[0]);
links[0].classList.add('active');

// Al hacer clic en un enlace
links.forEach(link => {
  link.addEventListener('click', e => {
    links.forEach(l => l.classList.remove('active'));
    e.target.classList.add('active');
    moveMarker(e.target);
  });
});

// Al hacer scroll, detectar sección visible
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60; // ajuste por navbar
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
      moveMarker(link);
    }
  });
});
// ===== Fondo de partículas suaves =====
const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let particles = Array(60).fill().map(() => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5,
  color: `hsl(${Math.random() * 360}, 70%, 70%)`
}));

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();