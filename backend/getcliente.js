const searchInput = document.querySelector('.input-s');
const results = document.getElementById('results');
const resultsTableBody = document.querySelector('#resultsTable tbody');

const searchUsers = (search) => {
  fetch('http://localhost:3000/api/auth/search/' + encodeURIComponent(search), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => {
      resultsTableBody.innerHTML = ''; 

      if (data.length === 0) {
        resultsTableBody.innerHTML = '<tr><td colspan="2">No se encontraron usuarios.</td></tr>';
      } else {
        data.forEach(user => {
          const row = document.createElement('tr');
          
          const nameCell = document.createElement('td');
          nameCell.textContent = user.name;
          
          const emailCell = document.createElement('td');
          emailCell.textContent = user.email;
          
          row.appendChild(nameCell);
          row.appendChild(emailCell);
          
          resultsTableBody.appendChild(row);
        });
      }
    })
    .catch(err => {
      console.error('Error al buscar:', err);
      resultsTableBody.innerHTML = '<tr><td colspan="2">Error al buscar usuarios.</td></tr>';
    });
};


document.querySelector('.formul').addEventListener('submit', (e) => {
  e.preventDefault();
  const search = searchInput.value.trim();
  if (search) {
    searchUsers(search);
  } else {
    resultsTableBody.innerHTML = '<tr><td colspan="2">Por favor ingresa un término de búsqueda.</td></tr>';
  }
});
