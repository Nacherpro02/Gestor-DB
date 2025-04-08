document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Enviar los datos al servidor para validar
  fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.token) {
          // Almacenar el token en localStorage
          localStorage.setItem('authToken', data.token);

          // Redirigir al usuario a la página protegida
          window.location.href = 'protectedPage.html'; // Cambia esta URL según tu aplicación
      } else {
          document.getElementById('errorMessage').style.display = 'block';
      }
  })
  .catch(err => {
      console.log('Error:', err);
  });
});
