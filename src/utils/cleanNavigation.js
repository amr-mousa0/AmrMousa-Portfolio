document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;

  const href = target.getAttribute('href');
  if (href === '#') return;

  const section = document.querySelector(href);
  if (section) {
    e.preventDefault();
    const offset = section.offsetTop;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
    history.replaceState(null, '', window.location.pathname);
  }
});
