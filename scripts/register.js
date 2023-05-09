const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = registerForm.username.value;
  const password = registerForm.password.value;

  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    alert('User registered successfully!');
    window.location.href = 'login.html';
  } else if (!response.ok) {
    const error = await response.json();
    document.getElementById('error-message').textContent = error.message;
    return;
  
  }
});
