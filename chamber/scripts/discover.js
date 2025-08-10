document.addEventListener('DOMContentLoaded', () => {
    loadCards();
    showVisitMessage();
    document.getElementById("year").textContent = new Date().getFullYear();
});

function loadCards() {
    fetch('data/discover.json')
        .then(response => response.json())
        .then(data => {
            const section = document.querySelector('.cards-grid');

            data.forEach(item => {
                const article = document.createElement('article');

                const title = document.createElement('h3');
                title.textContent = item.name;

                const figure = document.createElement('figure');
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.name;
                img.width = 300;
                img.height = 200;
                figure.appendChild(img);

                const address = document.createElement('address');
                address.textContent = item.address;

                const desc = document.createElement('p');
                desc.textContent = item.description;

                const button = document.createElement('button');
                button.textContent = "Learn More";

                article.appendChild(title);
                article.appendChild(figure);
                article.appendChild(address);
                article.appendChild(desc);
                article.appendChild(button);

                section.appendChild(article);
            });
        })
        .catch(error => console.error('Error loading cards:', error));
}

function showVisitMessage() {
    const visitMessage = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }
    localStorage.setItem('lastVisit', now);
}
