
function createCard(imgsrc) {
    const container = document.createElement('div');
    container.classList.add('card-container');

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const cardImg = document.createElement('img');
    cardImg.src = imgsrc;

    cardElement.appendChild(cardImg);
    container.appendChild(cardElement);

    // const card = document.querySelector('.card');
    cardElement.addEventListener('mousemove', cardMovementCallback(cardElement));
    cardElement.addEventListener('mouseleave', () => cardElement.style.transform = 'rotateX(0) rotateY(0) scale(1.0)');

    return container;
}

function cardMovementCallback(card) {
    return (e) => {
        // Get the card's size and position relative to the viewport
        const cardRect = card.getBoundingClientRect();
        
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

[
    // 'ace',
    'leon',
    // 'ada',
    'hollow',
    'miku',
    'powerarmor',
    'deathclaw',
    'vaultboy'
].forEach(src => {
    document.body.appendChild(createCard(`./images/booplatro/${src}.png`));
});
