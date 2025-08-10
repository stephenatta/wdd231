// discover.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/discover.json")
    .then(response => response.json())
    .then(data => {
      const grid = document.querySelector(".discover-grid");
      grid.innerHTML = ""; // Clear placeholder

      data.forEach(item => {
        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure>
            <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;

        grid.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading discover items:", error));
});
