fetch("data/discover.json")
  .then(response => response.json())
  .then(data => {
    data.forEach((item, index) => {
      const cardElement = document.getElementById(`card${index + 1}`);
      if (cardElement) {
        cardElement.innerHTML = `
          <h2>${item.name}</h2>
          <figure>
            <img src="${item.image}" alt="${item.name}">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
      }
    });
  })
  .catch(error => console.error("Error loading discover.json:", error));

const messageContainer = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysBetween = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
  if (daysBetween < 1) {
    messageContainer.textContent = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    messageContainer.textContent = "You last visited 1 day ago.";
  } else {
    messageContainer.textContent = `You last visited ${daysBetween} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);
