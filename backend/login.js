document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem('token', data.token);  // Guarda el token en localStorage
    window.location.href = 'index.html';  // Redirige al index
  } else {
    alert(data.msg);  // Muestra un mensaje de error si las credenciales son incorrectas
  }
});
