let dots = []; //Definerer et array til at holde de tegnede punkter
let guideDots = []; //Definerer et array til at holde hjælpepunkter
let currentIndex = 0;
let drawingCompleted = false; // Variabel til at indikere om tegningen er fuldført

// Definerer positionen for sidste og nuværende punkt samt punktstørrelsen
let lastPos = { x: 122, y: 240 };
let currentPos = { x: 122, y: 240 };
let dotSize = 12;

// Definerer koordinaterne til stjernene
const guidePoints = [
    { x: 900, y: 900 },
    { x: 20, y: 230 },
    { x: 230, y: 210 },
    { x: 390, y: 280 },
    { x: 540, y: 365 },
    { x: 875, y: 385 },
    { x: 820, y: 570 },
    { x: 565, y: 540 },
    { x: 540, y: 365 },

];

// Definerer en klasse til punkterne
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // Funktion til at forbinde punkterne med en linje
    connect(px, py) {
        stroke(color('#FFF2AB'));
        line(this.x, this.y, px, py);
        strokeWeight(1);

    }
    // Funktion til at plotte punktet som en stjerne
    plot(strokeColor) {
        stroke(color('#FFF2AB'));
        this.drawStar(this.x, this.y, 5, 15, 5);
    }
    // Funktion til at plotte teksten ved punktet
    plotText(txt) {
        stroke(255);
        textSize(20);
        text(txt, this.x + 18, this.y + 10);
        strokeWeight(1);
        fill(255);
    }
    // Funktion til at kontrollere om man trykker inden for punktets område
    within(px, py) {
        let isWithin = false;
        let d = dist(px, py, this.x, this.y);
        isWithin = d < dotSize ? true : false;
        return isWithin;
    }
    // Funktion til at tegne en stjerne
    drawStar(x, y, radius1, radius2, npoints) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius2;
            let sy = y + sin(a) * radius2;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
}

// Opsætter canvas og opretter guidepunkterne
function setup() {
    createCanvas(1400, 600);

    for (let i = 1; i < guidePoints.length; i++) {
        guideDots.push(new Dot(guidePoints[i].x, guidePoints[i].y));
    }
}

// Definerer kassen(canvasets) position
let xOffset = 280;
let yOffset = -80;

// Juster positionen for hvert punkt i guidePoints-arrayet
for (let i = 0; i < guidePoints.length; i++) {
    guidePoints[i].x += xOffset;
    guidePoints[i].y += yOffset;
}

function draw() {
    textFont('K2D'); //fonten på indholdet

    //Guidepunkterne og deres numre
    for (let i = 0; i < guideDots.length; i++) {
        guideDots[i].plot(222, 160);
        guideDots[i].plotText(i + 1);
    }

    //Forbinder punkterne
    for (let i = 0; i < dots.length; i++) {
        dots[i].plot(90, 90);
        if (i > 0) {
            dots[i].connect(dots[i - 1].x, dots[i - 1].y);
        }
    }

    //Start her tekst
    if (currentIndex == 0) {
        stroke(222);
        textSize(24);
        text("Start her!", guideDots[0].x + -120, guideDots[0].y + 10);

    }
    else if (!drawingCompleted) {
        stroke(222, 55, 111);
        strokeWeight(3);
        stroke(color('#FFF2AB'));

    }

    //Tillykke tekst når fuldført
    else {
        textSize(35);
        text("Tillykke, nu kan du tegne Karlsvognen!", 250, 500);
        textFont('K2D');
    }
}


function fillVertex() {
    if (!drawingCompleted) {
        stroke(90);
        fill(0);
        beginShape();
        for (let i = 0; i < dots.length; i++) {
            vertex(dots[i].x, dots[i].y);
        }
        endShape(open);
    }
}
// Funktion der aktiveres ved klik
function mousePressed() {
    if (drawingCompleted) return;

    currentPos.x = mouseX;
    currentPos.y = mouseY;
    // Tjekker om klikket er på et guidepunkt og om tegningen er fuldført
    if (
        !drawingCompleted &&
        guideDots[currentIndex].within(mouseX, mouseY) &&
        currentIndex < 15
    ) {
        // Tilføjer punktet til tegningen og opdaterer indeks og sidste position
        dots.push(new Dot(mouseX, mouseY));
        currentIndex++;
        lastPos.x = mouseX;
        lastPos.y = mouseY;
        if (currentIndex == guideDots.length || currentIndex == 15) {
            drawingCompleted = true;
            currentPos = lastPos;
        }
    }
}

function mouseMoved() {
    currentPos.x = mouseX;
    currentPos.y = mouseY;
}