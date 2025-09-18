document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const pass1 = document.getElementById("password").value;
  const pass2 = document.getElementById("password2").value;
  if (pass1 != pass2){
    alert("La contraseña no coincide")
  };

  const username = document.getElementById('username').value;
  const email = document.getElementById('correo').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Registrado con éxito. Ahora inicia sesión.');
    window.location.href = 'login.html';
  } else {
    alert(data.msg);
  }
});
