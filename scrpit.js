/*-------------------------------------------------
                      HJEM
---------------------------------------------------*/
// Variabler og elementvalg:
let items = document.querySelectorAll('.slider .item'); // Vælger alle elementer med klassen ".slider .item", antages at være billederne i karusellen.
let next = document.getElementById('next'); // Vælger elementet med id'en 'next', antages at være knappen til næste billede.
let prev = document.getElementById('prev'); // Vælger elementet med id'en 'prev', antages at være knappen til forrige billede.
let startBtn = document.querySelector('.start_ptp'); // Vælger startknappen.

let active = 1; // En variabel der holder styr på det aktive billede, starter ved 2.

// Funktionen loadShow():
function loadShow() {
  let stt = 0;
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1;
  for (var i = active + 1; i < items.length; i++) {
    stt++;
    // Sørger for distancen til midter boblen
    items[i].style.transform = `translateX(${440 * stt}px) scale(${1 - 0.1 * stt}) perspective(16px)`;
    items[i].style.zIndex = -stt;
    // Gør boblen til højre sløret
    items[i].style.filter = 'blur(2px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
  stt = 0;
  for (var i = active - 1; i >= 0; i--) {
    stt++;
    // Sørger for distancen til midter boblen
    items[i].style.transform = `translateX(${-440 * stt}px) scale(${1 - 0.1 * stt}) perspective(16px)`;
    items[i].style.zIndex = -stt;
    // Gør boblen til venstre sløret
    items[i].style.filter = 'blur(2px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }

  // Itererer gennem boblerne og tilføjer en eventlistener til den midterste boble.
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('active'); // Fjerner 'active' klassen fra alle bobler.
  }
  items[active].classList.add('active'); // Tilføjer 'active' klassen til den midterste boble.

  // Opdaterer startknappens href-attribut til at pege på linket for den midterste boble.
  startBtn.href = items[active].getAttribute('href');
}

loadShow(); // Kalder loadShow() funktionen for at initialisere karusellen når siden indlæses.

// Næste og forrige knapper:
next.onclick = function () {
  active = active + 1 < items.length ? active + 1 : active;
  loadShow();
}

prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : active;
  loadShow();
}

// Næste og forrige (usynlige) knapper:
fremadTryk.onclick = function () {
  active = active + 1 < items.length ? active + 1 : active;
  loadShow();
}

tilbageTryk.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : active;
  loadShow();
}

/*-------------------------------------------------
              Loop video af karakter
---------------------------------------------------*/
window.onload = function () {
  var video = document.getElementById('videoLoop');
  video.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);
};

/*-------------------------------------------------
    Tilbage til start efter 90s uden interaktion
---------------------------------------------------*/

// Sæt en timeout på 90 sekunder (90000 millisekunder)
var timeout = setTimeout(function () {
  // Gå tilbage til startsiden
  window.location.href = "index.html";
}, 90000);

// Tilføj en "lytter" til at nulstille timeout hvis der er interaktion
document.addEventListener("mousemove", resetTimer);
document.addEventListener("keypress", resetTimer);

// Funktion til at nulstille timeout
function resetTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    window.location.href = "index.html";
  }, 90000);
}