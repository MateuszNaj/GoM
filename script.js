
function goTo(section) {
  const content = document.getElementById('content');
  if (section === 'calendar') {
    content.innerHTML = '<h2>Kalendarz</h2>' +
      '<p>Wybierz datę: <input type="date" id="datePicker" /></p>' +
      '<p><select id="activity">' +
      '<option value="trening">Trening</option>' +
      '<option value="bieganie">Bieganie</option>' +
      '<option value="rower">Rower</option>' +
      '<option value="pilka">Pilka nozna</option>' +
      '<option value="gory">Chod po gorach</option>' +
      '</select></p>' +
      '<button onclick="saveActivity()">Zapisz aktywnosc</button>';
  } else if (section === 'training') {
    content.innerHTML = '<h2>Trening</h2>' +
      '<p><input type="text" id="exercise" placeholder="Nazwa ćwiczenia" /></p>' +
      '<p><input type="number" id="sets" placeholder="Serie" /></p>' +
      '<p><input type="number" id="reps" placeholder="Powtorzenia" /></p>' +
      '<p><input type="number" id="weight" placeholder="Ciezar (kg)" /></p>' +
      '<button onclick="saveTraining()">Zapisz trening</button>';
  } else if (section === 'stats') {
    const log = JSON.parse(localStorage.getItem('gom_log') || '[]');
    let stats = '<h2>Statystyki</h2>';
    if (log.length === 0) {
      stats += '<p>Brak danych.</p>';
    } else {
      log.forEach((entry, i) => {
        stats += '<div><strong>' + entry.date + ':</strong> ' + entry.type + ' - ' +
          (entry.exercise ? entry.exercise + ' | Serie: ' + entry.sets + ' Powt: ' + entry.reps + ' kg: ' + entry.weight : '') +
          '</div>';
      });
    }
    content.innerHTML = stats;
  }
}

function saveTraining() {
  const log = JSON.parse(localStorage.getItem('gom_log') || '[]');
  log.push({
    date: new Date().toISOString().split('T')[0],
    type: 'Trening',
    exercise: document.getElementById('exercise').value,
    sets: document.getElementById('sets').value,
    reps: document.getElementById('reps').value,
    weight: document.getElementById('weight').value
  });
  localStorage.setItem('gom_log', JSON.stringify(log));
  alert('Trening zapisany!');
}

function saveActivity() {
  const log = JSON.parse(localStorage.getItem('gom_log') || '[]');
  log.push({
    date: document.getElementById('datePicker').value,
    type: document.getElementById('activity').value
  });
  localStorage.setItem('gom_log', JSON.stringify(log));
  alert('Aktywnosc zapisana!');
}
