
const trainingTemplates = {
  "Trening A": [
    { name: "Wyciskanie sztangielek na ławce płaskiej", part: "klatka piersiowa", video: "https://www.youtube.com/watch?v=OQKgofRGzN8", sets: 3, reps: 10, kg: 20 },
    { name: "Wiosłowanie sztangielek", part: "plecy", video: "https://www.youtube.com/watch?v=tVa6wcgZirA", sets: 3, reps: 10, kg: 25 },
    { name: "Rozpiętki hantlami", part: "klatka piersiowa", video: "https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/rozpietki-z-hantlami-na-lawce-plaskiej", sets: 2, reps: 12, kg: 7 }
  ],
  "Trening B": [
    { name: "Ściąganie chwytem neutralnym", part: "plecy", video: "https://www.fabrykasily.pl/atlas-cwiczen/plecy/sciaganie-chwytem-neutralnym-z-wyciagu-gornego", sets: 3, reps: 10, kg: 55 },
    { name: "Wyciskanie sztangi łamanej", part: "triceps", video: "https://www.youtube.com/watch?v=xYbq3yoMJP8", sets: 2, reps: 10, kg: 17 }
  ]
};

function goTo(section) {
  const content = document.getElementById('content');
  if (section === 'training') {
    let html = '<h2>Wybierz szablon treningowy:</h2>';
    html += '<select id="templateSelect"><option value="">-- wybierz --</option>';
    for (let key in trainingTemplates) html += `<option value="${key}">${key}</option>`;
    html += '</select><button onclick="loadTemplate()">Wczytaj</button><div id="templateOutput"></div>';
    content.innerHTML = html;
  } else if (section === 'calendar') {
    content.innerHTML = '<h2>Kalendarz</h2><input type="date" id="datePicker"><select id="activity"><option>bieganie</option><option>gory</option><option>rower</option><option>pilka</option></select><button onclick="saveActivity()">Zapisz</button>';
  } else if (section === 'stats') {
    const log = JSON.parse(localStorage.getItem('gom_log') || '[]');
    let html = '<h2>Statystyki</h2>';
    log.forEach(entry => html += `<div><strong>${entry.date}</strong>: ${entry.type} ${entry.name || ''}</div>`);
    content.innerHTML = html || '<p>Brak danych.</p>';
  }
}

function loadTemplate() {
  const val = document.getElementById('templateSelect').value;
  const container = document.getElementById('templateOutput');
  if (!val) return container.innerHTML = '';
  let html = '';
  trainingTemplates[val].forEach((ex, i) => {
    html += `<div class="exercise"><strong>${ex.name}</strong> (${ex.part})<br><a href="${ex.video}" target="_blank">🎥 Film</a><br>` +
      `Serie: <input type="number" value="${ex.sets}" id="s${i}"> ` +
      `Powt: <input type="number" value="${ex.reps}" id="r${i}"> ` +
      `Kg: <input type="number" value="${ex.kg}" id="w${i}"></div>`;
  });
  html += `<button onclick="saveTraining('${val}')">Zapisz trening</button>`;
  container.innerHTML = html;
}

function saveTraining(template) {
  const data = trainingTemplates[template].map((ex, i) => ({
    name: ex.name,
    part: ex.part,
    sets: document.getElementById('s' + i).value,
    reps: document.getElementById('r' + i).value,
    weight: document.getElementById('w' + i).value
  }));
  const log = JSON.parse(localStorage.getItem('gom_log') || '[]');
  log.push({ date: new Date().toISOString().split('T')[0], type: 'Trening', name: template, exercises: data });
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
