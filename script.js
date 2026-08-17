const screens = document.querySelectorAll('.screen');
const modal = document.querySelector('#forgot-modal');
const noButton = document.querySelector('#love-no');
const choiceZone = document.querySelector('#choice-zone');

function showScreen(id) {
  screens.forEach((screen) => {
    const active = screen.id === id;
    screen.hidden = !active;
    screen.classList.toggle('is-active', active);
  });
}

function openModal() { modal.hidden = false; document.querySelector('#recover-button').focus(); }
function closeModal() { modal.hidden = true; document.querySelector('#day-no').focus(); }

document.querySelector('#day-yes').addEventListener('click', () => showScreen('love-screen'));
document.querySelector('#day-no').addEventListener('click', openModal);
document.querySelector('#close-modal').addEventListener('click', closeModal);
document.querySelector('#recover-button').addEventListener('click', () => { modal.hidden = true; showScreen('love-screen'); });
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });

function dodgeNoButton() {
  const zone = choiceZone.getBoundingClientRect();
  const button = noButton.getBoundingClientRect();
  const padding = 8;
  // The zone itself is inside the visible card; these bounds keep every edge tappable.
  const maxX = Math.max(padding, zone.width - button.width - padding);
  const maxY = Math.max(padding, zone.height - button.height - padding);
  noButton.style.position = 'absolute';
  noButton.style.left = `${padding + Math.random() * (maxX - padding)}px`;
  noButton.style.top = `${padding + Math.random() * (maxY - padding)}px`;
}

// Pointer events cover mouse, touch, and stylus. touchstart is retained for older mobile browsers.
noButton.addEventListener('pointerenter', dodgeNoButton);
noButton.addEventListener('pointerdown', (event) => { event.preventDefault(); dodgeNoButton(); });
noButton.addEventListener('touchstart', (event) => { event.preventDefault(); dodgeNoButton(); }, { passive: false });
document.querySelector('#love-yes').addEventListener('click', () => showScreen('transition-screen'));

function buildHearts() {
  const holder = document.querySelector('.hearts');
  for (let index = 0; index < 16; index += 1) {
    const heart = document.createElement('span'); heart.textContent = index % 3 ? '♥' : '✦';
    heart.style.left = `${Math.random() * 100}%`; heart.style.fontSize = `${14 + Math.random() * 18}px`;
    heart.style.animationDuration = `${10 + Math.random() * 12}s`; heart.style.animationDelay = `${-Math.random() * 16}s`; holder.append(heart);
  }
}
function buildFlowers() {
  const garden = document.querySelector('#flower-garden'); const colors = ['#ff7197','#f08ac2','#b58ae8','#ff9a69','#f7b5ce'];
  for (let index = 0; index < 13; index += 1) {
    const flower = document.createElement('div'); flower.className = 'flower';
    flower.style.left = `${-1 + index * 8.2}%`; flower.style.animationDelay = `${index * 115}ms`;
    flower.innerHTML = `<div class="bloom" style="--flower:${colors[index % colors.length]}"><i class="petal"></i><i class="petal"></i><i class="petal"></i><i class="petal"></i><i class="petal"></i><i class="center"></i></div><i class="stem"></i><i class="leaf one"></i><i class="leaf two"></i>`;
    garden.append(flower);
  }
}
document.querySelector('#uwu-button').addEventListener('click', () => showScreen('finale-screen'));
buildHearts(); buildFlowers();
