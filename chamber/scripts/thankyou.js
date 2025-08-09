// thankyou.js

// Grab the element where we’ll display the form data
const formOutput = document.getElementById("formData");

// Get all URL parameters
const params = new URLSearchParams(window.location.search);

// Pull the values from the URL
const firstName = params.get("firstName") || "";
const lastName = params.get("lastName") || "";
const email = params.get("email") || "";
const phone = params.get("phone") || "";
const organization = params.get("organization") || "";
const timestamp = params.get("timestamp") || "";

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
