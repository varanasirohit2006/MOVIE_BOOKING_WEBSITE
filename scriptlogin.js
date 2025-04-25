const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

// Existing toggle logic
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// NEW: Login form submission + redirect
document.querySelector(".sign-in form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const email = this.querySelector("input[type='email']").value;
  const password = this.querySelector("input[type='password']").value;

  // Demo check (replace with real auth later)
  if (email && password) { // Just checks if fields are filled
    window.location.href = "index.html"; // Redirect to home page
  } else {
    alert("Please fill both fields!");
  }
});