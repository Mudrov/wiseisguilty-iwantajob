const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');
const navLinks = mainNav ? mainNav.querySelectorAll('a') : [];

burgerBtn?.addEventListener('click', () => {
  mainNav.classList.toggle('is-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
  });
});

const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDescription = document.getElementById('modalDescription');
const modalTools = document.getElementById('modalTools');
const modalClose = document.getElementById('modalClose');

function openModalFromData(sourceElement, imageElement) {
  if (!modal || !modalImage) {
    alert('Ошибка: модальное окно не найдено в HTML');
    return;
  }

  if (!imageElement) {
    alert('Ошибка: картинка не найдена');
    return;
  }

  modalImage.src = imageElement.getAttribute('src');
  modalImage.alt = imageElement.getAttribute('alt') || '';

  modalTitle.textContent = sourceElement.dataset.title || '';
  modalSubtitle.textContent = sourceElement.dataset.subtitle || '';
  modalDescription.textContent = sourceElement.dataset.desc || '';
  modalTools.textContent = sourceElement.dataset.tools || '';

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openPortfolioModal(card) {
  const image = card.querySelector('.portfolio-visual img');
  const title = card.querySelector('.portfolio-info h3');
  const subtitle = card.querySelector('.portfolio-info p');
  const tools = card.querySelector('.portfolio-info span');

  if (!modal || !modalImage) {
    alert('Ошибка: модальное окно не найдено в HTML');
    return;
  }

  if (!image) {
    alert('Ошибка: внутри карточки портфолио не найдена картинка');
    return;
  }

  modalImage.src = image.getAttribute('src');
  modalImage.alt = image.getAttribute('alt') || '';

  modalTitle.textContent = card.dataset.title || title?.textContent || '';
  modalSubtitle.textContent = card.dataset.subtitle || subtitle?.textContent || '';
  modalDescription.textContent = card.dataset.desc || '';
  modalTools.textContent = card.dataset.tools || tools?.textContent || '';

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openGameShotModal(button) {
  const image = button.querySelector('.game-shot');

  openModalFromData(button, image);

  if (modalTools) {
    modalTools.textContent = 'GameMaker Studio · Blender';
  }
}

function closePortfolioModal() {
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (modalImage) {
    modalImage.src = '';
    modalImage.alt = '';
  }
}

document.querySelectorAll('.portfolio-card').forEach(card => {
  card.setAttribute('tabindex', '0');

  card.addEventListener('click', () => {
    openPortfolioModal(card);
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPortfolioModal(card);
    }
  });
});

document.querySelectorAll('.game-shot-card').forEach(button => {
  button.addEventListener('click', () => {
    openGameShotModal(button);
  });
});

modalClose?.addEventListener('click', closePortfolioModal);

document.querySelectorAll('[data-close-modal]').forEach(element => {
  element.addEventListener('click', closePortfolioModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closePortfolioModal();
  }
});