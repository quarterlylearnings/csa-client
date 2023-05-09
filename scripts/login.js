const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = loginForm.username.value;
  const password = loginForm.password.value;

  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('csa-frontend-token', data.token);
    window.location.href = 'order.html';
  } else if (!response.ok) {
    const error = await response.json();
    document.getElementById('error-message').textContent = error.message;
    return;
  }
});
