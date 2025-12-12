//подсветка активного пункта меню
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.header__nav-link');
    if (!links.length) return;

    const currentPath = new URL(window.location.href).pathname;

    links.forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      if (linkPath === currentPath) {
        link.classList.add('header__nav-link--active');
      }
    });
  });
})();

// время загрузки страницы
(function () {
  window.addEventListener('load', function () {
    const nav = performance.getEntriesByType('navigation')[0];
    const loadTimeMs = Math.round(performance.now() - nav.startTime);

    const footer = document.querySelector('.footer');
    if (!footer) return;

    const info = document.createElement('p');
    info.style.fontSize = '0.85em';
    info.style.marginTop = '8px';
    info.textContent = `Страница загружена за ${loadTimeMs} мс.`;

    footer.appendChild(info);
  });
})();
