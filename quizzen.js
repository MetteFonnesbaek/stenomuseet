/* -------------------------- 
               QUIZ       
   -------------------------- */
///------- quizData er et array der har alle spørgsmål, dets svarmuligheder og det korrekte svar ----////
const quizData = [
    {
        question: "Hvordan blev Orion placeret på himlen efter sin død ifølge græsk mytologi?",
        options: ["A) Som et stjernebillede", "B) Som en planet", "C) Som en meteor", "D) Som et stjernetegn"],
        answer: "A) Som et stjernebillede"
    },
    {
        question: "Hvem var Orions far ifølge græsk mytologi?",
        options: ["A) Zeus", "B) Poseidon", "C) Hades", "D) Medusa"],
        answer: "B) Poseidon"
    },
    {
        question: "Hvor mange klare stjerner udgør Karlsvognen?",
        options: ["A) Fem", "B) Ni", "C) Syv", "D) Elleve"],
        answer: "C) Syv"
    },
    {
        question: "Karlsvognen er et af de 88 officielle stjernebilleder?",
        options: ["A) Sandt", "B) Falsk"],
        answer: "B) Falsk"
    },
    {
        question: "Hvad betyder navnet “Draco” på latin?",
        options: ["A) Drage", "B) Slange", "C) Ørn", "D) Elefant"],
        answer: "A) Drage"
    },
    {
        question: "Hvad var Draco forbundet med i græsk mytologi?",
        options: ["A) En hest der blev redet til rummet af Zeus", "B) En fugl som delte budskaber ud for Freya", "C) En drage dræbt af guden Athene", "D) Piratfisk der tilhørte havguden Poseidon"],
        answer: "C) En drage dræbt af guden Athene"
    },
    {
        question: "Hvad pralede Cassiopeia af, som førte til Poseidons vrede?",
        options: ["A) Hendes datters dygtighed i kamp", "B) Hendes søns styrke", "C) Hendes datters rigdom", "D) Hendes datters skønhed"],
        answer: "D) Hendes datters skønhed"
    },
    {
        question: "Hvordan straffede Poseidon Cassiopeia??",
        options: ["A) Han forvandlede hende til sten", "B) Han lod havmonsteret spise hende", "C) Han holdte hende fanget i evigt regnvejr", "D) Han placerede hende på himlen"],
        answer: "D) Han placerede hende på himlen"
    },
];

///--------questionElement konstanter, der henholdsvis refererer til HTML med id'erne "question" og "options". ---////
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

///--------- currentQuestion holder styr på det aktuelle spørgsmål der vises og  "score" i holder styr på brugerens score 
let currentQuestion = 0;
let score = 0;

////-----showQuestion() er en funktion, der viser det aktuelle spørgsmål og dets svarmuligheder på hjemmesiden. dette gør også at knapperne lytter, der kalder selectAnswer-funktionen, når de klikkes. ----//

function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}
/////---- Denne funktion, selectAnswer(e), håndterer brugerens valg af svarmulighed i quizzen. -  e.target giver adgang til den specifikke HTML-knap, der blev klikket på. - Derefter henter funktionen det korrekte svar på det aktuelle spørgsmål fra quizData-arrayet ved hjælp af værdien af ​​currentQuestion. Hvis alle spørgsmål er besvaret, kaldes showResult()-funktionen, som typisk viser brugerens score eller en anden slags resultat for quizzen.-----/////
function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;

    if (selectedButton.innerText === answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Viser slut resultat på side for sig
function showResult() {
    quiz.innerHTML = `
    <div class="result-container">
      <h1>TILLYKKE</h1>
      <h2>Du gennemførte quizzen og fik ${score}/${quizData.length} rigtige </h2>
      <br>
      <a href="quizstart.html" class="prøvigen_quiz_knap">PRØV IGEN</a>
    </div>
      `;
}

showQuestion();
