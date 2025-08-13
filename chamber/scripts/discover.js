// discover.js

document.addEventListener("DOMContentLoaded", () => {
    const cardsGrid = document.querySelector(".cards-grid");
    const visitMessage = document.getElementById("visitMessage");

    // Fetch JSON data for the 8 attractions
    fetch("data/discover.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement("article");

                const title = document.createElement("h3");
                title.textContent = item.name;

                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.name || "Attraction image"; // Fallback alt
                img.width = 300;
                img.height = 200;
                img.loading = "lazy"; // Lazy loading
                figure.appendChild(img);

                const address = document.createElement("address");
                address.textContent = item.address;

                const desc = document.createElement("p");
                desc.textContent = item.description;

                const button = document.createElement("button");
                button.textContent = "Learn more";

                card.appendChild(title);
                card.appendChild(figure);
                card.appendChild(address);
                card.appendChild(desc);
                card.appendChild(button);

                cardsGrid.appendChild(card);
            });
        })
        .catch(err => console.error("Error loading JSON:", err));

    // Handle visit message
    const lastVisit = localStorage.getItem("lastVisit");
    const currentTime = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((currentTime - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
        if (daysSince < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSince === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysSince} days ago.`;
        }
    }

    // Store current visit date
    localStorage.setItem("lastVisit", currentTime);
});
