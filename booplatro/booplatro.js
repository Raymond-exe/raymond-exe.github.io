const CARDBACK_SRC = '../images/booplatro/cardback.png';
const FLIP_SRC = './audio/flip.wav';

let cardCount = 0;
function createCard(cardConfig) {
    const container = createElement('div', false, ['card-container']);
    const card = createElement('div', container, ['card']);

    const cardImg = createElement('img', card, ['card-front']);
    cardImg.src = CARDBACK_SRC;
    // cardImg.src = cardConfig.src;

    const cardPopup = createElement('div', container, ['outer-desc', 'hidden']);
    const popupTitle = createElement('h1', cardPopup, ['joker-title']);
    const popupDescriptionContainer = createElement('div', cardPopup, ['inner-desc']);
    const popupDescription = createElement('span', popupDescriptionContainer);

    popupTitle.innerHTML = '???';
    popupDescription.innerHTML = '(Click to reveal)';

    // State
    let flipped = true;
    let tiltX = 0;
    let tiltY = 0;

    // Tilt effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        tiltX = ((y - centerY) / centerY) * 25 * (flipped ? 1 : -1);
        tiltY = ((x - centerX) / centerX) * 25;

        applyTransform(1.3);
        if (cardPopup.classList.contains('hidden')) {
            cardPopup.classList.remove('hidden');
        }

        if (popupTitle.innerHTML !== '???' && !flipped) {
            setSidebarText(cardConfig.name, cardConfig.fullmessage);
        }

        if (cardConfig.name === 'Miku' && !flipped) {
            audio.volume = 0.0;
            mikuAudio.volume = 0.2;
        }
    });

    card.addEventListener('mouseleave', () => {
        tiltX = 0;
        tiltY = 0;
        applyTransform();
        if (!cardPopup.classList.contains('hidden')) {
            cardPopup.classList.add('hidden');
        }
        setSidebarText();
        audio.volume = 0.2;
        mikuAudio.volume = 0.0;
    });

    // Flip on click
    card.addEventListener('click', () => {
        const flipAudio = document.getElementById('flip-audio');
        flipAudio.pause();
        flipAudio.currentTime = 0;

        if (cardConfig.audio) {
            if (cardConfig.name === 'Clarisse') {
                flipAudio.src = (Math.random() < 0.2) ? cardConfig.audio : FLIP_SRC;
            } else {
                flipAudio.src = cardConfig.audio;
            }
        } else {
            flipAudio.src = FLIP_SRC;
        }

        flipAudio.play();

        if (cardConfig.name === 'Miku') {
            if (flipped) {
                audio.volume = 0.0;
                mikuAudio.volume = 0.2;
            } else {
                audio.volume = 0.2;
                mikuAudio.volume = 0.0;
            }
        }

        flipped = !flipped;
        applyTransform(1.3);
        setTimeout(() => {
            if (flipped) {
                cardImg.src = CARDBACK_SRC;
            } else {
                cardImg.src = cardConfig.src;
                popupTitle.innerHTML = cardConfig.name;
                popupDescription.innerHTML = cardConfig.description;
            }

            if (getUnflippedCardCount() === 0) {
                showBdayText();
            }
        }, 50);

        setSidebarText(cardConfig.name, cardConfig.fullmessage);
    });

    applyTransform();
    container.style.zIndex = -cardCount + 100;
    cardCount++;
    return container;

    function createElement(tag, parent = false, classes = []) {
        const element = document.createElement(tag);
        classes.forEach(className => element.classList.add(className));
        if (parent) parent.appendChild(element);
        return element;
    }

    function applyTransform(scale = 1) {
        const flipRotation = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        const tiltRotation = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        card.style.transform = `${flipRotation} ${tiltRotation} scale(${scale})`;
    }
}

function getUnflippedCardCount() {
    const grid = document.getElementById('card-grid');
    const cardImages = grid.getElementsByTagName('img');

    let unflipped = 0;
    for (let img of cardImages) {
        if (img.src.indexOf('cardback') >= 0) {
            unflipped++;
        }
    }
    return unflipped;
}

function setSidebarText(title = '', string = '') {
    const sidebar = document.getElementById('sidebar');
    if (title === '' || string === '') {
        sidebar.style.opacity = 0;
        return;
    }
    sidebar.style.opacity = 1;

    const sidebarTitle = document.getElementById('sidebar-title');
    sidebarTitle.innerHTML = title;
    const content = document.getElementById('sidebar-content');
    content.innerHTML = string;
}

function showBdayText() {
    const winAudio = document.getElementById('win-audio');
    winAudio.play().then(() => winAudio.volume = 2.0);
    const text = document.getElementById('bday-text');

    if (text.innerHTML.length > 0) {
        return;
    }

    let delay = 100;
    let d = 0;
    'Happy Birthday Jake!'.split('').forEach(letter => {
        setTimeout(() => {
            text.innerHTML += letter;
        }, d);
        d += delay;
    })
}

let ticks = 0;
setInterval(() => {
    const text = document.getElementById('bday-text');
    const scale = 1.25 + Math.sin(ticks / 100) / 5;
    text.style.transform = `translate(-50%, -50%) scale(${scale}) rotateZ(${Math.sin(ticks / 45)}deg)`;
    ticks++;
}, 10);

async function loadCards() {
    const response = await fetch('./config.json');
    const config = await response.json();
    const grid = document.getElementById('card-grid');

    if (!grid) {
        return;
    }

    config.cards.forEach(cardConfig => {
        grid.appendChild(createCard(cardConfig));
    });
}

loadCards();



// audio stuff
const audio = document.getElementById('bg-audio');
const mikuAudio = document.getElementById('bg-audio-miku');
let isPlaying = false;

function playAudio() {
    if (!isPlaying) {
        isPlaying = true;
        mikuAudio.play().then(() => mikuAudio.volume = 0.0)
        audio.play().then(() => audio.volume = 0.2);
        mikuAudio.currentTime = 0.2;
        audio.currentTime = 0.0;
        document.removeEventListener('click', playAudio);
    }
}

document.addEventListener('click', playAudio);
