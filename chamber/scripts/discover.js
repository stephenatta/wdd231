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
                img.alt = item.name;
                img.width = 300;
                img.height = 200;
                img.loading = "lazy"; // Lazy loading added
                figure.appendChild(img);

                const address = document.createElement("address");
                address.textContent = item.address;

                const desc = document.createElement("p");
                desc.textContent = item.description;

                const button = document.createElement("button");
                button.textContent = "Learn more";
                button.addEventListener("click", () => {
                    openModal(item.name, item.description, item.address);
                });

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
        const daysSince = Math.floor((currentTime - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSince < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSince === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysSince} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentTime);

    // ===== Modal Setup =====
    const modal = document.createElement("div");
    modal.id = "infoModal";
    modal.style.display = "none";

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    const modalTitle = document.createElement("h2");
    const modalText = document.createElement("p");
    const modalAddress = document.createElement("p");

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalAddress);
    modalContent.appendChild(modalText);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    function openModal(title, description, address) {
        modalTitle.textContent = title;
        modalAddress.innerHTML = `<strong>Address:</strong> ${address}`;
        modalText.textContent = description;
        modal.style.display = "flex";
    }

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
