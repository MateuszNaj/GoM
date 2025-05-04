
function goTo(section) {
  const content = document.getElementById('content');
  if (section === 'calendar') {
    content.innerHTML = '<h2>Kalendarz</h2><p>Tu wybierzesz dzień i dodasz trening lub aktywność.</p>';
  } else if (section === 'training') {
    content.innerHTML = '<h2>Trening</h2><p>Wybierz szablon lub dodaj własne ćwiczenia.</p>';
  } else if (section === 'stats') {
    content.innerHTML = '<h2>Statystyki</h2><p>Tu zobaczysz swoje wyniki i postępy.</p>';
  }
}
