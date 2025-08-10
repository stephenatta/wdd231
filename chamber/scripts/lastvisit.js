// lastvisit.js

const messageElement = document.getElementById("visitor-message");

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diffTime = now - lastVisit;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    messageElement.textContent = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    messageElement.textContent = `You last visited ${diffDays} day ago.`;
  } else {
    messageElement.textContent = `You last visited ${diffDays} days ago.`;
  }
}

// Save current visit date
localStorage.setItem("lastVisit", now);
