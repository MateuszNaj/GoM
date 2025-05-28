
const templates = {
    'Trening A': [
        { name: "Wyciskanie sztangielek na ławce płaskiej", part: "klatka piersiowa", video: "https://www.youtube.com/watch?v=OQKgofRGzN8" },
        { name: "Ściąganie drążka wyciągu górnego nachwytem", part: "plecy", video: "https://www.youtube.com/watch?v=9RRxXGegIzk" }
    ],
    'Trening B': [
        { name: "Wiosłowanie sztangą nachwytem w opadzie", part: "plecy", video: "https://www.youtube.com/watch?v=gmDYD6dp9aU" },
        { name: "Rozpiętki na maszynie butterfly", part: "klatka piersiowa", video: "https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/rozpietki-na-maszynie-butterfly-butterfly" }
    ]
};

window.onload = function () {
    const selector = document.getElementById("templateSelector");
    Object.keys(templates).forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        selector.appendChild(opt);
    });

    selector.addEventListener("change", function () {
        const selected = templates[this.value];
        const container = document.getElementById("exercisesList");
        container.innerHTML = "";
        selected.forEach(ex => {
            const div = document.createElement("div");
            div.innerHTML = `<b>${ex.name}</b> (${ex.part})<br><a href="${ex.video}" target="_blank">Film instruktażowy</a><br>`;
            container.appendChild(div);
        });
    });
};

function saveTraining() {
    alert("Trening zapisany!");
}
