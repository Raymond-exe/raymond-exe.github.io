function createCard(cardConfig) {
    const container = createElement('div', false, ['card-container']);
    const card = createElement('div', container, ['card']);

    const cardImg = createElement('img', card, ['card-front']);
    cardImg.src = cardConfig.src;

    const cardPopup = createElement('div', container, ['outer-desc', 'hidden']);
    const popupTitle = createElement('h1', cardPopup, ['joker-title']);
    const popupDescriptionContainer = createElement('div', cardPopup, ['inner-desc']);
    const popupDescription = createElement('span', popupDescriptionContainer);

    popupTitle.innerHTML = cardConfig.name;
    popupDescription.innerHTML = cardConfig.description;

    // State
    let flipped = false;
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
    });

    card.addEventListener('mouseleave', () => {
        tiltX = 0;
        tiltY = 0;
        applyTransform();
        if (!cardPopup.classList.contains('hidden')) {
            cardPopup.classList.add('hidden');
        }
    });

    // Flip on click
    card.addEventListener('click', () => {
        flipped = !flipped;
        applyTransform(1.15);
        setTimeout(() => cardImg.src = flipped ? '../images/booplatro/cardback.png' : cardConfig.src, 50);
    });

    function applyTransform(scale = 1) {
        const flipRotation = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        const tiltRotation = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        card.style.transform = `${flipRotation} ${tiltRotation} scale(${scale})`;
    }

    return container;

    function createElement(tag, parent = false, classes = []) {
        const element = document.createElement(tag);
        classes.forEach(className => element.classList.add(className));
        if (parent) parent.appendChild(element);
        return element;
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
