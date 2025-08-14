document.addEventListener("DOMContentLoaded", () => {
    const cardsGrid = document.querySelector(".cards-grid");
    const visitMessage = document.getElementById("visitMessage");

    fetch("data/discover.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const card = document.createElement("article");

                const title = document.createElement("h3");
                title.textContent = item.name;

                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.alt || item.name; // Better alt fallback
                img.width = 300;
                img.height = 200;
                img.loading = "lazy";
                figure.appendChild(img);

                const address = document.createElement("p");
                address.innerHTML = `<strong>Address:</strong> ${item.address}`;

                const desc = document.createElement("p");
                desc.textContent = item.description;

                const button = document.createElement("a");
                button.href = item.link || "#";
                button.textContent = "Learn more";
                button.setAttribute("role", "button");

                card.append(title, figure, address, desc, button);
                cardsGrid.appendChild(card);
            });
        })
        .catch(err => console.error("Error loading JSON:", err));

    const lastVisit = localStorage.getItem("lastVisit");
    const currentTime = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((currentTime - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
        visitMessage.textContent =
            daysSince < 1
                ? "Back so soon! Awesome!"
                : daysSince === 1
                ? "You last visited 1 day ago."
                : `You last visited ${daysSince} days ago.`;
    }

    localStorage.setItem("lastVisit", currentTime);
});
