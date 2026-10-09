/* script.js
   Four features:
   1. Contact form validation and preview (compulsory)
   2. Theme switch (light and dark)
   3. Mobile navigation menu
   4. Expandable project details
*/

/* ---------- Feature 1: Contact form validation and preview ---------- */
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const topicInput = document.getElementById("topic");
const messageInput = document.getElementById("message");
const formResult = document.getElementById("form-result");

// Fields that must be checked (an array so we can loop over them)
const checkedFields = [nameInput, emailInput, messageInput];

// Show an error message under a field and mark the field red
function showError(input, message) {
  document.getElementById(input.id + "-error").textContent = message;
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
}

// Remove the error message from a field
function clearError(input) {
  document.getElementById(input.id + "-error").textContent = "";
  input.classList.remove("invalid");
  input.removeAttribute("aria-invalid");
}

// Check the email format: text@text.text with no spaces
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Check every field. Returns true only when all fields are valid.
function validateForm() {
  let isValid = true;
  let firstBadField = null;

  checkedFields.forEach(clearError);

  // trim() removes spaces, so a spaces-only value becomes empty
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Please enter your name. Spaces alone are not accepted.");
    isValid = false;
    firstBadField = firstBadField || nameInput;
  }

  if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email, for example name@example.com.");
    isValid = false;
    firstBadField = firstBadField || emailInput;
  }

  if (messageInput.value.trim() === "") {
    showError(messageInput, "Please write a message. Spaces alone are not accepted.");
    isValid = false;
    firstBadField = firstBadField || messageInput;
  }

  // Move the cursor to the first field with a problem
  if (firstBadField) {
    firstBadField.focus();
  }
  return isValid;
}

// Show a summary of the validated data on the page (no reload)
function showPreview() {
  // textContent is used so typed text can never run as HTML
  document.getElementById("result-name").textContent = nameInput.value.trim();
  document.getElementById("result-email").textContent = emailInput.value.trim();
  document.getElementById("result-topic").textContent = topicInput.value;
  document.getElementById("result-message").textContent = messageInput.value.trim();
  formResult.hidden = false;
}

// Runs when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // keep everything local: nothing is sent anywhere
  formResult.hidden = true;
  if (validateForm()) {
    showPreview();
  }
});

// Remove a field's error as soon as the visitor starts typing again
checkedFields.forEach(function (input) {
  input.addEventListener("input", function () {
    clearError(input);
  });
});

/* ---------- Feature 2: Theme switch ---------- */
const themeButton = document.getElementById("theme-toggle");

// Switch between light and dark appearance
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-pressed", String(isDark));
}

themeButton.addEventListener("click", toggleTheme);

/* ---------- Feature 3: Mobile navigation menu ---------- */
const menuButton = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open or close the menu on narrow screens
function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close menu" : "Menu";
}

menuButton.addEventListener("click", toggleMenu);

// Close the menu after a link is chosen
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    if (navLinks.classList.contains("open")) {
      toggleMenu();
    }
  });
});

/* ---------- Feature 4: Expandable project details ---------- */
const detailButtons = document.querySelectorAll(".toggle-details");

// Show or hide the details that belong to one button
function toggleDetails(button) {
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  const willOpen = panel.hidden;
  panel.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
  button.textContent = willOpen ? "Hide details" : "Show details";
}

detailButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    toggleDetails(button);
  });
});