const CARDBACK_SRC = '../images/booplatro/cardback.png';

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

        applyTransform(1.15);
        if (cardPopup.classList.contains('hidden')) {
            cardPopup.classList.remove('hidden');
        }

        if (popupTitle.innerHTML !== '???') {
            setSidebarText(cardConfig.name, cardConfig.fullmessage);
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
    });

    // Flip on click
    card.addEventListener('click', () => {
        flipped = !flipped;
        applyTransform(1.15);
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

function cardMovementCallback(card) {
    return (e) => {
        // Get the card's size and position relative to the viewport
        const cardRect = card.getBoundingClientRect();

        const container = card.parentNode;
        const popup = container.getElementsByClassName('outer-desc')[0];
        if (popup.classList.contains('hidden')) {
            popup.classList.remove('hidden');
        }
        
        // Calculate the position of the mouse relative to the card's top-left corner
        const x = e.clientX - cardRect.left; // X coordinate within the card
        const y = e.clientY - cardRect.top;  // Y coordinate within the card
        
        // Find the center of the card
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        // Calculate the rotation angles based on mouse position
        // Multiply by 15 for a stronger tilt effect
        const rotateX = -((y - centerY) / centerY) * 25; // Tilt on the X-axis (up and down)
        const rotateY = -((centerX - x) / centerX) * 25; // Tilt on the Y-axis (left and right)
        
        // Apply the calculated rotation to the card
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
    };
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
    const text = document.getElementById('bday-text');

    if (text.innerHTML.length > 0) {
        return;
    }

    let delay = 50;
    let d = 0;
    'Happy Birthday Jake!'.split('').forEach(letter => {
        setTimeout(() => {
            text.innerHTML += letter;
        }, d);
        d += delay;
    })
}

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
let isPlaying = false;

function playAudio() {
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            audio.volume = 0.2;
        });
        document.removeEventListener('click', playAudio);
    }
}

document.addEventListener('click', playAudio);
