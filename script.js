let playerPos = 24;
let catsFound = 0;
let lives = 3;

const catPositions = [2, 12, 30, 40, 47];
const zombiePositions = [5, 18, 28, 33, 42];

const cityImages = [
    "images/bild1.avif", "images/bild2.avif", "images/bild3.avif",
    "images/bild4.avif", "images/bild5.avif", "images/bild6.avif",
    "images/bild11.avif", "images/bild12.avif"
];

function createGrid() {
    const board = document.getElementById('the-game');
    board.innerHTML = '';

    for (let i = 0; i < 49; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.id = 'cell-' + i;
        board.appendChild(cell);
    }
}

function fetchCat() {
    const url = "https://api.thecatapi.com/v1/images/search";

    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            document.getElementById('scene-image').src = data[0].url;
        })
        .catch(function (err) {
            console.log("Errore API");
        });
}

function updateGame() {
    for (let i = 0; i < 49; i++) {
        document.getElementById('cell-' + i).innerText = ""; //rensar
    }

    const currentCell = document.getElementById('cell-' + playerPos);
    currentCell.innerText = "🏃‍♂️"; //ritar

    const randomNum = Math.floor(Math.random() * cityImages.length);
    document.getElementById('scene-image').src = cityImages[randomNum]; //hämtar random bild

    let statusMsg = "Staden är tyst..."; // om ingenting hittats

    if (zombiePositions.indexOf(playerPos - 7) !== -1) {
        statusMsg = "Varning! Zombie i NORR!";
    }
    if (zombiePositions.indexOf(playerPos + 7) !== -1) {
        statusMsg = "Varning! Zombie i SÖDER!";
    }
    if (zombiePositions.indexOf(playerPos - 1) !== -1) {
        statusMsg = "Varning! Zombie i VÄSTER!";
    }
    if (zombiePositions.indexOf(playerPos + 1) !== -1) {
        statusMsg = "Varning! Zombie i ÖSTER!";
    }

    if (catPositions.indexOf(playerPos - 7) !== -1) {
        statusMsg = "Mjao! En katt i NORR!";
    }
    if (catPositions.indexOf(playerPos + 7) !== -1) {
        statusMsg = "Mjao! En katt i SÖDER!";
    }
    if (catPositions.indexOf(playerPos - 1) !== -1) {
        statusMsg = "Mjao! En katt i VÄSTER!";
    }
    if (catPositions.indexOf(playerPos + 1) !== -1) {
        statusMsg = "Mjao! En katt i ÖSTER!";
    }

    document.getElementById('status-message').innerText = statusMsg; //updatera status-message

    if (zombiePositions.indexOf(playerPos) !== -1) { //bet från en zombie
        lives--;
        document.getElementById('life-count').innerText = lives;
        alert("En zombie bet dig!");
        if (lives <= 0) {
            alert("GAME OVER!");
            location.reload();
        }
    }

    if (catPositions.indexOf(playerPos) !== -1) { // hittat en katt
        catsFound++;
        document.getElementById('cat-count').innerText = catsFound;
        alert("Mjao! Du räddade en katt!");
        fetchCat();

        const catIdx = catPositions.indexOf(playerPos); // ta bort katten från spelplanen
        catPositions.splice(catIdx, 1);

        if (catsFound === 5) {
            alert("GRATTIS! Du räddade alla!");
            location.reload();
        }
    }
}

document.onkeydown = function (e) { //lysnar på key

    if (e.key === "ArrowUp" && playerPos >= 7) {
        playerPos -= 7;
    }
    if (e.key === "ArrowDown" && playerPos < 42) {
        playerPos += 7;
    }
    if (e.key === "ArrowLeft" && playerPos % 7 !== 0) {
        playerPos -= 1;
    }
    if (e.key === "ArrowRight" && playerPos % 7 !== 6) {
        playerPos += 1;
    }

    updateGame();
};

document.getElementById('btn-start').onclick = function () {
    updateGame();
};



createGrid(); 