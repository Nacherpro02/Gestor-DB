const searchInput = document.querySelector('.input-s'); // Corregido para que apunte al campo de búsqueda correcto
const results = document.getElementById('results');

const searchUsers = (search) => {
  fetch('http://localhost:3000/api/auth/search/' + encodeURIComponent(search), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => {
      results.innerHTML = ''; // Limpiar resultados anteriores

      if (data.length === 0) {
        results.innerHTML = '<p>No se encontraron usuarios.</p>';
      } else {
        data.forEach(user => {
          const div = document.createElement('div');
          div.textContent = `${user.name} - ${user.email}`;
          results.appendChild(div);
        });
      }
    })
    .catch(err => {
      console.error('Error al buscar:', err);
      results.innerHTML = '<p>Error al buscar usuarios.</p>';
    });
};

// Evento para evitar la recarga de la página al hacer submit
document.querySelector('.formul').addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar el envío tradicional del formulario
  const search = searchInput.value.trim(); // Obtener el valor del input
  if (search) {
    searchUsers(search); // Llamar a la función de búsqueda
  } else {
    results.innerHTML = '<p>Por favor ingresa un término de búsqueda.</p>';
  }
});

