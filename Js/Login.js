document.addEventListener("DOMContentLoaded", () => {
  const authOverlay = document.getElementById("auth-overlay");
  const loginView = document.getElementById("login-view");
  const signupView = document.getElementById("signup-view");
  const linkToLogin = document.getElementById("link-to-login");
  const linkToSignup = document.getElementById("link-to-signup");
  const loginForm = document.getElementById("login-form");

  // 1. Switch from Sign Up to Login
  if (linkToLogin) {
    linkToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      signupView.style.display = "none";
      loginView.style.display = "block";
    });
  }

  // 2. Switch from Login back to Sign Up
  if (linkToSignup) {
    linkToSignup.addEventListener("click", (e) => {
      e.preventDefault();
      loginView.style.display = "none";
      signupView.style.display = "block";
    });
  }

  // 3. Handle Login Submission
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      localStorage.setItem("isLoggedIn", "true");
      const authBtn = document.getElementById("auth-btn");
      if (authBtn) authBtn.innerText = "Logout";

      alert("Logged in successfully! Welcome back.");
      authOverlay.style.display = "none";
      loginForm.reset();
    });
  }
});