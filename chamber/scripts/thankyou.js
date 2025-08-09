// thankyou.js

// Grab the element where we’ll display the form data
const formOutput = document.getElementById("formData");

// Function to safely escape HTML
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Get all URL parameters
const params = new URLSearchParams(window.location.search);

// Helper to get parameter or default
function getParam(name) {
  return params.get(name) ? escapeHTML(params.get(name)) : "Not Provided";
}

// Pull and sanitize values
const firstName = getParam("firstName");
const lastName = getParam("lastName");
const email = getParam("email");
const phone = getParam("phone");
const organization = getParam("organization");
let timestamp = params.get("timestamp");

// Format timestamp if available
if (timestamp) {
  const dateObj = new Date(timestamp);
  if (!isNaN(dateObj)) {
    timestamp = dateObj.toLocaleString(); // local date & time format
  } else {
    timestamp = escapeHTML(timestamp);
  }
} else {
  timestamp = "Not Provided";
}

// Build HTML to display the values
formOutput.innerHTML = `
  <h2>Membership Application Received</h2>
  <p><strong>First Name:</strong> ${firstName}</p>
  <p><strong>Last Name:</strong> ${lastName}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Mobile Phone:</strong> ${phone}</p>
  <p><strong>Organization:</strong> ${organization}</p>
  <p><strong>Date Submitted:</strong> ${timestamp}</p>
`;
