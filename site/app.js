// The tabs link to sections on one page, so the selected tab follows whichever section crosses the middle of the viewport.
(function () {
  const tabs = document.querySelectorAll('.tab-bar .p-tab-bar__tab');
  const byId = {};
  tabs.forEach(function (tab) { byId[tab.hash.slice(1)] = tab; });

  // A clicked tab stays selected until its scroll settles, since short sections near the bottom may never reach the middle.
  let lockedUntil = 0;

  function select(id) {
    if (Date.now() < lockedUntil) return;
    tabs.forEach(function (tab) {
      if (tab === byId[id]) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      lockedUntil = 0;
      select(tab.hash.slice(1));
      lockedUntil = Date.now() + 1000;
    });
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) select(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  Object.keys(byId).forEach(function (id) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  // The last section is often too short to reach the middle of the viewport.
  window.addEventListener('scroll', function () {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) select('info');
  }, { passive: true });
})();
