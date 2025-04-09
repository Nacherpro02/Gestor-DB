const token = localStorage.getItem('token');

// Si no hay token, redirige a login
if (!token) {
  window.location.href = 'login.html';
}

fetch('/api/protected', {
  method: 'GET',
  headers: { 'x-auth-token': token }  // Envía el token en la cabecera
})
  .then(res => res.json())
  .then(data => {
    // Si la respuesta contiene un mensaje de error
    if (data.msg) {
      alert(data.msg);  // Muestra el mensaje de error
      window.location.href = 'login.html';  // Redirige al login
    } else {
      console.log(data);  // Si es válido, maneja los datos
      // Aquí puedes manejar el contenido protegido
    }
  })
  .catch(() => {
    window.location.href = 'login.html';  // Si hay un error en la solicitud, redirige al login
  });
